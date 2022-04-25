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

//--------------------------------------------------CANVAS-----------------------------------------------//

/**
 * @param {number=} width
 * @param {number=} height
 * @param {string=} backgroundColor
 */
const Frame = function (width, height, backgroundColor) {
  this._w = (is.number(width) && width) || innerWidth;
  this._h = (is.number(height) && height) || innerHeight;
  this._bg = (is.string(backgroundColor) && backgroundColor) || "#000";

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

  /**
   * @param {HTMLElement=} destination
   */
  this.create = function (destination) {
    if (destination) {
      this._dest = destination;
      this._dest.appendChild(this._canvas);
    } else {
      document.body.appendChild(this._canvas);
    }
  };

  /**
   * @param {string} id
   */
  this.setId = function (id) {
    this._id = (is.string(id) && id) || this._id;
    this._canvas.id = this._id;
  };

  this.remove = function () {
    if (this._dest) {
      this._dest.removeChild(this._canvas);
    } else {
      document.body.removeChild(this._canvas);
    }
  };

  /**
   * @param {number} width
   * @param {number} height
   */
  this.resize = function (width, height) {
    this._w = (is.number(width) && width) || this._w;
    this._h = (is.number(height) && height) || this._h;
    this._canvas.width = this._w;
    this._canvas.height = this._h;
  };

  this.getContext2d = function () {
    return this._canvas.getContext("2d");
  };

  this.getCanvas = function () {
    return this._canvas;
  };

  this.getWidth = function () {
    return this._w;
  };

  this.getHeight = function () {
    return this._h;
  };

  this.getBackgroundColor = function () {
    return this._bg;
  };

  this.getId = function () {
    return this._id;
  };

  this.setWidth = function (width) {
    this._w = (is.number(width) && width) || this._w;
    this._canvas.width = this._w;
  };

  this.setHeight = function (height) {
    this._h = (is.number(height) && height) || this._h;
    this._canvas.height = this._h;
  };

  this.setBackgroundColor = function (backgroundColor) {
    this._bg = (is.string(backgroundColor) && backgroundColor) || this._bg;
    this._canvas.style.backgroundColor = this._bg;
  };
};
//--------------------------------------------------MATH-----------------------------------------------//
const Math = {};

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} random number in range between parameters
 */
