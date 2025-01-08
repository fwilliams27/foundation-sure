const fs = require('fs');
const plist = require('plist');

// Path to the Info.plist file
const plistPath = './ios/App/App/Info.plist';

// Read the existing Info.plist
const existingPlist = plist.parse(fs.readFileSync(plistPath, 'utf8'));

// Update permissions
existingPlist['NSLocationWhenInUseUsageDescription'] = 'We need your location while the app is in use.';
existingPlist['NSLocationAlwaysUsageDescription'] = 'We need your location even in the background.';
existingPlist['NSCameraUsageDescription'] = 'We need access to your camera to take photos.';

// Write the updated plist file
fs.writeFileSync(plistPath, plist.build(existingPlist));

console.log('Info.plist updated successfully!');
