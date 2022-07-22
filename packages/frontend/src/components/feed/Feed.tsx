import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FeedServices from "../../services/FeedServices";
import FeedList from "../../components/feedList/FeedList";

const PREFIX = "Feed";

const classes = {
  feedContent: `${PREFIX}-feedContent`,
  root: `${PREFIX}-root`,
  input: `${PREFIX}-input`,
  chips: `${PREFIX}-chips`,
  chip: `${PREFIX}-chip`,
  cardGrid: `${PREFIX}-cardGrid`,
};

const Root = styled("div")(({ theme }) => ({
  [`&.${classes.feedContent}`]: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },

  [`& .${classes.root}`]: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  [`& .${classes.input}`]: {
    display: "none",
  },

  [`& .${classes.chips}`]: {
    display: "flex",
    flexWrap: "wrap",
  },

  [`& .${classes.chip}`]: {
    margin: 2,
  },

  [`& .${classes.cardGrid}`]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export const categories = ["Techno", "Festival", "Paid", "Surf", "Feed"];

const Feed = () => {
  const [open, setOpen] = React.useState(false);

  const [data, setData] = React.useState({
    title: "",
    description: "",
    category: [],
  });

  const [fileData, setFile] = React.useState<string | ArrayBuffer | null>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleInputChange = (event: any) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event: any) => {
    event.preventDefault();
    const user = await FeedServices.getUserAccount();
    await FeedServices.create({ ...data, image: fileData, user });
    setOpen(false);
  };

  const getBase64 = (event: any) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile(reader.result);
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  return (
    <Root className={classes.feedContent}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create feed
      </Button>
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Feed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to create a new feed, please fill in the following form.
          </DialogContentText>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={sendData}
          >
            <FormControl>
              <InputLabel>Title</InputLabel>
              <Input
                id="title"
                name="title"
                value={data.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Description</InputLabel>
              <Input
                id="description"
                multiline={true}
                name="description"
                value={data.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                name="selectedImage"
                onChange={getBase64}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  size="large"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </FormControl>
            <FormControl>
              <InputLabel id="demo-mutiple-chip-label">Category</InputLabel>
              <Select
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                name="category"
                multiple
                value={data.category}
                onChange={handleInputChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendData} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <FeedList></FeedList>
    </Root>
  );
};

export default Feed;
