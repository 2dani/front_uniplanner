import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate()

    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

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
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getProfileFun()
        }
        
    }, [])

    return (
        <Container>
            <h1> Welcome {name} </h1>
            <h2> {email}</h2>
            
        </Container>
    );
};

export default Profile;