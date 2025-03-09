import { Point } from '../../types';
import { RectangleLayerManager } from '../manager/rectangle.manager';
import { AbstractPainterContext } from './painter.context';
import { AbstractPainterState } from './painter.state';

export class RectangleState extends AbstractPainterState {
  rectangleManager: RectangleLayerManager;
  static instance: RectangleState | null;

  private constructor() {
    super();

    this.rectangleManager = new RectangleLayerManager();
  }

  static getInstance(): RectangleState {
    if (!RectangleState.instance) {
      RectangleState.instance = new RectangleState();
    }

    return RectangleState.instance;
  }

  drag(context: AbstractPainterContext, point: Point): void {
    this.rectangleManager.setEndPoint(point);

    context.repaintView();
  }

  press(context: AbstractPainterContext, point: Point): void {
    this.rectangleManager.setStartPoint(point);
  }

  release(context: AbstractPainterContext, point: Point): void {
    this.rectangleManager.setEndPoint(point);

    const layer = this.rectangleManager.createLayer();
    this.rectangleManager.reset();
    context.addLayer(layer);
  }

  draw(context: AbstractPainterContext, ctx: CanvasRenderingContext2D): void {
    if (this.rectangleManager.isValidDrawing()) {
      this.rectangleManager.draw(ctx);
    }
  }

  toString(): string {
    return 'RectangleState';
  }
}
