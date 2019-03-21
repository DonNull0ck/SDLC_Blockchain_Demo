#!/bin/bash 
#xterm -hold -e "ganache-cli -b"| wait 

("ganache-cli -b && bash") &&

xterm -e "(cd /home/vpp_BlockchainAdmin/BlockchainGithub/SDLC_Blockchain_Demo/project_code_base;truffle migrate)" | wait #&&

#(cd /home/vpp_BlockchainAdmin/BlockchainGithub/SDLC_Blockchain_Demo/project_code_base/ui;npm start) 