import React, {useState} from "react";
import {Nav,Collapse, Navbar, NavbarBrand,NavItem,NavLink} from "reactstrap";

export default function NavigationBar(props){
    return(   
    <Navbar color="light" expand="md" light>
        <NavbarBrand >
            CSU Decentalized Domain Registrar
        </NavbarBrand >
        <Collapse navbar>
            <Nav className="me-auto" navbar>
                <NavItem>
                    <NavLink href="/index/">Register a Domain</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/manage/">Manage Domains</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/lookup/">Lookup Domains</NavLink>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
    
    )
}