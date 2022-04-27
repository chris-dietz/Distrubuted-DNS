
import {Card, CardTitle} from 'reactstrap'
export default function ResultsPage(props){
    let query = props.query
    let isDomainAvailable = props.isDomainAvailable
    return(
        <Card
        outline
        body
         color = {isDomainAvailable ?  "success":"danger"}>
            <CardTitle>The domain {query} {isDomainAvailable? "is": "isn't"} available</CardTitle>
        </Card>
    )
    
}




