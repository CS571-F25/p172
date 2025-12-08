import React, { useRef, useState } from "react"
import { FormControl, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

function SearchInput (props) {

    const navigate = useNavigate();

    const mountValue = props.query ?? "";

    const searchRef = useRef();

    function handleSearchButtonPress(){
        navigate(`/search?query=${searchRef.current.value}`);
    }

    return <>
        <Form className="Row">
            <Form.Control onKeyPress={event => {
                            if (event.key === "Enter") {
                                handleSearchButtonPress();
                            }}} 
            ref={searchRef} type="text" placeholder="Search for a recipe..." defaultValue={mountValue}/>
            <Button style={{width: "13rem"}} onClick={handleSearchButtonPress}><div><FaSearch/> Search by Name</div></Button>
        </Form>
    </>
}

export default SearchInput;