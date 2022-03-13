/***************************************************************************************************************************
Copyright © 2022 <Ondřej Tuček>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the “Software”), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject 
to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
***************************************************************************************************************************/
"use strict";

const is = {
  number: (x) => typeof x === "number",
  string: (x) => typeof x === "string",
  bool: (x) => typeof x === "boolean",
  object: (x) => typeof x === "object",
  array: (x) => Array.isArray(x),
};

/** @namespace TwoD */
const TwoD = new Object();

//--------------------------------------------------CANVAS-----------------------------------------------//

/**
 * @constructor
 * @param {number?} width
 * @param {number?} height
 * @param {string?} backgroundColor
 */
TwoD.Frame = function (width, height, backgroundColor) {
  if (is.number(width) && is.number(height) && is.string(backgroundColor)) {
    this._w = width;
    this._h = height;
    this._bg = backgroundColor;
  } else {
    this._w = innerWidth;
    this._h = innerHeight;
    this._bg = "#000";
  }

  this._id = Date.now();

  this._canvas = document.createElement("canvas");
  this._canvas.id = this._id;
  this._canvas.width = this._w;
  this._canvas.height = this._h;
  this._canvas.style.backgroundColor = this._bg;
  this._canvas.innerHTML = `
    <h3>Ohh no!</h3>
    <p>We are teribly sorry, but your browser is not capable of running HTML5.</p>
    <p>Please upgrade your browser <a href="https://www.mozilla.org/en-US/firefox/new/">here</a></p>
  `;
};

/**
 * @param {HTMLElement?} destination
 * @returns {boolean} TRUE on success and FALSE on failure
 * @description inserts a new canvas into HTML, destination is the place where the canvas should be located if specified
 */
TwoD.Frame.prototype.create = function (destination) {
  if (destination) {
    destination.appendChild(this._canvas);
  } else {
    document.body.appendChild(this._canvas);
  }

  return document.getElementById(String(this._id)) ? true : false;
};

/**
 * @param {number} width
 * @param {number} height
 * @description resizes the canvas to desired parameters. Can be used when resizing document
 */
TwoD.Frame.prototype.resize = function (width, height) {
  if (is.number(width) && is.number(height)) {
    this._w = width;
    this._h = height;
    this._canvas.width = this._w;
    this._canvas.height = this._h;
  } else {
    console.error("ERROR:Invalid type passed while resizing Frame instance");
  }
};

/**
 * @returns {CanvasRenderingContext2d} rendering context
 */
TwoD.Frame.prototype.getContext2d = function () {
  return this._canvas.getContext("2d");
};

TwoD.Frame.prototype.getCanvas = function () {
  return this._canvas;
};

TwoD.Frame.prototype.getWidth = function () {
  return this._w;
};

TwoD.Frame.prototype.getHeight = function () {
  return this._h;
};

TwoD.Frame.prototype.getBackgroundColor = function () {
  return this._bg;
};

TwoD.Frame.prototype.getId = function () {
  return this._id;
};

/**
 * @param {number} width
 */
TwoD.Frame.prototype.setWidth = function (width) {
  if (is.number(width)) {
    this._w = width;
    this._canvas.width = this._w;
  } else {
    console.error(`ERROR:Cannot asign type ${typeof width} to number`);
  }
};

/**
 * @param {number} height
 */
TwoD.Frame.prototype.setHeight = function (height) {
  if (is.number(height)) {
    this._h = height;
    this._canvas.height = this._h;
  } else {
    console.error(`ERROR:Cannot asign type ${typeof height} to number`);
  }
};

TwoD.Frame.prototype.setBackgroundColor = function (backgroundColor) {
  if (is.string(backgroundColor)) {
    this._bg = backgroundColor;
    this._canvas.style.backgroundColor = this._bg;
  } else {
    console.error(
      `ERROR:Cannost asign type ${typeof backgroundColor} to string`
    );
  }
};

