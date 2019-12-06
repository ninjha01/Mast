#!/bin/bash
echo "PWD"
pwd
echo "ls"
ls
cd ios/
echo "PWD ios"
pwd
echo "ls ios"
ls
pod install && pod install --repo-update # unsure if both neccesary
