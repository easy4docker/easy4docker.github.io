import React  from 'react';
import { Container,  Card, Row, Col  } from 'react-bootstrap';
import { useHistory  } from "react-router-dom";
import { useUtils } from '../customHooks';
import { ImageLib } from '../comm';

// <ImageLib v="postOffice" setting={{className: 'border border-info shadow-sm p-1',  style: {width:'3rem'}}} />
export default ()=> {
    const { history } = useHistory();
    const { copyableShow, showString, hashLink } = useUtils();

    const bodyBox = (comp)=> centrelBox(<Container fluid={true} className="p-0 m-0 pb-3 text-left clearfix border border-warning rounded" 
        style={{minHeight:'36rem'}}>
            {comp}
        </Container>)

    const centrelBox = (comp)=> <Container fluid={true} className="p-0 pl-3 pr-3">
        <Container fluid={true} className="p-0 pl-3 pr-3">
            <Container fluid={true} className="p-0 pl-3 pr-3">
                {comp}
            </Container>
        </Container>

        <Container fluid={true} className="p-0 d-xl-none">
            {comp}
        </Container>
    </Container>

    const headerBox = (comp)=> <Container fluid={true} className="p-0 text-left clearfix text-light header-bg" style={{minHeight:'9.8rem'}}>
            {centrelBox(comp)}
        </Container>
    
    const cardShow = (v, k)=> <Container key={k} className="p-3 m-0 float-left text-center" style={{ width: '25%', minWidth:'20rem'}}>
    <Card border={v.style}  className={`bg-${v.style} hover-shadow p-0 text-left`} 
        style={{ width:'100%', minWidth:'18rem', height:'13rem' }}>
        <Card.Body className="bg-light p-3 rounded" onClick={ ()=> window.location.href = v.link.caption ? `#${v.link.link}` : '#'}>
            <span className="float-left p-1 pr-3 ">
                <ImageLib v={!v || !v.icon? 'postOffice' : v.icon} setting={{style:{width:'3rem'}}} />
            </span>
            <Card.Title><b className="text-secondary">{v.title}</b></Card.Title>
            <Card.Subtitle className="text-secondary mb-2" style={{fontSize:'0.8rem'}}>{v.subtitle}</Card.Subtitle>
            <Card.Text className="mb-2">{v.description}</Card.Text>
        </Card.Body>
    </Card>
    </Container>

    const fundingIcon = ()=> <Container className="p-1 m-0 float-left text-center" 
    style={{ width: '10%', minWidth:'8rem',height:'4rem' }}>
    {hashLink(`/postOffice/funding`, 
        <Card border="warning"  className={`rounded hover-shadow p-0  alert-success`} 
            style={{ width:'100%', height:'100%' }}>
            <Card.Body className="p-0 text-success text-left ">
                <Row>
                    <Col className="d-flex align-items-center pt-1" xs={4}>
                    <ImageLib v="postOffice" setting={{className:'p-2', style:{width:'3rem'}}} />     
                    </Col>
                    <Col xs={8} style={{fontSize:'0.76rem', lineHeight:'0.8rem',width: '20rem'}} 
                        className="d-flex align-items-center justify-content-center text-center p-1 pl-3 pr-3 text-dark ow">
                            Funding Postoffice</Col>
                </Row>
            </Card.Body>
        </Card>)}
    </Container>

    const itemIcon = (v, k)=> <Container key={k} className="p-1 m-0 float-left text-center" 
    style={{ width: '10%', minWidth:'8rem',height:'4rem' }}>
    {hashLink(`/postOffice/${v.address}`, 
        <Card border="warning"  className={`rounded hover-shadow p-0`} 
            style={{ width:'100%', height:'100%' }}>
            <Card.Body className="p-0 text-secondary text-left">
                <Row>
                    <Col className="d-flex align-items-center pt-1" xs={3}>
                    <ImageLib v="postBox" setting={ {style:{width:'2.6rem'}}} />     
                    </Col>
                    <Col xs={9} style={{fontSize:'0.76rem', lineHeight:'0.8rem',width: '20rem'}} 
                        className="d-flex align-items-center justify-content-left p-1 pl-3 pr-3  text-wrap text-justify text-dark ow">
                            {!v.name? copyableShow(v.address,4): showString(v.name,28)}</Col>
                </Row>
            </Card.Body>
        </Card>)}
    </Container>
    
    const cardListShow = (cards)=> cards.map((v,k)=> cardShow(v, k));

  return { centrelBox, cardListShow, cardShow, headerBox, bodyBox, itemIcon,  fundingIcon }
}