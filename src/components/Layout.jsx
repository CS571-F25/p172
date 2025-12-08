import React, { useEffect, useState } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import { FaHome, FaHeart, FaSearch } from "react-icons/fa";

import CategoriesContext from "./contexts/CategoriesContext";

function Layout(props) {

    const [categories, setCategories] = useState(props.categories);
    useEffect(() => {setCategories(props.categories)}, [props]);

    return <>
        <div>
            <Navbar bg="dark" data-bs-theme="dark" fixed="top">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/"><div><FaHome/> Home</div></Nav.Link>
                        <Nav.Link as={Link} to="/favorites"><div><FaHeart/> Favorites</div></Nav.Link>
                        <NavDropdown title="Categories">
                            {
                                props.categories.map(cat => {
                                    return <NavDropdown.Item as={Link} to={`categories/${cat.strCategory}`} key={cat.idCategory}>{cat.strCategory}</NavDropdown.Item>
                                })
                            }
                        </NavDropdown>
                        <Nav.Link as={Link} to="/search"><div><FaSearch/> Search</div></Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <CategoriesContext.Provider value={[categories, setCategories]}>
                    <Outlet />
                </CategoriesContext.Provider>
            </div>
        </div>
    </>
}

export default Layout;