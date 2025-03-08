import { type Ellipse } from './ellipse';
import { type FreePath } from './free-path';
import { type Line } from './line';
import { type Rectangle } from './rectangle';
import { type AbstractPainterObserver } from './observer/painter.observer';
import { AbstractPainterSubject } from './observer/painter.subject';
import { AbstractLayerManager } from './manager/layer.manager';
import { LineLayerManager } from './manager/line.manager';

type Layer = Line | Rectangle | Ellipse | FreePath;

export class PainterModel extends AbstractPainterSubject {
  constructor() {
    super();

    this.layers = [];
    this.observers = [];

    this.layerManager = new LineLayerManager();
  }

  layers: Layer[];
  observers: AbstractPainterObserver[];

  layerManager: AbstractLayerManager;

  drawLayers(ctx: CanvasRenderingContext2D): void {
    for (const layer of this.layers) {
      layer.draw(ctx);
    }
  }

  addLayer(layer: Layer): void {
    this.layers.push(layer);
    this.notifyObservers();
  }

  getLayers(): Layer[] {
    return this.layers;
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update();
    }
  }

  registerObserver(observer: AbstractPainterObserver): void {
    this.observers.push(observer);
  }

  unregisterObserver(observer: AbstractPainterObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  getLayerManager() {
    return this.layerManager;
  }

  setLayerManager(layerManager: AbstractLayerManager): void {
    this.layerManager = layerManager;
  }

  toString(): string {
    return 'PainterModel';
  }
}
