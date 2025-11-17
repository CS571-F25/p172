import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import RecipeCard from "../cards/RecipeCard";

function CategoryPage (props) {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + props.category.strCategory)
        .then(res => res.json())
        .then(json => {
            setRecipes(json.meals);
    })
    }, [props]);

    return <>
        <div>
            <h1>{props.category.strCategory}</h1>
            <p>{props.category.strCategoryDescription}</p>
            <p>Click on a recipe to learn more about it:</p>
            <Container fluid>
                <Row>
                    {
                        recipes.map(r => 
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={r.idMeal}><RecipeCard {...r }/></Col>)
                    }
                </Row>
            </Container>
        </div>
    </>
}

export default CategoryPage;