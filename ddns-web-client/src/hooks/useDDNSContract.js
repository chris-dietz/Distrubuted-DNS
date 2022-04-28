import { useState , useEffect,useMemo} from "react"
import { ethers } from 'ethers'

export function useDDNSContract(cAddress,userAccount=null){
    const provider = getWeb3Provider()
    const [contractAddress,setContractAddress] = useState(cAddress)
    const [account,setAccount] = useState(null)
    let accountConnected = () =>{
        isAccountConnected(provider)
    } 
    let connectToWallet = () =>{
        requestWalletConnection(provider,setAccount)
    }
    useEffect(() =>{
        getUserAccount(provider,setAccount)
    },[provider])
    

    return {contractAddress,setContractAddress,account,setAccount,accountConnected,connectToWallet}
}

function getWeb3Provider(){
    const gancheUrl = "http://localhost:8545"
    if(typeof window.ethereum !== 'undefined'){
        return new ethers.providers.Web3Provider(window.ethereum)
    }
    else
        return new ethers.providers.JsonRpcProvider(gancheUrl)
}

async function isAccountConnected(provider) {
    const accounts = await provider.listAccounts()
    return accounts.length > 0;
}

async function getUserAccount(provider,setAccount){
    let accountConnected = await isAccountConnected(provider)
    if(accountConnected){
        requestWalletConnection(provider,setAccount)
    }
    else{
        setAccount(null)
    }
}

async function requestWalletConnection(provider,setAccount){
    let accounts = [""]
    try{
         accounts = await provider.send("eth_requestAccounts")
    }
    catch (e){
        console.warn("Warning: Failed to retrieve wallet address!")
        accounts = [null]
    }
    setAccount(accounts[0])
}
