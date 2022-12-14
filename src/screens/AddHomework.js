import axios from 'axios';
import React, {useState, useEffect } from 'react';
import { Row, Button, Form, Container } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';



const AddHomework = () => {
    const params = useParams(); //returns an obj of value pairs of URL parameters.
    const navigate = useNavigate(); // hook returns a function that lets user navigate 

    const [name, setName] = useState("")
    const [practiceNum, setPracticeNumber] = useState(0)
    const [submitDate, setSubmitDate] = useState("")
    const [submitTime, setSubmitTime] = useState("")
    const [memo, setMemo] = useState("")

    const instance = axios.create({
        baseURL: 'http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api'
    })
    

    const AddHWHandler = async (e) => {
        e.preventDefault()   
    
        try {
            const token = await localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
                const newHomework = {
                    name,
                    practiceNum: practiceNum,
                    submitDate: submitDate, 
                    submitTime: submitTime,
                    memo,
                }
                console.log("-------------------", newHomework)
                
                //// when user registered new Assignment, post Method send data to web adress
                const {data, status} = await instance.post("/submit/add", newHomework, config)
                
                if (status === 201){
                    //when the new Honework sucessfully added, than automatically go back to Assignment Page.
                    navigate(-1)
                }

                console.log("************************",data)
        } catch (err) {
            console.log(err)
        }

        
    }


    //see a Details
    const getSubmitDetail = async () => { 
        console.log("THIS IS PARAMS ID ///",params.id)
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            // get Method, but use ${params.id} behind /submit/, so you can get the id (homework) from URL.
            const { data } = await axios.get(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/submit/${params.id}`, config)
            console.log("*******getSubmitDetail*********", data)
            setName(data.name)
            setPracticeNumber(data.practiceNum)
            setSubmitDate(data.submitDate)
            setSubmitTime(data.submitTime)
            setMemo(data.memo)
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
            getSubmitDetail() // when user can log in, runs getSubmitDetail()
        }
    }, [])

    return (
        <Container className={"pt-5"}>
            <Link to="/submit" className="btn btn-secondary my-3 mb-3">
                Go Back
            </Link>
            <h3> {params.id ? "See a Details" : "Add a Assignment"}</h3>
                <Form className={"pt-5"} onSubmit={params.id? getSubmitDetail : AddHWHandler}>
                    <Form.Group controlId={"name"} className={"mb-3"}>
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control 
                            type={"name"}
                            placeholder={"Insert subject name"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                       />
                    </Form.Group>
                    <Form.Group controlId={"practiceNum"} className={"mb-3"}>
                        <Form.Label>Practice Number</Form.Label>
                        <Form.Control 
                            type={"number"}
                            placeholder={"Insert Practice number"}
                            value={practiceNum}
                            onChange={e => setPracticeNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId={"submitDate"} className={"mb-3"}>
                        <Form.Label>Submit date</Form.Label>
                        <Form.Control 
                            type={"date"}
                            placeholder={"Insert Submit date"}
                            value={submitDate}
                            onChange={e => setSubmitDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId={"submitTime"} className={"mb-3"}>
                        <Form.Label>Submit time</Form.Label>
                        <Form.Control 
                            type={"time"}
                            placeholder={"Insert Submit time"} 
                            value={submitTime}
                            onChange={e => setSubmitTime(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId={"memo"} className={"mb-3"}>
                        <Form.Label>Memo</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5}
                            type={"memo"}
                            placeholder={"Insert memo"} 
                            value={memo}
                            onChange={e => setMemo(e.target.value)}
                        />
                    </Form.Group>


    
                    <Row className={"pt-5"}>
                        <Button 
                        type="submit" 
                        variant="primary">
                            Register Assignment
                        </Button>
                    </Row>
                </Form>
            
        </Container>
    );
};

export default AddHomework;