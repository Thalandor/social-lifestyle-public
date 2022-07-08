import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { AppRoutePath } from '../../App';

const EnsureLoggedIn = (props: RouteComponentProps) => {
    const { isLoggedIn } = useSelector((state: AppState) => state.user);
    if(!isLoggedIn){
        props.history.replace(AppRoutePath.Login);
    }
    return null;
}

export default withRouter(EnsureLoggedIn);
