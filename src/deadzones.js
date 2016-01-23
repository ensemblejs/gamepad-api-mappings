'use strict';

export function getAxial (coord, deadzone = 0) {
  let magnitude = Math.sqrt(coord * coord);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return (coord < 0) ? -1 : 1;
  }

  return (coord < 0) ? -magnitude : magnitude;
}

export function getScaledAxial (coord, deadzone = 0) {
  let magnitude = Math.sqrt(coord * coord);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return (coord < 0) ? -1 : 1;
  }

  magnitude = (magnitude - deadzone) / (1 - deadzone);

  return (coord < 0) ? -magnitude : magnitude;
}

export function getRadial (coord, deadzone = 0) {
  const angle = Math.atan2(coord.y, coord.x);
  let magnitude = Math.sqrt(coord.x * coord.x + coord.y * coord.y);

  if (magnitude <= deadzone) {
    magnitude = 0;
  }

  if (magnitude > 1) {
    magnitude = 1;
  }

  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle)
  };
}

export function getScaledRadial (coord, deadzone = 0) {
  const angle = Math.atan2(coord.y, coord.x);
  let magnitude = Math.sqrt(coord.x * coord.x + coord.y * coord.y);

  if (magnitude <= deadzone) {
    return {x:0, y:0};
  }

  if (magnitude > 1) {
    magnitude = 1;
  }

  magnitude = (magnitude - deadzone) / (1 - deadzone);

  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle)
  };
}