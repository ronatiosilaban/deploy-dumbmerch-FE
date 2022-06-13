import { Card, Row, Col, Form } from 'react-bootstrap';
import image from './suki-x.jpg';
import cssModules from '../style/roomchat.module.css'






function RoomchatComponent() {
    return (
        <div>
            <div>
                <div className={cssModules.chat}>
                    <Row md={3} className={cssModules.contact}>
                        <Col className={cssModules.Col}>
                            <Card.Img variant="top" src={image} alt="" className={cssModules.image} />
                            <div className={cssModules.text}>
                                <span >lagi Apa??</span>
                            </div>
                        </Col>
                    </Row>
                    <Form.Control
                        type="text"
                        id="inputPassword5"
                        aria-describedby="passwordHelpBlock"
                        className={cssModules.Form}
                        placeholder="Send Massage"
                    />
                </div>
            </div>
        </div >
    )
}

export default RoomchatComponent