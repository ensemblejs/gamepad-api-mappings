'use strict';

export const getMapping = require('./get-mapping').getMapping;
export const deadZones = require('./mapping.json').deadZones;

export const rawResult = require('./deadzones').rawResult;
export const normaliseResult = require('./deadzones').normaliseResult;
export const normalizeResult = require('./deadzones').normaliseResult;

export const axial = require('./deadzones').axial;
export const radial = require('./deadzones').radial;

const postMapping = {
  'raw': rawResult,
  'normalised': normaliseResult,
  'normalized': normalizeResult
};

export function axialScalar (coord, deadzone, post) {
  return post(axial(coord, deadzone), deadzone);
}

export function axialVector (coord, deadzone, post) {
  var vector = axialScalar(coord, deadzone);

  return {
    x: post(vector.x, deadzone),
    y: post(vector.y, deadzone)
  };
}

export function radialVector (coord, deadzone, post) {
  var vector = radial(coord, deadzone);

  return {
    x: post(vector.x, deadzone),
    y: post(vector.y, deadzone)
  };
}

const algorithms = {
  'axial': axialVector,
  'radial': radialVector
};

function build (algorithm, mapper = postMapping.normalised) {
  return function applyAlgorithmAndMapping (coord, deadzone) {
    return algorithm(coord, deadzone, mapper);
  } ;
}

export function getDeadzoneAlgorithm (algorithm, mapper) {
  return build(algorithms[algorithm], postMapping[mapper]);
}