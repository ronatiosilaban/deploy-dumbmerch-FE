import { Link } from "react-router-dom";
import React, { useState, useEffect, } from 'react';
import { Button, Modal, Container, Row, Col, Table } from "react-bootstrap";
import NavbarComponent from "./component/admin-navbar"
import ShowMoreText from 'react-show-more-text';
import rupiahFormat from 'rupiah-format';
import { useNavigate } from 'react-router';

import { useQuery, useMutation } from 'react-query';
import cssModules from './style/category.module.css'

import { API } from '../config/api';

const style = {
    color: {
        backgroundColor: 'rgb(49, 48, 48)',
        justifyContent: 'center',

    },
    colors: {
        backgroundColor: 'rgb(26, 23, 23)',

    }
}


function ListComponent() {
    const title = 'Product';
    document.title = 'DumbMerch | ' + title;

    let navigate = useNavigate();

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [show, setShow] = useState(false);
    // const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const handleUpdate = (id) => {
    //     navigate('/product/' + id);
    // };

    let { data: products, refetch } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
        // navigate('/product')
    });
    // console.log('lll', products);


    const handleEdit = (id) => {
        navigate('/edit-product/' + id);
    };

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose();
            // execute delete data by id function
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);



    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/product/${id}`);
            refetch();
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
                <div className={cssModules.table}>
                    <p className={cssModules.title}>List Product</p>

                    <Row>
                        <Col>
                            <Link to="/addProduct">
                                <button className={cssModules.addCategory}>Add Product</button>
                            </Link>
                        </Col>
                        <Col xs="12">
                            {products?.length !== 0 ? (
                                <Table striped bordered hover variant="dark" className={cssModules.tables}>
                                    <thead >
                                        <tr style={style.color} className={cssModules.thead}>
                                            <th className={cssModules.left} >No</th>
                                            <th className={cssModules.text} >Photo</th>
                                            <th className={cssModules.text} >Product Name</th>
                                            <th className={cssModules.text} >Product Desc</th>
                                            <th className={cssModules.text} >price</th>
                                            <th className={cssModules.text} >Qty</th>
                                            <th className={cssModules.right} >Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className={cssModules.tbody}>
                                        {
                                            products?.map((item, index) => (
                                                <tr key={index}>
                                                    <td >{index + 1}</td>
                                                    <td className="align-middle">
                                                        <img
                                                            src={item.image}
                                                            style={{
                                                                width: '80px',
                                                                height: '80px',
                                                                objectFit: 'cover',
                                                            }}
                                                            alt={item.name}
                                                        />
                                                    </td>
                                                    <td className="align-middle">{item.title}</td>
                                                    <td className="align-middle">
                                                        {/* <ShowMoreText
                                                            lines={1}
                                                            more="show"
                                                            less="hide"
                                                            className="content-css"
                                                            anchorClass="my-anchor-css-class"
                                                            expanded={false}
                                                            width={280}
                                                        >
                                                        </ShowMoreText> */}
                                                        {item.desc}
                                                    </td>
                                                    <td className="align-middle">
                                                        {rupiahFormat.convert(item.price)}
                                                    </td>
                                                    <td className="align-middle">{item.qty}</td>
                                                    <td className="align-middle">
                                                        <td className={cssModules.right}>
                                                            <button
                                                                onClick={() => {
                                                                    handleEdit(item.id);
                                                                }}
                                                                className="btn-sm btn-success me-2"
                                                                style={{ width: '135px' }}
                                                            >
                                                                Edit
                                                            </button>
                                                            {/* <button className={cssModules.buttons} onClick={() => setModalShow(true)} >Delete</button> */}
                                                            <Button
                                                                onClick={() => {
                                                                    handleDelete(item.id);
                                                                }}
                                                                className="btn-sm btn-danger"
                                                                style={{ width: '135px' }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            ) : (
                                <div className="text-center pt-5">
                                    <div className="mt-3">No data product</div>
                                </div>
                            )}

                            <MyVerticallyCenteredModal
                                setConfirmDelete={setConfirmDelete}
                                show={show}
                                handleClose={handleClose}
                            // onHide={() => setModalShow(false)}

                            />
                        </Col>
                    </Row>
                </div>



            </Container>
        </div >
    )

}
// export default function DeleteData({ show, handleClose, setConfirmDelete }) {

//     const handleDelete = () => {
//         setConfirmDelete(true)
//     }


function MyVerticallyCenteredModal({ show, handleClose, setConfirmDelete }) {
    const handleDelete = () => {
        setConfirmDelete(true)
    }
    return (
        <Modal
            // {...props}
            show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete this data?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleDelete} className={cssModules.modalbtn}>
                    Yes
                </Button>
                <Button variant="danger" onClick={handleClose} className={cssModules.modalbtn}>
                    No
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ListComponent