import React, {useState, useEffect } from 'react';
import { Col, Row, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const loginHandler = async (e) => { 
        e.preventDefault()
        
        try {
            const loginInfo = {
                email,
                password,
            }

            const {data, status} = await axios.post("http://localhost:9000/api/user/login", loginInfo)
            
            if (status === 200){
                localStorage.setItem('token', data.token)
                navigate('/')
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