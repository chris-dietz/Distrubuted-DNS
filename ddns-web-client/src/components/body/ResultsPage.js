
import {Card, CardTitle} from 'reactstrap'
import DomainRegisterationModal from './DomainRegistrationModal'
import { ipAddressPlaceholderText } from './Body-Constants'
import DomainInformation from './DomainInformation'
export default function ResultsPage(props){
    let query = props.query
    let isDomainAvailable = props.isDomainAvailable
    return(
        <Card
        outline
        body
         color = {isDomainAvailable ?  "success":"danger"}>
            <CardTitle>The domain {query} {isDomainAvailable? "is": "isn't"} available</CardTitle>
            {
                isDomainAvailable? 
                <DomainRegisterationModal DDNSContract={props.DDNSContract} domain={query} placeholder={ipAddressPlaceholderText}></DomainRegisterationModal>
                :<DomainInformation DDNSContract={props.DDNSContract} domain={query} ipAddress={props.ipAddress}></DomainInformation>
            }
            
        </Card>
    )
    
}




