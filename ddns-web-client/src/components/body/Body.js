
import { useDDNSContract } from '../../hooks/useDDNSContract';
import Search from './Search';
import { searchLookupButtonText, searchRegisterButtonText, searchRegisterPlaceholderText, searchLookupPlaceholderText } from './Body-Constants'
import AccountInfo from './AccountInfo';
export default function Body(props) {
    const DDNSContract = useDDNSContract(0) //Assumes first network in the config file, If you deploy to more than one network update this value. 
   return (
    <div>
      {RenderPageBody(DDNSContract)}
      <AccountInfo DDNSContract={DDNSContract}></AccountInfo>
    </div>
  )}

function RenderPageBody(DDNSContract) {
  switch (window.location.pathname) {
    case "/manage/":
      // code block
      break;
    case "/lookup/":
      return (
        <Search DDDNSContract={DDNSContract} placeholder={searchLookupPlaceholderText} buttonText={searchLookupButtonText}></Search>
      )
      // break; // Unnneeded due to return
    default:
      return (
        <Search DDNSContract={DDNSContract} placeholder={searchRegisterPlaceholderText} buttonText={searchRegisterButtonText}></Search>
      )
  }
}