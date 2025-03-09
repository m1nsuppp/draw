import { Point } from '../../types';
import { EllipseLayerManager } from '../manager/ellipse.manager';
import { AbstractPainterContext } from './painter.context';
import { AbstractPainterState } from './painter.state';

export class EllipseState extends AbstractPainterState {
  ellipseManager: EllipseLayerManager;
  private static instance: EllipseState | null = null;

  private constructor() {
    super();

    this.ellipseManager = new EllipseLayerManager();
  }

  static getInstance(): EllipseState {
    if (!EllipseState.instance) {
      EllipseState.instance = new EllipseState();
    }

    return EllipseState.instance;
  }

  drag(context: AbstractPainterContext, point: Point): void {
    this.ellipseManager.setEndPoint(point);
    context.repaintView();
  }

  press(context: AbstractPainterContext, point: Point): void {
    this.ellipseManager.setStartPoint(point);
  }

  release(context: AbstractPainterContext, point: Point): void {
    this.ellipseManager.setEndPoint(point);

    const layer = this.ellipseManager.createLayer();
    this.ellipseManager.reset();
    context.addLayer(layer);
  }

  draw(context: AbstractPainterContext, ctx: CanvasRenderingContext2D): void {
    if (this.ellipseManager.isValidDrawing()) {
      this.ellipseManager.draw(ctx);
    }
  }

  toString(): string {
    return 'EllipseState';
  }
}
