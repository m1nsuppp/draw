import { Point } from '../../types';
import { AbstractLayerManager } from '../manager/layer.manager';
import { AbstractPainterContext } from './painter.context';

export abstract class AbstractPainterState {
  abstract press(context: AbstractPainterContext, point: Point): void;

  abstract drag(context: AbstractPainterContext, point: Point): void;

  abstract release(context: AbstractPainterContext, point: Point): void;

  abstract draw(context: AbstractPainterContext, ctx: CanvasRenderingContext2D): void;

  toString(): string {
    return 'AbstractPainterState';
  }
}

export class PainterState extends AbstractPainterState {
  layerManager: AbstractLayerManager;

  constructor() {
    super();

    this.layerManager = this.createLayerManager();
  }

  createLayerManager(): AbstractLayerManager {
    throw new Error('Not implemented');
  }

  press(context: AbstractPainterContext, point: Point): void {
    this.layerManager.setStartPoint(point);
  }

  drag(context: AbstractPainterContext, point: Point): void {
    this.layerManager.setEndPoint(point);

    context.repaintView();
  }

  release(context: AbstractPainterContext, point: Point): void {
    this.layerManager.setEndPoint(point);

    const layer = this.layerManager.createLayer();
    this.layerManager.reset();
    context.addLayer(layer);
  }

  draw(context: AbstractPainterContext, ctx: CanvasRenderingContext2D): void {
    if (this.layerManager.isValidDrawing()) {
      this.layerManager.draw(ctx);
    }
  }

  toString(): string {
    return 'PainterState';
  }
}
