import NavbarComponent from "./component/admin-navbar"
import cssModules from './style/category.module.css'
import { Link } from "react-router-dom";
import { Button, Modal, Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';

import { useQuery, useMutation } from 'react-query';

import { API } from '../config/api';


const style = {
    color: {
        backgroundColor: 'rgb(49, 48, 48)',
    },
    colors: {
        backgroundColor: 'rgb(26, 23, 23)',

    }
}

function CategoryComponent() {


    let navigate = useNavigate();
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.data;
    });


    // const [modalShow, setModalShow] = useState(false);
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
            await API.delete(`/category/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });


    const handleUpdate = (id) => {
        navigate('/edit-category/' + id);
    };

    const title = 'Product';
    document.title = 'DumbMerch | ' + title;



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
                            <Link to="/add">
                                <button className={cssModules.addCategory}>Add Category</button>
                            </Link>
                        </Col>
                        <Col xs="12">
                            {categories?.length !== 0 ? (
                                <Table striped bordered hover variant="dark" className={cssModules.tables}>
                                    <thead className={cssModules.thead}>
                                        <tr style={style.color}>
                                            <th className={cssModules.left} >No</th>
                                            <th className={cssModules.text} >Category Name</th>
                                            <th className={cssModules.right} >Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className={cssModules.tbody}>
                                        {/* {
                                            categories?.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="align-middle text-center">{index + 1}</td>
                                                    <td className="align-middle">{item.name}</td>
                                                    <td className="align-middle">
                                                        <td className={cssModules.right}>
                                                            <button
                                                                onClick={() => {
                                                                    handleUpdate(item.id);
                                                                }}
                                                                className="btn-sm btn-success me-2"
                                                                style={{ width: '135px' }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className={cssModules.buttons} onClick={() => setModalShow(true)} >Delete</button>
                                                        </td>
                                                    </td>
                                                </tr>
                                            ))
                                        } */}
                                        {categories?.map((item, index) => (
                                            <tr key={index}>
                                                <td width="10%" className="align-middle">
                                                    {index + 1}
                                                </td>
                                                <td width="60%" className="align-middle">
                                                    {item.name}
                                                </td>
                                                <td width="30%">
                                                    <Button
                                                        onClick={() => {
                                                            handleUpdate(item.id);
                                                        }}
                                                        className="btn-sm btn-success me-2"
                                                        style={{ width: '135px' }}
                                                    >
                                                        Edit
                                                    </Button>
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
                                            </tr>
                                        ))}
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

                            />
                        </Col>
                    </Row>
                </div>



            </Container >
        </div >
    )
}

function MyVerticallyCenteredModal({ show, handleClose, setConfirmDelete }) {
    const handleDelete = () => {
        setConfirmDelete(true)
    }
    return (
        <Modal

            size="lg"
            show={show} onHide={handleClose}
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
export default CategoryComponent