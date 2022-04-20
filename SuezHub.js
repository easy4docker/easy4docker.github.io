import React,  { useState, useEffect}  from 'react';
import { Container,  Card, Row, Col } from 'react-bootstrap';

import { useUtils } from '../customHooks';
import { useSuezHub } from '../contracts';
import { ImageLib } from '../comm';

import { useParams, useHistory } from 'react-router';

export default (props)=> {
  const history =  useHistory();
  
  const [ address, setAddress ] = useState('');
  const [ contractName, setContractName ] = useState('');
  const [ suezInfo, setSuezInfo ] = useState({});
  const { copyableShow, showString, show } = useUtils();
  
  const [ viewType, setViewType ] = useState('');
  const { getContractInfo } = useSuezHub('suezHub', 
    'https://rinkeby.infura.io/v3/3af2ebd23289490dbe29d3034e2887ce',
    props.address);
 
  const getName = async()=>{
    getContractInfo(v=> {
      setSuezInfo(v);
    })
  }
  useEffect(()=>{
    setAddress(props.address);
    setViewType(props.type);
    getName();
  }, [ props.address ]);

  const nameAddress = (name, addr)=><span className="float-left border border-secondary p-0 pl-2 pr-2 pb-2 rounded">
      <Container className="text-left p-0"><span className="m-0 bg-secondary text-light rounded" style={{fontSize:'0.6rem'}}>{show(address, 6)} </span></Container>
      <Container className="text-left p-0"><b>{!name?'':showString(name,16)}</b></Container>
    </span>

  const itemIcon = ()=> <Container className="p-1 m-0 float-left text-center" 
  style={{ width: '10%', minWidth:'8rem',height:'4rem' }}>
      <Card border="warning"  className={`rounded hover-shadow p-0`}  
        onClick={()=>history.push('/postOffice/' + address)}
          style={{ width:'100%', height:'100%' }}>
          <Card.Body className="p-0 text-secondary text-left">
              <Row>
                  <Col className="d-flex align-items-center pt-1" xs={3}>
                  <ImageLib v="postBox" setting={ {style:{width:'2.6rem'}}} />     
                  </Col>
                  <Col xs={9} style={{fontSize:'0.76rem', lineHeight:'0.8rem',width: '20rem'}} 
                      className="d-flex align-items-center p-1 pl-3 pr-3  text-wrap text-center text-dark ow">
                      {!suezInfo.name? copyableShow(address,4) : showString(suezInfo.name,28)}
                  </Col>
              </Row>
          </Card.Body>
      </Card>)
  </Container>

const postOfficeMainCard = ()=> !address ? props.address : 
 <Container fluid={true} className={'m-0 mb-3 p-3 bg-light rounded'} style={{minHeight:'16rem'}}>
  <span className="mr-3">
    <ImageLib v="postOffice" setting={{ className: 'border border-secondary shade',  
    style: {width:'3rem', borderRadius: '50%'}}} />
  </span>
  <span className="mr-3 text-secondary" style={{fontSize:'2rem'}}>
    <b>{suezInfo.name}</b><span className="ml-2 bg-secondary text-light rounded" style={{fontSize:'0.6rem'}}>{copyableShow(address, 5)} </span>
  </span>
      
</Container>;

  const postOfficeCard = ()=> !address ? props.address : 
      <Container fluid={true} className={'m-0 mb-3 p-3 alert-secondary rounded hover-shadow'}
        onClick={()=>history.push('/postOffice/' + address)}
      >
      <span className="mr-3 float-left">
        <ImageLib v="postOffice" setting={{ className: 'border border-secondary shade',  
        style: {width:'3rem', borderRadius: '50%'}}} />
      </span>
      <span className="p-0 m-0 float-left">
        {nameAddress(suezInfo.name, address)}
      </span>
      <Container className="clearfix"/>
    </Container>;

  return  viewType === 'mainCard'? postOfficeMainCard() : viewType === 'itemIcon'? itemIcon() : postOfficeCard();
}