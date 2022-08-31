import React, {useEffect, useState} from 'react';
import { Row, Button, Form, Container, Col,} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Testddayadd = () => {
    const navigate = useNavigate(); // hook returns a function that lets user navigate 
    const params = useParams(); //returns an obj of value pairs of URL parameters.
    console.log("+++++++++++++++++++++++++++++++++++",params.id)
    const [name, setName] = useState("")
    const [sdate, setSdate] = useState("")
    const [stime, setStime] = useState("")
    const [endtime, setEndtime] = useState("")
    const [memo, setMemo] = useState("")

    // User can add a new Test
    const addTestHandler = async (e) => {
        e.preventDefault()
        const token = await localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
        const newTest = {
            testName: name,
            testDate: sdate, 
            timeStart: stime, 
            timeEnd: endtime, 
            memo
        }
        console.log(newTest)

        // User can register a new Test by using post Method
        const {data, status} = await axios.post("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/test", newTest, config)
        console.log(status)

        if (status === 200) {
            navigate(-1)
        }
    }

    const updateTestHandler = async(e) => {
        e.preventDefault()

        const updateTest = {
            testName: name,
            testDate: sdate,
            timeStart: stime,
            timeEnd: endtime,
            memo: memo
        }
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            // User can update the registered Test Information
            // ${params.id}, because the Test has to be selected from User
            const { status } = await axios.put(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/test/${params.id}`, updateTest, config)
            console.log("UPDATED", status)

            if (status === 200) {
                // when it's updated, automatically go back to Test-date Counter Page
                navigate(-1)
    
            }
            
         } catch(err) {
             console.log(err)
         }
        console.log("UPDATE!")
    }

    const getTestInfo = async () => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            // User can Test select that he want see a Details
           const { data } = await axios.get(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/test/${params.id}`, config)
           console.log("******GETTESTINFO*******", data)
           setName(data.testName)
           setSdate(data.testDate)
           setStime(data.timeStart)
           setEndtime(data.timeEnd)
           setMemo(data.memo)
        } catch(e) {
            console.log(e)
        }

    }

    const deleteATest = async(e) => { 
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            // ${params.id} only selected Test has to be deleted from User 
            const { status } = await axios.delete(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/test/${params.id}`, config)
            console.log("DELETE", status)

            if (status === 200) {
                navigate(-1)
    
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
            getTestInfo() // when user can log in, runs getTestInfo()
        }
    }, [])



    return (
        <Container className={"pt-5"}>
            <Link to="/dday" className="btn btn-secondary my-3 mb-3">
                Go Back
            </Link>
            <h3> {params.id ? "Modify an examination" : "Add an examination"}</h3>
                <Form className={"pt-5"} onSubmit={params.id ? updateTestHandler : addTestHandler}>
                    <Form.Group controlId={"name"} className={"mb-3"}>
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control 
                            type={"name"}
                            placeholder={"Insert subject name"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                       />
                    </Form.Group>
                    
                    <Form.Group controlId={"date"} className={"mb-3"}>
                        <Form.Label>Exam date</Form.Label>
                        <Form.Control 
                            type={"date"}
                            placeholder={"Insert Submit date"}
                            value={sdate}
                            onChange={e => setSdate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId={"stime"} className={"mb-3"}>
                        <Form.Label>Start time</Form.Label>
                        <Form.Control 
                            type={"time"}
                            placeholder={"Insert Start time"} 
                            value={stime}
                            onChange={e => setStime(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId={"endtime"} className={"mb-3"}>
                        <Form.Label>End time</Form.Label>
                        <Form.Control 
                            type={"time"}
                            placeholder={"Insert End time"} 
                            value={endtime}
                            onChange={e => setEndtime(e.target.value)}
                        />
                    </Form.Group>

    
    
                    <Form.Group controlId={"memo"} className={"mb-3"}>
                        <Form.Label>Memo</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5}
                            type={"memo"}
                            placeholder={"MEMO"}
                            value={memo}
                            onChange={e => setMemo(e.target.value)}
                       />
                    </Form.Group>
                    {params.id
                        ? (
                            <Row>
                                <Col>
                                    <Button 
                                        type='submit'
                                        variant="primary"

                                    >
                                        Update
                                    </Button>
                                    <Button 
                                        type={"button"}
                                        variant="danger"
                                        className={'ml-2'}
                                        onClick = {() => deleteATest()}
                                    >
                                        Delete
                                    </Button>
                                
                                </Col>
                            </Row>

                        ) 
                        : (
                            <Button 
                            type='submit'

                            >
                                Register
                            </Button>
                        )
                    
                    }
                </Form>
            
        </Container>
    );
};

export default Testddayadd;