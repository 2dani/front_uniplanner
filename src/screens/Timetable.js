import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Row, Col} from "react-bootstrap";
import RTimeTable from "react-timetable-events";
import { useParams, useNavigate, } from 'react-router-dom';
import format from 'date-fns/format';
import { CustomModal } from "../component"



const TimeTable = () => {
    const navigate = useNavigate() // hook returns a function that lets user navigate 

    const [day, setDay] = useState(0)
    const [subject, setSubject ] = useState("")
    const [location, setLocation] = useState("")
    const [stime, setStime] = useState("")
    const [etime, setEtime] = useState("")
    const [type, setType] = useState("custom")
    const params = useParams() //returns an obj of value pairs of URL parameters.


    const[tableId, setTableId] = useState("")

    const [monday, setMonday] = useState([])
    const [tuesday, setTuesday] = useState([])
    const [wednesday, setWednesday] = useState([])
    const [thursday, setThursday] = useState([])
    const [friday, setFriday] = useState([])

    const [show, setShow] = useState(false);

    //handle CLose when user want close lecutre Info from timetable
    const handleClose = () => {
        setShow(false);
        getTimetables()
    }
    const handleShow = (id, name, location, startTime, endTime) => {
        setTableId(id)
        setSubject(name)
        setLocation(location)
        setStime(startTime)
        setEtime(endTime)
        setShow(true)
    };

    //show the registered from user Lectures on the timetable
    const getTimetables = async () => {
        try {
            const token = await localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            // display all registered Lecture Info on the timetable
            const {data} = await axios.get("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/timetable/all", config)

            console.log(data.filter(i => i.day === 1 ))

            // Using map, selected Day transfered in number and saved
            data.map(i => (
                
                i.startTime = new Date(i.startTime),
                i.endTime = new Date(i.endTime),
                console.log("///////////////////////",i.location),

                setMonday(data.filter(i => i.day === 1)),
                setTuesday(data.filter(i => i.day === 2)),
                setWednesday(data.filter(i => i.day === 3)),
                setThursday(data.filter(i => i.day === 4)),
                setFriday(data.filter(i => i.day === 5))
                
            ))
                     
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect( ()=> {
        // User can use the application, when user is successfully authorized       
        //when there is no token in localStorage, user can not leave Login page
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getTimetables() // when user can log in, runs getTestInfo()
        }
    }, [])

    const renderEvent = ({ event, defaultAttributes }) => {
        return (
            <Container
                {...defaultAttributes}
                title={event.subject}
                key={event._id}
                onClick={() => handleShow(event._id, event.name, event.location, event.startTime, event.endTime)}
                //className={{textAlign: 'center'}}
            >
                {console.log("DASDASDADASD**********",event._id)}
                <span>{event.name}</span>
                <span>{event.location}</span>
                <span>
                    {format(event.startTime, "HH:mm")} -{" "}{format(event?.endTime, "HH:mm")}
                </span>

                
                
            </Container>
        );
    }


    // User can add a new Lecture on the timetable
    const addHandler = async (e) => {
        e.preventDefault()

        try {
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const newTimeTable = {
                name: subject,
                location,
                startTime: stime,
                endTime: etime,
                day,
                type
            }
            
            //register new Lecture on the timetable with post Methode
            const {status} = await axios.post("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/timetable", newTimeTable, config)

            if (status === 200) {
                //when it's successfully added, then runs getTimetables() and  display the Timetables
                getTimetables()
            }

        } catch (err) {
            console.log(err)
        }
        
    }

    const deleteTimetables = async (id) => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            // User can delete the Lecture from timetable
            const { status } = await axios.delete(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/timetable/${id}`, config)
            
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!DELETE!!!!!!!!!!!!!!!!!!!!!!!", status)

            if (status === 200) {
                window.location.reload(false)
                handleClose()
                
            }
            
         } catch(err) {
             console.log(err)
         }
    }


    return (
        <Container className={"py-5"}>
            <h3>Add Lecture</h3>
            
            <Form onSubmit={addHandler} >

                <Form.Group cotrolId={"name"} className={"mt-5"}>
                    <Form.Label>Subject Name</Form.Label>
                    <Form.Control
                        type={"name"}
                        placeholder={"Insert Subject Name"}
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                    />

                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type={"location"}
                        placeholder={"Insert where the lecture start"}
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />

                </Form.Group>

                

                <Row className={"mt-4"}>

                    <Col md={4}>

                        <Form.Group controlId="formBasicSelect">
                            <Form.Label>Select Day of the week</Form.Label>
                        {/*<Dropdown>*/}
                        {/*    <Dropdown.Toggle variant="light" id="dropdown-basic">*/}
                        {/*        Select Day of the week*/}
                        {/*    </Dropdown.Toggle>*/}

                        {/*    <Dropdown.Menu>*/}
                        {/*        <Dropdown.Item href="#/action-1">Monday</Dropdown.Item>*/}
                        {/*        <Dropdown.Item href="#/action-2">Tuesday</Dropdown.Item>*/}
                        {/*        <Dropdown.Item href="#/action-3">Wedsday</Dropdown.Item>*/}
                        {/*        <Dropdown.Item href="#/action-2">Tuesday</Dropdown.Item>*/}
                        {/*        <Dropdown.Item href="#/action-3">Wedsday</Dropdown.Item>*/}
                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                            <Form.Control
                                aria-label="Default select example" as="select"
                                value={day}
                                onChange={e => setDay(e.target.value)}
                            >
                                <option>Select Day of the week</option>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wedsday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group cotrolId={"date"} className={"mb-3"}>
                            <Form.Label>StartTime</Form.Label>
                            <Form.Control
                                type={"time"}
                                placeholder={"Insert Submit Date"}
                                value={stime}
                                onChange={e => setStime(e.target.value)}
                
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group cotrolId={"date"} className={"mb-3"}>
                            <Form.Label>EndTime</Form.Label>
                            <Form.Control
                                type={"time"}
                                placeholder={"Insert Submit Time"}
                                value={etime}
                                onChange={e => setEtime(e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                </Row >

                <Row className={"pt-4"}>
                    <Button type="submit" variant="primary">
                        Add Lecture
                    </Button>
                </Row>

            </Form>
            

            <div className={"pt-4"} id="dp">
            <RTimeTable
                events={{
                    monday,
                    tuesday,
                    wednesday,
                    thursday,
                    friday,
                }}

                renderEvent={renderEvent}
                style={{ height: '500px' }}
                
            />           
            </div>


            <CustomModal
                show={show} 
                handleClose={handleClose}
                deleteBtn={() => deleteTimetables(tableId)}
                name={subject}
                location={location}
                startTime={stime}
                endTime={etime}
            />

        </Container>
    );
};

export default TimeTable;

