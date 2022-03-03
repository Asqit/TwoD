"use strict";
import { Game } from "./modules/Game.mjs";
import { State } from "./modules/StateManager.mjs";
import { TwoD } from "./modules/TwoD.mjs";
import { Keyboard } from "./modules/Keyboard.mjs";

const frame = new TwoD.Frame();
let ctx = frame.getContext2d();

let player;

//-------------------------PLAYER----------------------------//
class Player {
  constructor(x, y, size) {
    this.x = x ?? innerWidth / 2;
    this.y = y ?? innerHeight / 2;
    this.w = size ?? 32;
    console.table(Keyboard.keys);
  }
  render() {
    ctx.fillStyle = "#0FA";
    ctx.fillRect(this.x, this.y, this.w, this.w);
  }
  update() {
    switch (true) {
      case Keyboard.keys["W"] || Keyboard.keys["w"]:
        this.y -= 150 * TwoD.Perf._data.dt;
        break;
      case Keyboard.keys["S"] || Keyboard.keys["s"]:
        this.y += 150 * TwoD.Perf._data.dt;
        break;
      case Keyboard.keys["A"] || Keyboard.keys["a"]:
        this.x -= 150 * TwoD.Perf._data.dt;
        break;
      case Keyboard.keys["D"] || Keyboard.keys["d"]:
        this.x += 150 * TwoD.Perf._data.dt;
        break;
    }
  }
}

//-------------------------DEVELOPER STATE----------------------------//
let dev = new State();

dev.onEnter = function () {
  Keyboard.generate();
  window.addEventListener("keydown", (e) => Keyboard.press(e));
  window.addEventListener("keyup", (e) => Keyboard.release(e));
};

dev.update = function () {
  player.update();
};

dev.render = function () {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  TwoD.Perf.drawFps(ctx, 30, 30);
  player.render();
};

//-------------------------LOAD/UNLOAD----------------------------//
window.addEventListener("load", (e) => {
  player = new Player();
  frame.create();
  Game.getStateManager().push(dev);
  Game.init();
});

window.addEventListener("unload", (e) => {
  Game = null;
});
