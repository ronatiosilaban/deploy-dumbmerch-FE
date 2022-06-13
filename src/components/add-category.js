import NavbarComponent from "./component/admin-navbar"
import { Container, Form } from 'react-bootstrap';
import cssModules from './style/edit.module.css'
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import React, { useState, useEffect } from 'react'

import { API } from '../config/api';


function AddCategoryComponent() {
    const title = 'Add Category';
    document.title = 'DumbMerch | ' + title;

    let navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',

    });

    const { name } = form;

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

            const response = await API.post('/category', body, config);
            console.log(response.data.data);
            navigate('/category')
        } catch (error) {
            console.log(error);
        }
    });


    return (
        <div className={cssModules.display}>
            <div>
                <NavbarComponent />
            </div>
            <Container>
                <Form onSubmit={(e) => handleSubmit.mutate(e)} className={cssModules.form}>
                    <p className={cssModules.title}>Add Category</p>
                    <Form.Group className="mb-3">
                        <input type="text" placeholder="Name Category"
                            onChange={handleChange}
                            name="name"
                            // value={name}
                            className={cssModules.input} />
                    </Form.Group>
                    <button className={cssModules.button}>Save</button>
                </Form>
            </Container>
        </div>

    )

}

export default AddCategoryComponent