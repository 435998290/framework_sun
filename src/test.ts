// import { Sun } from '../framework/sun';

// const sun = new Sun({
//     data: {
//         name: 'Sun',
//         age: 24,
//     }
// })

// console.log('hello world');

// sun.data.name = 'swy';
// sun.data.age = 25;

import { h } from "../framework/module/render/h";
import { mount } from "../framework/module/render/mount";
import { patch } from "../framework/module/render/patch";

console.error("start mount");
const helloWord = h(
  "span",
  { style: "color: red; margin-right: 20px; " },
  "hello world"
);
const goodNight = h("span", { style: "color: blue" }, "good night");
const goodDay = h("span", { style: "color: green" }, "good day");
const oldNode = h("div", null, [helloWord, goodNight]);
const newNode = h("div", { style: 'margin-left: 100px'}, [helloWord, goodDay]);
const patchedNode = patch(oldNode, newNode);
mount(patchedNode, document.getElementById("app"));