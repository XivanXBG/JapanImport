import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/authContext";

export default function Logout() {
const {logoutHandler} = useContext(AuthContext);
    useEffect(()=>{
        logoutHandler()
        return; 
    },[])
}
