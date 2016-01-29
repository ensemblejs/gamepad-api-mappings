# gamepad-api-mappings

The Gamepad API has a standard mapping of axes and buttons. Not all browsers and devices align. This repo is for mapping the combinations onto common names.

This repo is not about reading the input from the gamepad controllers. This repo is after you've got the input and now you want to make sense of it but you're not sure what controller the player has nor do you know what browser the client is on.

Also you want to factor in dead zones and adjusting the result to suit your game.

# Usage
~~~shell
npm i gamepad-api-mappings -S
~~~

## Get the map
~~~javascript
import {getMapping} from 'gamepad-api-mappings';

let gamepads = window().navigator.getGamepads();
let gamepad = gamepads[0];

let deviceMap = getMapping(gamepad.id, gamepad.mapping);
~~~

## Getting the force (considering in dead zones)
Deadzones are a way to ignore small input near the centre of the stick (or along an axis). This stops jittery movement when there are no fingers on the stick (human hands are good dampeners).

Included are two supported ways of factoring deadzones into getting the force. One was is to consider the two axes independently, this results in better snapping along the two axes. The second approach considers the axes as one and this results in a better circular dead zone.

### axial deadzones
~~~javascript
import {getMapping, axialVector, axialScalar, rawResult} from 'gamepad-api-mappings';

let gamepads = window().navigator.getGamepads();
let gamepad = gamepads[0];

let deviceMap = getMapping(gamepad.id, gamepad.mapping);
let deadZones = deadZonesTable[deviceMap.deadZone];

let force = axialScalar(gamepad.buttons[0].value, deadZones['leftTrigger'], rawResult);
console.log(force);
let force2 = axialVector(gamepad.axes[0], deadZones['leftStick'], rawResult);
console.log(force2.x, force2.y);
~~~

### radial deadzones
~~~javascript
import {getMapping, radialVector, rawResult} from 'gamepad-api-mappings';

let gamepads = window().navigator.getGamepads();
let gamepad = gamepads[0];

let deviceMap = getMapping(gamepad.id, gamepad.mapping);
let deadZones = deadZonesTable[deviceMap.deadZone];

const coord = {x: gamepad.axes[0], y: gamepad.axes[1]};
let force = radialVector(coord, deadZones['leftStick'], rawResult);
console.log(force.x, force.y);
~~~

## Post processing
The problem with the functions above is that input is zero and then jumps to 0.2 or 0.25 or whatever the size of the dead zone is. The jump is but half of it. With a dead zone of 0.25 we are losing a quarter of the resolution.

We support running the result through another function to smooth it out and make use of the full range of 0.0 to 1.0.

We have two mapping algorithms: `raw` and `normalised`. The raw version is in the examples above and does not change the output.

Normalised adjusts the remaining distance so it scales linearly after the dead zone from 0.0 to 1.0.

~~~javascript
import {radialVector, rawResult, normaliseResult} from 'gamepad-api-mappings';

const coord = {x: 0.3, y: 0.9};
let raw = radialVector(coord, 0.25, rawResult);
let normalised = radialVector(coord, 0.25, normaliseResult);
console.log(raw.x, raw.y);                //(0.3, 0.9)
console.log(normalised.x, normalised.y);  //(0.07, 0.86)
~~~

