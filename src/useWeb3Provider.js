import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const useWeb3Provider = (url) => {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        isProviderLoaded: false,
        web3: null,
        contract: null
      });
    
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [shouldReload, reload] = useState(false);

    const canConnectToContract = account && web3Api.contract;
     
    const reloadEffect = useCallback(() => reload(!shouldReload), [shouldReload]);
    const setAccountListener = (provider) => {
        provider.on("accountsChanged", (accounts) => window.location.reload());
        provider.on("chainChanged", (accounts) => window.location.reload());
    };
    
    useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
    
          if (provider) {
            const contract = null; //await loadContract("Faucet", provider);
            setAccountListener(provider);
            setWeb3Api({
              web3: new Web3(provider),
              provider,
              contract,
              isProviderLoaded: true
            });
          } else {
            setWeb3Api(api => ({...api, isProviderLoaded: true}));
            console.error("Please install MetaMask");
          }
        };
    
        loadProvider();
      }, []);
    
      useEffect(() => {
        const loadBalance = async () => {
          const { contract, web3 } = web3Api;
          const balance = await web3.eth.getBalance(contract.address);
          setBalance(web3.utils.fromWei(balance, "ether"));
        }
    
        web3Api.contract && loadBalance();
      }, [web3Api, shouldReload])
    
      useEffect(() => {
        const getAccount = async () => {
          const accounts = await web3Api.web3.eth.getAccounts();
          setAccount(accounts[0]);
        };
    
        web3Api.web3 && getAccount();
      }, [web3Api.web3]);


  return {
    web3Api,
    account,
    balance,
    shouldReload
  };
};

export default useWeb3Provider;
