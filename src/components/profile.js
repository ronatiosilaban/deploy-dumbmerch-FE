import NavbarComponent from './component/user-navbar'
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import cssModules from './style/profile.module.css'
import image from './component/zoro.jpg';
import logo from './component/DumbMerch.png';
import dateFormat from 'dateformat';
import convertRupiah from 'rupiah-format';
import { useQuery } from 'react-query';
import React, { useContext, useState, useEffect } from 'react';

import { UserContext } from '../context/user';


import { API } from '../config/api';

const style = {
    card: {
        color: 'chocolate'
    },
    product: {
        backgroundColor: 'rgb(51, 49, 49)',
        width: '500px',
        marginRight: '0rem'
    },
    cards: {
        width: '90%'
    },
    spacing: {
        lineHeight: '5px',
        color: 'chocolate',
    }
}

function ProfileComponent() {
    const title = 'Profile';
    document.title = 'DumbMerch | ' + title;

    const [state] = useContext(UserContext);
    console.log('local', localStorage.productCount);
    let { data: profile } = useQuery('profileCache', async () => {
        const response = await API.get('/profile');
        return response.data.data;
    });

    let { data: transactions } = useQuery('transactionsCache', async () => {
        const response = await API.get('/transactions');
        return response.data.data;
    });

    return (
        <div>
            <div className={cssModules.display}>
                <NavbarComponent />

                <Container>
                    <Row>
                        <Col sm="7">
                            <Row>
                                <Col sm="7"><p className={cssModules.Title}>My Profile</p></Col>

                            </Row>
                            <Row>
                                <Col><Image variant="top" src={image} className={cssModules.images} /></Col>
                                <Col>
                                    <Card className={cssModules.card}>
                                        <Card.Body className={cssModules.cardText}>
                                            <Card.Text >
                                                <p className={cssModules.text} style={style.spacing}>Name</p>
                                                <p className={cssModules.title} >{state.user.username}</p>
                                                <p className={cssModules.text} style={style.spacing}>Email</p>
                                                <p className={cssModules.title}>{state.user.email}</p>
                                                <p className={cssModules.text} style={style.spacing}>Phone</p>
                                                <p className={cssModules.title} >{profile?.phone ? profile?.phone : '-'}</p>
                                                <p className={cssModules.text} style={style.spacing}>Gender</p>
                                                <p className={cssModules.title} >{profile?.gender ? profile?.gender : '-'}</p>
                                                <p className={cssModules.text} style={style.spacing}>Address</p>
                                                <p className={cssModules.title}>{profile?.address ? profile?.address : '-'}</p>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>

                        <Col sm="5">
                            <Row>
                                <Col sm="5"><p className={cssModules.Titles}>My Transaction</p></Col>
                            </Row>
                            {transactions?.length !== 0 ? (
                                <>
                                    {transactions?.map((item, index) => (

                                        <Row className={cssModules.cardproduct} key={index}>
                                            <Col><Image variant="top" src={item.product.image} className={cssModules.imagesproduct} alt="img" /></Col>
                                            <Col>
                                                <Card.Title >
                                                    <h1 className={cssModules.product} style={style.card}>{item.name}</h1>
                                                    <p className={cssModules.textproduct} style={style.card}>{dateFormat(item.createdAt, 'dddd, d mmmm yyyy')}</p>
                                                    <p className={cssModules.textproduct}>Price : {convertRupiah.convert(item.price)}</p>
                                                    <p className={cssModules.price}>sub-total {convertRupiah.convert(item.price)}</p>
                                                </Card.Title>
                                            </Col>
                                            <Col xs="3" className={cssModules.cardproducts}>
                                                <div
                                                    className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}
                                                >
                                                    {item.status}
                                                </div>
                                            </Col>
                                        </Row>

                                    ))}
                                </>
                            ) : (
                                <div className="no-data-transaction">No transaction</div>

                            )}
                        </Col>
                    </Row>
                </Container>
            </div>



        </div>
    )

}

export default ProfileComponent