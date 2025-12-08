import React from "react"
import { Card, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import FavoriteButton from "./FavoriteButton";
import RatingDisplay from "./RatingDisplay";

function RecipeCard (props) {

    const navigate = useNavigate();

    return <>
        <Card style={{margin: ".2rem"}}>
            <div onClick={() => navigate("/recipe?id=" + props.idMeal)} className="cursor-pointer-on-hover" style={{margin: ".5rem"}}>
                <Image src={props.strMealThumb + "/medium"} alt={`A picture of ${props.strMeal}`} fluid rounded/>
                <h2>{props.strMeal}</h2>
                <RatingDisplay id={props.idMeal}/>
            </div>
            <div>
                <FavoriteButton id={props.idMeal}/>
            </div>
        </Card>
    </>
}

export default RecipeCard;