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

## Get the force (factoring in dead zones)
~~~javascript
import {getMapping} from 'gamepad-api-mappings';

let gamepads = window().navigator.getGamepads();
let gamepad = gamepads[0]; //if you have one

let deviceMap = getMapping(gamepad.id, gamepad.mapping);
let deadZones = deadZonesTable[deviceMap.deadZone];

let force = getForce(gamepad.buttons[0].value, deadZones['leftTrigger']);
let force = getForce(gamepad.axes[0], deadZones['leftStick']);
~~~