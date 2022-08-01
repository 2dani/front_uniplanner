import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom';



const Header = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const logoutHandler = () => {

    localStorage.removeItem("token")

    navigate('/')
    //getProfileFun()
  }

  const getProfileFun = async () => {
    try {

      const token = await localStorage.getItem("token")

      console.log(token)

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
      const { data } = await axios.get("http://localhost:9000/api/user/profile", config)
      console.log("_____******________", data)
      setName(data.name)
      setEmail(data.email)
    
    } catch(err) {
        console.log(err)
    }
  }

  useEffect(() => {
    getProfileFun()
  }, [])

    return (
        <header>
          <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>Uni Planner</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ml-auto'>
                    
                    {name 
                      ? (
                          <>
                            <LinkContainer to={"/"}>
                              <Nav.Link>ToDo</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/submit"}>
                              <Nav.Link>Assignment</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/grwork"}>
                              <Nav.Link>Groupwork</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/meet"}>
                              <Nav.Link>Meeting</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/time"}>
                              <Nav.Link>Timetable</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/dday"}>
                              <Nav.Link>Exam-date counter</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={"/vacations"}>
                              <Nav.Link>Holidays</Nav.Link>
                            </LinkContainer>
                            <NavDropdown title={name} id='username'>
                              <LinkContainer to={"/profile"}>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                              </LinkContainer>
                              
                              <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                              </NavDropdown.Item>
                              

                            </NavDropdown>
                          </>
                      )
                      : (
                          <>
                              <LinkContainer to={"/login"}>
                                <Nav.Link>Login</Nav.Link>
                              </LinkContainer>
                              <LinkContainer to={"/signup"}>
                                <Nav.Link>Signup</Nav.Link>
                              </LinkContainer>
                          </>
                      )
                    }

                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
    );
};

export default Header;