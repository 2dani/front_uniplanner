import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Row, Button, Form, Container, } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AddGr = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [pnumber, setPnumber] = useState(0)
    const [sdate, setSdate] = useState("")
    const [stime, setStime] = useState("")
    const [person, setPerson] = useState("")
    const [memo, setMemo] = useState("")

    const instance = axios.create({
        baseURL: 'http://localhost:9000/api'
    })

    const addGRHandler = async (e) => {
        e.preventDefault();
        console.log("JKJKJKJKJKJKJKJKJKJKJKJ")

        try {
                const newGroupwork = {
                    name: name,
                    pnumber: pnumber,
                    sdate: sdate, 
                    stime: stime,
                    person: person,
                    memo: memo,
                }
                console.log("-------------------", newGroupwork)
                
                const {data, status} = await axios.post(`http://localhost:9000/api/grwork/add`, newGroupwork)
                console.log("DATAIS",data)
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!",status)
                
                if (status === 200){
                    navigate(-1)
                }
                console.log("************************",data) 
        } catch (err) {
            console.log(err) 
        }
    }

    const getGroupworkInfo = async () => {
        try{
           const { data } = await instance.get(`/grwork/${params.id}`)
           console.log("****************", data)
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

    const updateGrHandler = async(e) => {
        e.preventDefault()

        const updateGr = {
            name: name,
            pnumber: pnumber,
            sdate: sdate, 
            stime: stime,
            person: person,
            memo: memo,
        }
        try{
            const { status } = await axios.put(`http://localhost:9000/api/grwork/${params.id}`, updateGr)
            console.log("GR IS UPDATED", status)

            if (status === 200) {
                navigate(-1)    
            }
            
         } catch(err) {
             console.log(err)
         }
        console.log("NOW UPDATED!")
    }

    useEffect(() => {
        
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getGroupworkInfo()
        }
    }, [])

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