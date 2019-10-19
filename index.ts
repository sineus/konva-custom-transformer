// Import stylesheets
import './style.css';

import Konva from 'konva';
import { CustomTransformer } from './Transformer';

const width = window.innerWidth;
const height = 400;

const stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

const layer = new Konva.Layer();
const group = new Konva.Group({
  x: 0,
  y: 0
});

const x = 50;
const y = 50;
const IDLE_COLOR = 'black';
const HOVER_COLOR = 'blue';
const FOCUS_COLOR = 'red';

const lineA = new Konva.Line({
  x: x,
  y: y,
  points: [0, 0, 50, 0, 50, 50, 0, 50],
  stroke: IDLE_COLOR,
  strokeWidth: 2,
  closed: true,
  strokeScaleEnabled: false,
  draggable: true
});

lineA
  .on('mouseenter mouseup', () => {
    lineA.stroke(HOVER_COLOR);
    layer.batchDraw();
  })
  .on('mouseleave', () => {
    lineA.stroke(IDLE_COLOR);
    layer.batchDraw();
  })
  .on('mousedown', () => {
    lineA.stroke(FOCUS_COLOR);
    const tr = new CustomTransformer();
    layer.batchDraw();
  })
  .on('dragmove', (evt) => {

  })

group.add(lineA);
layer.add(group);
stage.add(layer);
layer.draw();

let scaleFactor = 1;

function round(value: number, decimals: number) {
  return Number(Math.round(value + 'e' + decimals) + 'e-'+decimals);
}

const scale = (f: number) => {
  f = +f;

  console.log(group.x());

  const rec = group.getClientRect({ 
    skipStroke: true 
  });

  console.log(rec);

  group.scale({
    x: f,
    y: f
  });

  // console.log(f);

  /* const position = {
    x: Math.round(rec.x),
    y: Math.round(rec.y)
  };

  // Find how to keep group x axis when scalling it
  group.position({
    x: -round((position.x * f - position.x), 2),
    y: -round((position.y * f - position.y), 2)
  }); */

  const attrs: any = group.getAttrs();

  /* console.log(-round(attrs.x * f - attrs.x, 2));
  console.log(-round(attrs.y * f - attrs.y, 2)); */
  // console.log(group.x());

  /* console.log(group.getClientRect({ 
    skipStroke: true 
  })); */
  layer.batchDraw();
};

scale(scaleFactor);
layer.draw();

const scaleCtrl: any = document.querySelector('#scale');
const display: HTMLDivElement = document.querySelector('#display');
scaleCtrl.value = scaleFactor;

display.innerText = scaleCtrl.value;

scaleCtrl.onchange = (evt: any) => {
  display.innerText = evt.target.value;
  scale(evt.target.value);
};