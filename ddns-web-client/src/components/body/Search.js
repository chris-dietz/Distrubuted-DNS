import { Input, Button, Form, FormFeedback, FormGroup, Row, Col } from "reactstrap"
import ResultsPage from "./ResultsPage"
import { useState } from "react"
import { searchButtonText, testDomain, registrationFormValidationRegex, invalidDomainErrorMessage } from "./Body-Constants"

export default function Search(props) {
    const [showResults, setShowResults] = useState(false)
    const [query, setQuery] = useState("")
    const [domainAvailable, setDomainAvaliable] = useState(false)
    const [invalidInput, setInvalidInput] = useState(false)

    return (
        <div>
            <Form onSubmit={(e) => handleSearch(e)}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Input invalid={invalidInput} type="search" placeholder={props.placeholder} onChange={(e) => handleUserTyping(e.target.value)}></Input>
                            <FormFeedback invalid="true" >{invalidDomainErrorMessage}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <Button type="submit">{searchButtonText}</Button>
                    </Col>
                </Row>
            </Form>
            {showResults ? <ResultsPage query={query} isDomainAvailable={domainAvailable} /> : null}
        </div>
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

    function handleSearch(e) {
        e.preventDefault()
        if (validateInput(query)) {
            setShowResults(true)
            setDomainAvaliable(isDomainAvailable(query))
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
function isDomainAvailable(queryString) {
    return queryString !== testDomain
}