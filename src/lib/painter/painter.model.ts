import { Ellipse } from './ellipse';
import { Line } from './line';
import { Rectangle } from './rectangle';

export class PainterModel {
  constructor() {
    this.layers = [];
  }

  layers: (Line | Rectangle | Ellipse)[];

  drawLayers(ctx: CanvasRenderingContext2D): void {
    for (const layer of this.layers) {
      if (layer instanceof Line) {
        layer.drawLine(ctx);
      } else if (layer instanceof Rectangle) {
        layer.drawRectangle(ctx);
      } else if (layer instanceof Ellipse) {
        layer.drawEllipse(ctx);
      }
    }
  }

  addLayer(layer: Line | Rectangle | Ellipse): void {
    this.layers.push(layer);
  }

  toString(): string {
    return 'PainterModel';
  }
}
