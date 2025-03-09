import { Point } from '../../types';
import { FreePathLayerManager } from '../manager/free-path.manager';
import { AbstractPainterContext } from './painter.context';
import { AbstractPainterState } from './painter.state';

export class FreePathState extends AbstractPainterState {
  freePathManager: FreePathLayerManager;
  private static instance: FreePathState | null = null;

  private constructor() {
    super();

    this.freePathManager = new FreePathLayerManager();
  }

  static getInstance(): FreePathState {
    if (!FreePathState.instance) {
      FreePathState.instance = new FreePathState();
    }

    return FreePathState.instance;
  }

  drag(context: AbstractPainterContext, point: Point): void {
    this.freePathManager.setEndPoint(point);

    context.repaintView();
  }

  press(context: AbstractPainterContext, point: Point): void {
    this.freePathManager.setStartPoint(point);
  }

  release(context: AbstractPainterContext, point: Point): void {
    this.freePathManager.setEndPoint(point);

    const layer = this.freePathManager.createLayer();
    this.freePathManager.reset();
    context.addLayer(layer);
  }

  draw(context: AbstractPainterContext, ctx: CanvasRenderingContext2D): void {
    if (this.freePathManager.isValidDrawing()) {
      this.freePathManager.draw(ctx);
    }
  }

  toString(): string {
    return 'FreePathState';
  }
}
