#!/bin/bash

### Pipeline
## Python
pip install -r requirements.txt
pre-commit install
### React Native
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8

## Node
cd react-native/mast/
npm install && yarn install

## iOS
cd ios/
pod install && pod install --repo-update # unsure if both neccesary
cd ../../..
