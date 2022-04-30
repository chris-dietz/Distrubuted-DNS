import { Button, Alert} from "reactstrap"


export default function AccountInfo(props){
    const DDNSContract = props.DDNSContract
    return (
        <div>
            {
            DDNSContract.currentAccount !== null?
          <DisplayAccountInfo DDNSContract={DDNSContract} ></DisplayAccountInfo>:
           <AccountNotConnected DDNSContract={DDNSContract}></AccountNotConnected>
            }
        </div>
      )
}

function DisplayAccountInfo(props){
    let account = props.DDNSContract.currentAccount
    return (
        <Alert color="success">
            Using account: {account}
        </Alert>
    )
}


function AccountNotConnected(props){
    let DDNSContract = props.DDNSContract
    return (
            <Alert color="danger">Wallet Not Connected
            {'  '}
            <Button  onClick={DDNSContract.requestWalletConnection}>Connect</Button>
            </Alert>
    )
}
