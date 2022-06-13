import { Button, Container, Form, Row, Col, Card, Alert } from "react-bootstrap";
import logo from './component/DumbMerch.png';
import React, { useContext, useState } from 'react';
import cssModules from "./style/form.module.css";
import { Link } from "react-router-dom";
import { UserContext } from '../context/user';
import { useNavigate } from 'react-router';

import { useMutation } from 'react-query';
import { API } from '../config/api';

function RegisterComponent() {
    const title = 'Register';
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
                            <Link to="/login">
                                <Button id="buttons" variant="default" size="lg" className={cssModules.sidebutton, cssModules.btnblack}>
                                    Login
                                </Button>
                            </Link>
                            <Button id="button" variant="danger" size="lg" className={cssModules.sidebutton}>
                                Register
                            </Button>{' '}
                        </Row>
                    </Col>
                    <Col>
                        <Card className={cssModules.cardLogin}>
                            <Card.Body>
                                <FormRegister />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}


function FormRegister() {
    const [state, dispatch] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    let navigate = useNavigate();


    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = form;

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

            const response = await API.post('/register', body, config);
            console.log(response.data.data);
            navigate('/login')
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    });

    return (

        <div >
            <p className={cssModules.title}>Register</p>
            {message && message}
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Name"
                        className={cssModules.formInput}
                        id="username"
                        onChange={handleChange}
                        value={username}
                        name="username" />
                </Form.Group>

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
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className={cssModules.formInput} />
                </Form.Group>
                <Button variant="danger" type="submit" className={cssModules.buttonform}>
                    Register
                </Button>
            </Form>
        </div >
    )
}


export default RegisterComponent