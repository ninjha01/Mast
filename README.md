# mast

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
