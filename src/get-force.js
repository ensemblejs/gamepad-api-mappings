'use strict';

export function getLinkedForce (coord, deadzone = 0) {
  const angle = Math.atan(coord.y / coord.x);
  let magnitude = Math.sqrt(coord.x * coord.x + coord.y * coord.y);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return 1;
  }

  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle)
  };
}

export function getForce (coord, deadzone = 0) {
  let magnitude = Math.sqrt(coord * coord);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return (coord < 0) ? -1 : 1;
  }

  return (coord < 0) ? -magnitude : magnitude;
}