import React from "react"
import { Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import useLocalStorage from "../hooks/UseLocalStorage";

function FavoriteButton (props) {

    const [favorites, setFavorites] = useLocalStorage("favorites", []);
    let favorited;
    for (let fave of favorites){
        if (fave.id === props.id){
            favorited = true;
        }
    }

    function handleFavorite(id){
        if (!favorited){
            setFavorites([...favorites, {id: id, date: new Date().toDateString()}]);
        } else {
            let newFavs = favorites.filter(f => f.id != id);
            setFavorites(newFavs);
        }
    }

    return <Button onClick={() => handleFavorite(props.id)}>{!favorited ? <div><FaRegHeart/> Add to Favorites</div> : <div><FaHeart/> Remove from Favorites</div>}</Button>
}

export default FavoriteButton;