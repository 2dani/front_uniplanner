import React , { useEffect, useState } from 'react';
import { Row, Button, Container, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import CountDownTimer from '../hooks/CountDownTimer.js';
import "./datetime.css";
import { useNavigate } from 'react-router-dom';


const Testdday = () => {
    const navigate = useNavigate()
    const [testddays, setddayss] = useState([])

    const getTest = async () => {
        try {
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
           const {data} = await axios.get("http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/test/all", config)
            setddayss(data)
            console.log(data)

        } catch (err) {
            console.log(err)
        }
    }

 /*   const updateTest = async (id) => {
        try{
            const { status } = await axios.patch(`http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api/test/${id}`)
            console.log("===================================",status)
            if (status === 200){
                getTest()
            }
        } catch (err) {
            console.log(err)
        } 
    } 
*/

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            getTest()
        }
    }, [])


    



    return (
        <Container className={"pt-3"}>
            <h1>Exam day counter</h1>
            <Row>
              
                <LinkContainer to={"/adddday"}>
                    <Button 
                    size="lg" 
                    variant={"primary block"} >
                        Add an Exam
                    </Button>
                </LinkContainer>
                
            </Row>
            <div >
                <Table size="m" className={"mt-3"}>         
                        <thead>
                            <tr>
                            <th></th>
                            <th>Subject</th>
                            <th>Exam date</th>
                            <th>Start time</th>
                            
                            <th>Exam day counter</th>
                            </tr>
                        </thead>
                    
                    {testddays.map(tdday => (
                        <LinkContainer to={`/test/${tdday._id}`}>
                            <tbody>
                                <tr>
                                <td></td>
                                <td>{tdday.testName}</td>
                                <td>{tdday.testDate}</td>
                                <td>{tdday.timeStart}</td>
                                
                                <td> 
                                    <CountDownTimer targetDate={new Date(tdday.testDate)} />
                                </td>
                                </tr>
                                
                            </tbody>                   
                        </LinkContainer>
                        
                    ))}
                    </Table>

            </div>
            

        </Container>
    );
};

export default Testdday;