import React from "react"
import { DropdownButton, Dropdown } from "react-bootstrap";

function FilterDropdown (props) {

    return <>
        <DropdownButton id="dropdown-basic-button" title={`Filter by ${props.title}`}  >
            {
                props.options.map(o => <Dropdown.Item onClick={() => props.set(props.title, Object.values(o)[0])} key={Object.values(o)[0]}>{Object.values(o)[0]}</Dropdown.Item>)
            }
        </DropdownButton>
    </>
}

export default FilterDropdown;