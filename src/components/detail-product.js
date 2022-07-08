import { Card, Container, Col, Row, Image } from 'react-bootstrap';
import image from './component/suki-x.jpg';
import plus from './component/plus-solid.svg';
import minus from './component/minus-solid.svg';
import cssModules from './style/detail.module.css'
import NavbarComponent from './component/user-navbar'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';


import { API } from '../config/api';



function DetailProductComponent() {

    const [counter, setCounter] = useState(1)

    let navigate = useNavigate();
    let { id } = useParams();


    const [form, setForm] = useState({
        amount: '',

    });
    let { data: product, refetch } = useQuery('productCache', async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: 'Basic ' + localStorage.token,
            },
        };
        const response = await API.get('/product/' + id);
        return response.data.data;;
    });

    // let { data: product } = useQuery('productCache', async () => {
    //     const response = await API.get('/product/' + id);
    //     return response.data.data;
    // });

    function add() {
        setCounter(counter + 1)

    }

    function less() {
        if (counter > 1) {
            setCounter(counter - 1)

        }
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        localStorage.setItem('productCount', counter);
    }, [counter])

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
        //change this according to your client-key
        const myMidtransClientKey = 'SB-Mid-client-jVNU7kHcOGPAWIlc';

        let scriptTag = document.createElement('script');
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute('data-client-key', myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const handleBuy = useMutation(async (e) => {
        try {
            e.preventDefault();

            const data = {
                idProduct: product.id,
                idSeller: product.user.id,
                price: product.price,
                amount: localStorage.productCount
            };
            console.log(data);

            const body = JSON.stringify(data);

            const config = {
                method: "POST",
                headers: {
                    Authorization: 'Basic ' + localStorage.token,
                    'Content-type': 'application/json',
                },
                body
            };


            // await API.post('/transaction', body, config);
            const response = await API.post('/transaction', body, config);
            //   Create variabel for store token payment from response here ...
         
            console.log(response.data);


            // Init Snap for display payment page with token here ...
            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                    navigate("/profile");
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result);
                },
                onClose: function () {
                    // alert("you closed the popup without finishing the payment");
                    // const response = await API.delete(`/transaction/${id}`, body, config);
                    // const token = response.data.payment.token
                    try {
                        alert("you closed the popup without finishing the payment");
                    } catch (error) {
                        console.log(error);
                    }
                },
            });
            // navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    });


    // const handleBuy = useMutation(async () => {
    //     try {
    //         // Get data from product
    //         const data = {
    //             idProduct: product.id,
    //             idSeller: product.user.id,
    //             price: product.price,
    //             amount: localStorage.productCount
    //         };

    //         // Data body
    //         const body = JSON.stringify(data);

    //         // Configuration
    //         const config = {
    //             method: "POST",
    //             headers: {
    //                 Authorization: "Basic " + localStorage.token,
    //                 "Content-type": "application/json",
    //             },
    //             body,
    //         };

    //         // Insert transaction data
    //         const response = await API.post("/transaction", config);

    //         // Create variabel for store token payment from response here ...
            const token = response.data.payment.token;
               console.log(response.data.payment)

    //         // Init Snap for display payment page with token here ...
    //         window.snap.pay(token, {
    //             onSuccess: function (result) {
    //                 /* You may add your own implementation here */
    //                 console.log(result);
    //                 navigate("/profile");
    //             },
    //             onPending: function (result) {
    //                 /* You may add your own implementation here */
    //                 console.log(result);
    //                 navigate("/profile");
    //             },
    //             onError: function (result) {
    //                 /* You may add your own implementation here */
    //                 console.log(result);
    //             },
    //             onClose: function () {
    //                 /* You may add your own implementation here */
    //                 alert("you closed the popup without finishing the payment");
    //             },
    //         });

    //     } catch (error) {
    //         console.log(error);
    //     }
    // });


    const title = 'Detail-Product';
    document.title = 'DumbMerch | ' + title;
    return (
        <div className={cssModules.display}>
            <NavbarComponent />
            <br /><br /><br />
            <Container>

                <Row>
                    <>
                        <Col sm="5">
                            <Image variant="top" src={product?.image} className={cssModules.images} />
                        </Col>
                        <Col sm="7">
                            <Card className={cssModules.cardBody}>
                                <Card.Body className={cssModules.cardText} >
                                    <Card.Title >
                                        <p className={cssModules.text}>{product?.title}</p>
                                        <p className={cssModules.stock}>Stock: {product?.title}.</p>
                                    </Card.Title>
                                    <Card.Text className={cssModules.cardText}>

                                        <p>
                                            {product?.desc}
                                        </p>
                                    </Card.Text>
                                    <p className={cssModules.price}>{product?.price}</p>
                                    <div >
                                        <Row className={cssModules.add}>
                                            <Col ms="5"><Image variant="top" src={minus} onClick={less} className={cssModules.logo} /></Col>
                                            <Col ms="2"><p className={cssModules.count}
                                                name="counter"
                                                onChange={handleChange}
                                            > {counter}</p></Col>
                                            <Col ms="5"><Image variant="top" src={plus} onClick={add} className={cssModules.logo} /></Col>
                                        </Row>

                                    </div>
                                    <button
                                        onClick={(e) => handleBuy.mutate(e)}
                                        className={cssModules.button}>buy</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </>
                </Row>
            </Container>
        </div >
    )
}

export default DetailProductComponent
