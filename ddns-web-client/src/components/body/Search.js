import {Input,Button,Form, FormFeedback, FormGroup} from "reactstrap"
import ResultsPage from "./ResultsPage"
import { useState } from "react"
import { searchButtonText , testDomain, registrationFormValidationRegex,invalidDomainErrorMessage} from "./Body-Constants"
    
export default function Search(props){
    const [showResults, setShowResults] = useState(false)
    const [query,setQuery] = useState("")
    const [domainAvailable,setDomainAvaliable] = useState(false)
    const [invalidInput,setInvalidInput] = useState(false)
    
    return (
    <div>
        <Form onSubmit={(e) => handleSearch(e)}>
            <FormGroup>
                <Input invalid={invalidInput} type="search" placeholder={props.placeholder} onChange={(e) =>handleUserTyping(e.target.value)}></Input>
                <Button >{searchButtonText}</Button>
                <FormFeedback invalid="true" >{invalidDomainErrorMessage}</FormFeedback>
            </FormGroup>
        </Form>
        { showResults ? <ResultsPage query={query} isDomainAvailable={domainAvailable} /> : null }
    </div>
    )

    function handleUserTyping(query){
        setQuery(query)
        setShowResults(false)
        setInvalidInput(false)
    }

    function handleSearch(e){
        e.preventDefault()
        if(validateInput(query)){
            setShowResults(true)
            setDomainAvaliable(isDomainAvailable(query))
        }
        else{
            setInvalidInput(true)
        }

    }
}


function validateInput(query){
    return registrationFormValidationRegex.test(query)
}

//Function will eventually call the etherieum contract to determine if a domain is available
//For now just return true unless it uses the test domain alreadytaken.csu
function isDomainAvailable(queryString){
    return queryString !== testDomain
}