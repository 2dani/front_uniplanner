import React, { useEffect, useState } from 'react';
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const Meeting = () => {
    const params = useParams();
    const navigate = useNavigate()
    //console.log("+++++++++++++++++++++++++++++++++++",params.id)
    const[title, setMeeting] = useState("")
    const[mDate, setEndDate] = useState("")
    const[sTime, setMeetingtime] = useState("")
    const[link, setMeetinglink] = useState("")
    const [meetings, setMeetings] = useState([])


    // networking
    const getMeetings = async () => {
        try {
           const {data} = await axios.get("http://localhost:9000/api/meeting/all")
            setMeetings(data)

        } catch (err) {
            console.log(err)
        }
    }

    const registerTodo = async () => {
        try{
            const newMeeting = {
                title,
                mDate,
                sTime,
                link,
            }
            console.log(newMeeting)

            const {data} = await axios.post("http://localhost:9000/api/meeting", newMeeting)
            console.log("$$$$$$$$$$$$$$$$$$", data)
        } catch(err) {
            console.log(err)
        }

    }

    // show datails Info of Meeting
    const getMeetingInfo = async () => {
        try{
           const { data } = await axios.get(`http://localhost:9000/api/meeting/${params.id}`)
           console.log("********MEETING INFO********", data)
           setMeeting(data.title)
           setEndDate(data.mDate)
           setMeetingtime(data.sTime)
           setMeetinglink(data.link)
        } catch(e) {
            console.log(e)
        }

    }

    //delete Meeting
    const removeMeeting = async(id) => {
        try{
            const { status } = await axios.delete(`http://localhost:9000/api/meeting/${id}`)
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",status)
            if (status === 200){
                getMeetings()
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getMeetings()
        }
    }, [])


    return (
        <Container>
            <Row>
            <Form className={"pt-5"} onSubmit={registerTodo}>
                    <Form.Group controlId={"title"} className={"mb-3"}>
                        <Form.Label>Meeting</Form.Label>
                        <Form.Control 
                            type={"text"}
                            placeholder={"Meeting"}
                            value={title}
                            onChange={e => setMeeting(e.target.value)}
                       />
                    </Form.Group>

                    <Form.Group contorllId={"mDate"} className={"mb-3"}>
                    <Form.Label>When</Form.Label>
                        <Form.Control 
                            type={"date"}
                            label={"Insert End Date"}
                            value={mDate}
                            onChange={e => setEndDate(e.target.value)}
                        
                        
                         />
                    </Form.Group>

                    <Form.Group contorllId={"sTime"} className={"mb-3"}>
                    <Form.Label>Start time</Form.Label>
                        <Form.Control 
                            type={"time"}
                            label={"Insert when your meeting beginn"}
                            value={sTime}
                            onChange={e => setMeetingtime(e.target.value)}
                         />
                    </Form.Group>

                    <Form.Group contorllId={"link"} className={"mb-3"}>
                    <Form.Label> Meeting Link </Form.Label>
                        <Form.Control 
                            type={"text"}
                            placeholder={"Insert the Link where your meeting start"}
                            value={link}
                            onChange={e => setMeetinglink(e.target.value)}
                         />
                    </Form.Group>

                    <Row className={"pt-5"}>
                        <Button 
                            type="submit"
                            cariant="primary"
                        >
                            Add Meeting
                        </Button>
                    </Row>
                </Form>
            </Row>
            <Row className={"mt-3"}>
                {meetings && meetings.map(meetings => (
                    <Card className={"mt-4"}>
                    <Card.Header>
                         Meeting Start: {meetings.mDate.slice(0,10)} / {meetings.sTime}
                    </Card.Header>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>
                          {meetings.title}
                        </p>
                        <footer className="blockquote-footer">
                          Meeting Link : {meetings.link}
                        </footer>
                      </blockquote>
                      <Row className={"pt-5"}>
                        <Button 
                            type="submit"
                            variant="danger"
                            onClick={() => removeMeeting(meetings._id)}
                        >
                            delete Meeting
                        </Button>
                    </Row>
                    </Card.Body>
                  </Card>
                ))}
                

            </Row>
        </Container>
    );
};

export default Meeting;