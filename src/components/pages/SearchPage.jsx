import React, { useState, useEffect } from "react"
import { useSearchParams, useLocation } from "react-router";
import { Container, Row, Col, Button } from "react-bootstrap";

import RecipeCard from "../cards/RecipeCard";
import SearchInput from "../cards/SearchInput";
import FilterDropdown from "../cards/FilterDropdown";
import useLocalStorage from "../hooks/UseLocalStorage";

function SearchPage () {

    const [ratedList, setRatedList] = useLocalStorage("rated", []);
    const ratings = [{1 :"1"}, {2: "2"}, {3: "3"}, {4: "4"}, {5: "5"}];

    const location = useLocation();
    let linkedCuisine;
    if (location.state) {
        linkedCuisine = location.state.cuisine;
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState([]);

    const [categoryFilter, setCategoryFilter] = useState([]);
    const [cuisineFilter, setCuisineFilter] = useState([]);
    const [ratingFilter, setRatingFilter] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const [categories, setCategories] = useState([]);
    const [cuisines, setCuisines] = useState([]);

    const [activeCatFilter, setActiveCatFilter] = useState("");
    const [activeCuisFilter, setActiveCuisFilter] = useState(linkedCuisine) ?? useState("");
    const [activeRatingFilter, setActiveRatingFilter] = useState("");

    const query = searchParams.get('query');

    function handleSetFilter(type, filter){
        if (type === "category"){
            setActiveCatFilter(filter);
        } else if (type === "cuisine") {
            setActiveCuisFilter(filter);
        } else if (type === "rating") {
            setActiveRatingFilter(filter);
        }
    }

    // this function is a GIGANTIC DISGUSTING MESS! i must redo it one day
    function filterResults(){
        let filteredIds;
        const ratingIds = ratingFilter.map(r => r.idMeal);
        // console.log("filters: ");
        // console.log(results);
        // console.log(activeCatFilter);
        // console.log(activeCuisFilter);
        // console.log(activeRatingFilter);
        if (results){
            const resultsIds = results.map(r => r.idMeal);
            if (categoryFilter && cuisineFilter){
                const categoryIds = categoryFilter.map(r => r.idMeal);
                const cuisineIds = cuisineFilter.map(r => r.idMeal);
                filteredIds = resultsIds.filter(r => categoryIds.includes(r)).filter(c => cuisineIds.includes(c));
            } else if (categoryFilter && !cuisineFilter) {
                const categoryIds = categoryFilter.map(r => r.idMeal);
                filteredIds = resultsIds.filter(r => categoryIds.includes(r));
            } else if (cuisineFilter && !categoryFilter) {
                const cuisineIds = cuisineFilter.map(r => r.idMeal);
                filteredIds = resultsIds.filter(c => cuisineIds.includes(c));
            } else {
                filteredIds = resultsIds;
            }
            if (ratingFilter.length > 0){
                filteredIds = filteredIds.filter(c => ratingIds.includes(c));
            }
            setFilteredResults(results.filter(r => filteredIds.includes(r.idMeal)));
        } else {
            if (categoryFilter && cuisineFilter){
                const categoryIds = categoryFilter.map(r => r.idMeal);
                const cuisineIds = cuisineFilter.map(r => r.idMeal);
                filteredIds = categoryIds.filter(c => cuisineIds.includes(c));
                if (ratingFilter.length > 0){
                    filteredIds = filteredIds.filter(c => ratingIds.includes(c));
                }
                setFilteredResults(categoryFilter.filter(r => filteredIds.includes(r.idMeal)));
            } else if (categoryFilter && !cuisineFilter){
                if (ratingFilter.length > 0){
                    const categoryIds = categoryFilter.map(r => r.idMeal);
                    filteredIds = categoryIds.filter(c => ratingIds.includes(c));
                    setFilteredResults(categoryFilter.filter(r => filteredIds.includes(r.idMeal)));
                } else {
                    setFilteredResults(categoryFilter);
                }
            } else if (cuisineFilter && !categoryFilter){
                if (ratingFilter.length > 0){
                    const cuisineIds = cuisineFilter.map(r => r.idMeal);
                    filteredIds = cuisineIds.filter(c => ratingIds.includes(c));
                    setFilteredResults(cuisineFilter.filter(r => filteredIds.includes(r.idMeal)));
                } else {
                    setFilteredResults(cuisineFilter);
                }
            } else {
                if (ratingFilter.length > 0){
                    setFilteredResults(ratingFilter);
                } else {
                    setFilteredResults([]);
                }
            }
        }
    }

    useEffect(() => {
        if (query === ""){
            setResults(null);
        } else {
            fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query)
            .then(res => res.json())
            .then(json => {
                setResults(json.meals);
            })
        }

        fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then(res => res.json())
        .then(json => {
            setCategories(json.meals);
        })

        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then(res => res.json())
        .then(json => {
            setCuisines(json.meals);
        })

        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + activeCatFilter)
        .then(res => res.json())
        .then(json => {
            setCategoryFilter(json.meals);
        })

        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + activeCuisFilter)
        .then(res => res.json())
        .then(json => {
            setCuisineFilter(json.meals);
        })

        const ratedListForCurrentRating = ratedList.filter(r => r.rating == activeRatingFilter);
        setRatingFilter([]);
        for (let meal of ratedListForCurrentRating){
            fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + meal.id)
            .then(res => res.json())
            .then(json => {
                setRatingFilter(ratingFilter => [...ratingFilter, json.meals[0]]);
            })
        }
        
    }, [searchParams.get('query'), activeCatFilter, activeCuisFilter, activeRatingFilter]);

    useEffect(() => {
        filterResults();
    }, [categoryFilter, cuisineFilter, results, ratingFilter]);

    return <>
        <title>Search</title>
        <div>
            <h1>Search</h1>
            <div className="Row" style={{margin: "1rem"}}>
                <p>Active filters: </p>
                {
                    !activeCatFilter&&!activeCuisFilter&&!activeRatingFilter?
                    <p style={{marginInlineStart: ".5rem"}}>None</p>
                    :
                    <></>
                }
                {
                    activeCatFilter?
                        <Button variant={"secondary"} onClick={() => setActiveCatFilter("")}>{activeCatFilter}</Button>
                    :
                    <></>
                }
                {
                    activeCuisFilter?
                        <Button variant={"secondary"} onClick={() => setActiveCuisFilter("")}>{activeCuisFilter}</Button>
                    :
                    <></>
                }
                {
                    activeRatingFilter?
                        <Button variant={"secondary"} onClick={() => setActiveRatingFilter("")}>{activeRatingFilter}</Button>
                    :
                    <></>
                }
            </div>
            {
                (activeCatFilter || activeCuisFilter || activeRatingFilter)?
                    <p>Click on an active filter to remove it</p>
                :
                <></>
            }
            <SearchInput query={query}/>
            <div className="Row" style={{margin: "1rem"}}>
                <FilterDropdown set={handleSetFilter} title={"category"} options={categories}/>
                <FilterDropdown set={handleSetFilter} title={"cuisine"} options={cuisines}/>
                <FilterDropdown set={handleSetFilter} title={"rating"} options={ratings}/>
            </div>
            <Container fluid>
                <Row className="gy-4">
                    {
                        filteredResults.length > 0 ?
                        filteredResults.map(r => 
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={r.idMeal}><RecipeCard {...r }/></Col>)
                        :
                        <p>No recipes matched your search and filters. Enter a search term or activate at least one filter to search.</p>
                    }
                </Row>
            </Container>
        </div>
    </>
}

export default SearchPage;