import { TwoD } from "../TwoD.mjs";

const global = {};

const mouse = {
  x: 0,
  y: 0,
};

class Entity extends TwoD.Rect {
  constructor(x, y, w, h, color) {
    super(x, y, w, h);
    this.color = color;
    this.isActive = true;
    this.velocity = new TwoD.Vec2(
      TwoD.Math.rand(0, 150),
      TwoD.Math.rand(0, 150)
    );
  }

  update() {
    this.x += this.velocity.x * TwoD.Perf.dt;
    this.y += this.velocity.y * TwoD.Perf.dt;

    if (this.x < 0) this.x = innerWidth;
    else if (this.x > innerWidth) this.x = 0;

    if (this.y < 0) this.y = innerHeight;
    else if (this.y > innerHeight) this.y = 0;
  }

  render() {
    let { ctx } = global;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}

function update() {
  global.entities = global.entities.filter((entity) => entity.isActive);
  global.entities.forEach((entity) => entity.update());
}

function render() {
  global.ctx.clearRect(0, 0, innerWidth, innerHeight);
  global.entities.forEach((entity) => entity.render());
}

function loop() {
  TwoD.Perf.before();
  update();
  render();
  window.requestAnimationFrame(loop);
  TwoD.Perf.after();
}

function init() {
  global.frame = new TwoD.Frame();
  global.ctx = global.frame.getContext2d();
  global.entities = [];

  for (let i = 0; i < 20; i++) {
    global.entities.push(
      new Entity(i * 10, i * 10, 50, 50, TwoD.Color.random())
    );
  }

  global.frame.create();
  loop();
}

function exit() {
  for (let key in global) {
    delete global[key];
  }

  global = null;
  console.log("see you space cowboy");
}

window.addEventListener("load", init);
window.addEventListener("unload", exit);
