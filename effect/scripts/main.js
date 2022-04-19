"use strict";
import { TwoD } from "./modules/TwoD.mjs";

const frame = new TwoD.Frame();
const ctx = frame.getContext2d();
const particles = [];
const color = TwoD.Color.random();

TwoD.Rect.prototype.render = function () {
  ctx.save();
  ctx.fillRect(this.x, this.y, 6, 6);
  ctx.restore();
};

TwoD.Rect.prototype.update = function () {
  if (this.x < 0) this.x = innerWidth;
  else if (this.x > innerWidth) this.x = 0;

  if (this.y < 0) this.y = innerHeight;
  else if (this.y > innerHeight) this.y = 0;

  this.x += this.w * TwoD.Perf.dt;
  this.y += this.h * TwoD.Perf.dt;
};

/**
 * @description connector makes the logic for this effect. It has single purpose and that is loop throught all particles and check if the distance is smaller that 100
 * @returns {void}
 */
function connector() {
  const LEN = particles.length;
  for (let x = 0; x < LEN; x++) {
    for (let y = 0; y < LEN; y++) {
      let dist = TwoD.Math.vectorDistance(particles[x], particles[y]);
      if (TwoD.Math.isBetween(dist, 0, 200)) {
        ctx.beginPath();
        ctx.moveTo(particles[x].x + 2.5, particles[x].y + 2.5);
        ctx.lineTo(particles[y].x + 2.5, particles[y].y + 2.5);
        ctx.stroke();
      }
    }
  }
}

function loop() {
  TwoD.Perf.before();
  particles.forEach((v) => v.update());
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  TwoD.Perf.drawFPS(ctx);
  connector();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  particles.forEach((v) => v.render());
  window.requestAnimationFrame(loop);
  TwoD.Perf.after();
}

window.addEventListener("load", (e) => {
  frame.create();

  for (let i = 0; i < 90; i++) {
    particles.push(
      new TwoD.Rect(
        TwoD.Math.rand(0, innerWidth),
        TwoD.Math.rand(0, innerHeight),
        TwoD.Math.rand(100, 160),
        50
      )
    );
  }
  loop();
});
