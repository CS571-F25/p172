import React, { useContext } from "react"
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaWandMagicSparkles } from "react-icons/fa6";

import CategoryCard from "../cards/CategoryCard";
import CategoriesContext from "../contexts/CategoriesContext";
import SearchInput from "../cards/SearchInput";

function HomePage (props) {

    const navigate = useNavigate();

    function handleRandom(){
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(json => {
            navigate("/recipe?id=" + json.meals[0].idMeal);
        })
    }

    const [categories, setCategories] = useContext(CategoriesContext);

    return <>
        <div>
            <h1>The Recipe Book</h1>
            <p>Browse a wide variety of delicious recipes and save your favorites for later!</p>
            <SearchInput/>
            <Button onClick={handleRandom}><div><FaWandMagicSparkles/> I'm feeling hungry!</div></Button>
            <p>Or browse one of the categories:</p>
            <Container fluid>
                <Row>
                    {
                        categories.map(c => 
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={c.idCategory}><CategoryCard {...c }/></Col>)
                    }
                </Row>
            </Container>
        </div>
    </>
}

export default HomePage;