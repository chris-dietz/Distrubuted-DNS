import { Input, Button, Form, FormFeedback, FormGroup } from "reactstrap"
import ResultsPage from "./ResultsPage"
import { useState } from "react"
import { registrationFormValidationRegex, invalidDomainErrorMessage } from "./Body-Constants"


export default function Search(props) {
    const [showResults, setShowResults] = useState(false)
    const [query, setQuery] = useState("")
    const [domainAvailable, setDomainAvaliable] = useState(false)
    const [invalidInput, setInvalidInput] = useState(false)
    const [ipAddress,setipAddress] = useState("")

    return (
        <>
            <Form onSubmit={(e) => handleSearch(e)}>
                <FormGroup>
                    <div className="sameLine">
                        <Input invalid={invalidInput} type="search" placeholder={props.placeholder} onChange={(e) => handleUserTyping(e.target.value)}></Input>
                        <Button type="submit">{props.buttonText}</Button>
                    </div>
                    <FormFeedback invalid="true" >{invalidDomainErrorMessage}</FormFeedback>
                </FormGroup>
            </Form>
            {showResults ? <ResultsPage DDNSContract={props.DDNSContract} query={query} isDomainAvailable={domainAvailable}  ipAddress={ipAddress}/> : null}
        </>
    )

    function handleUserTyping(query) {
        setQuery(query)
        if (showResults) {
            setShowResults(false)
        }
        if (invalidInput) {
            setInvalidInput(false)
        }
    }

    async function handleSearch(e) {
        e.preventDefault()
        if (validateInput(query)) {
            let ip = await lookupDomain(query,props.DDNSContract)
            setDomainAvaliable(ip === "")
            setipAddress(ip)
            setShowResults(true)
        }
        else {
            setInvalidInput(true)
        }

    }
}


function validateInput(query) {
    return registrationFormValidationRegex.test(query)
}



async function lookupDomain(queryString,DDNSContract) {
    let ipAddress = ""
    try{
        ipAddress = await DDNSContract.contract.getIPAddress(queryString)
    }catch(e){
        console.error("Failed to search for domain! " + e)
    }
    finally{
        return ipAddress
    }
}