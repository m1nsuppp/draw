import { type Point } from '../types';
import { type Layer } from './layer';
import { PainterModel } from './painter.model';
import { PainterView } from './painter.view';
import { AbstractPainterContext } from './state/painter.context';
import { AbstractPainterState } from './state/painter.state';

export class PainterController extends AbstractPainterContext {
  painterModel: PainterModel | null;
  painterView: PainterView | null;

  constructor() {
    super();
    this.painterModel = null;
    this.painterView = null;
  }

  handleMouseDown(point: Point): void {
    if (!this.painterModel) {
      return;
    }

    const state = this.painterModel.getState();
    state.press(this, point);
  }

  handleMouseUp(point: Point): void {
    if (!this.painterModel) {
      return;
    }

    const state = this.painterModel.getState();
    state.release(this, point);
  }

  handleMouseMove(point: Point): void {
    if (!this.painterModel) {
      return;
    }

    const state = this.painterModel.getState();
    state.drag(this, point);

    this.painterView?.draw();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.painterModel) {
      return;
    }

    const state = this.painterModel.getState();
    state.draw(this, ctx);
  }

  setPainterModel(painterModel: PainterModel): void {
    this.painterModel = painterModel;
  }

  setPainterView(painterView: PainterView): void {
    this.painterView = painterView;
  }

  setState(state: AbstractPainterState): void {
    if (!this.painterModel) {
      return;
    }

    this.painterModel.setState(state);
  }

  repaintView(): void {
    this.painterView?.repaint();
  }

  addLayer(layer: Layer): void {
    if (!this.painterModel) {
      return;
    }

    this.painterModel.addLayer(layer);
  }

  toString(): string {
    return 'PainterController';
  }
}
