DolarHoy2
=========

###Hibrid actualization of Dolar Hoy

ionic plugin add https://github.com/floatinghotpot/cordova-plugin-admob.git

ionic plugin add https://github.com/VersoSolutions/CordovaClipboard


###Set Android in ionic

export ANDROID_HOME=/Applications/android-sdk-macosx
export ANDROID_TOOLS=Applications/android-sdk-macosx/android-sdk/tools/
export ANDROID_PLATFORM_TOOLS=Applications/android-sdk-macosx/platform-tools/
PATH=$PATH:$ANDROID_HOME:$ANDROID_TOOLS:$ANDROID_PLATFORM_TOOLS:.

###In case of broken IOS emulator

sudo npm uninstall ios-sim -g
sudo npm install ios-sim -g
sudo ionic emulate ios


###Clipboard functionality

cordova plugin add https://github.com/VersoSolutions/CordovaClipboard


###Social Sharing functionality

cordova plugin add https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git

###The icons

[www.ionicons.com]