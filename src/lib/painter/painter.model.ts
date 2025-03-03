import { type Ellipse } from './ellipse';
import { type FreePath } from './free-path';
import { type LayerType } from './layer';
import { type Line } from './line';
import { type Rectangle } from './rectangle';

type Layer = Line | Rectangle | Ellipse | FreePath;

export class PainterModel {
  constructor() {
    this.layers = [];
    this.selectedLayerType = 'line';
  }

  layers: Layer[];
  selectedLayerType: LayerType;

  drawLayers(ctx: CanvasRenderingContext2D): void {
    for (const layer of this.layers) {
      layer.draw(ctx);
    }
  }

  addLayer(layer: Layer): void {
    this.layers.push(layer);
  }

  getSelectedLayerType(): LayerType {
    return this.selectedLayerType;
  }

  setSelectedLayerType(layerType: LayerType): void {
    this.selectedLayerType = layerType;
  }

  getLayers(): Layer[] {
    return this.layers;
  }

  toString(): string {
    return 'PainterModel';
  }
}
