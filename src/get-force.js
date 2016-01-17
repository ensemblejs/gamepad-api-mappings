'use strict';

export function getLinkedForce (x, y, deadzone) {
  let magnitude = Math.sqrt(x * x + y * y);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return 1;
  }

  return magnitude;
}

export function getForce (coord, deadzone) {
  let magnitude = Math.sqrt(coord * coord);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return (coord < 0) ? -1 : 1;
  }

  return (coord < 0) ? -magnitude : magnitude;
}