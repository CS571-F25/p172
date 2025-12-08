import React, { useState } from "react"
import { Button } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";

import useLocalStorage from "../hooks/UseLocalStorage";

function RatingButtons (props) {

    const buttonStyle = {
        justifyContent: "center", 
        padding: "0rem",
        margin: "0rem",
        color: "goldenrod"
    };

    const [ratedList, setRatedList] = useLocalStorage("rated", []);
    let rating;
    for (let meal of ratedList){
        if (meal.id === props.id){
            rating = meal.rating;
        }
    }

    function handleRating(stars){
        if (stars > 0){ 
            if (!rating){ // persist to local storage
                setRatedList([...ratedList, {id: props.id, rating: stars}]);
            } else { // change in local storage
                let newRatedList = ratedList.filter(m => m.id != props.id);
                setRatedList([...newRatedList, {id: props.id, rating: stars}]);
            }
        } else { // remove from local storage
            let newRatedList = ratedList.filter(m => m.id != props.id);
            setRatedList(newRatedList);
        }
    }

    return <>
    <div>
        <Button aria-label="1 star" onClick={() => handleRating(1)} variant="outline-primary" style={buttonStyle}>
            {
                rating >= 1 ?
                <FaStar style={{fontSize: "1.5rem"}}/>
                :
                <FaRegStar style={{fontSize: "1.5rem"}}/>
            }
        </Button>

        <Button aria-label="2 stars" onClick={() => handleRating(2)} variant="outline-primary" style={buttonStyle}>
            {
                rating >= 2 ?
                <FaStar style={{fontSize: "1.5rem"}}/>
                :
                <FaRegStar style={{fontSize: "1.5rem"}}/>
            }
        </Button>

        <Button aria-label="3 stars" onClick={() => handleRating(3)} variant="outline-primary" style={buttonStyle}>
            {
                rating >= 3 ?
                <FaStar style={{fontSize: "1.5rem"}}/>
                :
                <FaRegStar style={{fontSize: "1.5rem"}}/>
            }
        </Button>

        <Button aria-label="4 stars" onClick={() => handleRating(4)} variant="outline-primary" style={buttonStyle}>
            {
                rating >= 4 ?
                <FaStar style={{fontSize: "1.5rem"}}/>
                :
                <FaRegStar style={{fontSize: "1.5rem"}}/>
            }
        </Button>

        <Button aria-label="5 stars" onClick={() => handleRating(5)} variant="outline-primary" style={buttonStyle}>
            {
                rating >= 5 ?
                <FaStar style={{fontSize: "1.5rem"}}/>
                :
                <FaRegStar style={{fontSize: "1.5rem"}}/>
            }
        </Button>

        <br/>
            {
                rating ?
                <Button variant={"secondary"} onClick={() => handleRating(0)}>Clear my rating</Button>
                :
                <></>
            }
    </div>
    </>
}

export default RatingButtons;