import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { AppRoutePath } from '../../App';

const EnsureLoggedIn = () => {
    const { isLoggedIn } = useSelector((state: AppState) => state.user);
    const navigate = useNavigate()
    if (!isLoggedIn) {
        navigate(AppRoutePath.Login, { replace: true });
    }
    return null;
}

export default EnsureLoggedIn;
