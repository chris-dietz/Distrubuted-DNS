
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import Search from './Search';
import {searchRegiserPlaceholderText} from './Body-Constants'
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
      {RenderPageBody()}
      <div>
        Your account is: {account}
      </div>
    </div>
  )}

function RenderPageBody() {
  switch (window.location.pathname) {
    case "/manage/":
      // code block
      break;
    case "/lookup/":
      // code block
      break;
    default:
      return (
        <Search placeholder={searchRegiserPlaceholderText}></Search>
      )
  }
}