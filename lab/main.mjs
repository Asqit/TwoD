import { TwoD } from "../TwoD.mjs";

function keyMapper() {
  let keyboard = {};

  for (let i = 32; i < 127; i++) {
    keyboard[i.toString()] = false;
  }

  keyboard.keyDown = function (e) {
    let k = e.keyCode.toString();
    this[k] = true;
  };

  keyboard.keyUp = function (e) {
    let k = e.keyCode.toString();
    this[k] = true;
  };

  return keyboard;
}

class Entity extends TwoD.Rect {
  constructor(x, y, w, h, color) {
    super(x, y, w, h);
    this.alive = true;
    this.speed = new TwoD.Vec2(150, 150);
    this.color = new TwoD.Color(0, 128, 255, 255);
  }

  render() {
    let { ctx } = window.bundle;

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

class Player extends Entity {
  constructor() {
    super();
    this.gunTemp = 0;
    this.gunCooldown = 2.5;
  }

  #shoot() {
    if (this.gunTemp <= 0) {
      //shoot
      this.gunTemp = 100;
    }
  }

  #holdInScreen() {
    if (this.x < 0) this.x = innerWidth - this.w;
    else if (this.x + this.w > innerWidth) this.x = 0;

    if (this.y < 0) this.y = innerWidth - this.h;
    else if (this.y + this.h > innerWidth) this.y = 0;
  }

  #keyHandler() {}

  update() {
    if (this.gunTemp > 0) this.gunTemp -= this.gunCooldown;
    this.#holdInScreen();
    this.#keyHandler();
  }
}

function update() {
  let entities = window.bundle.entities;

  entities = entities.filter((entity) => entity.alive);
  entities.forEach((entity) => entity.update());
}

function render() {
  let entities = window.bundle.entities;
  window.bundle.ctx.clearRect(0, 0, innerWidth, innerHeight);
  entities.forEach((entity) => entity.render());
}

function loop() {
  TwoD.Perf.before();
  update();
  render();
  window.bundle.id = window.requestAnimationFrame(loop);
  TwoD.Perf.after();
}

function init() {
  let frame = new TwoD.Frame();
  let ctx = frame.getContext2d();
  let id = window.requestAnimationFrame;
  let keys = keyMapper();

  frame.create();
  loop();

  window.addEventListener("keydown", (e) => keys.keyDown);
  window.addEventListener("keyup", (e) => keys.keyUp);

  window.bundle = { frame, ctx, id, keys, entities: [] };
}
function exit() {
  for (let key in window.bundle) {
    delete window.bundle[key];
  }

  window.bundle = null;
}

window.addEventListener("load", init);
window.addEventListener("unload", exit);
