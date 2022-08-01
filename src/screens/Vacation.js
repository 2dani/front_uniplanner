import React, { useEffect, useState } from 'react';
import {Col, Container, Row, Table} from 'react-bootstrap';
import Holidays from 'date-holidays';
import { useNavigate } from 'react-router-dom';


//
// console.log(holiday)
// console.log(holiday.map(name => <h2>{name}</h2>))
// console.log(holiday.map(rule => <h2>{rule}</h2>))


const Vacation = () => {

    const navigate = useNavigate()

    const hd = new Holidays("DE");
    const hday = hd.getHolidays()

    const [holidays, setHolidays] = useState([])

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            setHolidays(hday)
            console.log(holidays)
        }    
    }, [])


    // holiday.map(name => <h2>{name}</h2>)

    return (
        <Container className={"pt-3"}>
            <Table size="sm">
                <div style={{width: '80%', }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Type</th>

                        </tr>
                    </thead>
                    <tbody>
                    {holidays.map((holiday, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{holiday.date.slice(0, 10)}</td>
                            <td>{holiday.name}</td>
                            <td>{holiday.type}</td>

                        </tr>
                    ))}
                    </tbody>
                </div>
            </Table>

        </Container>
    );
};

export default Vacation;