Math.rand = function (min, max) {
  if (is.number(min) && is.number(max)) {
    return min + Math.random() * (max - min);
  } else {
    min = +min || 0;
    max = +max || 255;
    console.warn(
      "WARNING:Invalid type passed for random number generator\nTrying to parse numbers or default numbers(0-255) will be used." +
        "resulting min:" +
        min +
        " " +
        "resulting max:" +
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
Math.randInt = function (min, max) {
  return Math.floor(this.rand(min, max));
};

/**
 * @param {any[]} array
 * @description returns random element inside of array.
 */
Math.randElement = function (array) {
  if (is.array(array)) {
    return array[Math.round(this.rand(0, array.length - 1))];
  } else {
    console.error("ERROR:Invalid type when selecting random array element");
  }
};

/**
 * @returns {bool} random boolean
 */
Math.randBool = function () {
  return this.randElement([true, false]);
};

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {boolean} is number between limits ? true : false
 */
Math.isBetween = function (n, min, max) {
  if (is.number(n) && is.number(min) && is.number(max))
    return n >= min && n <= max;
  else {
    throw new Error("Invalid type passed");
  }
};

/**
 * @param {number} deg
 * @returns {number} degree converted to radian
 */
Math.degToRad = function (deg) {
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
Math.limit = function (n, min, max) {
  if (is.number(n) && is.number(min) && is.number(max))
    return Math.max(min, Math.min(max, n));
  else console.error("ERROR:Invalid type passed");
};

/**
 * @param {Vec2} vectorA
 * @param {Vec2} vectorB
 * @returns {Vec2} sums up two vectors
 */
Math.addVector = function (vectorA, vectorB) {
  let res = new Vec2(0, 0);

  res.x = vectorA.x + vectorB.x;
  res.y = vectorA.y + vectorB.y;

  return res;
};

/**
 * @param {Vec2} vectorA
 * @param {Vec2} vectorB
 * @returns {Vec2} substracts two vectors
 */
Math.substrVector = function (vectorA, vectorB) {
  let res = new Vec2(0, 0);

  res.x = vectorA.x - vectorB.x;
  res.y = vectorA.y - vectorB.y;

  return res;
};

/**
 * @param {Vec2} vector
 * @returns {Vec2}
 */
Math.negateVector = function (vector) {
  let res = new Vec2(0, 0);

  res.x = -vector.x;
  res.y = -vector.y;

  return res;
};

/**
 *
 * @param {Vec2} vector
 * @param {number} scalar
 * @returns {Vec2}
 */
Math.scaleVector = function (vector, scalar) {
  let res = new Vec2(0, 0);

  res.x = vector.x * scalar;
  res.y = vector.y * scalar;

  return res;
};

/**
 *
 * @param {Vec2} vector
 * @param {number} divisor
 * @returns {Vec2}
 */
Math.divideVector = function (vector, divisor) {
  let res = new Vec2(0, 0);

  res.x = vector.x / divisor;
  res.y = vector.y / divisor;

  return res;
};

/**
 * @param {Vec2} vector
 * @returns {number}
 */
Math.vectorLength = function (vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

/**
 * @param {number} floatA
 * @param {number} floatB
 * @returns {boolean}
 */
Math.areFloatsEqual = function (floatA, floatB) {
  let threshold = 1.0 / 8192.0;
  return Math.abs(floatA - floatB) < threshold;
};

/**
 * @param {object | Vec2} vector
 * @return {Vec2}
 */
Math.unitVector = function (vector) {
  let len = this.vectorLength(vector);
  if (0 < len) {
    return this.divideVector(vector, len);
  } else {
    return vector;
  }
};

/**
 *
 * @param {vec2} vectorA
 * @param {vec2} vectorB
 * @returns {number} distance between two vectors
 */
Math.vectorDistance = function (vectorA, vectorB) {
  let x = vectorA.x - vectorB.x;
  let y = vectorA.y - vectorB.y;
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

Math.NULL_VECTOR = { x: 0, y: 0 };
Object.freeze(Math.NULL_VECTOR);
//------------------------------------------------PERFORMANCE---------------------------------------------//
const Perf = {};

function _TMPS() {
  return window.performance && window.performance.now
    ? window.performance.now()
    : new Date().getTime();
}

Perf._dat = {
  curr: 0,
  last: _TMPS(),
  step: 1 / 60,
};

Perf.fps = 0;
Perf.dt = 0;

/**
 * @description calculates delta time and fps. It **has to be** placed before any updates/renders
 */
Perf.before = function () {
  this._dat.curr = _TMPS();
  this.dt = Math.min(1, (this._dat.curr - this._dat.last) / 1e3);
  this.fps = 1 / this.dt;
};

/**
 * @description saves current delta time state. It has to be placed after all updates/renders.
 */
Perf.after = function () {
  this._dat.last = this._dat.curr;
};

/**
 * @param {CanvasRenderingContext2d} ctx
 * @param {number=} x
 * @param {number=} y
 * @throws new Error when invalid ctx was passed, thus stopping game loop
 */
Perf.drawFPS = function (ctx, x = 30, y = 30) {
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
const Vec2 = function (x, y) {
  this.x = (is.number(x) && x) || 0;
  this.y = (is.number(y) && y) || 0;
};

/**
 * @param {Vec2} vector
 * @returns {number} distance to different vector
 */
Vec2.prototype.distanceToVector = function (vector) {
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
const Rect = function (x, y, width, height) {
  this.x = (is.number(x) && x) || 0;
  this.y = (is.number(y) && y) || 0;
  this.w = (is.number(width) && width) || 100;
  this.h = (is.number(height) && height) || 100;
};

/**
 * @param {Rect} rect
 * @returns {boolean}
 */
Rect.prototype.collision = function (rect) {
  return (
    this.x < rect.x + rect.w &&
    this.x + this.w > rect.x &&
    this.y < rect.y + rect.h &&
    this.y + this.h > rect.y
  );
};

/**
 * @constructor
 * @param {Vec2} base - starting position of the line
 * @param {Vec2} direction - where it goes
 */
const Line = function (base, direction) {
  this.base = base || new Vec2(0, 0);
  this.direction = direction || new Vec2(3, 3);
};

/**
 * @constructor
 * @param {Vec2} pointA
 * @param {Vec2} pointB
 */
const LineSegment = function (pointA, pointB) {
  this.pointA = pointA || new Vec2(0, 0);
  this.pointB = pointB || new Vec2(3, 3);
};

/**
 * @constructor
 * @param {Vec2} position
 * @param {number} radius
 */
const Circle = function (position, radius) {
  this.position = position || new Vec2(0, 0);
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
const OrientedRect = function (x, y, width, height, angle) {
  this.x = (is.number(x) && x) || 0;
  this.y = (is.number(y) && y) || 0;
  this.w = (is.number(width) && width) || 100;
  this.h = (is.number(height) && height) || 100;
  this.angle = (is.number(angle) && angle) || 45;
};
//--------------------------------------------COLLISION---------------------------------------------//
const Collision = {};

/**
 * @description are two circles colliding ? yes = true, no = false
 * @param {Circle} circleA
 * @param {Circle} circleB
 * @returns {boolean}
 */
Collision.circles = function (circleA, circleB) {
  let radiusSum = circleA.radius + circleB.radius;
  let distance = Math.substrVector(circleA.position, circleB.position);

  return Math.vectorLength(distance) <= radiusSum;
};

/**
 * @param {Rect} rectA
 * @param {Rect} rectB
 * @returns {boolean}
 */
Collision.rects = function (rectA, rectB) {
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
Collision.points = function (pointA, pointB) {
  return (
    Math.areFloatsEqual(pointA.x, pointB.x) &&
    Math.areFloatsEqual(pointA.y, pointB.y)
  );
};

/**
 * @param {object | Vec2} vec2a
 * @param {object | Vec2} vec2b
 * @returns {boolean}
 */
Collision.vectors = function (vec2a, vec2b) {
  let xs = vec2a.x === vec2b.x;
  let ys = vec2a.y === vec2b.y;
  return xs && xy;
};
//---------------------------------------------StateMachine--------------------------------------------//
const StateMachine = {};

/**
 * @param {any} props - props can be anything. Can be reused latter in the code
 */
StateMachine.State = function (props) {
  this.props = props;
  this.onEnter = function () {};
  this.update = function () {};
  this.render = function () {};
  this.onExit = function () {};
  this.onPause = function () {};
  this.onResume = function () {};
};

StateMachine.List = function () {
  this.states = [];
  this.pop = function () {
    return states.pop();
  };
  /**
   * @param {StateMachine.State} state
   */
  this.push = function (state) {
    this.states.push(state);
  };
  this.top = function () {
    return this.states[this.states.length - 1];
  };
};

StateMachine.Machine = function () {
  this.sl = new StateMachine.List();

  this.update = function () {
    let top = this.sl.top();
    top && top.update();
  };

  this.render = function () {
    let top = this.sl.top();
    top && top.render();
  };

  /**
   * @param {StateMachine.State} state
   */
  this.push = function (state) {
    this.sl.push(state);
    state.onEnter();
  };

  this.pop = function () {
    this.sl.top().onExit();
    this.sl.pop();
  };

  this.resume = function () {
    let top = this.sl.top();
    top.onResume();
  };

  this.pause = function () {
    let top = this.sl.top();
    top.onPause();
  };
};
//---------------------------------------------Color--------------------------------------------//
function Color(red, green, blue, alpha) {
  this.r = (is.number(red) && red) || 200;
  this.g = (is.number(green) && green) || 200;
  this.b = (is.number(blue) && blue) || 200;
  this.a = (is.number(alpha) && alpha) || 1;

  this.getColor = function () {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  };

  this.setColor = function (red, green, blue, alpha) {
    this.r = (is.number(red) && red) || this.r;
    this.g = (is.number(green) && green) || this.g;
    this.b = (is.number(blue) && blue) || this.b;
    this.a = (is.number(alpha) && alpha) || this.a;
  };

  return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
}

Color.random = function () {
  let r = Math.randInt(0, 255);
  let g = Math.randInt(0, 255);
  let b = Math.randInt(0, 255);
  return `rgb(${r},${g},${b}, 255)`;
};

const charToHex = (char) => char.toString(16);

/**
 * @static
 * @param {number} r
 * @param {number} g
 * @param {number} b
 */
Color.rgbToHex = function (r, g, b) {
  return `#${charToHex(r)}${charToHex(g)}${charToHex(b)}`;
};

/**
 * @static
 * @param {string} hex 6 digit format only! (#FFFFFF works | #FFF doesnt)
 * @returns {object | boolean} return false when fail and object when success
 */
Color.hexToRgb = function (hex) {
  let res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return res
    ? {
        r: parseInt(res[1], 16),
        g: parseInt(res[2], 16),
        b: parseInt(res[3], 16),
      }
    : false;
};

//--------------------------------------------Palette---------------------------------------------//
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
//---------------------------------------------DOM--------------------------------------------//
const DOM = {};

/**
 * @param {string} id
 * @returns {HTMLElement | boolean} success ? HTMLElement : false;
 */
DOM.getByID = (id) => {
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
DOM.getByClass = (className) => {
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
DOM.hide = (element) => {
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
DOM.show = (element, displayType) => {
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
//-----------------------------------EXPORT--------------------------------//

// export as a bundle
export default {
  Frame,
  Math,
  Perf,
  Vec2,
  Rect,
  OrientedRect,
  Line,
  LineSegment,
  Circle,
  Collision,
  Palette,
  Color,
  StateMachine,
  DOM,
};

// Named export
export {
  Frame,
  Math,
  Perf,
  Vec2,
  Rect,
  OrientedRect,
  Line,
  LineSegment,
  Circle,
  Collision,
  Palette,
  Color,
  StateMachine,
  DOM,
};
