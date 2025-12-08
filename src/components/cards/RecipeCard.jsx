import React from "react"
import { Card, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import FavoriteButton from "./FavoriteButton";
import RatingDisplay from "./RatingDisplay";

function RecipeCard (props) {

    const navigate = useNavigate();

    return <>
        <Card className="d-flex flex-column" style={{margin: ".2rem", minHeight: "24rem", minWidth: "16.5rem"}}>
            <div onClick={() => navigate("/recipe?id=" + props.idMeal)} className="cursor-pointer-on-hover" style={{margin: ".5rem"}}>
                <Image fluid rounded src={props.strMealThumb + "/medium"} alt={`A picture of ${props.strMeal}`}/>
                <h2 className="my-2">{props.strMeal}</h2>
                <RatingDisplay id={props.idMeal}/>
            </div>
            <div className="mt-auto justify-content-center">
                <FavoriteButton id={props.idMeal}/>
            </div>
        </Card>
    </>
}

export default RecipeCard;