import * as React from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import IconButton from '@mui/material/IconButton';
import { sendTip } from '../../services/FeedServices';


interface Props {
    category: string,
    creator: string,
    amount: number
}

const TipButton = ({ category, amount, creator }: Props) => {

    const onClickHandler = () => {
        sendTip(creator, category, amount);
    }

    return (
        <IconButton aria-label="give a tip" onClick={onClickHandler} size="large">
            <MonetizationOnIcon />
        </IconButton>
    );
}

export default TipButton;