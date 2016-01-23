'use strict';

export let getMapping = require('./get-mapping').getMapping;
export let getAxial = require('./deadzones').getAxial;
export let getScaledAxial = require('./deadzones').getScaledAxial;
export let getRadial = require('./deadzones').getRadial;
export let getScaledRadial = require('./deadzones').getScaledRadial;
export const deadZones = require('./mapping.json').deadZones;