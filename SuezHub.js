import React,  { useState, useEffect}  from 'react';
import { Container,  Card } from 'react-bootstrap';

import { useUtils } from '../customHooks';
import { useSuezHub } from '../contracts';
import { ImageLib } from '../comm';

export default (props)=> {
  const [ address, setAddress ] = useState('');
  const [ contractName, setContractName ] = useState('');
  const [ suezInfo, setSuezInfo ] = useState({});
  const { copyableShow, hashLink } = useUtils();
  
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


/*
  useEffect(()=>{
    if (address) {
     
      getContractInfo(v=>setSuezInfo(v))
    }
  }, [address]);
  */
  /*
  const postOfficeMainCard = (address)=>{
    
    // const [info, setInfo] = useState({});
    return !address ? '' : <Container fluid={true} className="p-0 pt-3">
        <Container fluid={true} className="p-3 bg-light rounded">{address}
        ==<SuezHub address={address}/>==
       </Container>
      </Container>
  }*/
/*
  const postOfficeCard = ()=> !address ? '' : hashLink('/postOffice/' + address,
  <Container fluid={true} className={'m-0 mt-3 p-3 alert-secondary rounded hover-shadow'}>
<span className="mr-3">
  <ImageLib v="postOffice" setting={{ className: 'border border-secondary shade',  
  style: {width:'3rem', borderRadius: '50%'}}} />
</span>
<span className="mr-3" onClick={()=>{ getContractInfo(
  v=>alert(JSON.stringify(v))
) }}>getContractInfo </span>
<span className="mr-3">{copyableShow(address, 5)} </span>
</Container>);
*/
const postOfficeMainCard = ()=> !address ? props.address : 
hashLink('/postOffice/' + address,
  <Container fluid={true} className={'m-0 p-3 bg-light rounded hover-shadow'} style={{minHeight:'16rem'}}>
  <span className="mr-3">
    <ImageLib v="postOffice" setting={{ className: 'border border-secondary shade',  
    style: {width:'3rem', borderRadius: '50%'}}} />
  </span>
  <span className="mr-3 text-secondary" style={{fontSize:'2rem'}}>
    <b>{suezInfo.name}</b><span className="mr-3" style={{fontSize:'0.8rem'}}>{copyableShow(address, 5)} </span>
  </span>
      
</Container>);

  const postOfficeCard = ()=> !address ? props.address : 
    hashLink('/postOffice/' + address,
      <Container fluid={true} className={'m-0 mt-3 p-3 alert-secondary rounded hover-shadow'}>
      <span className="mr-3">
        <ImageLib v="postOffice" setting={{ className: 'border border-secondary shade',  
        style: {width:'3rem', borderRadius: '50%'}}} />
      </span>
      <span className="mr-3">
        <b>{suezInfo.name}</b><span className="mr-3" style={{fontSize:'0.8rem'}}>{copyableShow(address, 5)} </span>
      </span>
    </Container>);

  return  viewType === 'mainCard'? postOfficeMainCard() : postOfficeCard();
}