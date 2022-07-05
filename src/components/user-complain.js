import NavbarComponent from "./component/user-navbar"
import { Row, Col, Form, Container, Image } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react'
import cssModules from './style/complain.module.css'
import { io } from 'socket.io-client'
import { UserContext } from '../context/user'
import Chat from '../components/component/text'
import Contact from '../components/component/contact'
let socket

function UserComplainComponent() {
    const title = 'Complain';
    document.title = 'DumbMerch | ' + title;

    const [contact, setContact] = useState(null)
    const [contacts, setContacts] = useState([])
    const [messages, setMessages] = useState([])

    const [state] = useContext(UserContext)

    useEffect(() => {
        socket = io('https://dumbmerch34project.herokuapp.com', {
            auth: {
                token: localStorage.getItem("token")
            },
            query: {
                id: state.user.id
            }
        })

        socket.on("new message", () => {
            console.log("contact : ", contact);
            socket.emit("load messages", contact?.id)
        })

        socket.on("connect_error", (err) => {
            console.error(err.massage);
        });
        loadContact()
        loadMessages()

        return () => {
            socket.disconnect()
        }
    }, [messages])

    const loadContact = () => {
        socket.emit("load admin contact")
        socket.on("admin contact", (data) => {
            const dataContact = {
                ...data,
                massage: messages.length > 0 ? messages[messages.length - 1].massage : "Click here to start message"
            }
            setContacts([dataContact])
        })
    }

    const onClickContact = (data) => {
        setContact(data)
        socket.emit("load messages", data.id)
    }


    const loadMessages = () => {
        socket.on("messages", (data) => {
            if (data.length > 0) {
                const dataMessages = data.map((item) => ({
                    idSender: item.sender.id,
                    massage: item.massage
                }))
                setMessages(dataMessages)
            }
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
                <Container className={cssModules.body}>
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

export default UserComplainComponent
