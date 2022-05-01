import { useState , useEffect} from "react"
import { ethers } from 'ethers'
import BlockchainDNS from '../abi/contracts/BlockchainDNS.json'

export function useDDNSContract(networkIndex){
    const [contractAddress,setContractAddress] = useState(retrieveContractAddress(networkIndex))
    const [currentAccount,setCurrentAccount] = useState(null)
    const [accounts,setAccounts] = useState([])
    const [contract,setContract] = useState(null)
    useEffect(() =>{
        if(currentAccount && ethers.utils.isAddress(currentAccount)) return
        getUserAccount(setCurrentAccount,setAccounts)
    },[currentAccount])

    useEffect(() =>{
        retrieveContract(contractAddress,setContract)
    },[contractAddress])
    
    return {
        contract,
        contractAddress,
        setContractAddress,
        currentAccount: currentAccount,
        setCurrentAccount: setCurrentAccount,
        accounts,
        setAccounts,
        isAccountConnected: () =>{isAccountConnected()},
        requestWalletConnection: () => {
            let provider = getWeb3Provider()
            requestWalletConnection(provider,setCurrentAccount,setAccounts)
        }
    }
}

//Retrieves network by the order it appears in the JSON file. 
function retrieveContractAddress(networkIndex){
    let networks = BlockchainDNS.networks
    return networks[Object.keys(networks)[networkIndex]].address
}

async function retrieveContract(contractAddress,setContract){
    let provider = getWeb3Provider()
    console.log("Retrieving contract...")
    const signer = await provider.getSigner()
    let contract = await new ethers.Contract(contractAddress,BlockchainDNS.abi,signer)
    setContract(contract)
}

function getWeb3Provider(){
    const gancheUrl = "http://localhost:8545"
    if(usingBrowserWallet()){
        return new ethers.providers.Web3Provider(window.ethereum)
    }
    else
        return new ethers.providers.JsonRpcProvider(gancheUrl)
}

async function isAccountConnected() {
    let provider = getWeb3Provider()
    if(!usingBrowserWallet()){
        return false
    }
    const accounts = await provider.listAccounts()
    return accounts.length > 0;
}

async function getUserAccount(setAccount,setAccounts){
    let provider = getWeb3Provider()
    console.log("Getting user account...")
    let accountConnected = await isAccountConnected(provider)
    if(accountConnected){
        requestWalletConnection(provider,setAccount,setAccounts)
    }
    else{
        setAccount(null)
    }
}

function usingBrowserWallet(){
    return typeof window.ethereum !== 'undefined'
}

async function requestWalletConnection(provider,setCurrentAccount,setAccounts){

    let accounts = [null]
    try{
         accounts = await provider.send("eth_requestAccounts")
    }
    catch (e){
        console.warn("Warning: Failed to retrieve wallet address!")
        accounts = [null]
    }
    finally {
        setCurrentAccount(accounts[0])
        setAccounts(accounts)
    }
    
}
