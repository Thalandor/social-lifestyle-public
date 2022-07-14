import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import FeedServices from '../../services/FeedServices';
import FeedList from '../../components/feedList/FeedList';



export const categories = [
    'Techno',
    'Festival',
    'Paid',
    'Surf',
    'Feed',
];

const Feed = () => {
    const [open, setOpen] = React.useState(false);

    const [data, setData] = React.useState({
        title: '',
        description: '',
        category: []
    });

    const [fileData, setFile] = React.useState<string | ArrayBuffer | null>();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            feedContent: {
                backgroundColor: theme.palette.background.paper,
                padding: theme.spacing(8, 0, 6),
            },
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                },
            },
            input: {
                display: 'none',
            },
            chips: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            chip: {
                margin: 2,
            },
            cardGrid: {
                paddingTop: theme.spacing(8),
                paddingBottom: theme.spacing(8),
            },
        }),
    );

    const classes = useStyles();

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
            [event.target.name]: event.target.value

        })
    }

    const fetchUserAccount = async () => {
        const account = FeedServices.getUserAccount();
    }

    const sendData = async (event: any) => {
        event.preventDefault();
        const user = await FeedServices.getUserAccount();
        await FeedServices.create({ ...data, image: fileData, user });
        setOpen(false);
    }

    const getBase64 = (event: any) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFile(reader.result);
        };


        reader.onerror = (error) => {
            console.log('Error: ', error);
        };
    }

    return (
        <div className={classes.feedContent}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Create feed
            </Button>
            <Dialog maxWidth="md" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Feed</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        In order to create a new feed, please fill in the following form.
                    </DialogContentText>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={sendData}>
                        <FormControl>
                            <InputLabel>Title</InputLabel>
                            <Input id="title" name="title" value={data.title} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel>Description</InputLabel>
                            <Input id="description" multiline={true} name="description" value={data.description} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl>
                            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" name="selectedImage" onChange={getBase64} />
                            <label htmlFor="icon-button-file">
                                <IconButton color="primary" aria-label="upload picture" component="span">
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
                                            <Chip key={value} label={value} className={classes.chip} />
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

        </div>)
}

export default Feed;