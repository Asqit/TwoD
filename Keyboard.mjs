const Keyboard = {};

Keyboard.keys = {};

Keyboard.generate = function () {
  // getting ascii keyCodes, first 128 are not language special
  for (let i = 0; i < 127; i++) {
    this.keys[String.fromCharCode(i)] = false;
  }
};

Keyboard.press = function (e) {
  let code = String.fromCharCode(e.keyCode);

  this.keys[code] = true;
};

Keyboard.release = function (e) {
  let code = String.fromCharCode(e.keyCode);

  this.keys[code] = false;
};

export { Keyboard };
