import NavbarComponent from "./component/admin-navbar"
import { Card, Row, Col, Form, Container, Image } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import image from './component/suki-x.jpg';
import images from './component/one.jpg';
import cssModules from './style/complain.module.css'
import { io } from 'socket.io-client'
import { UserContext } from '../context/user'
import Chat from '../components/component/text'
import Contact from '../components/component/contact'

let socket

export default function ComplainAdmin() {

    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    // code here
    const [messages, setMessages] = useState([])
    console.log('sta', messages);

    const title = "Complain admin"
    document.title = 'DumbMerch | ' + title

    // code here
    const [state] = useContext(UserContext)

    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem('token')
            },
            // code here
            query: {
                id: state.user.id
            }
        })

        // code here
        socket.on("new message", () => {
            console.log("contact : ", contact);
            socket.emit("load messages", contact?.id)
        })

        loadContacts()
        // code here
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages]) // code here

    const loadContacts = () => {
        socket.emit("load customer contacts")
        socket.on("customer contacts", (data) => {
            // filter just customers which have sent a message
            let dataContacts = data.filter(item => (item.status !== "admin") && (item.recipientMessage.length > 0 || item.senderMessage.length > 0))
            dataContacts = dataContacts.map((item) => ({
                ...item,
                massage: item.senderMessage.length > 0 ? item.senderMessage[item.senderMessage.length - 1].massage : "Click here to start message"
            }))
            setContacts(dataContacts)
        })
    }

    // used for active style when click contact
    const onClickContact = (data) => {
        setContact(data)
        // code here
        socket.emit("load messages", data.id)
    }

    // code here
    const loadMessages = () => {
        socket.on("messages", (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    massage: item.massage
                }))
                setMessages(dataMessages)
            }
            loadContacts()
        })
    }

    const onSendMessage = (e) => {
        if (e.key === 'Enter') {
            const data = {
                idRecipient: contact.id,
                massage: e.target.value
            }

            socket.emit("send message", data)
            e.target.value = ""
        }
    }
    return (

        <div className={cssModules.display}>
            <> <NavbarComponent /></>
            <div className={cssModules.body}>
                {/* <Container className={cssModules.body}>
                    <Row>
                        <Col sm={4} className={cssModules.content, cssModules.separator}>
                            <Row className={cssModules.listcontact}>
                                <Col sm={3} ><Image src={image} roundedCircle className={cssModules.image}></Image></Col>
                                <Col sm={9} className={cssModules.contactname}>
                                    <div className={cssModules.text}>
                                        <p className={cssModules.name}>Ronatio Parhorasan</p>
                                        <span >lagi Apa??</span>
                                    </div>
                                </Col>
                            </Row>

                            <Row className={cssModules.listcontact}>
                                <Col sm={3} ><Image src={image} roundedCircle className={cssModules.image}></Image></Col>
                                <Col sm={9} className={cssModules.contactname}>
                                    <div className={cssModules.text}>
                                        <p className={cssModules.name}>Robinsar Artatta</p>
                                        <span >test test??</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={8} className={cssModules.content}>
                            <Row className={cssModules.contentchat}>
                                <Col>

                                    <Row className={cssModules.contentmessage}>
                                        <Col sm={2} >
                                            <Image src={image} roundedCircle className={cssModules.imagechat}></Image>
                                        </Col>
                                        <Col sm={10} >
                                            <div className={cssModules.msgbubble}>
                                                <div>
                                                    lagi Apa??  😄
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className={cssModules.contentmessage}>
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                id="inputPassword5"
                                                aria-describedby="passwordHelpBlock"
                                                className={cssModules.Form}
                                                placeholder="Send Massage"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* <div className={cssModules.contentchat}>ss</div> */}
                {/* </Col>
                    </Row>

                // </Container> */}
                <Container>
                    <Row>
                        <Col md={3} className={cssModules.content, cssModules.separator} >
                            <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
                        </Col>
                        <Col md={9} style={{ height: '89.5vh' }} className="px-0">
                            <Chat contact={contact} messages={messages} user={state.user} sendMessage={onSendMessage} />
                        </Col>
                    </Row>
                </Container>

            </div >
        </div >
    )
}

