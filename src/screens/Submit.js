import React, {useState, useEffect} from 'react';
import { Row, Button, Container, Card, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';




const Submit = () => {
    const navigate = useNavigate() // hook returns a function that lets user navigate 
    
    const params = useParams() //returns an obj of value pairs of URL parameters.

    const [name, setName] = useState("")
    const [practiceNum, setPnumber] = useState(0)
    const [submitDate, setSdate] = useState("")
    const [submitTime, setStime] = useState("")
    const [memo, setMemo] = useState("")
    const [homeworks, setHomeworks] = useState([])

    const instance = axios.create({
        baseURL: 'http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api',
        
    })

    // display all registered Assignment
    const getHomeworks = async () => {
        try {
            const token = await localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` //Bearer tokens can make requests to verfy authorization using an access key, like JWT
                }
            }

            // get Method can get Data
           const {data} = await instance.get("/submit", config)
            setHomeworks(data)
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }

    const updateHomework = async (id) => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { status } = await instance.patch(`/submit/${id}`, config)
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",status)
            if (status === 200){
                getHomeworks()
            }
        } catch (err) {
            console.log(err)
        }
    }

    // user can remove their Assignment
    const removeHomework = async(id) => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            // only selected Assignment has to deleted, so here needed ${id} from registered homework
            const { status } = await instance.delete(`/submit/${id}`, config)
    
            if (status === 200){
                getHomeworks()
            }
        } catch (err) {
            console.log(err)
        }
    }

    //see a Details
    const getSubmitDetail = async () => {
        
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }   
            const { data } = await instance.get(`/addhw/${params.id}`, config)
            console.log("*******getSubmitDetail*********", data)
            setName(data.name)
            setPnumber(data.practiceNum)
            setSdate(data.submitDate)
            setStime(data.submitTime)
            setMemo(data.memo)
        } catch(e) {
            console.log(e)
        }

    }

    
    useEffect(() => {
        // User can use the application, when user is successfully authorized       
        //when there is no token in localStorage, user can not leave Login page
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getHomeworks() // when user can log in, runs getHomeworks()
        }
    }, [])



    return (
        <Container className={"pt-3"}>
            <h1>Assignment</h1>
            <Row>
                <LinkContainer to={"/addhw"} >
                    <Button 
                    size="lg" 
                    variant={"primary block"} >
                        Add new Assignment
                    </Button>
                </LinkContainer>
                
                {homeworks && homeworks.map(homework => (
                    <Col className = {"mt-5"}>
                        <Card 
                        border="primary" style={{ width: '18rem' }}                      
                        >
                            <Card.Header>
                                <h5>
                                    {homework.name} / {homework.practiceNum}
                                </h5>    
                            </Card.Header>
                            <Card.Body>
                            <Card.Title>Dead Line: {homework.submitDate}</Card.Title>
                            <Card.Text>
                                Submit Time: {homework.submitTime}
                            </Card.Text>
                            <LinkContainer to={`/addhw/${homework._id}`}>
                                <Button>
                                    Details
                                </Button>
                            </LinkContainer>
                            <Button
                                variant="danger"
                                className={"ml-5"}
                                onClick = {() => removeHomework(homework._id)}
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




export default Submit;