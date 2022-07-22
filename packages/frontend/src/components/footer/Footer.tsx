import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
const PREFIX = 'Footer';

const classes = {
    footer: `${PREFIX}-footer`
};

const Root = styled('footer')((
    {
        theme
    }
) => ({
    [`&.${classes.footer}`]: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    }
}));



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/" underline="hover">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    );
  }

const Footer = () => {

    return (
        <Root className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                 Something here to give the footer a purpose!
            </Typography>
            <Copyright />
      </Root>
    );
}

export default Footer;