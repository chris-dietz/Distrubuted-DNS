import { Input, Button, Form, FormFeedback, FormGroup } from "reactstrap"
import ResultsPage from "./ResultsPage"
import { useState } from "react"
import { registrationFormValidationRegex, invalidDomainErrorMessage } from "./Body-Constants"


export default function Search(props) {
    const [showResults, setShowResults] = useState(false)
    const [query, setQuery] = useState("")
    const [domainAvailable, setDomainAvaliable] = useState(false)
    const [invalidInput, setInvalidInput] = useState(false)

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
            {showResults ? <ResultsPage DDNSContract={props.DDNSContract} query={query} isDomainAvailable={domainAvailable} /> : null}
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
            setDomainAvaliable(await isDomainAvailable(query,props.DDNSContract))
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

//Function will eventually call the etherieum contract to determine if a domain is available
//For now just return true unless it uses the test domain alreadytaken.csu
async function isDomainAvailable(queryString,DDNSContract) {
    let domainAvailable = false
    try{
        domainAvailable = await DDNSContract.contract.getIPAddress(queryString)
    }catch(e){
        console.error("Failed to search for domain! " + e)
    }
    finally{
        return domainAvailable === ""
    }
}