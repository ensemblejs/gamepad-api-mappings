'use strict';

var expect = require('expect');
var raw = require('../lib/deadzones').raw;
var normalise = require('../lib/deadzones').normalise;

describe('raw results', function () {
  it('should return the supplied value.', function () {
    expect(raw(-1.0, 0.25)).toEqual(-1.0);
    expect(raw(-0.75, 0.25)).toEqual(-0.75);
    expect(raw(-0.5, 0.25)).toEqual(-0.5);
    expect(raw(-0.26, 0.25)).toEqual(-0.26);
    expect(raw(-0.25, 0.25)).toEqual(-0.25);
    expect(raw(0, 0.25)).toEqual(0.0);
    expect(raw(0.25, 0.25)).toEqual(0.25);
    expect(raw(0.26, 0.25)).toEqual(0.26);
    expect(raw(0.5, 0.25)).toEqual(0.5);
    expect(raw(0.75, 0.25)).toEqual(0.75);
    expect(raw(1.0, 0.25)).toEqual(1.0);
  });
});

describe('normalise result', function () {
  it('should normalise input greater than the deadzone', function () {
    expect(normalise(-1.0, 0.25)).toEqual(-1.0);
    expect(normalise(-0.75, 0.25)).toEqual(-0.6666666666666666);
    expect(normalise(-0.5, 0.25)).toEqual(-0.3333333333333333);
    expect(normalise(-0.26, 0.25)).toEqual(-0.013333333333333345);
    expect(normalise(-0.25, 0.25)).toEqual(0.0);
    expect(normalise(0, 0.25)).toEqual(0.0);
    expect(normalise(0.25, 0.25)).toEqual(0.0);
    expect(normalise(0.26, 0.25)).toEqual(0.013333333333333345);
    expect(normalise(0.5, 0.25)).toEqual(0.3333333333333333);
    expect(normalise(0.75, 0.25)).toEqual(0.6666666666666666);
    expect(normalise(1.0, 0.25)).toEqual(1.0);
  });
});