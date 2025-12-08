import React, { useState } from "react"
import { Card, Image, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaHeart } from "react-icons/fa";

import useLocalStorage from "../hooks/UseLocalStorage";
import RatingDisplay from "./RatingDisplay";

function FavoriteCard (props) {

    const [favorites, setFavorites] = useLocalStorage("favorites", []);
    const navigate = useNavigate();
    const [alertVisible, setAlertVisible] = useState(false);

    function go() {
        navigate("/recipe?id=" + props.idMeal);
    }

    let ingredients = [];
    for (let i = 1; i <= 20; i++){
        if (props[`strIngredient${i}`]){
            ingredients.push(props[`strIngredient${i}`])
        }
    }
    let ingredientsText = ingredients.slice(0, 5).join(", ");
    if (ingredients.length > 6){
        ingredientsText += "...";
    }

    return <>
        <Card style={{margin: ".2rem", height: "16rem", justifyContent: "center"}}>
            <div className="Row" style={{margin: ".5rem"}}>
                <Image  onClick={go} class="d-flex p-2 bd-highlight" className="cursor-pointer-on-hover" src={props.strMealThumb + "/medium"} alt={`A picture of ${props.strMeal}`} style={{height: "12rem"}} rounded/>
                <div style={{margin: "1rem"}}>
                    <div onClick={go} className="cursor-pointer-on-hover" class="align-self-start" >
                        <h2>{props.strMeal}</h2>
                        <RatingDisplay id={props.idMeal}/>
                        <p>Favorited on {props.date}</p>
                        <p>Cuisine: {props.strArea}</p>
                        <p>Requires: {ingredientsText}</p>
                    </div>
                    <div class="align-self-end">
                        {
                            alertVisible ?
                            <Alert variant={"danger"}style={{zIndex: 1000}}>
                                Are you sure you want to remove {props.strMeal} from your favorites?
                                <br/>
                                <Button variant={"danger"} onClick={() => props.unfavorite(props.idMeal)}>I'm sure</Button>
                                <Button variant={"secondary"} onClick={() => setAlertVisible(false)}>Nevermind</Button>
                            </Alert>
                            :
                            <Button onClick={() => setAlertVisible(true)}><div><FaHeart/> Remove from Favorites</div></Button>
                        }
                    </div>
                </div>
            </div>
        </Card>
    </>
}

export default FavoriteCard;