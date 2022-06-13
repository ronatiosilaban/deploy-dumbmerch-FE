import { Card, Row, Col } from 'react-bootstrap';
import image from './suki-x.jpg';
import images from './one.jpg';
import cssModules from '../style/complain.module.css'






function ChatComponent() {
    return (
        <div>
            <div>
                <div className={cssModules.chat}>
                    <Row md={3} className={cssModules.contact}>
                        <Col className={cssModules.Col}>
                            <Card.Img variant="top" src={image} alt="" className={cssModules.image} />
                            <div className={cssModules.text}>
                                <p className={cssModules.name}>Ronatio</p>
                                <span >lagi Apa??</span>
                            </div>
                        </Col>
                        <Col className={cssModules.Col}>
                            <Card.Img variant="top" src={images} alt="" className={cssModules.image} />
                            <div className={cssModules.text}>
                                <h1 className={cssModules.name}>Risna</h1>
                                <p>lagi Apa kamu??</p>
                            </div>

                        </Col>
                    </Row>

                </div>
            </div>
        </div >
    )
}

export default ChatComponent