
import { useEffect, useState } from 'react';
import Web3 from 'web3';
export default function Body(props) {
    const [account, setAccount] = useState(); // state variable to set account.
  
  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const accounts = await web3.eth.requestAccounts();
      
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