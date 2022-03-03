/*** @namespace TwoD*/
let TwoD = {};

TwoD = TwoD || new Object();

//==========================================
//                FRAME
//==========================================
/**
 *
 * @param {number} width - width of the canvas
 * @param {number} height - height of the canvas
 * @param {string} background - backgroundColor of the canvas
 */
TwoD.Frame = function (width, height, background) {
  this._width = width ?? innerWidth;
  this._height = height ?? innerHeight;
  this._backgroud = background ?? "#000";
  this._canvas = document.createElement("canvas");

  this._canvas.width = this._width;
  this._canvas.height = this._height;
  this._canvas.style.backgroundColor = this._backgroud;
};

/**
 * @description puts canvas to DOM, either to specified element or to body
 * @param {node} destination - where should be canvas placed (optional)
 */
TwoD.Frame.prototype.create = function (destination) {
  if (destination) {
    destination.appendChild(this._canvas);
  } else {
    document.body.appendChild(this._canvas);
  }
};

TwoD.Frame.prototype.getContext2d = function () {
  return this._canvas.getContext("2d");
};

TwoD.Frame.prototype.getCanvas = function () {
  return this._canvas;
};

TwoD.Frame.prototype.getWidth = function () {
  return this._width;
};

TwoD.Frame.prototype.getHeight = function () {
  return this._height;
};

TwoD.Frame.prototype.setWidth = function (width) {
  this._width = width;
  this._canvas.width = this._width;
};

TwoD.Frame.prototype.setHeight = function (height) {
  this._height = height;
  this._canvas.height = this._height;
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
