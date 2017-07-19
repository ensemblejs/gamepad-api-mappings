import {getMapping} from '../src/index.js';

let $d = document.createElement('div'); // fake, overwritten


window.addEventListener('load', () =>{
  $d = document.querySelector('#debug');
  debug('waiting for gamepad...');

  let check = setInterval(() => {
    let gamepads = window.navigator.getGamepads();
    if (!gamepads.length) return; //ffox no gamepad
    if (gamepads[0] === null) return; // chrome no gamepaD
    clearInterval(check);
    debug('gamepad detected !');
    gmap();
  }, 1000);

});

const debug = (text) => {
  const $line = document.createElement('div');
  $line.innerText = text;
  $d.appendChild($line);
};

const gmap = () => {
  let gamepad = window.navigator.getGamepads()[0];
  const deadZonesTable = [];
  console.log(gamepad);

  let deviceMap = getMapping(gamepad.id, gamepad.mapping);
  let deadZones = deadZonesTable[deviceMap.deadZone];
  console.log(deviceMap)
  listen();
};

const listen = () => {
  let gamepad = window.navigator.getGamepads()[0];
  let deviceMap = getMapping(gamepad.id, gamepad.mapping);
  gamepad.buttons.forEach((b, i)=>{
    if (b.pressed === true) {
      debug(`${deviceMap.buttons[i]} is down`);
    }
  });
  setTimeout(()=>listen(), 200);
};
