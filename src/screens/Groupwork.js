import React, {useState, useEffect} from 'react';
import { Row, Button, Container, Card, Col } from 'react-bootstrap';
import { LinkContainer, } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";


const Groupwork = () => {
    const params = useParams()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [pnumber, setPnumber] = useState(0)
    const [sdate, setSdate] = useState("")
    const [stime, setStime] = useState("")
    const [person, setPerson] = useState("")
    const [memo, setMemo] = useState("")

    const[groupworks, setGroupworks] = useState([]);
    

    console.log(groupworks)
    //call registered Groupwork

    const getGroupwork = async () => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const {data} = await axios.get("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/grwork/all", config)
            setGroupworks(data)
        } catch(err){
            console.log(err)
        }
    }

    // delete the Groupwork
    const removeGroupwork = async(id) => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { status } = await axios.delete(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/grwork/${id}`, config)
            console.log("GRWORK",status)
            if (status === 200){
                getGroupwork()
            }
        } catch (err) {
            console.log(err)
        }
    }


    //see a Details
    const getGroupworkInfo = async () => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
           const { data } = await axios.get(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/grwork/${params.id}`,config)
           console.log("*******GRWORKDATA*********", data)
           setName(data.name)
           setPnumber(data.pnumber)
           setSdate(data.sdate)
           setStime(data.stime)
           setPerson(data.person)
           setMemo(data.memo)
        } catch(e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getGroupwork()
        }
    }, [])

    return (
        <Container className={"pt-3"}>
            <h1>Groupwork</h1>
            <Row>
                <LinkContainer to={"/addgrwork"}>
                    <Button 
                    size="lg" 
                    variant={"primary block"} >
                        Add Groupwork
                    </Button>
                </LinkContainer>
                {groupworks && groupworks.map(groupwork => (
                    <Col className = {"mt-5"}>
                        <Card 
                        border="primary" 
                        style={{ width: '18rem' }}
                        >
                            <Card.Header>
                                <h5>
                                    {groupwork.name}
                                </h5>    
                            </Card.Header>
                            <Card.Body>
                            <Card.Title>
                                Practice Number: {groupwork.pnumber}
                            </Card.Title>
                            <Card.Text>
                                Dead Line: {groupwork.sdate}, {groupwork.stime}
                            </Card.Text>
                            <Card.Text>
                                related person: {groupwork.person}
                            </Card.Text>
                            <LinkContainer to={`/group/${groupwork._id}`}>
                                <Button 
                                    onClick={() => getGroupworkInfo()}
                                >
                                    Details
                                </Button>
                            </LinkContainer>
                            <Button
                                variant="danger"
                                className={"ml-5"}
                                onClick = {() => removeGroupwork(groupwork._id)}
                            >
                                Delete
                            </Button>
                            </Card.Body>
                        </Card>
                    </Col>  
                ))}
                    
                                             
               

        
            </Row>

        </Container>
    );
};

export default Groupwork;