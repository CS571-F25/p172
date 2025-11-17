import React from "react"
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router";

function CategoryCard (props) {

    const navigate = useNavigate();

    return <>
        <Card className="cursor-pointer-on-hover" onClick={() => navigate(`/categories/${props.strCategory}`)} style={{margin: ".2rem"}}>
            <div style={{margin: ".5rem"}}>
                <Image src={props.strCategoryThumb} alt={`A picture of ${props.strCategory}`} fluid rounded/>
                <h2>{props.strCategory}</h2>
            </div>
        </Card>
    </>
}

export default CategoryCard;