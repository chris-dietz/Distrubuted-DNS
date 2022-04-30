import AccountInfo from "../body/AccountInfo"

export default function Footer(props){
    return <footer>
        <AccountInfo DDNSContract={props.DDNSContract}></AccountInfo>
        {/* CS458 Term Project */}
    </footer>
}