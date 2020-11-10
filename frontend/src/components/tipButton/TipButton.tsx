import * as React from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import IconButton from '@material-ui/core/IconButton';
import  {sendTip} from '../../services/FeedServices';


interface Props{
    category: string,
    creator: string,
    amount: number
}

const TipButton = (props:Props) => {

    const [category, setCategory] = React.useState(props.category);
    const [creator, setCreator] = React.useState(props.creator);
    const [amount, setAmount] = React.useState(props.amount);

    const onClickHandler= () => {
        sendTip(creator, category, amount);
    }

    return (
        <IconButton aria-label="give a tip" onClick={onClickHandler}>
            <MonetizationOnIcon />
        </IconButton>        
    )
}

export default TipButton;