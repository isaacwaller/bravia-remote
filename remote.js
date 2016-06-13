var bravia = require('bravia')('192.168.1.106');

var useElectron = true;

bravia.mac = "D8:D4:3C:A9:97:78";

// Hardcode cookie
var request = require('request');
var jar = request.jar();
var cookie = request.cookie("auth=0c7e6a4582e17bbdb6b0e74678611c9ee9535a9e8065d2b2c59f1a83e95bb274");
jar.setCookie(cookie, 'http://192.168.1.106');
bravia.cookieJar = jar;

var lastPressTime = new Date().getTime();
function pressHandler(command) {
    if ((new Date().getTime() - lastPressTime) > 90) {
        bravia.exec(command);
        lastPressTime = new Date().getTime();
    }
}

if (!useElectron) {
  bravia.exec('VolumeUp');
  return;
}

var electron = require('electron');
var app = electron.app;
var globalShortcut = electron.globalShortcut;

app.on('ready', () => {
  var up = globalShortcut.register('VolumeUp', () => {
    pressHandler('VolumeUp');
  });
  var down = globalShortcut.register('VolumeDown', () => {
    pressHandler('VolumeDown');
  });
  var mute = globalShortcut.register('VolumeMute', () => {
    bravia.exec('Mute');
  });
  var powerOn = globalShortcut.register('PageUp', () => {
    bravia.exec('PowerOn');
  });
  var powerOff = globalShortcut.register('PageDown', () => {
    bravia.exec('PowerOff');
  });

  if (!up || !down || !mute) {
    console.log('registration failed');
  }

});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
