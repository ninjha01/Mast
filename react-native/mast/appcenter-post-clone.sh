#!/bin/bash
if [ -z "$USER_DEFINED_FIREBASE_API_KEY" ];
then
    # load firebase api from appcenter/github secrets
    # so that react-native-dotenv can expose itcase
    echo "Setting firebase key"
    echo "FIREBASE_API_KEY=$USER_DEFINED_FIREBASE_API_KEY" > .env
fi;
npm install
yarn install
cd ios/
pod repo update
pod install && pod install --repo-update # unsure if both neccesary
