import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router";
import { Stack, Image, Table } from "react-bootstrap";
import Markdown from "react-markdown";

import FavoriteButton from "../cards/FavoriteButton";
import RatingButtons from "../cards/RatingButtons";

function RecipePage (props) {

let ingredientImages = [];

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

            ingredientImages.push("https://www.themealdb.com/images/ingredients/" + data[`strIngredient${i}`].toLowerCase().replace(/ /g, "_") + "-small.png");
        }
    }

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + query)
        .then(res => res.json())
        .then(json => {
            //console.log(json.meals[0]);
            setData(json.meals[0]);
        })
    }, []);

    return <>
        <title>{data.strMeal}</title>
        <Stack className="col-md-12 mx-auto align-items-center align-content-center">
            <h1>{data.strMeal}</h1>
            {
                data.strSource ?
                <p>Source: <a href={data.strSource}>{data.strSource}</a></p>
                :
                <></>
            }
            
            <Stack direction="horizontal" className="justify-items-center justify-content-center" gap={4}>
                <p>
                    Category: <Link to={`/categories/${data.strCategory}`}>{data.strCategory}</Link> 
                </p>
                <p>
                    Cuisine: <Link to="/search" state={{ cuisine: data.strArea }}>{data.strArea}</Link>
                </p>
            </Stack>

            <Stack direction="horizontal" className="justify-items-center justify-content-center" gap={4}>
                <div style={{minHeight: "7rem"}}>
                    <FavoriteButton id={data.idMeal}/>
                </div>
                <div style={{minHeight: "7rem"}}>
                    <p style={{marginBottom: "0"}}>Made this recipe? Give it a rating: </p>
                    <RatingButtons id={data.idMeal}/>
                </div>
            </Stack>

            <Stack className="justify-items-center justify-content-center" direction="horizontal" gap={4}>
                <Image rounded src={data.strMealThumb + "/large"} alt={`A picture of ${data.strMeal}`} style={{width: "30rem"}}/>
        
                {
                    videoLinkIsValid ?
                    <div style={{height: "30rem"}}>
                        <iframe
                            src={embedLink ?? null}
                            allow='autoplay; encrypted-media'
                            allowFullScreen
                            title={`Video of how to prepare ${data.strMeal}`}
                            style={{ aspectRatio: "16 / 9" , width: "30rem"}}
                        />
                    </div>
                    :
                    <></>
                }
            </Stack>

            <Stack direction={"horizontal"} gap={4} style={{margin: "4rem"}} className="align-items-center align-content-center">
                <div>
                    <h2>You will need...</h2>
                    <Table style={{minWidth: "20rem"}}>
                        <thead>
                            <tr>
                                <th>
                                    Icon
                                </th>
                                <th>
                                    Amount
                                </th>
                                <th>
                                    Ingredient
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((ing, i) => <tr key={i}> <td><Image alt={`Thumbnail image of ${ing}`} style={{height: "1.5rem"}} src={ingredientImages[i]}/></td><td>{amounts[i]}</td> <td>{ing}</td></tr>)}
                        </tbody>
                    </Table>
                </div>

                <br/>

                <div>
                    <h2>Instructions</h2>
                    <Markdown>{data.strInstructions}</Markdown>
                </div>
            </Stack>
        </Stack>
    </>
}

export default RecipePage;