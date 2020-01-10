# Mast

iOS Status:

[![Build status](https://build.appcenter.ms/v0.1/apps/0323f018-70aa-4f18-8632-fe6a8e7b82fd/branches/master/badge)](https://appcenter.ms)

Android Status:

[![Build status](https://build.appcenter.ms/v0.1/apps/1197bbd2-7194-4840-847c-7ff64298bf18/branches/master/badge)](https://appcenter.ms)

# Todo

[ ] Create Loading animation/Video
[ ] Display while Video is Loading
[ ] Create No Internet connection modal
[ ] Display when not connected

- [x] Add Video to Allergen Page
  - [x] Set up Firebase Storage
  - [x] Add UI elements

# Setup DB build

```
conda create -n mast python=3.7
source activate mast
pip install -r requirements.txt
pre-commit install
```

# Set up react native

## Common

```
brew install node
brew install watchman
cd react-native/mast/;
npm install
yarn install
cd ios/;
pod install
pod install --repo-update # not sure if both are necessary
```

## iOS

setup Xcode

```
sudo gem install cocoapods
```

## Android

```
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8

brew cask install android-studio
```

Set up android studio according to:

put

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

into `~/.bash_profile`

`source ~/.bash_profile`
