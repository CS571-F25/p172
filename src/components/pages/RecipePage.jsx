import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router";
import { Button, Image, Table } from "react-bootstrap";
import Markdown from "react-markdown";

import FavoriteButton from "../cards/FavoriteButton";
import RatingButtons from "../cards/RatingButtons";

function RecipePage (props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState([]);

    const query = searchParams.get('id');

    let videoLinkIsValid = false;
    let embedLink;
    if (data.strYoutube){
        embedLink = data.strYoutube.split("watch?v=");
        if (embedLink[0] == "https://www.youtube.com/"){
            videoLinkIsValid = true;
        }
        embedLink = [embedLink[0], "embed/", embedLink[1]].join("");
    }

    let ingredients = [];
    let amounts = [];
    for (let i = 1; i <= 20; i++){
        if (data[`strIngredient${i}`]){
            ingredients.push(data[`strIngredient${i}`])
            amounts.push(data[`strMeasure${i}`]);
        }
    }

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
            <h1>{data.strMeal}</h1>
            <FavoriteButton id={data.idMeal}/>
        </div>
        <div>
            {
                data.strSource ?
                <p>Source: <a href={data.strSource}>{data.strSource}</a></p>
                :
                <></>
            }
            <p>Made this recipe? Give it a rating: </p>

            <RatingButtons id={data.idMeal}/>

            <p>Cuisine: <Link to="/search" state={{ cuisine: data.strArea }}>{data.strArea}</Link></p>
            <p>Category: <Link to={`/categories/${data.strCategory}`}>{data.strCategory}</Link></p>
            <Image src={data.strMealThumb + "/large"} alt={`A picture of ${data.strMeal}`} style={{width: "30rem"}}/>
            {
                videoLinkIsValid ?
                <div>
                    <h2>Video</h2>
                    <iframe
                        src={embedLink ?? null}
                        frameBorder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title={`Video of how to prepare ${data.strMeal}`}
                    />
                </div>
                :
                <></>
            }
            <h2>Ingredients</h2>
            <Table>
                <thead>
                    <tr>
                        <th>
                            Amount
                        </th>
                        <th>
                            Ingredient
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ing, i) => <tr key={i}><td>{amounts[i]}</td><td>{ing}</td></tr>)}
                </tbody>
            </Table>
            <h2>Instructions</h2>
            <Markdown>{data.strInstructions}</Markdown>
        </div>
    </>
}

export default RecipePage;