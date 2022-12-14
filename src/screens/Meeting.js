import React, { useEffect, useState } from 'react';
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const Meeting = () => {
    const params = useParams(); //returns an obj of value pairs of URL parameters.
    const navigate = useNavigate() // hook returns a function that lets user navigate 
    const[title, setMeeting] = useState("")
    const[mDate, setEndDate] = useState("")
    const[sTime, setMeetingtime] = useState("")
    const[link, setMeetinglink] = useState("")
    const [meetings, setMeetings] = useState([])


    // networking
    const getMeetings = async () => {
        try {
            const token = await localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            // user can expect to get back all data to display in users application
           const {data} = await axios.get("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/meeting/all", config)
           setMeetings(data)

        } catch (err) {
            console.log(err)
        }
    }

    //User can register Todo
    const registerTodo = async (e) => {
        e.preventDefault()
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const newMeeting = {
                title,
                mDate,
                sTime,
                link,
            }
            console.log("NEW MEETING",newMeeting)
            // with Post Method User can register data to a web adress
            const {data} = await axios.post("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/meeting", newMeeting, config)

            window.location.reload(false)
        } catch(err) {
            console.log(err)
        }

    }

    // show datails Info of Meeting 
    // But this is not used
    const getMeetingInfo = async () => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
           const { data } = await axios.get(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/meeting/${params.id}`, config)
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
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            //User can delete the registered Meeting Info through delete Method
            const { status } = await axios.delete(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/meeting/${id}`, config)
            if (status === 200){
                // when the Meeting deleted, runs getMeetings() and show the Meeting Page rest Meetings
                getMeetings()
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // User can use the application, when user is successfully authorized       
        //when there is no token in localStorage, user can not leave Login page
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {         
            getMeetings() // when user can log in, runs getMeetings()
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

                    <Form.Group contorlId={"mDate"} className={"mb-3"}>
                    <Form.Label>When</Form.Label>
                        <Form.Control 
                            type={"date"}
                            label={"Insert End Date"}
                            value={mDate}
                            onChange={e => setEndDate(e.target.value)}
                        
                        
                         />
                    </Form.Group>

                    <Form.Group contorlId={"sTime"} className={"mb-3"}>
                    <Form.Label>Start time</Form.Label>
                        <Form.Control 
                            type={"time"}
                            label={"Insert when your meeting beginn"}
                            value={sTime}
                            onChange={e => setMeetingtime(e.target.value)}
                         />
                    </Form.Group>

                    <Form.Group contorlId={"link"} className={"mb-3"}>
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
                {meetings && meetings.map(meeting => (
                    <Card key={meeting._id} className={"mt-4"}>
                    <Card.Header>
                         Meeting Start: {meeting.mDate.slice(0,10)} / {meeting.sTime}
                    </Card.Header>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>
                          {meeting.title}
                        </p>
                        <footer className="blockquote-footer">
                          Meeting Link : {meeting.link}
                        </footer>
                      </blockquote>
                      <Row className={"pt-5"}>
                        <Button 
                            type="submit"
                            variant="danger"
                            onClick={() => removeMeeting(meeting._id)}
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