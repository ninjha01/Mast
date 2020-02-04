# Mast

iOS Status:

[![Build status](https://build.appcenter.ms/v0.1/apps/0323f018-70aa-4f18-8632-fe6a8e7b82fd/branches/master/badge)](https://appcenter.ms)

Android Status:

[![Build status](https://build.appcenter.ms/v0.1/apps/1197bbd2-7194-4840-847c-7ff64298bf18/branches/master/badge)](https://appcenter.ms)

# Build docker image

```
docker build https://github.com/ninjha01/mast.git#master
docker tag 5d110b40b972 mast_image
docker run -d  -it --name mast_pipeline -v "$(pwd)":/app mast_image;
docker exec -it mast_pipeline bash
```

# Start stop docker image

```
docker stop
docker start mast_pipeline
docker exec -it mast_pipeline bash
```

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

# Deployment

Internal release notes template:

```
Thank you for being a part of the AllergenGuru Internal Beta program!

Here's what's new:

Navigation:
 - To lay the foundation for new and exciting features, the main screen now has a menu!
   Currently it navigates between the home page and an info page about the Innovations in Allergy Conference.
   Watch this space for more developments!

3D Structure:
 - Biological Assembly 1 is now used by default. Two may be better than one, but displaying monomers improves clarity.
 - Fixed duplicates
 - Fixed missing structure (Der p 23)
 - Styling changes to make viewing structures easy on the eyes

Allergen Page:
 - Added IUIS citation
 - Minor styling improvements

Dev QoL Improvements:
 - Added CICD for pipeline via Github Actions
 - Added linting(flake8) and testing (pytest) to pipeline builds
 - Consolidated/Modularized asset build and db build
   - Module imports now much easier
 - Security patch for mem and pycryptodome

```
