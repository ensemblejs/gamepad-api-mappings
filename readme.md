# gamepad-api-mappings

The Gamepad API has a standard mapping of axes and buttons. Not all browsers and devices align. This repo is for mapping the combinations onto common names.

This repo is not about reading the input from the gamepad controllers. This repo is after you've got the input and now you want to make sense of it but you're not sure what controller the player has nor do you know what browser the client is on.

Also you want to factor in dead zones and can't be arsed with the maths.

# Usage
~~~shell
npm i gamepad-api-mappings -S
~~~

## Get the map
~~~javascript
import {getMapping} from 'gamepad-api-mappings';

let gamepads = window().navigator.getGamepads();
let gamepad = gamepads[0]; //if you have one

let deviceMap = getMapping(gamepad.id, gamepad.mapping);
~~~

## Getting the force (considering in dead zones)
Deadzones are a way to ignore small input near the centre of the stick (or along an axis). This stops jittery movement when there are no fingers on the stick (human hands are good dampeners).

Included are two supported ways of factoring deadzones into getting the force. One was is to consider the two axes independently, this results in better snapping along the two axes. The second approach considers the axes as one and this results in a better circular dead zone.

### independent dead-zones
~~~javascript
import {getMapping} from 'gamepad-api-mappings';

let gamepads = window().navigator.getGamepads();
let gamepad = gamepads[0]; //if you have one

let deviceMap = getMapping(gamepad.id, gamepad.mapping);
let deadZones = deadZonesTable[deviceMap.deadZone];

let force = getForce(gamepad.buttons[0].value, deadZones['leftTrigger']);
console.log(force);
let force = getForce(gamepad.axes[0], deadZones['leftStick']);
console.log(force);
~~~

## linked dead-zones
~~~javascript
import {getMapping} from 'gamepad-api-mappings';

let gamepads = window().navigator.getGamepads();
let gamepad = gamepads[0]; //if you have one

let deviceMap = getMapping(gamepad.id, gamepad.mapping);
let deadZones = deadZonesTable[deviceMap.deadZone];

const coord = {x: gamepad.axes[0], y: gamepad.axes[1]};
let force = getLinkedForce(coord, deadZones['leftStick']);
console.log(force.x, force.y);
~~~