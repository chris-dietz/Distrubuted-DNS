#!/bin/bash
cd contracts/
truffle compile 
truffle migrate --reset
if [ $? -ne 0 ]; then
    echo "Deploy failed. Is ganche running?"
    exit 1
fi
cd ..
cd ddns-web-client/
npm start
