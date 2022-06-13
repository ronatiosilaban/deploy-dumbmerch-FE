import { useContext, useEffect } from 'react';
import { UserContext } from "../context/user";
import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from './component/DumbMerch.png';
import cssModules from "./style/form.module.css";
import { useNavigate } from "react-router-dom";

import { useMutation } from 'react-query';
import { API } from '../config/api';

function LoginComponent() {
    const title = 'Login';
    document.title = 'DumbMerch | ' + title;
    return (
        <div className={cssModules.body}>
            <Container>
                <Row className={cssModules.content} >
                    <Col>
                        <Row>
                            <img src={logo} className={cssModules.loginImage} alt="logo" />
                        </Row>
                        <Row>
                            <h1>Easy, Fast and Reliable</h1>
                        </Row>
                        <Row>
                            <p className={cssModules.paragraf}>Go shopping for merchandise, just go to dumb merch
                                shopping, the biggest in indonesia</p>
                        </Row>
                        <Row className={cssModules.rowbutton}>
                            <Button id="button" variant="danger" size="lg" className={cssModules.sidebutton}>
                                Login
                            </Button>{' '}
                            <Link to="/register">
                                <Button id="buttons" variant="default" size="lg" className={cssModules.sidebutton, cssModules.btnblack}>
                                    Register
                                </Button>
                            </Link>
                        </Row>
                    </Col>
                    <Col>
                        <Card className={cssModules.cardLogin}>
                            <Card.Body>
                                <FormLogin />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}


function FormLogin() {
    // const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    // useEffect(() => {
    //     console.log("App comp did mount");
    //     console.log(state);
    // }, [])

    const [form, setForm] = useState({
        email: '',
        password: '',
    });


    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const body = JSON.stringify(form);

            const response = await API.post('/login', body, config);
            console.log(response.data.data);
            // Handling response here
            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data.data
                })

                if (response.data.data.status === "admin") {
                    navigate('/product')
                } else {
                    navigate('/home')
                }

                const alert = (
                    <Alert variant="success" className="py-1">
                        Login Success
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    account not found
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });

    // navigate("/");

    return (
        <div >
            <p className={cssModules.title}>Login</p>
            {message && message}
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email"
                        className={cssModules.formInput}
                        id="email"
                        onChange={handleChange}
                        value={email}
                        name="email" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control type="password" placeholder="Password"
                        id="password"
                        onChange={handleChange}
                        name="password"
                        value={password}
                        className={cssModules.formInput} />
                </Form.Group>
                <Button variant="danger" type="submit" className={cssModules.buttonform}>
                    Login
                </Button>
            </Form>
        </div>
    );
}


export default LoginComponent