import React from "react"
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router";

function RecipeCard (props) {

    const navigate = useNavigate();

    return <>
        <Card className="cursor-pointer-on-hover" onClick={() => navigate("/recipe?id=" + props.idMeal)} style={{margin: ".2rem"}}>
            <div style={{margin: ".5rem"}}>
                <Image src={props.strMealThumb} alt={`A picture of ${props.strMeal}`} fluid rounded/>
                <h2>{props.strMeal}</h2>
            </div>
        </Card>
    </>
}

export default RecipeCard;