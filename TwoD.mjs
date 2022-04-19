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

let logStyle = [
  "color: cyan",
  "background-color:black",
  "padding: 2px 4px",
  "border-radius: 5px",
  "border:1px dashed yellow",
  "padding:5px 10px",
  "font-family:monospace",
  "font-weight:bold",
].join(";");

let d = new Date();

console.log(
  `%cTwoD.mjs - copyright (c) ${d.getFullYear()} Ondřej Tuček`,
  logStyle
);

/**
 * @namespace TwoD
 * @singleton
 */
const TwoD = {};

//--------------------------------------------------CANVAS-----------------------------------------------//

/**
 * @constructor
 * @param {number=} width
 * @param {number=} height
 * @param {string | TwoD.Color=} backgroundColor
 * @description Creates new instance of Frame.
 */
TwoD.Frame = function (width, height, backgroundColor) {
  switch (true) {
    case is.number(width):
      this._w = width;
    case is.number(height):
      this._h = height;
    case is.string(backgroundColor) || is.object(backgroundColor):
      this._bg = backgroundColor;
      break;
    default:
      this._w = innerWidth;
      this._h = innerHeight;
      this._bg = "#000";
      break;
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
 * @param {HTMLElement=} destination
 * @returns {boolean} TRUE on success and FALSE on failure
 * @description inserts a new Frame(canvas) into HTML. Destination is the place where the canvas should be located if specified else it will rendered in body
 */
TwoD.Frame.prototype.create = function (destination) {
  if (destination) {
    destination.appendChild(this._canvas);
    this._destination = destination;
  } else {
    document.body.appendChild(this._canvas);
  }

  return document.getElementById(String(this._id)) ? true : false;
};

/**
 * @description removes specific Frame(canvas) instance from previously set destination
 */
TwoD.Frame.prototype.remove = function () {
  if (this._destination) {
    this._destination.removeChild(this._canvas);
  } else {
    document.body.removeChild(this._canvas);
  }
};

/**
 * @param {number} width
 * @param {number} height
 * @description resizes the canvas to desired parameters. Can be used when resizing document: `window.addEventListener("resize", e => frame.resize(innerWidth, innerHeight));`
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
 * @description returns rendering context of the canvas
 */
TwoD.Frame.prototype.getContext2d = function () {
  return this._canvas.getContext("2d");
};

/**
 * @returns {HTMLCanvasElement} canvas
 * @description returns HTMLCanvasElement of your instance
 */
TwoD.Frame.prototype.getCanvas = function () {
  return this._canvas;
};

/**
 * @returns {number} canvas width
 */
TwoD.Frame.prototype.getWidth = function () {
  return this._w;
};

/**
 * @returns {number} canvas height
 */
TwoD.Frame.prototype.getHeight = function () {
  return this._h;
};

/**
 * @returns {string} backgroundColor
 */
TwoD.Frame.prototype.getBackgroundColor = function () {
  return this._bg;
};

/**
 * @description returns id of the canvas. The id is `epoch` time when it was created
 * @returns {number} id
 */
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

/**
 * @param {string} backgroundColor
 */
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
    min = +min || 0;
    max = +max || 255;
    console.warn(
      "WARNING:Invalid type passed for random number generator\nTrying to parse numbers or default numbers(0-255) will be used." +
        "parsedMin:" +
        min +
        " " +
        "parsedMax:" +
        max
    );
    return min + Math.random() * (max - min);
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
 * @description returns random element inside of array.
 */
TwoD.Math.randElement = function (array) {
  if (is.array(array)) {
    return array[Math.round(this.rand(0, array.length - 1))];
  } else {
    console.error("ERROR:Invalid type when selecting random array element");
  }
};

/**
 * @returns {bool} random boolean
 */
TwoD.Math.randBool = function () {
  return this.randElement([true, false]);
};

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {boolean} is number between limits ? true : false
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
 * @description limits your value to be between specified `min`,`max`
 */
TwoD.Math.limit = function (n, min, max) {
  if (is.number(n) && is.number(min) && is.number(max))
    return Math.max(min, Math.min(max, n));
  else console.error("ERROR:Invalid type passed");
};

/**
 * @param {TwoD.Vec2} vectorA
 * @param {TwoD.Vec2} vectorB
 * @returns {TwoD.Vec2} sums up two vectors
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
 * @returns {TwoD.Vec2} substracts two vectors
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

/**
 * @param {TwoD.Vec2} vector
 * @returns {number}
 */
TwoD.Math.vectorLength = function (vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

/**
 * @param {number} floatA
 * @param {number} floatB
 * @returns {boolean}
 */
TwoD.Math.areFloatsEqual = function (floatA, floatB) {
  let threshold = 1.0 / 8192.0;
  return Math.abs(floatA - floatB) < threshold;
};

/**
 * @param {object | TwoD.Vec2} vector
 * @return {TwoD.Vec2}
 */
TwoD.Math.unitVector = function (vector) {
  let len = this.vectorLength(vector);
  if (0 < len) {
    return this.divideVector(vector, len);
  } else {
    return vector;
  }
};

/**
 *
 * @param {TwoD.vec2} vectorA
 * @param {TwoD.vec2} vectorB
 * @returns {number} distance between two vectors
 */
TwoD.Math.vectorDistance = function (vectorA, vectorB) {
  let x = vectorA.x - vectorB.x;
  let y = vectorA.y - vectorB.y;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

TwoD.Math.NULL_VECTOR = { x: 0, y: 0 };
Object.freeze(TwoD.Math.NULL_VECTOR);

//------------------------------------------------PERFORMANCE---------------------------------------------//
TwoD.Perf = {};

function _TMPS() {
  return window.performance && window.performance.now
    ? window.performance.now()
    : new Date().getTime();
}

/**
 * @private
 * @description holds details for calculating delta time and fps
 */
TwoD.Perf._dat = {
  curr: 0,
  last: _TMPS(),
  step: 1 / 60,
};

TwoD.Perf.fps = 0;
TwoD.Perf.dt = 0;

/**
 * @description calculates delta time and fps. It **has to be** placed before any updates/renders
 */
TwoD.Perf.before = function () {
  this._dat.curr = _TMPS();
  this.dt = Math.min(1, (this._dat.curr - this._dat.last) / 1e3);
  this.fps = 1 / this.dt;
};

/**
 * @description saves current delta time state. It has to be placed after all updates/renders.
 */
TwoD.Perf.after = function () {
  this._dat.last = this._dat.curr;
};

/**
 * @param {CanvasRenderingContext2d} ctx
 * @param {number=} x
 * @param {number=} y
 * @throws new Error when invalid ctx was passed, thus stopping game loop
 */
TwoD.Perf.drawFPS = function (ctx, x = 30, y = 30) {
  if (is.object(ctx) && is.number(x) && is.number(y)) {
    ctx.font = "15px monospace";
    ctx.fillStyle = "#0F0";
    ctx.fillText(this.fps.toString(), x, y);
  } else {
    console.error("ERROR:Could not render FPS due to invalid type");
    throw new Error("Invalid type. Stopping now!");
  }
};
//--------------------------------------------SHAPES---------------------------------------------//
/**
 * @constructor
 * @param {number=} x
 * @param {number=} y
 * @description Creates new instance of Vec2
 */
TwoD.Vec2 = function (x, y) {
  switch (true) {
    case is.number(x):
      this.x = x;
    case is.number(y):
      this.y = y;
      break;
    default:
      this.x = 0;
      this.y = 0;
      console.warn("WARNING:Creating new vector with x:0, y:0");
      break;
  }
};

/**
 * @param {TwoD.Vec2} vector
 * @returns {number} distance to different vector
 */
TwoD.Vec2.prototype.distanceToVector = function (vector) {
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
  switch (true) {
    case is.number(x):
      this.x = x;
    case is.number(y):
      this.y = y;
    case is.number(width):
      this.w = width;
    case is.number(height):
      this.h = height;
      break;
    default:
      this.x = 0;
      this.y = 0;
      this.w = 100;
      this.h = 100;
      console.warn("WARNING:Creating a new rectangle with default params");
      break;
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
  switch (true) {
    case is.number(x):
      this.x = x;
    case is.number(y):
      this.y = y;
    case is.number(width):
      this.w = width;
    case is.number(height):
      this.h = height;
    case is.number(angle):
      this.angle = angle;
      break;
    default:
      this.x = 0;
      this.y = 0;
      this.w = 100;
      this.h = 100;
      this.angle = 45;
      console.warn(
        "WARNING:Creating a new oriented rectangle with default params"
      );
      break;
  }
};

//--------------------------------------------COLLISION---------------------------------------------//
TwoD.Collision = {};

/**
 * @description are two circles colliding ? yes = true, no = false
 * @param {TwoD.Circle} circleA
 * @param {TwoD.Circle} circleB
 * @returns {boolean}
 */
TwoD.Collision.circles = function (circleA, circleB) {
  let radiusSum = circleA.radius + circleB.radius;
  let distance = TwoD.Math.substrVector(circleA.position, circleB.position);

  return TwoD.Math.vectorLength(distance) <= radiusSum;
};

/**
 *
 * @param {TwoD.Rect} rectA
 * @param {TwoD.Rect} rectB
 * @returns {boolean}
 */
TwoD.Collision.rects = function (rectA, rectB) {
  return (
    rectA.x < rectB.x + rectB.w &&
    rectA.x + rectA.w > rectB.x &&
    rectA.y < rectB.y + rectB.h &&
    rectA.y + rectA.h > rectB.y
  );
};

/**
 * @param {*} pointA
 * @param {*} pointB
 */
TwoD.Collision.points = function (pointA, pointB) {
  return (
    TwoD.Math.areFloatsEqual(pointA.x, pointB.x) &&
    TwoD.Math.areFloatsEqual(pointA.y, pointB.y)
  );
};

/**
 * @param {object | TwoD.Vec2} vec2a
 * @param {object | TwoD.Vec2} vec2b
 * @returns {boolean}
 */
TwoD.Collision.vectors = function (vec2a, vec2b) {
  let xs = vec2a.x === vec2b.x;
  let ys = vec2a.y === vec2b.y;
  return xs && xy;
};

//---------------------------------------------StateMachine--------------------------------------------//
TwoD.StateMachine = {};

/**
 * @param {any} props - props can be anything. Can be reused latter in the code
 */
TwoD.StateMachine.State = function (props) {
  this.props = props;
  this.onEnter = function () {};
  this.update = function () {};
  this.render = function () {};
  this.onExit = function () {};
  this.onPause = function () {};
  this.onResume = function () {};
};

TwoD.StateMachine.List = function () {
  let states = [];
  this.pop = function () {
    return states.pop();
  };
  /**
   * @param {TwoD.StateMachine.State} state
   */
  this.push = function (state) {
    states.push(state);
  };
  this.top = function () {
    return states[states.length - 1];
  };
};

TwoD.StateMachine.Machine = function () {
  let sl = new TwoD.StateMachine.List();

  this.update = function () {
    let top = sl.top();
    top.update();
  };

  this.render = function () {
    let top = sl.top();
    top.render();
  };

  /**
   * @param {TwoD.StateMachine.State} state
   */
  this.push = function (state) {
    sl.push(state);
    state.onEnter();
  };

  this.pop = function () {
    sl.top().onExit();
    sl.pop();
  };

  this.resume = function () {
    let top = sl.top();
    top.onResume();
  };

  this.pause = function () {
    let top = sl.top();
    top.onPause();
  };
};

//---------------------------------------------Color--------------------------------------------//

/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @param {number} alpha
 * @returns {string} rgba color
 */
TwoD.Color = function (red, green, blue, alpha) {
  (this.r = 0), (this.g = 0), (this.b = 0), (this.a = 255);
  if (
    is.number(red) &&
    is.number(green) &&
    is.number(blue) &&
    is.number(alpha)
  ) {
    this.r = red;
    this.g = green;
    this.b = blue;
    this.a = alpha;
  }

  this.getColor = function () {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  };

  return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
};

/**
 * @static
 * @returns {string | TwoD.Color} random color
 */
TwoD.Color.random = function () {
  let r = TwoD.Math.randInt(0, 255);
  let g = TwoD.Math.randInt(0, 255);
  let b = TwoD.Math.randInt(0, 255);
  return `rgb(${r},${g},${b}, 255)`;
};

/**
 * @param {string} char
 * @returns {string} hex
 */
const charToHex = (char) => char.toString(16);

/**
 * @static
 * @param {number} r
 * @param {number} g
 * @param {number} b
 */
TwoD.Color.rgbToHex = function (r, g, b) {
  return `#${charToHex(r)}${charToHex(g)}${charToHex(b)}`;
};

/**
 * @static
 * @param {string} hex 6 digit format only! (#FFFFFF works | #FFF doesnt)
 * @returns {object | boolean} return false when fail and object when success
 */
TwoD.Color.hexToRgb = function (hex) {
  let res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return res
    ? {
        r: parseInt(res[1], 16),
        g: parseInt(res[2], 16),
        b: parseInt(res[3], 16),
      }
    : false;
};

//---------------------------------------------DOM--------------------------------------------//
TwoD.DOM = {};

/**
 * @param {string} id
 * @returns {HTMLElement | boolean} success ? HTMLElement : false;
 */
TwoD.DOM.getByID = (id) => {
  if (!is.string(id)) {
    console.warn("WARNING:Could not recive HTMLElement. Invalid type");
    return;
  }
  return document.getElementById(id) ?? false;
};

/**
 * @param {string} className
 * @returns {HTMLElement | false} success ? HTMLElement : false;
 */
TwoD.DOM.getByClass = (className) => {
  if (!is.string(className)) {
    console.warn("WARNING:Could not recive HTMLElement. Invalid type");
    return;
  }
  return document.querySelector(`.${className}`) ?? false;
};

/**
 * @param {HTMLElement} element
 * @returns {void} removes element from body by deleting display property
 */
TwoD.DOM.hide = (element) => {
  if (!is.object(element)) {
    console.warn("WARNING:Could not hide HTMLElement. Invalid type");
    return;
  }
};

/**
 * @param {HTMLElement} element
 * @param {string=} displayType
 * @returns {void} reveals element in body by setting display property
 */
TwoD.DOM.show = (element, displayType) => {
  switch (true) {
    case !element:
    case !is.object(element):
    case !displayType:
    case !is.string(displayType):
      console.warn("WARNING:Could not show HTMLElement.");
      break;
    default:
      element.style.display = displayType;
      break;
  }
};

Object.freeze(TwoD);

const Palette = {};

Palette.wickeSkies = {
  black: "#00000f",
  veryDarkBlue: "#000133",
  darkBlue: "#000356",
  blue: "#0203e2",
  skyBlue: "#00cdfe",
  purple: "#680880",
  pink: "#fe007d",
  red: "#de1738",
  redIsh: "#fd5e53",
  orange: "#fc9c54",
  yellow: "#ffe373",
  lightYellow: "#fafbbd",
};

Palette.pico4 = {
  veryDarkBlue: "#180c21",
  gray: "#859999",
  darkGray: "#3a4a54",
  green: "#49ab3f",
  yellow: "#fff4b0",
  orange: "#ce6b40",
  darkPurple: "#6f324e",
  pink: "#e75e5e",
};

Palette.oneBit = {
  gray: "#596e79",
  white: "#e4e8d1",
};

Palette.greyMist = {
  white: "#f1ffe0",
  lightBrown: "#988171",
  brown: "#463534",
  black: "#1e1721",
};

Palette.kankei4 = {
  white: "#ffffff",
  red: "#f42e1f",
  blue: "#2f256b",
  black: "#060608",
};

Palette.deadIce = {
  white: "#f5fffa",
  lightBlue: "#5792a5",
  gray: "#46393f",
  darkBlue: "#161327",
};

export { TwoD, Palette };
