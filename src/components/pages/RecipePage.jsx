import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function RecipePage (props) {

    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);

    const query = searchParams.get('id');

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + query)
        .then(res => res.json())
        .then(json => {
            console.log(json.meals[0]);
            setData(json.meals[0]);
    })
    }, []);

    return <>
        <div className="Row">
            <Button onClick={() => navigate(-1)} variant="secondary" style={{margin: "2rem"}}>Back</Button>
            <h1>{data.strMeal}</h1>
        </div>
    </>
}

export default RecipePage;