import { type AbstractPainterObserver } from './observer/painter.observer';
import { AbstractPainterSubject } from './observer/painter.subject';
import { AbstractPainterState } from './state/painter.state';
import { LineState } from './state/line.state';
import { Layer } from './layer';

export class PainterModel extends AbstractPainterSubject {
  layers: Layer[];
  observers: AbstractPainterObserver[];
  painterState: AbstractPainterState;

  constructor() {
    super();

    this.layers = [];
    this.observers = [];
    this.painterState = LineState.getInstance();
  }

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

  getState(): AbstractPainterState {
    return this.painterState;
  }

  setState(state: AbstractPainterState): void {
    this.painterState = state;
  }

  toString(): string {
    return 'PainterModel';
  }
}
