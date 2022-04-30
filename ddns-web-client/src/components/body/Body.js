import Search from './Search';
import { searchLookupButtonText, searchRegisterButtonText, searchRegisterPlaceholderText, searchLookupPlaceholderText } from './Body-Constants'

export default function Body(props) {
  return (
    <>{RenderPageBody(props.DDNSContract)}</>
  )
}

function RenderPageBody(DDNSContract) {
  switch (window.location.pathname) {
    case "/manage/":
      // code block
      break;
    case "/lookup/":
      return (
        <Search DDNSContract={DDNSContract} placeholder={searchLookupPlaceholderText} buttonText={searchLookupButtonText}></Search>
      )
    // break; // Not needed due to return
    default:
      return (
        <Search DDNSContract={DDNSContract} placeholder={searchRegisterPlaceholderText} buttonText={searchRegisterButtonText}></Search>
      )
  }
}