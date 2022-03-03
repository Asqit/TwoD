//==========================================
//             STATE MANAGER
//==========================================
const State = function (props) {
  this.props = props;
  this.onEnter = function () {};
  this.update = function () {};
  this.render = function () {};
  this.onExit = function () {};

  this.onPause = function () {};
  this.onResume = function () {};
};

const StateList = function () {
  this.states = [];

  this.pop = function () {
    return this.states.pop();
  };

  this.push = function (state) {
    this.states.push(state);
  };

  this.top = function () {
    return this.states[this.states.length - 1];
  };
};

const StateStack = function () {
  this.sl = new StateList();
  this.sl.push(new State());

  this.update = function () {
    let top = this.sl.top();
    top.update();
  };

  this.render = function () {
    let top = this.sl.top();
    top.render();
  };

  this.push = function (state) {
    this.sl.push(state);
    state.onEnter();
  };

  this.pop = function () {
    let selected = this.sl.top();
    selected.onExit();
    this.sl.pop();
  };

  this.pause = function () {
    let top = this.sl.top();
    top.onPause();
  };

  this.resume = function () {
    let top = this.sl.top();
    top.onResume();
  };
};

export { State, StateList, StateStack };
