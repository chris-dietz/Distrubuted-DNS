import {Input,Button} from "reactstrap"
import ResultsPage from "./ResultsPage"
import { useState } from "react"
    
export default function Search(props){
    const [showResults, setShowResults] = useState(false)
    const [query,setQuery] = useState("")
    const [domainAvailable,setDomainAvaliable] = useState(false)
    
    return (
    <div>
        <Input type="search" placeholder={props.placeholder} onChange={(e) =>handleUserTyping(e.target.value)}></Input>
        <Button onClick={handleButtonClick}>Search</Button>
        { showResults ? <ResultsPage query={query} isDomainAvailable={domainAvailable} /> : null }
    </div>
    )

    function handleUserTyping(query){
        setQuery(query)
        setShowResults(false)
    }

    function handleButtonClick(){
        setShowResults(true)
        setDomainAvaliable(isDomainAvailable(query))
    }
}

//Function will eventually call the etherieum contract to determine if a domain is available
//For now just return true unless it uses the test domain alreadytaken.csu
function isDomainAvailable(queryString){
    return queryString !== "alreadytaken.csu"
}