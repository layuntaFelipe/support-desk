import { Navigate, Outlet } from "react-router-dom";
import {useAuthStatus} from '../hooks/useAuthStatus';
import SpinnerLayout from "./SpinnerLayout";

const PrivateRoute = () => {
 const {loggedIn, loading} = useAuthStatus();

 if(loading) {
  return <SpinnerLayout/>
 }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute