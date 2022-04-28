import React, { useState, useLayoutEffect } from "react";
import { Nav, Collapse, Navbar, NavbarBrand, NavItem, NavLink, Button } from "reactstrap";

function ShowMenuButton(navbarOpen, setNavbarOpen) {
   const [width] = useWindowSize();
   var menuBarAppearsAt = 768 // At a screen width of 768 or greater, the navBar remains open always (wide enough display)
   if (width < menuBarAppearsAt) {
      return (
         <Button onClick={() => setNavbarOpen(!navbarOpen)}>
            {/* This hamburger menu SVG values is from the fontAwesome website */}
            <svg width={12} fill="#353535" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
               <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 
                        0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 
                        0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 
                        433.7 448 416 448z" /></svg>
         </Button>
      )
   }
}

// Code found at https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
function useWindowSize() {
   const [size, setSize] = useState([0, 0]);
   useLayoutEffect(() => {
      function updateSize() {
         setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
   }, []);
   return size;
}

export default function NavigationBar(props) {
   const [navbarOpen, setNavbarOpen] = useState(false)
   return (
      <Navbar color="light" expand="md" light>
         <NavbarBrand>
            CSU Decentalized Domain Registrar
         </NavbarBrand >
         {ShowMenuButton(navbarOpen, setNavbarOpen)}
         <Collapse isOpen={navbarOpen} navbar>
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