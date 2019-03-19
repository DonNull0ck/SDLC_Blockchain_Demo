#!/bin/bash 
#1 works
xterm -hold -e "cd /home/vpp_BlockchainAdmin/BlockchainGithub/SDLC_Blockchain_Demo/project_code_base/ && bash" | wait  &&
#2
#"truffle compile" #| wait &
#3
xterm -hold -e "ganache-cli -b"| wait 
#4
#xterm -e truffle migrate | wait &
#5
#xterm -e cd /home/vpp_BlockchainAdmin/BlockchainGitHub/SDLC_Blockchain_Demo-master/project_code_base/ui/ | wait &
#6
#xterm -e npm start