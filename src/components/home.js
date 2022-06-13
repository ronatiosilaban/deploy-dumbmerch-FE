import { useContext, useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import image from './component/suki-x.jpg';
import cssModules from './style/home.module.css'
import NavbarComponent from './component/user-navbar'
// import { useEffect } from "react"
// import Masonry from 'react-masonry-css';
// import contentData from "../fakeData/content-data"
import rupiahFormat from 'rupiah-format';


import { useQuery } from 'react-query';

import { API } from '../config/api';




function HomeComponent() {


    useEffect(() => {
        console.log("Welcome Component Did Mount");
        return () => {
            console.log("Welcome Component Will Unmount");
        }
    }, [])

    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
        // navigate('/product')
    });
    const title = 'Home';
    document.title = 'DumbMerch | ' + title;

    const breakpointColumnsObj = {
        default: 6,
        1100: 4,
        700: 3,
        500: 2,
    };

    return (
        <div className={cssModules.display}>
            <NavbarComponent /><br />
            <Container>
                <p className={cssModules.title}>Product</p>
                <Link to="/detail">
                    <Row>
                        {products?.length !== 0 ? (
                            products?.map((item, index) => (
                                <Col sm="3" item={item} key={index}>
                                    <Link to={`/detail/` + item.id} style={{ textDecoration: "none" }}>
                                        <Card className={cssModules.card}>
                                            <Card.Img variant="top" src={item.image} className={cssModules.images} alt={item.name} />
                                            <Card.Body className={cssModules.cardText}>
                                                <Card.Title className={cssModules.text}>{item.title}</Card.Title>
                                                <Card.Text >
                                                    {rupiahFormat.convert(item.price)}
                                                    <p>Stock : {item.qty}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <div className="text-center pt-5">
                                    {/* <img
                                        className="img-fluid"
                                        style={{ width: '40%' }}
                                        alt="empty"
                                    /> */}
                                    <div className="mt-3">No data product</div>
                                </div>
                            </Col>
                        )}
                    </Row>
                </Link>
            </Container>
        </div >
    )
}

export default HomeComponent