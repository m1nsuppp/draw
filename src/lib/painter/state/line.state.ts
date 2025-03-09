import { Point } from '../../types';
import { LineLayerManager } from '../manager/line.manager';
import { AbstractPainterContext } from './painter.context';
import { AbstractPainterState } from './painter.state';

export class LineState extends AbstractPainterState {
  lineManager: LineLayerManager;
  static instance: LineState | null;

  private constructor() {
    super();

    this.lineManager = new LineLayerManager();
  }

  static getInstance(): LineState {
    if (!LineState.instance) {
      LineState.instance = new LineState();
    }

    return LineState.instance;
  }

  drag(context: AbstractPainterContext, point: Point): void {
    this.lineManager.setEndPoint(point);

    context.repaintView();
  }

  press(context: AbstractPainterContext, point: Point): void {
    this.lineManager.setStartPoint(point);
  }

  release(context: AbstractPainterContext, point: Point): void {
    this.lineManager.setEndPoint(point);

    const layer = this.lineManager.createLayer();
    this.lineManager.reset();
    context.addLayer(layer);
  }

  draw(context: AbstractPainterContext, ctx: CanvasRenderingContext2D): void {
    if (this.lineManager.isValidDrawing()) {
      this.lineManager.draw(ctx);
    }
  }

  toString(): string {
    return 'LineState';
  }
}
