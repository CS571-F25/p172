import React, { useContext } from "react"
import { FormControl, Form, Button, Container, Row, Col } from "react-bootstrap";

import CategoryCard from "../cards/CategoryCard";
import CategoriesContext from "../contexts/CategoriesContext";

function HomePage (props) {

    const [categories, setCategories] = useContext(CategoriesContext);
    console.log(categories);

    return <>
        <div>
            <h1>The Recipe Book</h1>
            <p>Browse a wide variety of delicious recipes and save your favorites for later!</p>
            <Form className="Row">
                <Form.Control type="text" placeholder="Search for a recipe..." />
                <Button>Search</Button>
            </Form>
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