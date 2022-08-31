import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate() // hook returns a function that lets user navigate 

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const getProfileFun = async () => {
        try {

        const token = await localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist

        console.log(token)

        const config = {
            headers: {
            Authorization: `Bearer ${token}`
            },
        }
        // user can expect to get back data to display in users application, so user can see Profile
        const { data } = await axios.get("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/user/profile", config)
        console.log("_____******________", data)
        setName(data.name)
        setEmail(data.email)
        
        } catch(err) {
            console.log(err)
        }
    }

    // User can modify profile
    const updateUserHandler = async (e) => {
        e.preventDefault()

        try {
            //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const token = localStorage.getItem("token")

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` //Bearer tokens can make requests to verfy authorization using an access key, like JWT
                },
            }

            const userInput = {
                name, email, password
            }

            // put Method request update an existing data, here name and password
            const { status } = await axios.put(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/user`, userInput, config)

            if (status === 200){
                //when successfully updated
                alert('User updated')
                getProfileFun()
                window.location.reload(false)

            }
        } catch(err) {
            console.log(err)
        }

    }


    useEffect(() => {
        // User can use the application, when user is successfully authorized       
        //when there is no token in localStorage, user can not leave Login page
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getProfileFun() // when user can log in, runs getProfileFun
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