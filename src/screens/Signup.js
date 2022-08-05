import React, {useState, useEffect } from 'react';
import { Col, Row, Button, Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpw, setConfirmpw] = useState("")

    const signupHandler = async (e) => { 
        e.preventDefault()
        if (password !== confirmpw) {
            alert('Passwords do not match')
        }


        try {

            const newSignup = {
                name: name,
                email: email,
                password: password,
                
            }

            const {status} = await axios.post("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/user/signup", newSignup)
            
            if (status === 200){
                navigate('/login')
            }
 
         } catch (err) {
             console.log(err)
         }
    }


    return (
        <Container className={"pt-5"}>
            
            <h1>Signup</h1>

            <Form className={"pt-5"} onSubmit={signupHandler}>
                <Form.Group controlId={"name"} className={"mb-3"}>
                    <Form.Label>User name</Form.Label>
                        <Form.Control 
                            type={"text"}
                            placeholder={"Insert username"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                    />
                </Form.Group>

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

                <Form.Group controlId={"confirmpw"} className={"mb-3"}>
                <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type={"password"}
                        placeholder={"confirm password"}
                        value={confirmpw}
                        onChange={e => setConfirmpw(e.target.value)}
                />
                </Form.Group>

                <Button
                    variant="primary"
                    className={"mt-5 btn btn-block"}
                    type='submit'
                              
                >
                    Signup
                </Button>

                
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? {' '}
                    <Link to={'/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;