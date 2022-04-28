import { Button, Alert, Row, Col } from "reactstrap"


export default function AccountInfo(props){
    const DDNSContract = props.DDNSContract
    return (
        <div>
            {
            DDNSContract.account !== null?
          displayAccountInfo(DDNSContract.account): accountNotConnected(DDNSContract)
            }
        </div>
      )
}

function displayAccountInfo(account){
    return (
        <Alert color="success">
            Your account is: {account}
        </Alert>
    )
}

function accountNotConnected(DDNSContract){
    return (
            <Alert color="danger">Wallet Not Connected
            <Button onClick={DDNSContract.connectToWallet}>Connect</Button>
            </Alert>
    )
}
