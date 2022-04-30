
import { useDDNSContract } from '../../hooks/useDDNSContract';
import Search from './Search';
import { searchLookupButtonText, searchRegisterButtonText, searchRegisterPlaceholderText, searchLookupPlaceholderText } from './Body-Constants'
import AccountInfo from './AccountInfo';
export default function Body(props) {
    const DDNSContract = useDDNSContract("")
   return (
    <div>
      {RenderPageBody()}
      <AccountInfo DDNSContract={DDNSContract}></AccountInfo>
    </div>
  )}

function RenderPageBody() {
  switch (window.location.pathname) {
    case "/manage/":
      // code block
      break;
    case "/lookup/":
      return (
        <Search placeholder={searchLookupPlaceholderText} buttonText={searchLookupButtonText}></Search>
      )
      // break; // Unnneeded due to return
    default:
      return (
        <Search placeholder={searchRegisterPlaceholderText} buttonText={searchRegisterButtonText}></Search>
      )
  }
}