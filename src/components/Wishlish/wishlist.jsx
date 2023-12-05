import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";

export default function Wishlist() {
    const {user} = useContext(AuthContext)
    const [offers,setOffers] = useState([]);
    useEffect(()=>{
        console.log(user);
        let favorites = user.customData?.favorites;
        console.log(favorites);
    },[])
}