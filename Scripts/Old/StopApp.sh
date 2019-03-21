#!/bin/bash

echo test

#Begin Comment Block
#: << 'END'

if ["$RUNNING_IN_NEW_XTERM" != t] ; then
  RUNNING_IN_NEW_XTERM = t exec xterm -e "$0 $*"
fi

shopt -s expand_aliases

#Variable (alias) to kill any process running on port 3000.
#fuser is a Unix utility which should be on just about any *NIX OS
#Port 3000 is where the react application itself runs by default.
#May enhance to kill port 3001, 3002, etc.in case multiple instances are running.
#Other enhancements pending

alias kill3000 = "fuser -n tcp -k 3000"

#Variable (alias) to kill any process running on port 8545.
#Port 8545 is where the Blockchain itself runs by default (ganache command line version).
#May enhance to also kill the GUI version which by default runs on port 7545 if running.
#Other enhancements pending

alias kill8545 = "fuser -n tcp -k 8545"

#Use aliases to kill processes
kill3000
kill8545

#END
#End Comment Block

exit 0