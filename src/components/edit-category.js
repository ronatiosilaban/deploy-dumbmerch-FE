import NavbarComponent from "./component/admin-navbar"
import { Container, Form, Button } from 'react-bootstrap';
import cssModules from './style/edit.module.css'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';


import { API } from '../config/api';


function EditCategoryComponent() {
    const title = 'Edit Category';
    document.title = 'DumbMerch | ' + title;

    // let navigate = useNavigate();
    // const { id } = useParams();

    // // const [categories, setCategories] = useState([]);

    // const [form, setForm] = useState({
    //     name: '',

    // });

    // let { data: category, refetch } = useQuery('categoriesCache', async () => {
    //     const response = await API.get('/category/' + id);
    //     return response.data.data;
    // });


    // useEffect(() => {
    //     setForm({
    //         // ...form,
    //         name: category.name,

    //     });

    //     // setCategories(categories);
    // }, [category]);

    // const handleChange = (e) => {
    //     setForm({
    //         ...form,
    //         // name: category.name
    //         name: e.target.value,
    //     });
    // };

    // const handleSubmit = useMutation(async (e) => {
    //     try {
    //         e.preventDefault();
    //         const config = {
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //         };

    //         const body = JSON.stringify(form);
    //         // const formData = new FormData();

    //         // formData.set('name', form.name);

    //         const response = await API.patch(
    //             '/category/' + category.id,
    //             // { name: form.name },
    //             body,
    //             config
    //         )
    //         console.log(response.data.data);
    //         // if (response?.status === 200)
    //         //     navigate('/category');
    //         // else
    //         //     alert(response?.message)
    //         // console.log(formData);

    //         navigate('/category');

    //     } catch (error) {
    //         console.log(error);
    //     }
    // });
    // console.log('form', form);

    let navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState({ name: '' });

    useQuery('categoryCache', async () => {
        const response = await API.get('/category/' + id);
        setCategory({ name: response.data.data.name });
    });

    const handleChange = (e) => {
        setCategory({
            ...category,
            name: e.target.value,
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

            const body = JSON.stringify(category);

            const response = await API.patch('/category/' + id, body, config);

            navigate('/category');
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className={cssModules.displays}>
            <div>
                <NavbarComponent />
            </div>
            <Container>
                <Form onSubmit={(e) => handleSubmit.mutate(e)} className={cssModules.form}>
                    <p className={cssModules.title}>Add Category</p>

                    <input
                        onChange={handleChange}
                        name='name'
                        value={category.name}
                        placeholder="category"
                        className={cssModules.input}
                    />
                    <div className="d-grid gap-2 mt-4">
                        <Button type="submit" variant="success" size="md" className={cssModules.button}>
                            Save
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>

    )

}

export default EditCategoryComponent