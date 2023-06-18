import { useAppDispatch } from "./useApp";
import { setCredentials, clearCredentials } from "../store/features/authSlice";

export function useUserActions() {
  const dispatch = useAppDispatch();

  const logInUser = (user) => dispatch(setCredentials(user));

  const logOutUser = () => dispatch(clearCredentials());

  return { logInUser, logOutUser };
}
