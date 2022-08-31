import React, { useEffect, useState } from 'react';
import {  Container, Row, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate() // hook returns a function that lets user navigate 

    const[todo, setTodo] = useState("")
    const[endDate, setEndDate] = useState("")
    const [todos, setTodos] = useState([])

    const instance = axios.create({
        baseURL: 'http://uniplannerbackend-env.eba-2mpxvpuu.us-east-1.elasticbeanstalk.com/api'
    })

    // networking
    const getTodos = async () => {
        try {
            const token = localStorage.getItem("token") //when passed name of the key, will return that key's value from the given Storage obj , or null when the key does not exist
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`//Bearer tokens can make requests to verfy authorization using an access key, like JWT
                }
            }
            // user can expect to get back data to display in users application
            const {data} = await instance.get("/todo", config)
            setTodos(data)

        } catch (err) {
            console.log(err)
        }
    }

    const registerTodo = async (e) => {
        e.preventDefault()
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const newTodo = {
                todo,
                endDate,
            }
            // when user register new Todo, post Method send data to web address
            const {data} = await instance.post("/todo", newTodo, config)
    
            window.location.reload(false)
        } catch(err) {
            console.log(err)
        }
    }

    //update Todo 
    const updateTodo  = async (id, finish) => {
        try {
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const updateData = {
                finish: !finish
            }
            const {status} = await instance.put(`/todo/${id}`, updateData, config)
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!", status)
            if (status === 200) {
                getTodos()
            }
        } catch(err) {
            console.log(err)
        }
    }

    const removeTodo = async (id) => {
        try{
            const token = await localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            //user can delete the registered Todo through delete Method
            const { status } = await instance.delete(`/todo/${id}`, config)
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",status)
            if (status === 200) {
                console.log("dddddd")
                getTodos()
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
            getTodos() // when user can log in, runs getTodos()
        }
    }, [])

    return (
        <Container>
            <Row>
            <Form className={"pt-5"} onSubmit={registerTodo}>
                    <Form.Group controlId={"todo"} className={"mb-3"}>
                        <Form.Label>Todo</Form.Label>
                        <Form.Control 
                            type={"text"}
                            placeholder={"Todo"}
                            value={todo}
                            onChange={e => setTodo(e.target.value)}
                       />
                    </Form.Group>

                    <Form.Group contorlId={"endDate"} className={"mb-3"}>
                    <Form.Label>until</Form.Label>
                        <Form.Control 
                            type={"date"}
                            label={"Insert End Date"}
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}                    
                         />
                    </Form.Group>
    
                    <Row className={"pt-2 mb-5"}>
                        <Button type="submit" cariant="primary">
                            Add Todo
                        </Button>
                    </Row>
                </Form>
            </Row>
            <h1> Todo List </h1>
            <Row className={"mt-3 mb-5"}>
                {todos && todos.filter(a => a.finish === false).map(todo => (
                        <Card className={"mt-4"}>
                        <Card.Header>
                            End Date: {todo.endDate.slice(0,10)} / {todo.finish ? "completed" : "not complete"}
                        </Card.Header>
                        <Card.Body>
                        <blockquote className="blockquote mb-0">
                            <p>
                            {todo.todo}
                            
                            </p>
                            <footer className="blockquote-footer">
                                Created Date: {todo.createdAt.slice(0,10)} 
                            
                            </footer>
                        </blockquote>
                        <Button 
                            className={"mt-4 mr-5"}
                            variant="primary"
                            onClick={() => updateTodo(todo._id, todo.finish)}
                            >
                                complete
                        </Button>
                        <Button 
                            className={"mt-4"}
                            variant="danger"
                            onClick = {() => removeTodo(todo._id)}
                            >
                                delete
                        </Button>
                        </Card.Body>
                    </Card>
                    ))}
                
            </Row>

            <h1>
                Done List
            </h1>

            <Row className={"mt-3 mb-3"}>
                {todos && todos.filter(a => a.finish === true).map(todo => (
                    <Card className={"mt-4"}>
                    <Card.Header>
                         Created Date: {todo.createdAt.slice(0,10)} / {todo.finish ? "completed" : "not yet"}
                    </Card.Header>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>
                          {todo.todo}
                          
                        </p>
                        <footer className="blockquote-footer" >
                        
                          End Date: {todo.endDate.slice(0,10)}
                        </footer>
                      </blockquote>
                      <Button 
                            className={"mt-4 mr-5"}
                            variant="primary"
                            onClick={() => updateTodo(todo._id, todo.finish)}
                            >
                                not complete
                        </Button>
                        <Button 
                            className={"mt-4"}
                            variant="danger"
                            onClick = {() => removeTodo(todo._id)}
                            >
                                delete
                        </Button>
                    </Card.Body>
                  </Card>
                ))}
            </Row>
        </Container>
    );
};

export default Main;