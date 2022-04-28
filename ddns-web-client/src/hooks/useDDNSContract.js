import { useState , useEffect,useMemo} from "react"
import { ethers } from 'ethers'

export function useDDNSContract(cAddress,userAccount=null){
    const provider = getWeb3Provider()
    const [contractAddress,setContractAddress] = useState(cAddress)
    const [currentAccount,setCurrentAccount] = useState(null)
    const [accounts,setAccounts] = useState([])
    useEffect(() =>{
        getUserAccount(provider,setCurrentAccount,setAccounts)
    },[provider])
    return {
        contractAddress,
        setContractAddress,
        currentAccount: currentAccount,
        setCurrentAccount: setCurrentAccount,
        accounts,
        setAccounts,
        isAccountConnected: () =>{isAccountConnected(provider)},
        requestWalletConnection: () => {requestWalletConnection(provider,setCurrentAccount,setAccounts)}
    }
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

async function getUserAccount(provider,setAccount,setAccounts){
    let accountConnected = await isAccountConnected(provider)
    if(accountConnected){
        requestWalletConnection(provider,setAccount,setAccounts)
    }
    else{
        setAccount(null)
    }
}

async function requestWalletConnection(provider,setCurrentAccount,setAccounts){
    let accounts = [""]
    try{
         accounts = await provider.send("eth_requestAccounts")
    }
    catch (e){
        console.warn("Warning: Failed to retrieve wallet address!")
        accounts = [null]
    }
    setCurrentAccount(accounts[0])
    setAccounts(accounts)
}
