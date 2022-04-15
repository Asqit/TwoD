# TwoD

_tiny javascript library_

TwoD.js is my tiny javascript library for easing my work with `HTML5CanvasElement` while making interactive applications. It served me mostly for making my javascript games.

## Contents:

namespace is `TwoD`. So when you need to use some part of the lib, you simply call it by `TwoD` + dot notation.
`TwoD` is just an object literal, but it has been frezed by `Object.freeze(TwoD)`, so its not editable.

- `Frame` - canvas class
- `Math` - Object with mathematics
- `Perf` - Object for calculating FPS and delta time
- `Shapes` (Vec2, Circle, Rect, Line...)
- `Collision` (measures collision between shapes)
- `StateMachine` - Object with State, List and Machine (basic state handling)
- `Color` - simple function which contructs new RGBA color in String 

**more to come**

## how to use

Its very simple.

**ES6 module**

1. clone it or download `TwoD.mjs`
2. extract/move to desired location
3. import TwoD object `import { TwoD } from "./location/to/TwoD.mjs"`
4. Voila! It should be working (to test this out, open console `F12` and go to console, there you should see colored text)


## What can it do ?

TwoD can make multiple canvases, help you with some basic math and measure performance, collision. I will be adding more stuff with some time, this is all for now.
