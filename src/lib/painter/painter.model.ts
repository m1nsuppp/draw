import { Ellipse } from './ellipse';
import { Line } from './line';
import { Rectangle } from './rectangle';

type LayerType = Line | Rectangle | Ellipse;

export class PainterModel {
  constructor() {
    this.layers = [];
  }

  layers: LayerType[];

  drawLayers(ctx: CanvasRenderingContext2D): void {
    for (const layer of this.layers) {
      layer.draw(ctx);
    }
  }

  addLayer(layer: LayerType): void {
    this.layers.push(layer);
  }

  toString(): string {
    return 'PainterModel';
  }
}
