import React, { useState, useEffect } from "react";
import {getAll} from '../../services/FeedServices';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import  {sendTip} from '../../services/FeedServices';
import TipButton from '../../components/tipButton/TipButton';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },    
  }),
);

const FeedList = () => {
    const classes = useStyles();
    const [feeds, setFeeds] = useState([]);


    useEffect(() => {
        retrieveFeeds();
    }, []);

    const retrieveFeeds = async () => {
        const response = await getAll();
        const fetchedFeeds = response;
        if(fetchedFeeds) {
            setFeeds(fetchedFeeds);
        } else {
            console.error('no feeds detected');
        }
    }

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {feeds &&
                    feeds.map((feed:any,  index) => (
                        <Grid item key={feed} xs={12} sm={6} md={4}>
                            <Card className={classes.root} key={index}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={feed.title}
                                    subheader="September 14, 2016"
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={feed.image}
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {feed.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <TipButton creator={feed.user} category={feed.category[0]} amount={1}></TipButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>        
        </Container>
    )
}

export default FeedList;