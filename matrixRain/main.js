'use strict';
import TwoD from '../TwoD.mjs';

const w = innerWidth;
const h = innerHeight;
const frame = new TwoD.Frame(w, h, '#000000');
const ctx = frame.getContext2d();

// prettier-ignore
const charTable = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("");

let color = '#fc0755';
let fontSize = 25;
let fontFamily = fontSize + 'px monospace';
const amount = w / fontSize;
console.log(amount);
const drops = [];

for (let i = 0; i < amount; i++) {
	drops.push({
		pos: new TwoD.Vec2(i, TwoD.Maths.rand(-300, 0)),
		char: TwoD.Maths.randElement(charTable),
		vel: 0.8,
	});
}

let id = 0;

// note: By adding delta timing, the letters will look like chinese
// because the will be overlaping
// To add delta timing:
// TwoD.Peft.before() <-- add this one at the begining of loop function
// TwoD.Perf.after() <-- add this one at the end of loop function
// change Y axis incrementation with this drop.pos.y += 25 * TwoD.Perf.dt;
// ----------------------------------------------------------------------
// The other way to make it look chinese/distorted is to lower the increment
// For that I recommend using 0.5 with that, the letters will be overlapping
function loop() {
	drops.map((drop) => {
		ctx.fillStyle = color;

		ctx.font = fontFamily;

		ctx.fillText(drop.char, drop.pos.x * fontSize, drop.pos.y * fontSize);

		drop.pos.y += 0.8;
		drop.char = TwoD.Maths.randElement(charTable);

		if (drop.pos.y * fontSize > h) {
			drop.pos.y = 0;
		}
	});

	// setting up a diffusor
	// This basically hides the previous letters
	// making it look like seemless transiion
	ctx.fillStyle = 'rgba(0,0,0,0.05)';
	ctx.fillRect(0, 0, w, h);

	id = window.requestAnimationFrame(loop);
}

window.addEventListener('load', () => {
	frame.create();

	const STOP = document.getElementById('stop');
	const START = document.getElementById('start');

	STOP.addEventListener('click', () => {
		window.cancelAnimationFrame(id);
	});

	START.addEventListener('click', () => {
		window.requestAnimationFrame(loop);
	});
});
