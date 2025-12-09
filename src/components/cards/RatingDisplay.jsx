import React, { useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa";

import useLocalStorage from "../hooks/UseLocalStorage";

function RatingDisplay (props) {

    const [ratedList, setRatedList] = useLocalStorage("rated", []);
    let isRated = false;
    let rating = 0;
    for (let meal of ratedList){
        if (meal.id === props.id){
            isRated = true;
            rating = meal.rating;
        }
    }

    return <>
        {
            isRated ?
            <div style={{color: "goldenrod"}} aria-label={`${rating} stars`}>
                {
                    rating >= 1 ?
                    <FaStar/>
                    :
                    <FaRegStar/>
                }
                {
                    rating >= 2 ?
                    <FaStar/>
                    :
                    <FaRegStar/>
                }
                {
                    rating >= 3 ?
                    <FaStar/>
                    :
                    <FaRegStar/>
                }
                {
                    rating >= 4 ?
                    <FaStar/>
                    :
                    <FaRegStar/>
                }
                {
                    rating >= 5 ?
                    <FaStar/>
                    :
                    <FaRegStar/>
                }
            </div>
            :
            <></>
        }
    </>
}

export default RatingDisplay;