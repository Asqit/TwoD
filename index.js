"use strict";
import { TwoD } from "./TwoD.mjs";

const app = new TwoD.Frame(); // creating a new canvas
const ctx = app.getContext2d();
const bouncer = new TwoD.Rect(innerWidth / 2, innerHeight / 2, 50, 50); // creating a new rectangle
//---------------SHAPE PROTOTYPES----------------//

TwoD.Rect.prototype.direction = {
  x: TwoD.Math.rand(-150, 150),
  y: TwoD.Math.rand(-150, 150),
};

TwoD.Rect.prototype.genDir = function () {
  this.direction = {
    x: TwoD.Math.rand(-150, 150),
    y: TwoD.Math.rand(-150, 150),
  };
};

TwoD.Rect.prototype.render = function (ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
};

TwoD.Rect.prototype.collider = function () {
  if (this.x < 0) {
    this.x = innerWidth - this.w;
    this.genDir();
  } else if (this.x > innerWidth) {
    this.x = 0;
    this.genDir();
  }

  if (this.y < 0) {
    this.y = innerHeight - this.h;
    this.genDir();
  } else if (this.y > innerHeight) {
    this.y = 0;
    this.genDir();
  }
};

TwoD.Rect.prototype.move = function () {
  this.x += this.direction.x * TwoD.Perf.dt;
  this.y += this.direction.y * TwoD.Perf.dt;
};

TwoD.Rect.prototype.update = function () {
  this.collider();
  this.move();
};

//---------------CORE----------------//

function update() {
  bouncer.update();
}

function render() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  TwoD.Perf.drawFPS(ctx, 30, 30);
  bouncer.render(ctx, "cyan");
}

function loop() {
  TwoD.Perf.before();
  update();
  render();
  window.requestAnimationFrame(loop);
  TwoD.Perf.after();
}

function init() {
  app.create();
  loop();
}

init();
