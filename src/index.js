'use strict';

export const getMapping = require('./get-mapping').getMapping;
export const getAxial = require('./deadzones').getAxial;
export const getScaledAxial = require('./deadzones').getScaledAxial;
export const getRadial = require('./deadzones').getRadial;
export const getScaledRadial = require('./deadzones').getScaledRadial;
export const deadZones = require('./mapping.json').deadZones;

const deadzoneOptions = {
  'axial': function axial (stick, deadzone) {
    return {
      x: getAxial(stick.x, deadzone),
      y: getAxial(stick.y, deadzone)
    };
  },
  'scaled-axial': function scaledAxial (stick, deadzone) {
    return {
      x: getScaledAxial(stick.x, deadzone),
      y: getScaledAxial(stick.y, deadzone)
    };
  },
  'radial': getRadial,
  'scaled-radial': getScaledRadial
};

export function pickDeadzone (option) {
  return deadzoneOptions[option];
}