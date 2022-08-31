import React, { useEffect, useState } from 'react';
import { Container, Table} from 'react-bootstrap';
import Holidays from 'date-holidays'; // use a Library
import { useNavigate } from 'react-router-dom';


const Vacation = () => {
    const navigate = useNavigate()
    const hd = new Holidays("DE"); // I want get Holidays from Germany
    const hday = hd.getHolidays()
    const [holidays, setHolidays] = useState([])

    useEffect(() => {
        // User can use the application, when user is successfully authorized       
        //when there is no token in localStorage, user can not leave Login page
        if (!localStorage.getItem("token")) {
            navigate('/login')
        } else {
            setHolidays(hday) // when user can log in, runs setHolidays(hday)
            console.log(holidays)
        }    
    }, [])


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