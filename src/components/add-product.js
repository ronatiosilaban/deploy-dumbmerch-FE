import NavbarComponent from "./component/admin-navbar"
import { Container } from 'react-bootstrap';
import cssModules from './style/edit.module.css'
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import React, { useState, useEffect } from 'react'



import { API } from '../config/api';

function AddProductComponent() {
    const title = 'Add Product';
    document.title = 'DumbMerch | ' + title;


    let navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        image: '',
        price: '',
        desc: '',
        title: '',
        qty: '',
    });

    const getCategories = async () => {
        try {
            const response = await API.get('/categories');
            setCategories(response.data.data);
        } catch (error) {
            return console.log(error);
        }
    };

    const handleChangeCategoryId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;

        if (checked) {
            setCategoryId([...categoryId, parseInt(id)]);
        } else {
            let newCategoryId = categoryId.filter((categoryIdItem) => {
                return categoryIdItem !== id;
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

            const formData = new FormData()
            formData.set('image', form.image[0], form.image[0].name)
            formData.set('title', form.title)
            formData.set('desc', form.desc)
            formData.set('price', form.price)
            formData.set('qty', form.qty)
            formData.set('categoryId', categoryId)

            const response = await API.post('/products', formData, config);
            console.log(response.data.data);
            navigate('/product')
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        getCategories();
    }, []);


    return (
        <div className={cssModules.displaysa}>
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
                            onChange={handleChange}
                            className={cssModules.input} />
                    </form>
                    <form>
                        <textarea rows={5} placeholder="Deskription"
                            name="desc"
                            onChange={handleChange}
                            className={cssModules.deskription} />
                    </form>
                    <form className="mb-3">
                        <input type="text" placeholder="Price"
                            name="price"
                            onChange={handleChange}
                            className={cssModules.input} />
                    </form>
                    <form>
                        <input type="number" placeholder="Qty"
                            name="qty"
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
                        {categories?.map((item, index) => (
                            <label className="checkbox-inline me-4" key={index}>
                                <input
                                    type="checkbox"
                                    value={item?.id}
                                    onClick={handleChangeCategoryId}
                                />{' '}
                                {item?.name}
                            </label>
                        ))}
                    </div>


                    <button className={cssModules.button}>Save</button>


                </form>
            </Container>
        </div>

    )

}

export default AddProductComponent