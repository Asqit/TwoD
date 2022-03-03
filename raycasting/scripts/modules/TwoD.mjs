/**
 * @namespace TwoD
 */
const TwoD = {};

/**
 * @constructor
 * @param {number} width
 * @param {number} height
 * @param {string} background
 */
TwoD.Frame = function (width, height, background) {
  this.width = width || innerWidth;
  this.height = height || innerHeight;
  this.background = background || "#000";
  this._canvas = document.createElement("canvas");

  this._canvas.width = this.width;
  this._canvas.height = this.height;
  this._canvas.style.background = this.background;
  this._canvas.innerHTML = `Your browser is not capable of running HTML5.`;
};

TwoD.Frame.prototype.getContext2d = function () {
  return this._canvas.getContext("2d");
};

TwoD.Frame.prototype.getCanvas = function () {
  return this._canvas;
};

TwoD.Frame.prototype.getWidth = function () {
  return this.width;
};

TwoD.Frame.prototype.getHeight = function () {
  return this.height;
};

TwoD.Frame.prototype.setWidth = function (width) {
  this.width = width;
};

TwoD.Frame.prototype.setHeight = function (height) {
  this.height = height;
};

TwoD.Frame.prototype.create = function () {
  document.body.appendChild(this._canvas);
};

//==========================================
//                MATH
//==========================================
TwoD.Math = {};

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} random number in range
 */
TwoD.Math.rand = function (min, max) {
  return min + Math.random() * (max - min);
};

TwoD.Math.randInt = function (min, max) {
  return Math.floor(this.rand(min, max));
};

/**
 *
 * @param {any[]} array
 */
TwoD.Math.randElement = function (array) {
  return array[Math.round(this.rand(0, array.length - 1))];
};

TwoD.Math.randBool = function () {
  return this.randElement([true, false]);
};

TwoD.Math.isBetween = function (n, min, max) {
  return n >= min && n < max;
};

/**
 *
 * @param {number} deg - degree
 * @returns degree converted to radians
 */
TwoD.Math.degToRadian = function (deg) {
  return (deg * Math.PI) / 180;
};

/**
 *
 * @param {number} n
 * @param {number} min
 * @param {number} max
 */
TwoD.Math.setLimit = function (n, min, max) {
  return Math.max(min, Math.min(max, n));
};

//==========================================
//              PERFORMANCE
//==========================================
TwoD.Perf = {};

/**
 * @private
 * @returns current timestamp
 */
function _tmps() {
  return window.performance && window.performance.now
    ? window.performance.now()
    : new Date().getTime();
}

TwoD.Perf._data = {
  dt: 0,
  curr: 0,
  last: _tmps(),
  step: 1 / 60,
  fps: 0,
};

/**
 * @name before
 * @description calculates delta time and frames per second
 */
TwoD.Perf.before = function () {
  this._data.curr = _tmps();
  this._data.dt = Math.min(1, (this._data.curr - this._data.last) / 1e3);
  this._data.fps = 1 / this._data.dt;
};

/**
 * @name after
 * @description calculates delta time
 */
TwoD.Perf.after = function () {
  this._data.last = this._data.curr;
};

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 */
TwoD.Perf.drawFps = function (ctx, x, y) {
  ctx.font = "15px monospace";
  ctx.fillStyle = "#0F0";
  ctx.fillText(this._data.fps.toString(), x, y);
};

//==========================================
//          COLLISION / DISTANCE
//==========================================
TwoD.collision = function (rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.w &&
    rectA.x + rectA.w > rectB.x &&
    rectA.y < rectB.y + rectB.h &&
    rectA.y + rectA.h > rectB.y
  );
};

TwoD.distance2d = function (vecA, vecB) {
  let x = vecA.x - vecB.x;
  let y = vecA.y - vecB.y;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

Object.freeze(TwoD);

export { TwoD };
