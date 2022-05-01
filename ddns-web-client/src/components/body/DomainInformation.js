import { useState } from "react"
import { Card, CardBody, CardTitle } from "reactstrap"

export default function DomainInformation(props){
    const [owner,setOwner] = useState("")
    setDomainOwner(props.domain,props.DDNSContract,setOwner)
    return(
        <>
            <Card>
                <CardTitle className="font-weight-bold">Domain Information</CardTitle>
                <CardBody>
                    <div><strong>Owner: </strong>{owner}</div>
                    <div><strong>IP Address: </strong>{props.ipAddress}</div>
                </CardBody>
            </Card>
        </>
    )
}

async function setDomainOwner(domain,DDNSContract,setOwner){
    let owner = ""
    try{
       owner = await DDNSContract.contract.getDomainOwner(domain)
    }
    catch(e){
        console.error("Failed to retrieve domain owner")
    }
    finally{
        setOwner(owner)
    }
}