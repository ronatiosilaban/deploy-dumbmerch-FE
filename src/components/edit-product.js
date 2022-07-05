import NavbarComponent from "./component/admin-navbar"
import { Container, Button } from 'react-bootstrap';
import cssModules from './style/edit.module.css'
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';

import CheckBox from '../components/component/form/checkbox';
import { API } from '../config/api'






function EditComponent() {
    const title = 'Edit Product';
    document.title = 'DumbMerch | ' + title;

    let navigate = useNavigate();
    const { id } = useParams();
    console.log('cek id', id);
    const [categories, setCategories] = useState([]); //Store all category data
    const [categoryId, setCategoryId] = useState([]); //Save the selected category id
    const [preview, setPreview] = useState(null); //For image preview
    const [product, setProduct] = useState({}); //Store product data

    const [form, setForm] = useState({
        image: '',
        title: '',
        desc: '',
        price: '',
        qty: '',
    });

    let { data: products, refetch } = useQuery('productCache', async () => {
        const response = await API.get('/product/' + id);
        return response.data.data;
    });

    let { data: categoriesData, refetch: refetchCategories } = useQuery(
        'categoriesCache',
        async () => {
            const response = await API.get('/categories');
            return response.data.data;
        }
    )

    useEffect(() => {
        if (products) {
            setPreview(products.image);
            setForm({
                ...form,
                title: products.title,
                desc: products.desc,
                price: products.price,
                qty: products.qty,
            });
            setProduct(products);
        }

        if (categoriesData) {
            setCategories(categoriesData);
        }
    }, [products]);


    const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;

        if (checked == true) {
            setCategoryId([...categoryId, parseInt(id)]);
        } else {
            let newCategoryId = categoryId.filter((categoryIdItem) => {
                return categoryIdItem != id;
            });
            setCategoryId(newCategoryId);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
        });
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };


    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
            const formData = new FormData();
            if (form.image) {
                formData.set('image', form?.image[0], form?.image[0]?.name);
            }
            formData.set('title', form.title);
            formData.set('desc', form.desc);
            formData.set('price', form.price);
            formData.set('qty', form.qty);
            formData.set('categoryId', categoryId);

            // Insert product data
            const response = await API.patch(
                '/product/' + product.id,
                formData,
                config
            );
            console.log(response.data);

            navigate('/product');
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        const newCategoryId = product?.categories?.map((item) => {
            return item.id;
        });

        setCategoryId(newCategoryId);
    }, [product]);
    return (

        <div className={cssModules.displaysa} style={{ width: '100%', height: '100%', paddingBottom: 100 }}>
            <div>
                <NavbarComponent />
            </div>
            <Container>
                <form onSubmit={(e) => handleSubmit.mutate(e)} className={cssModules.form} >
                    <h1>Add Product</h1><br />
                    {preview && (
                        <div>
                            <img
                                src={preview}
                                style={{
                                    maxWidth: '150px',
                                    maxHeight: '150px',
                                    objectFit: 'cover',
                                }}
                                alt="preview"
                            />
                        </div>
                    )}
                    <input
                        type="file"
                        id="upload"
                        name="image"
                        onChange={handleChange}
                        hidden
                        className={cssModules}

                    />
                    <label for="upload" className={cssModules.file}>
                        Upload file
                    </label>
                    <form>
                        <input type="text"
                            placeholder="Name Product"
                            name="title"
                            value={form?.title}
                            onChange={handleChange}
                            className={cssModules.input} />
                    </form>
                    <form>
                        <textarea rows={5} placeholder="Deskription"
                            name="desc"
                            value={form?.desc}
                            onChange={handleChange}
                            className={cssModules.deskription} />
                    </form>
                    <form className="mb-3">
                        <input type="text" placeholder="Price"
                            name="price"
                            value={form?.price}
                            onChange={handleChange}
                            className={cssModules.input} />
                    </form>
                    <form>
                        <input type="number" placeholder="Qty"
                            name="qty"
                            value={form?.qty}
                            onChange={handleChange}
                            className={cssModules.input} />
                    </form>
                    <div className="card-form-input mt-4 px-2 py-1 pb-2">
                        <div
                            className="text-secondary mb-1"
                            style={{ fontSize: '15px' }}
                        >
                            Category
                        </div>
                        {product &&
                            categories?.map((item, index) => (
                                <label key={index} className="checkbox-inline me-4">
                                    <CheckBox
                                        categoryId={categoryId}
                                        value={item?.id}
                                        handleChangeCategoryId={handleChangeCategoryId}
                                    />
                                    <span className="ms-2">{item?.name}</span>
                                </label>
                            ))}
                    </div>
                    <button className={cssModules.button}>Save</button>
                </form>
            </Container>
        </div>

    )

}

export default EditComponent