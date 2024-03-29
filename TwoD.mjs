'use strict';

const is = {
	number: (x) => typeof x === 'number',
	string: (x) => typeof x === 'string',
	bool: (x) => typeof x === 'boolean',
	object: (x) => typeof x === 'object',
	array: (x) => Array.isArray(x),
};

let logStyle = [
	'color: cyan',
	'background-color:black',
	'padding: 2px 4px',
	'border-radius: 5px',
	'border:1px dashed yellow',
	'padding:5px 10px',
	'font-family:monospace',
	'font-weight:bold',
].join(';');

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
 * @returns {this} youll get reference to the instance, meaning you can chain your code: `new Frame(128,128, "#000").create();`
 */
TwoD.Frame = function (width, height, backgroundColor) {
	this._w = (is.number(width) && width) || innerWidth;
	this._h = (is.number(height) && height) || innerHeight;
	this._bg = (is.string(backgroundColor) && backgroundColor) || '#000';

	this._id = Date.now();

	this._canvas = document.createElement('canvas');
	this._canvas.id = this._id;
	this._canvas.width = this._w;
	this._canvas.height = this._h;
	this._canvas.style.backgroundColor = this._bg;
	this._canvas.innerHTML = `
    <h3>Ohh no!</h3>
    <p>We are teribly sorry, but your browser is not capable of running HTML5.</p>
    <p>Please upgrade your browser <a href="https://www.mozilla.org/en-US/firefox/new/">here</a></p>
  `;

	return this;
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
 * @param {string} id
 */
TwoD.Frame.prototype.setId = function (id) {
	this._id = id;
	this._canvas.id = id;
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
		console.error('ERROR:Invalid type passed while resizing Frame instance');
	}
};

/**
 * @returns {CanvasRenderingContext2d} rendering context
 * @description returns rendering context of the canvas
 */
