import React from "react";
import { Row, Col } from 'react-bootstrap';
import default_profile from "./suki-x.jpg"
import cssModules from '../style/complain.module.css'

export default function Contact({ dataContact, clickContact, contact }) {
    return (
        <>
            {dataContact.length > 0 && (
                <div>
                    {dataContact.map((item) => (
                        <Row
                            key={item.id}
                            className={`contact mt-3 p-2 ${contact?.id === item?.id && "contact-active"
                                }`}
                            onClick={() => {
                                clickContact(item);
                            }}>
                            <Col sm={3}>
                                <img
                                    src={item.profile?.image || default_profile}
                                    roundedCircle
                                    className={cssModules.image}
                                    alt="user avatar"
                                />
                            </Col>
                            <Col sm={9}>
                                <div className={cssModules.text}>
                                    <ul className="ps-0 text-contact">
                                        <p className={cssModules.name}>{item.username}</p>
                                        <p className={cssModules.text}>{item.massage}</p>
                                    </ul>
                                </div>
                            </Col>

                        </Row>
                    ))}
                </div>
            )}
        </>
    );
}