import { type Ellipse } from './ellipse';
import { type FreePath } from './free-path';
import { type Line } from './line';
import { type Rectangle } from './rectangle';

type Layer = Line | Rectangle | Ellipse | FreePath;

export class PainterModel {
  constructor() {
    this.layers = [];
  }

  layers: Layer[];

  drawLayers(ctx: CanvasRenderingContext2D): void {
    for (const layer of this.layers) {
      layer.draw(ctx);
    }
  }

  addLayer(layer: Layer): void {
    this.layers.push(layer);
  }

  toString(): string {
    return 'PainterModel';
  }
}
