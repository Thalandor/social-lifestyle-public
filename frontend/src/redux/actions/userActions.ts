export const SET_USER = "SET_USER";
export const SIGNIN_USER = "SIGNIN_USER";

export interface ISetUserUserAction {
    readonly type: typeof SET_USER;
    payload: string;
}

export interface ISignInUserAction {
    readonly type: typeof SIGNIN_USER;
    payload: string;
}

export type UserActions =
| ISetUserUserAction
| ISignInUserAction

export function signInUser(jwt: string){
    return { type: SIGNIN_USER, payload: jwt};
}