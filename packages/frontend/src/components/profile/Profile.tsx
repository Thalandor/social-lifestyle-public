import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getPicture, getTokensByCategory } from '../../services/AvatarServices';
import { signMetatransaction, tipUserMetaTransaction } from '../../services/TipServices';
import { categories } from '../feed/Feed';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Typography from '@mui/material/Typography';



const PREFIX = 'Profile';

const classes = {
    root: `${PREFIX}-root`,
    profileContent: `${PREFIX}-profileContent`,
    image: `${PREFIX}-image`,
    paper: `${PREFIX}-paper`,
    avatar: `${PREFIX}-avatar`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
		height: '100vh',
	},

    [`& .${classes.profileContent}`]: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},

    [`& .${classes.image}`]: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},

    [`& .${classes.paper}`]: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

    [`& .${classes.avatar}`]: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	}
}));



interface Reward {
	category: string,
	tokens: number
}

interface Medal {
	category: string,
	title: string
}

const Profile = () => {

	const [ipfsSrc, setIpfsSrc] = useState();
	const [rewards, setRewards] = useState<Reward[]>([]);
	useEffect(() => {
		fetchPicture();
		fetchTokensByCategories();
	}, []);

	const fetchPicture = async () => {
		const picture = await getPicture();
		if (picture) {
			setIpfsSrc(picture);
		} else {
			console.error('no picture detected');
		}
	}

	const fetchTokensByCategories = async () => {
		const fetchedRewards: Reward[] = [];
		for (const category of categories) {
			const tokens = await getTokensByCategory(category);
			fetchedRewards.push({ category, tokens });
		}
		setRewards(fetchedRewards);
	}

	const onTipHandler = async () => {
		const toAddress = "0x7Cc65D51C5161F5AC9203bca3a0467Af1cA130D8";
		const amount = 5;
		const signature = await signMetatransaction(toAddress, amount);
		// sendMetatransaction
		await tipUserMetaTransaction(toAddress, amount.toString(), signature);
	}

	const getMedals = () => {
		const medals: Medal[] = [];
		if (!rewards || rewards.length === 0) {
			return <Root>No medals currently :(</Root>;
		} else {
			rewards.forEach(r => {
				if (r.tokens > 0) {
					if (r.tokens < 5) {
						medals.push({ category: r.category, title: 'Beginner' })
					} else if (r.tokens < 10) {
						medals.push({ category: r.category, title: 'Advanced' })
					} else {
						medals.push({ category: r.category, title: 'Master' })
					}
				}
			})
			return medals.map(m => {
				return (
					<div>
						<div>{m.category}</div>
						<div>{m.title}</div>
					</div>)
			})
		}
	}

	return (
		<div className={classes.profileContent}>
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<EmojiPeopleIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							This is my avatar!
						</Typography>
						<div>
							<img src={ipfsSrc} alt="default img" />
						</div>
						<div>
							<div>
								<span>Medals</span>
							</div>
							{getMedals()}
						</div>
						<div>
							TEST TIP
							<button onClick={onTipHandler}></button>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default Profile;