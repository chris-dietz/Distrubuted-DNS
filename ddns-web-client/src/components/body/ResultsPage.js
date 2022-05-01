
import {Card, CardTitle} from 'reactstrap'
import DomainRegisterationModal from './DomainRegistrationModal'
import { ipAddressPlaceholderText } from './Body-Constants'
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
                :null
            }
            
        </Card>
    )
    
}




