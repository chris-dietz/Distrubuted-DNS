import Search from './Search';
import { searchLookupButtonText, searchRegisterButtonText, searchRegisterPlaceholderText, searchLookupPlaceholderText } from './Body-Constants'
import { useState } from 'react';
import { Card, CardBody } from "reactstrap"

export default function Body(props) {
  const [listOfOwnedDomains, setOwnedDomains] = useState([])
  return (
    <>{RenderPageBody(listOfOwnedDomains, setOwnedDomains, props.DDNSContract)}</>
  )
}

function RenderPageBody(listOfOwnedDomains, setOwnedDomains, DDNSContract) {
  switch (window.location.pathname) {
    case "/manage/":
      getOwnedDomains(listOfOwnedDomains, setOwnedDomains, DDNSContract);
      return (
        <div>
          {listOfOwnedDomains.map(({ IPAddress, domain_name }) => (
            <Card>
              <CardBody>
                <div><strong>Domain: </strong>{domain_name}</div>
                <div><strong>IP Address: </strong>{IPAddress}</div>
              </CardBody>
            </Card>
          ))}
        </div>
      )
    case "/lookup/":
      return (
        <Search DDNSContract={DDNSContract} placeholder={searchLookupPlaceholderText} buttonText={searchLookupButtonText}></Search>
      )
    default:
      return (
        <Search DDNSContract={DDNSContract} placeholder={searchRegisterPlaceholderText} buttonText={searchRegisterButtonText}></Search>
      )
  }
}

async function getOwnedDomains(listOfOwnedDomains, setOwnedDomains, DDNSContract) {
  var DDNSContractMyDomains = await DDNSContract.contract.getMyRegisteredDomains();
  setOwnedDomains(DDNSContractMyDomains);
}