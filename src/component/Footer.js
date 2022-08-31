import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

// This component is for Copyright.

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright. &copy; 2022. DaeunLee. All rights reserved. </Col>
                </Row>
            </Container>
            
        </footer>
    );
};


export default Footer;