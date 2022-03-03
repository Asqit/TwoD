"use strict";
import { TwoD } from "./TwoD.mjs";
import { State, StateList, StateStack } from "./StateManager.mjs";

/**@namespace Game*/
const Game = {};
Game._data = {};

Game._data.stateManager = new StateStack();

Game.loop = function () {
  TwoD.Perf.before();
  this._data.stateManager.update();
  this._data.stateManager.render();
  window.requestAnimationFrame(() => this.loop());
  TwoD.Perf.after();
};

Game.onPause = function () {
  this._data.stateManager.pause();
};

Game.onResume = function () {
  this._data.stateManager.resume();
};

Game.onStart = function () {
  this.loop();
};

Game.init = function () {
  this.onStart();
};

Game.getStateManager = function () {
  return this._data.stateManager;
};

export { Game };
