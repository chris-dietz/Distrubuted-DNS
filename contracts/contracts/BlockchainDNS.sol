// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.10; 

contract BlockchainDNS {
    mapping(string => string) public addresses;

    function addAddress(string calldata domainName, string calldata IPAddress) public {
        addresses[domainName] = IPAddress;
    }
    
    function getIPAddress(string calldata domainName) public view returns(string memory){
        return addresses[domainName];
    }

//  this function doesn't work because solidity doesn't allow returns on mappings
//  The only way to return the full mapping is to copy each key and value into an array and then return it.
//  Considering the concept of gas, this isn't really feasible.
//
//  function getDNS() public view returns (mapping(string => string) memory){
//      return addresses;
//  }
}