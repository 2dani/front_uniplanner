import React, {useEffect, useState} from 'react';
import { Row, Button, Form, Container, Col,} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Testddayadd = () => {
    const navigate = useNavigate();
    const params = useParams();
    console.log("+++++++++++++++++++++++++++++++++++",params.id)
    const [name, setName] = useState("")
    const [sdate, setSdate] = useState("")
    const [stime, setStime] = useState("")
    const [endtime, setEndtime] = useState("")
    const [memo, setMemo] = useState("")

    const addTestHandler = async (e) => {
        e.preventDefault()
        const newTest = {
            testName: name,
            testDate: sdate, 
            startTime: stime, 
            endTime: endtime, 
            memo
        }
        console.log(newTest)

        const {data, status} = await axios.post("http://localhost:9000/api/test", newTest)
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
            const { status } = await axios.put(`http://localhost:9000/api/test/${params.id}`, updateTest)
            console.log("UPDATED", status)

            if (status === 200) {
                navigate(-1)
    
            }
            
         } catch(err) {
             console.log(err)
         }
        console.log("UPDATE!")
    }

    const getTestInfo = async () => {
        try{
           const { data } = await axios.get(`http://localhost:9000/api/test/${params.id}`)
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
            const { status } = await axios.delete(`http://localhost:9000/api/test/${params.id}`)
            console.log("DELETE", status)

            if (status === 200) {
                navigate(-1)
    
            }
            
         } catch(err) {
             console.log(err)
         }
    }
    
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getTestInfo()
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
                                        className={"ml-5"}
                                    >
                                        Update
                                    </Button>
                                    <Button 
                                        type={"button"}
                                        variant="danger"
                                        className={"ml-5"}
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
                            variant="danger"
                            className={"ml-5"}
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