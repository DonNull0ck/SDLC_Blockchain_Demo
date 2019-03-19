#!/bin/bash
clic=$@
if [ -d $clic ]; then
dir = $clic
else 
dir = "'dirname \"$clic\"'/"
fi
xterm -e "cd $dir && sudo su $USER" & pause  