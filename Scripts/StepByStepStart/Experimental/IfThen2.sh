#!/bin/bash 
xterm -hold -e "ganache-cli -b"
if [[ $? != 0 ]]
then
echo "Ganache did not start"
else 
(cd /home/vpp_BlockchainAdmin/BlockchainGithub/SDLC_Blockchain_Demo/project_code_base;truffle migrate) 
#xterm -hold -e "cd /usr/local/bin | truffle migrate"
fi 

