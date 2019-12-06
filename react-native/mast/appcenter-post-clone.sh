#!/bin/bash
npm install
yarn install
cd ios/
pod install && pod install --repo-update # unsure if both neccesary
