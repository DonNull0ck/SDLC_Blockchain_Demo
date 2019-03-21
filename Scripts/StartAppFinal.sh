#!/bin/bash 
#Note: We are assuming the project has already been compiled once before.
#run ganache (the blockchain) in a seperate terminal and keep it running 
xterm -e ganache-cli -b "$channel", "$channel" &
#run truffle migrate in the project directory to start the build (e.g. sync blockchain and smart contracts)
(cd /home/vpp_BlockchainAdmin/BlockchainGithub/SDLC_Blockchain_Demo/project_code_base;truffle migrate) &
#run npm start where configured (UI directory) to run the React application itself (the interface)
(cd /home/vpp_BlockchainAdmin/BlockchainGithub/SDLC_Blockchain_Demo/project_code_base/ui;npm start) &
wait