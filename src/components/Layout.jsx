import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router";

function Layout(props) {

    return <>
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/page">Page 1</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <Outlet />
            </div>
        </div>
    </>
}

export default Layout;