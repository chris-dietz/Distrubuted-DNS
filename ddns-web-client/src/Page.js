import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Body from "./components/body/Body"
import { useDDNSContract } from "./hooks/useDDNSContract"

export default function Page(){
    const DDNSContract = useDDNSContract(0) //Assumes first network in the config file, If you deploy to more than one network update this value.
    return(
        <>
            <Header></Header>
            <Body DDNSContract={DDNSContract}></Body>
            <Footer DDNSContract={DDNSContract}></Footer>
        </>
    )
}