#!/bin/bash 
#kill app in browser (Google chrome)
wmctrl -c chrome &
#kill app and blockchain at port level
fuser -n tcp -k 3000 &
fuser -n tcp -k 8545 &
#kill all terminal windows 
killall xterm &
wait