#!/bin/bash

#Begin Comment Block
#: << 'END'

#This is an attempt to open several xterm windows from script without closing.
#See this link for detailed explanation how/why
# https://stackoverflow.com/questions/11668558/open-several-xterm-windows-from-script-without-closing
#Might have to wrap whole script in this
export SHELL = /bin/bash

while [ $# != 0 ]
do
    CMD="$1" \
    xterm -xrm '*titeInhibit:true' -e $SHELL -c '$SHELL -c "$CMD"; read'
    shift 1
done

echo test

#This is an attempt to avoid needing to chain scripts together (having another script where all it does is call this script)
#See this link for detailed explanation how/why
#https://www.linuxquestions.org/questions/programming-9/bash-script-call-xterm-and-run-in-it-619447/
#Might have to wrap whole script in this
if ["$RUNNING_IN_NEW_XTERM" != t] ; then
  RUNNING_IN_NEW_XTERM = t exec xterm -e "$0 $*"
fi

shopt -s expand_aliases

#assign the director variables we will be using
#aiming at the GitHub for now since that is the working/final version
#note that we do not need to specfiy where ganache runs, just that it runs seperately
alias projectDir = "cd /home/vpp_BlockchainAdmin/BlockchainGitHub/SDLC_Blockchain_Demo-master/project_code_base/"
alias uiDir = "cd /home/vpp_BlockchainAdmin/BlockchainGitHub/SDLC_Blockchain_Demo-master/project_code_base/ui/"

#assign the variables for the truffle commands
alias truffleCompile = "truffle compile"
alias truffleMigrate = "truffle migrate"

#assing the variable for the ganache command
alias ganacheStart = "ganache-cli -b"

#assign the variable for npm
alias npmStart = "npm start"

#execute commands in the necessary order.

#1. Go to project director (projectDir)
#2. Run truffle compile (in case the repo you are aiming at has not compiled yet). Note: this is optional (truffleCompile)
#3. Create an instance of the Blockchain (ganacheStart)
#4. Run truffle migrations (run Truffle's managed deploy scripts e.g. Migrations.sol for the app and Blockchain. (truffleMigrate)
#5. Go to the UI folder (where the react's web app components live) (uiDir)
#6. Run npm start, which is mapped in the project configuration to start the app itself. (npmStart)

#The pipes "|" are to send the output of each step to the next step.
#Wait forces the app to suspend execution of the current process unitl one of its child processes terminates
#And the "&" is to string the process together. Order matters! Rearranging will change execution order.

#1
xterm -e projectDir | wait &
#2
xterm -e truffleCompile | wait &
#3
xterm -e ganacheStart| wait &
#4
xterm -e truffleMigrate | wait &
#5
xterm -e uiDir | wait &
#6
xterm -e npmStart

#END
#End Comment Block
exit 0