import { useState } from "react";
import { Modal, ModalBody, ModalHeader,ModalFooter, Button, Form, FormGroup, FormFeedback, Input, Label } from "reactstrap";
import { ipValidationRegex, invalidIPErrorMessage } from "./Body-Constants";
export default function DomainRegisterationModal(props){
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const toggle = () => setShow(!show);
  const [ipAddress,setIpAddress] = useState("")
  const [invalidInput, setInvalidInput] = useState(false)
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Register
      </Button>

      <Modal isOpen={show} toggle={toggle}>
      <Form onSubmit={(e) => handleFormSubmit(e)}>
        <ModalHeader toggle={toggle}>
            
          <div>Register {props.domain}</div>
        </ModalHeader>
        <ModalBody>
                <FormGroup>
                    <Label for="ipAddressField">IP Address</Label>
                    <Input id="ipAddressField" invalid={invalidInput} type="search" placeholder={props.placeholder} onChange={(e) => handleUserTyping(e.target.value)}></Input>
                    <FormFeedback invalid="true" >{invalidIPErrorMessage}</FormFeedback>
                </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </ModalFooter>
        </Form>
      </Modal>
    </>
  ); 

  function handleUserTyping(ip){
      setIpAddress(ip)
      setInvalidInput(false)
  }

  async function handleFormSubmit(e){
    e.preventDefault()
    if(validateInput(ipAddress)){
        let domainRegistered = await registerDomain(props.DDNSContract,props.domain,ipAddress)
        if(domainRegistered)
            handleClose()
    }
    else{
        setInvalidInput(true)
    }
  }
}

async function registerDomain(DDNSContract,domain,ipAddress){
    try{
        await DDNSContract.contract.addAddress(domain,ipAddress)
    }catch(e){
        console.warn("User rejected domain registration =(")
        return false
    }
    return true
}

function validateInput(input){
    return ipValidationRegex.test(input)
}