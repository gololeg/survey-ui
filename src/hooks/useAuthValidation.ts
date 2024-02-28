import {useAppSelector} from "hooks/useAppSelector";
import {useAppDispatch} from "hooks/useAppDispatch";
import {useEffect} from "react";



export const useAuthValidation = () => {
    const isLoggedIn = useAppSelector(state => state.users.isLoggedIn);
    const {isAuthMe} = useAppDispatch();

    useEffect(() => {
       isAuthMe();
    }, [isLoggedIn])


    return isLoggedIn;
}