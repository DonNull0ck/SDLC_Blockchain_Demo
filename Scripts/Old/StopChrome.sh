#!/bin/bash

#close chrome window
wmctrl -c chrome

#alternative way
pkill --oldest chrome

#close specfic tab
# form: wmctrl -c "tab title"
# to test open a new chrome window
# and try in terminal: <wmctrl -c "New Tab"> 
wmctrl -c "React App"