TwoD.Frame.prototype.getContext2d = function () {
	return this._canvas.getContext('2d');
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
TwoD.Maths = {};

/**
 * @param {number} min
 * @param {number} max
 * @returns {number} random number in range between parameters
 */
TwoD.Maths.rand = function (min, max) {
	if (is.number(min) && is.number(max)) {
		return min + Math.random() * (max - min);
	} else {
		min = +min || 0;
		max = +max || 255;
		console.warn(
			'WARNING:Invalid type passed for random number generator\nTrying to parse numbers or default numbers(0-255) will be used.' +
				'resulting min:' +
				min +
				' ' +
				'resulting max:' +
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
TwoD.Maths.randInt = function (min, max) {
	return Math.floor(this.rand(min, max));
};

/**
 * @param {any[]} array
 * @description returns random element inside of array.
 */
TwoD.Maths.randElement = function (array) {
	if (is.array(array)) {
		return array[Math.round(this.rand(0, array.length - 1))];
	} else {
		console.error('ERROR:Invalid type when selecting random array element');
	}
};

/**
 * @returns {bool} random boolean
 */
TwoD.Maths.randBool = function () {
	return this.randElement([true, false]);
};

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {boolean} is number between limits ? true : false
 */
TwoD.Maths.isBetween = function (n, min, max) {
	if (is.number(n) && is.number(min) && is.number(max))
		return n >= min && n <= max;
	else {
		throw new Error('Invalid type passed');
	}
};

/**
 * @param {number} deg
 * @returns {number} degree converted to radian
 */
TwoD.Maths.degToRad = function (deg) {
	if (is.number(deg)) return (deg * Math.PI) / 180;
	else
		console.error(
			'ERROR:Invalid type passed while converting degree to radian'
		);
};

/**
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @description limits your value to be between specified `min`,`max`
 */
TwoD.Maths.limit = function (n, min, max) {
	if (is.number(n) && is.number(min) && is.number(max))
		return Math.max(min, Math.min(max, n));
	else console.error('ERROR:Invalid type passed');
};

/**
 * @param {TwoD.Vec2} vectorA
 * @param {TwoD.Vec2} vectorB
 * @returns {TwoD.Vec2} sums up two vectors
 */
TwoD.Maths.addVector = function (vectorA, vectorB) {
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
TwoD.Maths.substrVector = function (vectorA, vectorB) {
	let res = new TwoD.Vec2(0, 0);

	res.x = vectorA.x - vectorB.x;
	res.y = vectorA.y - vectorB.y;

	return res;
};

/**
 * @param {TwoD.Vec2} vector
 * @returns {TwoD.Vec2}
 */
TwoD.Maths.negateVector = function (vector) {
	let res = new TwoD.Vec2(0, 0);

	res.x = -vector.x;
	res.y = -vector.y;

	return res;
};

/**
 * @param {TwoD.Vec2} vector
 * @param {number} scalar
 * @returns {TwoD.Vec2}
 */
TwoD.Maths.scaleVector = function (vector, scalar) {
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
TwoD.Maths.divideVector = function (vector, divisor) {
	let res = new TwoD.Vec2(0, 0);

	res.x = vector.x / divisor;
	res.y = vector.y / divisor;

	return res;
};

/**
 * @param {TwoD.Vec2} vector
 * @returns {number}
 */
TwoD.Maths.vectorLength = function (vector) {
	return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

/**
 * @param {number} floatA
 * @param {number} floatB
 * @returns {boolean}
 */
TwoD.Maths.areFloatsEqual = function (floatA, floatB) {
	let threshold = 1.0 / 8192.0;
	return Math.abs(floatA - floatB) < threshold;
};

/**
 * @param {object | TwoD.Vec2} vector
 * @return {TwoD.Vec2}
 */
TwoD.Maths.unitVector = function (vector) {
	let len = this.vectorLength(vector);
	if (0 < len) {
		return this.divideVector(vector, len);
	} else {
		return vector;
	}
};

/**
 * @param {TwoD.vec2} vectorA
 * @param {TwoD.vec2} vectorB
 * @returns {number} distance between two vectors
 */
TwoD.Maths.vectorDistance = function (vectorA, vectorB) {
	let x = vectorA.x - vectorB.x;
	let y = vectorA.y - vectorB.y;
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

TwoD.Maths.NULL_VECTOR = { x: 0, y: 0 };
Object.freeze(TwoD.Maths.NULL_VECTOR);

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

/**
 * @description frames per second. With this you can measure performance
 */
TwoD.Perf.fps = 0;

/**
 * @description this is delta time. Its time that is calculated while running the game. This allows you to create "fair" game on every computer
 */
TwoD.Perf.dt = 0;

/**
 * @description this is self-invoked function which tries to create/use `requestAnimationFrame` on every platform (Mozilla, Google, Apple, Microsoft...)
 * @returns {number} this returns a number which can be used to stop the recursion via `cancelAnimationFrame` or `clearTimeout` functions
 */
TwoD.Perf.requestAnimFrame = (function () {
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) {
			return window.setTimeout(callback, 1000 / 60);
		}
	);
})();

/**
 * @description calculates delta time and fps. It **has to be** placed before any updates/renders
 */
TwoD.Perf.before = function () {
	this._dat.curr = _TMPS();
	this.dt = Math.min(1, (this._dat.curr - this._dat.last) / 1e3);
	this.fps = 1 / this.dt;
};

/**
 * @description saves current delta time state. **It has to be** placed after all updates/renders.
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
		ctx.font = '15px monospace';
		ctx.fillStyle = '#0F0';
		ctx.fillText(this.fps.toString(), x, y);
	} else {
		console.error('ERROR:Could not render FPS due to invalid type');
		throw new Error('Invalid type. Stopping now!');
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
	this.x = (is.number(x) && x) || 0;
	this.y = (is.number(y) && y) || 0;
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
	this.x = (is.number(x) && x) || 0;
	this.y = (is.number(y) && y) || 0;
	this.w = (is.number(width) && width) || 100;
	this.h = (is.number(height) && height) || 100;
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
	this.x = (is.number(x) && x) || 0;
	this.y = (is.number(y) && y) || 0;
	this.w = (is.number(width) && width) || 100;
	this.h = (is.number(height) && height) || 100;
	this.angle = (is.number(angle) && angle) || 45;
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
	let distance = TwoD.Maths.substrVector(circleA.position, circleB.position);

	return TwoD.Maths.vectorLength(distance) <= radiusSum;
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
		TwoD.Maths.areFloatsEqual(pointA.x, pointB.x) &&
		TwoD.Maths.areFloatsEqual(pointA.y, pointB.y)
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

//---------------------------------------------State--------------------------------------------//
TwoD.Dock = {};

TwoD.Dock._List = function () {
	this._list = new Array();

	this.push = function (container) {
		this._list.push(container);
	};

	this.pop = function () {
		return this._list.pop();
	};

	this.top = function () {
		return this._list[this._list.length - 1];
	};
};

/**
 * @description `Container` is a State of your application.
 * @param {any} props can be anything you might need
 */
TwoD.Dock.Container = function (props) {
	this.props = props || undefined;
	this.isPause = false;

	this.onEnter = function () {};
	this.update = function () {};
	this.render = function () {};
	this.onPause = function () {};
	this.onResume = function () {};
	this.onExit = function () {};
};

/**
 * @description `Crane` is state manager. Via this function you can manage your states(`Containers`)
 */
TwoD.Dock.Crane = function () {
	this._states = new TwoD.Dock._List();

	/**
	 * @param {TwoD.Dock.Container | object} state
	 */
	this.push = function (state) {
		state.onEnter();
		this._states.push(state);
	};

	this.pop = function () {
		this._states.top().onExit();
		this._states.pop();
	};

	this.run = function () {
		let top = this._states.top();
		if (!top.isPause) {
			top.update();
		}
		top.render();
	};

	this.pause = function () {
		let top = this._states.top();

		top.isPause = !top.isPause;
		top.onPause();
	};

	this.resume = function () {
		let top = this._states.top();

		top.isPause = !top.isPause;
		top.onResume();
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
	this.r = (is.number(red) && red) || 200;
	this.g = (is.number(green) && green) || 200;
	this.b = (is.number(blue) && blue) || 200;
	this.a = (is.number(alpha) && alpha) || 200;

	this.getColor = function () {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	};

	this.setColor = function (red, green, blue) {
		this.r = (is.number(red) && red) || this.r;
		this.g = (is.number(green) && green) || this.g;
		this.b = (is.number(blue) && blue) || this.b;
		this.a = (is.number(alpha) && alpha) || this.a;
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	};

	return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
};

/**
 * @static
 * @returns {string} random color with full opacity
 */
TwoD.Color.random = function () {
	let r = TwoD.Maths.randInt(0, 255);
	let g = TwoD.Maths.randInt(0, 255);
	let b = TwoD.Maths.randInt(0, 255);
	return `rgb(${r},${g},${b}, 1)`;
};

/**
 * @param {string} char
 * @returns {string} Character converted to HEX
 */
const charToHex = (char) => char.toString(16);

/**
 * @static
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string} color in HEX format
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
//---------------------------------------------VIEW--------------------------------------------//
/**
 * @description This class provides a very simple way for making game camera. It has no such features as culling, it just translates canvas
 * @param {CanvasRenderingContext} ctx
 * @param {object | TwoD.Rect} source
 * @param {number} screenWidth
 * @param {number} screenHeight
 * @param {number=} scaleX
 * @param {number=} scaleY
 */
TwoD.View = function (ctx, source, screenWidth, screenHeight, scaleX, scaleY) {
	this.ctx = ctx;
	if (!source.x || !source.y) {
		throw new Error('Passed invalid source');
	} else {
		this.source = source;
	}
	this.screenWidth = screenWidth;
	this.screenHeight = screenHeight;
	this.scaleX = scaleX || 2;
	this.scaleY = scaleY || 2;

	this.before = function () {
		this.ctx.save();
		this.ctx.translate(
			this.screenWidth / this.scaleX - this.source.x,
			this.screenHeight / this.scaleY - this.source.y
		);
	};
	this.after = function () {
		this.ctx.restore();
	};
};
//---------------------------------------------DOM--------------------------------------------//
TwoD.DOM = {};

/**
 * @param {string} id
 * @returns {HTMLElement | boolean} success ? HTMLElement : false;
 */
TwoD.DOM.getByID = (id) => {
	if (!is.string(id)) {
		console.warn('WARNING:Could not recive HTMLElement. Invalid type');
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
		console.warn('WARNING:Could not recive HTMLElement. Invalid type');
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
		console.warn('WARNING:Could not hide HTMLElement. Invalid type');
		return;
	}
};

/**
 * @param {HTMLElement} element
 * @param {string=} displayType
 * @returns {void} reveals element in body by setting display property
 */
TwoD.DOM.show = (element, displayType = 'block') => {
	element.style.display = displayType;
};
//---------------------------------------------INPUT--------------------------------------------//
TwoD.Input = {
	_key: {},
};

/**
 * @param {string} key is simply a key like: `W`, `S`, `ESCAPE`...
 * @returns {boolean}
 */
TwoD.Input.isDown = function (key) {
	return this._key[key];
};

/**
 * @param {Event} event
 * @param {boolean} state
 */
TwoD.Input.setKey = function (event, state) {
	const ASCII = event.keyCode;
	let key = undefined;

	switch (ASCII) {
		case 27:
			key = 'ESC';
			break;
		case 32:
			key = 'SPACE';
			break;
		case 13:
			key = 'ENTER';
			break;
		default:
			key = String.fromCharCode(ASCII);
			break;
	}

	this._key[key] = state;
};

function initInput() {
	document.addEventListener('keydown', (e) => TwoD.Input.setKey(e, true));
	document.addEventListener('keyup', (e) => TwoD.Input.setKey(e, false));
}

Object.freeze(TwoD);
//---------------------------------------------PALETTE--------------------------------------------//
//  All color palettes where taken from: https://lospec.com/palette-list
//  all credits to these authors <3
const Palette = {};

Palette.wickeSkies = {
	black: '#00000f',
	veryDarkBlue: '#000133',
	darkBlue: '#000356',
	blue: '#0203e2',
	skyBlue: '#00cdfe',
	purple: '#680880',
	pink: '#fe007d',
	red: '#de1738',
	redIsh: '#fd5e53',
	orange: '#fc9c54',
	yellow: '#ffe373',
	lightYellow: '#fafbbd',
};

Palette.pico4 = {
	veryDarkBlue: '#180c21',
	gray: '#859999',
	darkGray: '#3a4a54',
	green: '#49ab3f',
	yellow: '#fff4b0',
	orange: '#ce6b40',
	darkPurple: '#6f324e',
	pink: '#e75e5e',
};

Palette.oneBit = {
	gray: '#596e79',
	white: '#e4e8d1',
};

Palette.greyMist = {
	white: '#f1ffe0',
	lightBrown: '#988171',
	brown: '#463534',
	black: '#1e1721',
};

Palette.kankei4 = {
	white: '#ffffff',
	red: '#f42e1f',
	blue: '#2f256b',
	black: '#060608',
};

Palette.deadIce = {
	white: '#f5fffa',
	lightBlue: '#5792a5',
	gray: '#46393f',
	darkBlue: '#161327',
};

export default TwoD;

export { Palette, initInput };

export const {
	Frame,
	Maths,
	Perf,
	Vec2,
	Rect,
	Line,
	LineSegment,
	Circle,
	OrientedRect,
	Collision,
	Dock,
	Color,
	View,
	DOM,
	Input,
} = TwoD;
