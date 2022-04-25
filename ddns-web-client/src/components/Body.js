
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
export default function Body(props) {
    const [account, setAccount] = useState(); // state variable to set account.
  
  useEffect(() => {
    async function load() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts")
      setAccount(accounts[0]);
    }
    
    load();
   }, []);
  
   return (
    <div>
      <div>
        Your account is: {account}
      </div>
    </div>
  )}