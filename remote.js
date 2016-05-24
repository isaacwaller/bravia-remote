var bravia = require('bravia')('192.168.1.106');
var electron = require('electron');
var app = electron.app;
var globalShortcut = electron.globalShortcut;

bravia.mac = "D8:D4:3C:A9:97:78";

var lastPressTime = new Date().getTime();
function pressHandler(command) {
    if ((new Date().getTime() - lastPressTime) > 80) {
        bravia.exec(command);
        lastPressTime = new Date().getTime();
    }
}

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