#!/bin/bash 
xterm -hold -e "ganache-cli -b"
if [[ $? != 0 ]]
then
echo "Ganache did not start"
else 
xterm -hold -e "cd /usr/local/bin | truffle migrate"
fi 