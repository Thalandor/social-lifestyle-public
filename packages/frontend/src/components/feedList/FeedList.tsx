import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { getAll } from "../../services/FeedServices";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TipButton from "../../components/tipButton/TipButton";

const PREFIX = "FeedList";

const classes = {
  root: `${PREFIX}-root`,
  media: `${PREFIX}-media`,
  expand: `${PREFIX}-expand`,
  expandOpen: `${PREFIX}-expandOpen`,
  avatar: `${PREFIX}-avatar`,
  cardGrid: `${PREFIX}-cardGrid`,
};

const StyledContainer = styled(Container)(({ theme }) => ({
  [`& .${classes.root}`]: {
    maxWidth: 345,
  },

  [`& .${classes.media}`]: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  [`& .${classes.expand}`]: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  [`& .${classes.expandOpen}`]: {
    transform: "rotate(180deg)",
  },

  [`& .${classes.avatar}`]: {
    backgroundColor: red[500],
  },

  [`&.${classes.cardGrid}`]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const FeedList = () => {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    retrieveFeeds();
  }, []);

  const retrieveFeeds = async () => {
    const response = await getAll();
    const fetchedFeeds = response;
    if (fetchedFeeds) {
      setFeeds(fetchedFeeds);
    } else {
      console.error("no feeds detected");
    }
  };

  return (
    <StyledContainer className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {feeds &&
          feeds.map((feed: any, index) => (
            <Grid item key={feed} xs={12} sm={6} md={4}>
              <Card className={classes.root} key={index}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings" size="large">
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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {feed.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <TipButton
                    creator={feed.user}
                    category={feed.category[0]}
                    amount={1}
                  ></TipButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </StyledContainer>
  );
};

export default FeedList;
