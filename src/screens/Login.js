import React, {useState, useEffect } from 'react';
import { Col, Row, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {

    const navigate = useNavigate() // hook returns a function that lets user navigate 

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Handle the Login
    const loginHandler = async (e) => { 
        e.preventDefault()
        
        try {
            const loginInfo = {
                // For Login the User need only two inputs
                email,
                password,
            }

            const {data, status} = await axios.post("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/user/login", loginInfo)
            
            if (status === 200){
                //when User successfully logging in
                localStorage.setItem('token', data.token) //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
                navigate('/') // go to Todo Page
                window.location.reload(false)
            }
 
         } catch (err) {
             console.log(err)
         }

    }


    return (
        <Container className={"pt-5"}>
            
            <h1>Login</h1>

            <Form className={"pt-5"} onSubmit={loginHandler}>
                

                <Form.Group controlId={"email"} className={"mb-3"}>
                <Form.Label>E mail</Form.Label>
                    <Form.Control 
                        type={"email"}
                        placeholder={"Insert E mail"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                />
                </Form.Group>

                <Form.Group controlId={"password"} className={"mb-3"}>
                <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type={"password"}
                        placeholder={"Insert password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                />
                </Form.Group>

                <Button
                    variant="primary"
                    className={"mt-5 btn btn-block"}
                    type='submit'
                    
                >
                    Login
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Do you need an account? {' '}
                    <Link to={'/signup'}>
                        Signup
                    </Link>
                </Col>
            </Row>

        </Container>
    );
};

export default Login;