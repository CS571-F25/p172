import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap";

import FavoriteCard from "../cards/FavoriteCard";
import useLocalStorage from "../hooks/UseLocalStorage";

function FavoritesPage () {

    const [favorites, setFavorites] = useLocalStorage("favorites", []);
    const [favoriteMeals, setFavoriteMeals] = useState([]);

    function unfavorite(id){
        let newFavs = favorites.filter(f => f.id !== id);
        setFavorites(newFavs);
        let newFavMeals = favoriteMeals.filter(f => f.idMeal !== id);
        setFavoriteMeals(newFavMeals);
    }

    useEffect(() => {
        setFavoriteMeals([]);
        for (let fave of favorites){
            fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + fave.id)
            .then(res => res.json())
            .then(json => {
                setFavoriteMeals(favoriteMeals => [...favoriteMeals, json.meals[0]]);
            })
        }
    }, []);

    return <>
        <div>
            <h1>Favorites</h1>
            <Container fluid>
                <Row>
                    {
                        favoriteMeals.length != 0 ?
                        favoriteMeals.map((r, i) => 
                            <Col xs={12} sm={12} md={12} lg={6} xl={6} key={r.idMeal}><FavoriteCard unfavorite={unfavorite} date={favorites[i].date} {...r } /></Col>)
                        :
                        <p>You have no recipes in your favorites yet.</p>
                    }
                </Row>
            </Container>
        </div>
    </>
}

export default FavoritesPage;