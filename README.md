# TwoD

_tiny javascript library_

TwoD.js is my tiny javascript library for easing my work with `HTML5CanvasElement` while making interactive applications. It served me mostly for making my javascript games.

## Contents:

namespace is `TwoD`. So when you need to use some part of the lib, you simply call it by `TwoD` + dot notation.
`TwoD` is just an object literal, but it has been frezed by `Object.freeze(TwoD)`, so its not editable.

- `Frame` - canvas class
- `Maths` - Object with mathematics
- `Perf` - Object for calculating FPS and delta time
- `Shapes` (Vec2, Circle, Rect, Line...)
- `Collision` (measures collision between shapes)
- `StateMachine` - Object with State, List and Machine (basic state handling)
- `Color` - simple function which contructs new RGBA color in String
- `View` - very simple camera implementation. No super features like culling
- `DOM` - Object with function that ease up your work
- `Palette` - Object with color palettes that where taken from [this]() awesome website full of awesome artists

**more to come**

## how to use

Its very simple.

**ES6 module**

1. clone it or download `TwoD.mjs`
2. extract/move to desired location
3. you can either use named export and export only part of the bundle or import entire `TwoD`

bundle: `import TwoD from "./path/TwoD.mjs`

part: `import {Frame, Maths} from "./path/TwoD.mjs"`

4. Voila! It should be working (to test this out, open console `F12` and go to console, there you should see colored text)

## What can it do ?

TwoD can make multiple canvases, help you with some basic math and measure performance, collision. I will be adding more stuff with some time, this is all for now.