//--------------------------------------------------MATH-----------------------------------------------//
TwoD.Math = {};

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} random number in range between parameters
 */
TwoD.Math.rand = function (min, max) {
  if (is.number(min) && is.number(max)) {
    return min + Math.random() * (max - min);
  } else {
    console.error(`ERROR:Invalid type passed while creating random number`);
  }
};

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} random number in range between parameters
 */
TwoD.Math.randInt = function (min, max) {
  return Math.floor(this.rand(min, max));
};

/**
 * @param {any[]} array
 */
TwoD.Math.randElement = function (array) {
  if (is.array(array)) {
    return array[Math.round(this.rand(0, array.length - 1))];
  } else {
    console.error("ERROR:Invalid type when selecting random array element");
  }
};

TwoD.Math.randBool = function () {
  return this.randElement([true, false]);
};

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
TwoD.Math.isBetween = function (n, min, max) {
  if (is.number(n) && is.number(min) && is.number(max))
    return n >= min && n <= max;
  else console.error("ERROR:Invalid type passed");
};

/**
 * @param {number} deg
 * @returns {number} degree converted to radian
 */
TwoD.Math.degToRad = function (deg) {
  if (is.number(deg)) return (deg * Math.PI) / 180;
  else
    console.error(
      "ERROR:Invalid type passed while converting degree to radian"
    );
};

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
TwoD.Math.limit = function (n, min, max) {
  if (is.number(n) && is.number(min) && is.number(max))
    return Math.max(min, Math.min(max, n));
  else console.error("ERROR:Invalid type passed");
};

/**
 * @param {TwoD.Vec2} vectorA
 * @param {TwoD.Vec2} vectorB
 * @returns {TwoD.Vec2}
 */
TwoD.Math.addVector = function (vectorA, vectorB) {
  let res = new TwoD.Vec2(0, 0);

  res.x = vectorA.x + vectorB.x;
  res.y = vectorA.y + vectorB.y;

  return res;
};

/**
 * @param {TwoD.Vec2} vectorA
 * @param {TwoD.Vec2} vectorB
 * @returns {TwoD.Vec2}
 */
TwoD.Math.substrVector = function (vectorA, vectorB) {
  let res = new TwoD.Vec2(0, 0);

  res.x = vectorA.x - vectorB.x;
  res.y = vectorA.y - vectorB.y;

  return res;
};

/**
 * @param {TwoD.Vec2} vector
 * @returns {TwoD.Vec2}
 */
TwoD.Math.negateVector = function (vector) {
  let res = new TwoD.Vec2(0, 0);

  res.x = -vector.x;
  res.y = -vector.y;

  return res;
};

/**
 *
 * @param {TwoD.Vec2} vector
 * @param {number} scalar
 * @returns {TwoD.Vec2}
 */
TwoD.Math.scaleVector = function (vector, scalar) {
  let res = new TwoD.Vec2(0, 0);

  res.x = vector.x * scalar;
  res.y = vector.y * scalar;

  return res;
};

/**
 *
 * @param {TwoD.Vec2} vector
 * @param {number} divisor
 * @returns {TwoD.Vec2}
 */
TwoD.Math.divideVector = function (vector, divisor) {
  let res = new TwoD.Vec2(0, 0);

  res.x = vector.x / divisor;
  res.y = vector.y / divisor;

  return res;
};

