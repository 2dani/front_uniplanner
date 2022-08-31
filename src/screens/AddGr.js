import axios from 'axios'; //for request to own backend Node.js server
import React, {useState, useEffect} from 'react';
import { Row, Button, Form, Container, } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddGr = () => {
    const params = useParams(); //returns an obj of value pairs of URL parameters.
    const navigate = useNavigate(); // hook returns a function that lets user navigate 

    const [name, setName] = useState("")
    const [pnumber, setPnumber] = useState(0)
    const [sdate, setSdate] = useState("")
    const [stime, setStime] = useState("")
    const [person, setPerson] = useState("")
    const [memo, setMemo] = useState("")

    const instance = axios.create({
        // you can use instance baseURL instead of axios with full URL
        baseURL: 'http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api'
    })

    // register new Groupwork 
    const addGRHandler = async (e) => {
        e.preventDefault(); // Default action that belongs to the event will not happen

        try {
            const token = await localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` //Bearer tokens can make requests to verfy authorization using an access key, like JWT
                }
            }
                const newGroupwork = {
                    name: name,
                    pnumber: pnumber,
                    sdate: sdate, 
                    stime: stime,
                    person: person,
                    memo: memo,
                }
                console.log("-------------------", newGroupwork)
                
                // when user registered new Groupwork, post Method send data to web adress
                const {data, status} = await axios.post(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/grwork/add`, newGroupwork, config)
                
                
                if (status === 200){
                    navigate(-1)
                    //when the new Groupwork sucessfully added, than automatically go back to Groupwork Page.
                }
                console.log("************************",data) 
        } catch (err) {
            console.log(err) 
        }
    }

    // User can see the Details from registered Groupwork
    const getGroupworkInfo = async () => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            // get Method, but use ${params.id} behind /grwork/, so you can get the id (groupwork) from URL.
           const { data } = await instance.get(`/grwork/${params.id}`, config) 
           //console.log("****************", data)
           setName(data.name)
           setPnumber(data.pnumber)
           setSdate(data.sdate)
           setStime(data.stime)
           setPerson(data.person)
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
            getGroupworkInfo() // when user can log in, runs get getGroupworkInfo()
        }
    }, [])

    // following Code is Style Code for my Application
    return (
        <Container className={"pt-5"}>
            <Link to="/grwork" className="btn btn-secondary my-3 mb-3">
                Go Back
            </Link>
            <h3> {params.id ? "See a Details" : "Add a Groupwork"}</h3>
                <Form className={"pt-5"} onSubmit={params.id ? getGroupworkInfo : addGRHandler}>
                    <Form.Group controlId={"name"} className={"mb-3"}>
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control 
                            type={"name"}
                            placeholder={"Insert subject name"}
                            value={name}
                            onChange={e => setName(e.target.value)}
                       />
                    </Form.Group>
                    <Form.Group controlId={"number"} className={"mb-3"}>
                        <Form.Label>Practice Number</Form.Label>
                        <Form.Control 
                            type={"number"}
                            placeholder={"Insert Practice numver"}
                            value={pnumber}
                            onChange={e => setPnumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId={"date"} className={"mb-3"}>
                        <Form.Label>Submit date</Form.Label>
                        <Form.Control 
                            type={"date"}
                            placeholder={"Insert Submit date"}
                            value={sdate}
                            onChange={e => setSdate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId={"time"} className={"mb-3"}>
                        <Form.Label>Submit time</Form.Label>
                        <Form.Control 
                            type={"time"}
                            placeholder={"Insert Submit time"} 
                            value={stime}
                            onChange={e => setStime(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId={"person"} className={"mb-3"}>
                        <Form.Label>related Person</Form.Label>
                        <Form.Control 
                            type={"person"}
                            placeholder={"Insert related person"} 
                            value={person}
                            onChange={e => setPerson(e.target.value)}
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
                        variant="primary"
                    >
                            Register Groupwork
                        </Button>
                    </Row>
                
                </Form>
            
        </Container>
    );
};

export default AddGr;