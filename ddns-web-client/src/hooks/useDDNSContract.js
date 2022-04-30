import { useState , useEffect} from "react"
import { ethers } from 'ethers'
import BlockchainDNS from '../abi/contracts/BlockchainDNS.json'

export function useDDNSContract(networkIndex){
    const provider = getWeb3Provider()
    const [contractAddress,setContractAddress] = useState(retrieveContractAddress(networkIndex))
    const [currentAccount,setCurrentAccount] = useState(null)
    const [accounts,setAccounts] = useState([])
    const [contract,setContract] = useState(null)
    useEffect(() =>{
        getUserAccount(provider,setCurrentAccount,setAccounts)
    },[provider])

    useEffect(() =>{
        retrieveContract(provider,contractAddress,setContract)
    },[contractAddress,provider])
    
    return {
        contract,
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

//Retrieves network by the order it appears in the JSON file. 
function retrieveContractAddress(networkIndex){
    let networks = BlockchainDNS.networks
    return networks[Object.keys(networks)[networkIndex]].address
}

async function retrieveContract(provider,contractAddress,setContract){
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

async function isAccountConnected(provider) {
    if(!usingBrowserWallet()){
        return false
    }
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