TwoD.Math.vectorLength = function (vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

TwoD.Math.NULL_VECTOR = { x: 0, y: 0 };
Object.freeze(TwoD.Math.NULL_VECTOR);

//------------------------------------------------PERFORMANCE---------------------------------------------//
TwoD.Perf = {};

/**
 * @private
 * @returns {number}
 */
function _TMPS() {
  return window.performance && window.performance.now
    ? window.performance.now()
    : new Date().getTime();
}

TwoD.Perf._dat = {
  curr: 0,
  last: _TMPS(),
  step: 1 / 60,
};

TwoD.Perf.fps = 0;
TwoD.Perf.dt = 0;

TwoD.Perf.before = function () {
  this._dat.curr = _TMPS();
  this.dt = Math.min(1, (this._dat.curr - this._dat.last) / 1e3);
  this.fps = 1 / this.dt;
};

TwoD.Perf.after = function () {
  this._dat.last = this._dat.curr;
};

/**
 *
 * @param {CanvasRenderingContext2d} ctx
 * @param {number?} x
 * @param {number?} y
 */
TwoD.Perf.drawFPS = function (ctx, x, y) {
  if (is.object(ctx) && is.number(x) && is.number(y)) {
    ctx.font = "15px monospace";
    ctx.fillStyle = "#0F0";
    ctx.fillText(this.fps.toString(), x, y);
  } else {
    console.error("ERROR:Could not render FPS due to invalid type");
  }
};
//--------------------------------------------SHAPES---------------------------------------------//
/**
 * @constructor
 * @param {number?} x
 * @param {number?} y
 */
TwoD.Vec2 = function (x, y) {
  if (is.number(x) && is.number(y)) {
    this.x = x;
    this.y = y;
  } else {
    this.x = 0;
    this.y = 0;
    console.warn(
      "WARNING:Either invalid type or no values where passed while creating a new Vec2"
    );
  }
};

/**
 * @param {TwoD.Vec2} vector
 * @returns {number} distance to different vector
 */
TwoD.Vec2.prototype.distanceTo = function (vector) {
  let x = this.x - vector.x;
  let y = this.y - vector.y;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
TwoD.Rect = function (x, y, width, height) {
  if (is.number(x) && is.number(y) && is.number(width) && is.number(height)) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  } else {
    this.x = 0;
    this.y = 0;
    this.w = 100;
    this.h = 100;
    console.warn(
      "WARNING:Either invalid type or no values where passed while creating a new Rect"
    );
  }
};

/**
 * @param {TwoD.Rect} rect
 * @returns {boolean}
 */
TwoD.Rect.prototype.collision = function (rect) {
  return (
    this.x < rect.x + rect.w &&
    this.x + this.w > rect.x &&
    this.y < rect.y + rect.h &&
    this.y + this.h > rect.y
  );
};

/**
 * @constructor
 * @param {TwoD.Vec2} base - starting position of the line
 * @param {TwoD.Vec2} direction - where it goes
 */
TwoD.Line = function (base, direction) {
  this.base = base || new TwoD.Vec2(0, 0);
  this.direction = direction || new TwoD.Vec2(3, 3);
};

/**
 * @constructor
 * @param {TwoD.Vec2} pointA
 * @param {TwoD.Vec2} pointB
 */
TwoD.LineSegment = function (pointA, pointB) {
  this.pointA = pointA || new TwoD.Vec2(0, 0);
  this.pointB = pointB || new TwoD.Vec2(3, 3);
};

/**
 * @constructor
 * @param {TwoD.Vec2} position
 * @param {number} radius
 */
TwoD.Circle = function (position, radius) {
  this.position = position || new TwoD.Vec2(0, 0);
  this.radius = radius || 30;
};

/**
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} angle
 */
TwoD.OrientedRect = function (x, y, width, height, angle) {
  this.x = x || 0;
  this.y = y || 0;
  this.width = width || 100;
  this.height = height || 100;
  this.angle = angle || 45;
};

//--------------------------------------------COLLISION---------------------------------------------//
TwoD.collision = {};

/**
 * @description are two circles colliding ? yes = true, no = false
 * @param {TwoD.Circle} circleA
 * @param {TwoD.Circle} circleB
 * @returns {boolean}
 */
TwoD.collision.circles = function (circleA, circleB) {
  let radiusSum = circleA.radius + circleB.radius;
  let distance = TwoD.Math.substrVector(circleA.position, circleB.position);

  return TwoD.Math.vectorLength(distance) <= radiusSum;
};

Object.freeze(TwoD);
export { TwoD };