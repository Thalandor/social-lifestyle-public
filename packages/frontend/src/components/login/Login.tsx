import * as React from "react";
import Button from "@material-ui/core/Button";
import { getUserInfo, login, signMessage, register } from "../../services/LoginServices";
import { initWeb3 } from "../../utils/web3Utils";
import { signInUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { AppRoutePath } from "../../App";
import styles from "./Login.module.scss";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Snackbar } from '@material-ui/core';
import { useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from "react-router-dom";


function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLoginBtnClick = async () => {
    // Get users
    const web3 = await initWeb3();
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      const user = await getUserInfo(accounts[0]);
      if (user) {
        handleSignMessage(user.publicAddress, user.nonce);
      } else {
        setOpenSnackbar(true);
      }
    }
  };

  const handleSignMessage = async (publicAddress: string, nonce: string) => {
    try {
      const signature = await signMessage(
        `I am signing my one-time nonce: ${nonce}`
      );
      const response = await login(signature, publicAddress);
      if (response) {
        saveJWT(response);
        navigate(AppRoutePath.Feed);
      }
    } catch (err) { }
  };

  const saveJWT = (jwt: string) => {
    dispatch(signInUser(jwt));
  };

  const openRegisterDialogHandler = () => {
    setOpenModal(true);
  }

  const handleCancelModalRegister = () => {
    setOpenModal(false);
  }

  const handleRegister = async () => {
    const web3 = await initWeb3();
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      const user = await getUserInfo(accounts[0]);
      if (user) {
        // User already registered!!!
      } else {
        register(accounts[0], username);
        console.log("Need to register");
      }
    }
    setOpenModal(false);
  }

  const onChangeUsernameHandler = (e: any) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  }

  return (
    <>
      <Dialog open={openModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please, fill the following information:
          </DialogContentText>
          <TextField
            value={username}
            onChange={onChangeUsernameHandler}
            autoFocus
            margin="dense"
            id="name"
            label="Username (optional)"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelModalRegister} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles.container}>
        <Button variant="outlined" color="primary" onClick={handleLoginBtnClick}>
          Login with metamask
        </Button>



        <h5>
          {
            /* eslint-disable */
          }
          <a onClick={openRegisterDialogHandler}>Don't have an account? Register here!</a>
          {
            /* eslint-enable */
          }
        </h5>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error">
          User not registered!!!!!!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
