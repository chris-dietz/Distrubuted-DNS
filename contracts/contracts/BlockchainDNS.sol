// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.10; 

contract BlockchainDNS {
    struct domain_info {
        address registrar;
        string domain_name;
        string IPAddress;
        bool exists;
    }
    mapping(string => domain_info) public domains;
    mapping(address => domain_info[]) public registered_domains;

    function addAddress(string memory _domainName, string memory _IPAddress) public {
        require(!domains[_domainName].exists); //block double-register
        domain_info memory domain = domain_info({registrar: msg.sender, domain_name: _domainName, IPAddress: _IPAddress, exists: true});
        domains[_domainName] = domain;
        registered_domains[msg.sender].push(domain);
    }

    function getDomainOwner(string memory domainName) public view returns(address){
        return domains[domainName].registrar;
    }
    
    function getIPAddress(string memory domainName) public view returns(string memory){
        return domains[domainName].IPAddress;
    }
    
    function getRegisteredDomains(address lookup)public view returns(domain_info[] memory){
        return registered_domains[lookup];
    }

    function getMyRegisteredDomains()public view returns(domain_info[] memory){
        return registered_domains[msg.sender];
    }

//  this function doesn't work because solidity doesn't allow returns on mappings
//  The only way to return the full mapping is to copy each key and value into an array and then return it.
//  Considering the concept of gas, this isn't really feasible.
//
//  function getDNS() public view returns (mapping(string => string) memory){
//      return addresses;
//  }
}
