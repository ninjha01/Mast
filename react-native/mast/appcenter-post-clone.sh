#!/bin/bash
if [ -z "$FIREBASE_API_KEY" ];
   # load firebase api from appcenter/github secrets
   # so that react-native-dotenv can expose itcase 
   echo "$FIREBASE_API_KEY" > .env 
npm install
yarn install
cd ios/
pod install && pod install --repo-update # unsure if both neccesary
