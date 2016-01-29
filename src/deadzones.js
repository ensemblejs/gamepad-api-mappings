'use strict';

export function axial (scalar, deadzone = 0) {
  let magnitude = Math.sqrt(scalar * scalar);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return (scalar < 0) ? -1 : 1;
  }

  return (scalar < 0) ? -magnitude : magnitude;
}

export function radial (coord, deadzone = 0) {
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

export function rawResult (scalar) {
  return scalar;
}

export function normaliseResult (scalar, deadzone = 0) {
  if (scalar === 0) {
    return scalar;
  }

  const absScalar = Math.abs(scalar);
  const normalised = (absScalar - deadzone) / (1 - deadzone);

  return scalar < 0 ? -normalised : normalised;
}