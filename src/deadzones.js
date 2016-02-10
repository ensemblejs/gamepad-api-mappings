'use strict';

export function raw (scalar) {
  return scalar;
}

export function normalise (scalar, deadzone = 0) {
  if (scalar === 0) {
    return scalar;
  }

  let absScalar = Math.abs(scalar);
  const normalised = (absScalar - deadzone) / (1 - deadzone);

  return scalar < 0 ? -normalised : normalised;
}

export function axial (scalar, deadzone = 0, post = raw) {
  let magnitude = Math.sqrt(scalar * scalar);

  if (magnitude <= deadzone) {
    return 0;
  }

  if (magnitude > 1) {
    return (scalar < 0) ? -1 : 1;
  }

  return (scalar < 0) ? -post(magnitude, deadzone) : post(magnitude, deadzone);
}

export function radial (coord, deadzone = 0, post = raw) {
  const angle = Math.atan2(coord.y, coord.x);
  let magnitude = Math.sqrt(coord.x * coord.x + coord.y * coord.y);

  if (magnitude <= deadzone) {
    return { x: 0, y: 0 };
  }

  if (magnitude > 1) {
    magnitude = 1;
  }

  return {
    x: Math.cos(angle) * post(magnitude, deadzone),
    y: Math.sin(angle) * post(magnitude, deadzone)
  };
}

function snapToRadian (coord, deadzone, axes, post = raw) {
  const angle = Math.atan2(coord.y, coord.x);
  const snapRadians = Math.PI / axes;
  const newAngle = snapRadians * Math.round(angle / snapRadians);
  let magnitude = Math.sqrt(coord.x * coord.x + coord.y * coord.y);

  if (magnitude <= deadzone) {
    return { x: 0, y: 0 };
  }

  if (magnitude > 1) {
    magnitude = 1;
  }

  return {
    x: Math.cos(newAngle) * post(magnitude, deadzone),
    y: Math.sin(newAngle) * post(magnitude, deadzone)
  };
}

export function way8 (coord, deadzone = 0, post = raw) {
  return snapToRadian(coord, deadzone, 4, post);
}

export function way4 (coord, deadzone = 0, post = raw) {
  return snapToRadian(coord, deadzone, 2, post);
}

export function vertical (coord, deadzone, post = raw) {
  return {
    x: 0,
    y: snapToRadian(coord, deadzone, 2, post).y
  };
}

export function horizontal (coord, deadzone, post = raw) {
  return {
    x: snapToRadian(coord, deadzone, 2, post).x,
    y: 0
  };
}