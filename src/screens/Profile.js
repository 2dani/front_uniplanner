import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate()

    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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

    const updateUserHandler = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem("token")

            console.log(token)

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }

            const userInput = {
                name, email, password
            }

            const { status } = await axios.put(`http://localhost:9000/api/user`, userInput, config)
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",status)
            if (status === 200){
                
                alert('User updated')
                getProfileFun()

            }
        } catch(err) {
            console.log(err)
        }

    }


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getProfileFun()
        }
        
    }, [])

    return (
        <Container className={'mt-5'}>
            
            <Row>               
                <h1> Welcome {name} </h1>
                <Form onSubmit={updateUserHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email' className={'mt-3'}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                    </Form.Group>

                    <Form.Group controlId='password' className={'mt-3 mb-5'}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter a new password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='primary'
                    >
                        Update
                    </Button>
                </Form>              
            </Row>
            
        </Container>
    );
};

export default Profile;