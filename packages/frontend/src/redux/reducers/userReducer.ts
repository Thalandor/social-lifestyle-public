import {
  SET_ACTIVE_ACCOUNT,
  SET_USER,
  SIGNIN_USER,
} from "./../actions/userActions";
import { UserActions } from "../actions/userActions";

type UserState = {
  name?: string;
  publicAddress: string;
  isLoggedIn: boolean;
  jwt: string;
  activeAccount: string;
};
const initialState: UserState = {
  name: "",
  publicAddress: "",
  jwt: "",
  isLoggedIn: false,
  activeAccount: "",
};

const UserReducer = (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        name: action.payload,
      };
    case SIGNIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        jwt: action.payload,
      };
    case SET_ACTIVE_ACCOUNT:
      return {
        ...state,
        activeAccount: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
