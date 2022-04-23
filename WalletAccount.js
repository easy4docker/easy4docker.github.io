import React, { useState, useEffect, useContext }  from 'react';
import { Container, Dropdown, Image} from 'react-bootstrap';

import Web3 from 'web3';

import WalletConnectProvider from "@walletconnect/web3-provider";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { UserContext } from '../comm';
import { useUtils,  } from '../customHooks';
import { useEthereumNetwork } from '../contracts';


export default (props)=> {
  const { networksMeta } = useContext(UserContext);
  const  { show } = useUtils();
  const {  currentWallet, valueCurrentWallet }  = useEthereumNetwork();

  const isLocal = !window.ethereum ? false : true;
  // ==== walletProvider===
  const provider = new WalletConnectProvider({
    infuraId: "3af2ebd23289490dbe29d3034e2887ce",
    bridge: "https://bridge.walletconnect.org",
    qrcode: true  
   });
  
  provider.on("disconnect", (code, reason) => {
    window.localStorage.removeItem('walletconnect');
    valueCurrentWallet({provider:null});
  });

  const getLocalWallet = ()=> {
    disconnectWallet();
    valueCurrentWallet({provider:'local'});
  
    refreshStore();
  }

  const disconnectLocal = async ()=> {
    if (window.ethereum) {
      const permissions = await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {},
        }]
      });
    }
  }

  const disconnectWallet = async ()=> {
    if (currentWallet.provider === 'walletConnect') {
      window.localStorage.removeItem('walletconnect');
      provider.disconnect();
      valueCurrentWallet({provider:null, account:null, balance:null,network:{}});
   } else  if ( currentWallet.provider === 'local' ) {
      valueCurrentWallet({provider:null, account:null, balance:null,network:{}});
      disconnectLocal();
   } else {
     console.log('no dupli');
   }
  }

  const refreshStore = async ()=> {
    if (currentWallet.provider === 'walletConnect' || 
          (!!window.ethereum &&  currentWallet.provider === 'local')) {
      const web3 = new Web3(currentWallet.provider === 'walletConnect' ? provider : Web3.givenProvider);
      const chainId = await web3.eth.getChainId();
      web3.eth.getAccounts().then(v=> {
          valueCurrentWallet({account:v[0]});
        });
      const idx = networksMeta.findIndex(v=>v.chainId ===  parseInt(chainId));
      valueCurrentWallet({network:networksMeta[idx]});
    } else {
      console.log('No walletconnect on===>');
    }
  }

  provider.on('accountsChanged', async () => {
    refreshStore();
  });

  provider.on('chainChanged', (accounts) => {
    refreshStore();
  });

  const getRemoteWallet = async ()=> {
    disconnectWallet();

      provider.enable().then(v=>{
        valueCurrentWallet({provider:'walletConnect'});
        refreshStore();

      }).catch(async err => {
        window.localStorage.removeItem('walletconnect');
        provider.isConnecting = false;
        provider.close();
         
         try {
           await provider.disconnect();
         } catch (e) {
           
           console.log('--something happened 2-777--')
         }   
      });
  }

  const setLocalEvents = ()=> {
    if (window.ethereum) {
      const elist = ['accountsChanged', 'chainChanged']
      for (let i = 0 ; i < elist.length; i++) {
        window.ethereum.on(elist[i], ()=>{
          refreshStore();
        });
      }
    }
  }

  const cleanLocalEvents = ()=> {
    if (window.ethereum) {
      const elist = ['accountsChanged', 'chainChanged']
      for (let i = 0 ; i < elist.length; i++) {
        window.ethereum.removeListener(elist[i], ()=>{
        });
      }
    }
  }

  useEffect(()=>{
    setLocalEvents();
    return () => {
      cleanLocalEvents(); 
    }
  //  setLocalEvents();
    // new EthrumeNetwork(networksMeta)
  },[]);
  return (
    <span className="float-right text-left pt-2 m-0 text-light">
  <Dropdown className="float-right text-left p-0 m-0" style={{minWidth:'26rem'}}>
    <Dropdown.Toggle variant="btn border-info border-circle bg-light btn-md text-left">
      <Container fluid={false}  style={{width:'22rem'}} className="float-left text-left p-0 pl-1 pr-1 m-0">
        {'wallet.account' === null ? 'Link to wallet':
          <span>
            <Container className="p-0 m-0 float-left"  style={{maxWidth:'1rem'}} onClick={()=>disconnectWallet()} >
              {!currentWallet.provider ? '' : <FontAwesomeIcon size="1x" icon={ faTimesCircle } onClick={()=>'setWallet( initailAccount)' } className="m-0 p-0"/>}
            </Container>  
            <Container className="p-0 m-0 ml-2 float-left"  style={{maxWidth:'16rem'}}>
              {!!currentWallet.provider ? (currentWallet.provider + ' ' + currentWallet.network.name + ' ' + 
              (!currentWallet.account? '' : show(currentWallet.account,5) )) : 'Select a account'}

            </Container>
            <Container className="p-0 m-0 float-right"  style={{maxWidth:'1rem'}}>
            {currentWallet.provider === 'local' ? <Image src="/static/media/metamask.png" alt="Icon" style={{width:'1rem'}}/> :
            currentWallet.provider === 'walletConnect' ?  <Image src="/static/media/walletConnectIcon.svg"  className="ml-2" alt="Icon"/>
            : ''}
            </Container> 
          </span>
        }
        <Container className="clearfix"></Container>
        </Container> 
    </Dropdown.Toggle>
    <Dropdown.Menu  style={{width: '100%'}} variant="light" className="border border-circle mt-1 p-3 shadow">

    <Dropdown.Item href="#"  className="p-0 bg-info">
      <Container fluid={true} className="p-2 pt-3 pb-3 bg-info text-light">
        <Container fluid={true}>Network : <i className="text-warning">{'wallet.network'}</i></Container>
        <Container fluid={true}>Account:  <i className="text-warning">
            {"(!wallet || !wallet.account) ? '' : (wallet.account.slice(0,8) + '...' + wallet.account.slice(-8))"}
          </i></Container>
        <Container fluid={true}>NFTs:</Container>
      </Container>
    </Dropdown.Item>
    
    {!isLocal ? '' : 
      <Dropdown.Item href="#" className="p-2 pt-3 pb-3" onClick={()=>{ getLocalWallet()}}>
          MetaMask <Image src="/static/media/metamask.png" className="ml-2" alt="Icon" style={{width:'1rem'}}/>
      </Dropdown.Item>}

    <Dropdown.Item href="#" className="p-2 pt-3 pb-3" onClick={()=> {  getRemoteWallet() }} >walletConnect 
        <Image src="/static/media/walletConnectIcon.svg"  className="ml-2" alt="Icon"/>
    </Dropdown.Item>
    <Dropdown.Divider />

    <Dropdown.Item href="/about" className="p-2">
      About
    </Dropdown.Item>
    <Dropdown.Divider />
       
    </Dropdown.Menu>
  </Dropdown>
  </span>
  )
}

