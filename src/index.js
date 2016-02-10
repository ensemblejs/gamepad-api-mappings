'use strict';

export const getMapping = require('./get-mapping').getMapping;
export const deadZones = require('./mapping.json').deadZones;

export const raw = require('./deadzones').raw;
export const normalise = require('./deadzones').normalise;
export const normalize = require('./deadzones').normalise;

export const axial = require('./deadzones').axial;
export const radial = require('./deadzones').radial;
export const way8 = require('./deadzones').way8;
export const way4 = require('./deadzones').way4;
export const vertical = require('./deadzones').vertical;
export const horizontal = require('./deadzones').horizontal;

const postMapping = {
  'raw': raw,
  'normalised': normalise,
  'normalized': normalize
};


export function axialVector (coord, deadzone, post) {
  return {
    x: axial(coord.x, deadzone, post),
    y: axial(coord.y, deadzone, post),
  };
}

const algorithms = {
  'axial': axialVector,
  'radial': radial,
  '8-way': way8,
  '4-way': way4,
  'horizontal': horizontal,
  'vertical': vertical
};

function build (algorithm, mapper = postMapping.normalised) {
  return function applyAlgorithmAndMapping (coord, deadzone) {
    return algorithm(coord, deadzone, mapper);
  } ;
}

export function getDeadzoneAlgorithm (algorithm, mapper) {
  return build(algorithms[algorithm], postMapping[mapper]);
}