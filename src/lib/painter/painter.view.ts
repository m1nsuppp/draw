import type { Point } from '../types';
import { PainterController } from './painter.controller';
import { PainterModel } from './painter.model';
import { AbstractPainterObserver } from './observer/painter.observer';

export class PainterView extends AbstractPainterObserver {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  painterModel: PainterModel | null;
  painterController: PainterController | null;

  canvasImageData: ImageData | null;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }

    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'blue';

    this.ctx = ctx;

    this.painterModel = null;
    this.painterController = null;

    this.canvasImageData = null;

    canvas.addEventListener('mousedown', this.handleMouseEvent, false);
  }

  handleMouseEvent = (e: MouseEvent): void => {
    if (!this.painterController) {
      return;
    }

    this.saveImageData();

    const pressedPoint = this.getRelativePosition(e, this.canvas);
    this.painterController?.handleMouseDown(pressedPoint);

    const handleMouseMove = (e: MouseEvent) => {
      const movedPoint = this.getRelativePosition(e, this.canvas);
      this.painterController?.handleMouseMove(movedPoint);
    };
    this.canvas.addEventListener('mousemove', handleMouseMove, false);

    const handleMouseUp = (e: MouseEvent) => {
      const releasedPoint = this.getRelativePosition(e, this.canvas);
      this.painterController?.handleMouseUp(releasedPoint);

      this.canvas.removeEventListener('mousemove', handleMouseMove, false);
      this.canvas.removeEventListener('mouseup', handleMouseUp, false);
    };
    this.canvas.addEventListener('mouseup', handleMouseUp, false);
  };

  getRelativePosition(e: MouseEvent, canvas: HTMLCanvasElement): Point {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    return { x, y };
  }

  repaint(): void {
    if (!this.canvasImageData) {
      return;
    }

    this.ctx.putImageData(this.canvasImageData, 0, 0);
    this.painterModel?.drawLayers(this.ctx);
  }

  draw(): void {
    if (!this.canvasImageData) {
      return;
    }

    this.ctx.putImageData(this.canvasImageData, 0, 0);

    this.painterController?.draw(this.ctx);
  }

  saveImageData(): void {
    this.canvasImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  setPainterModel(painterModel: PainterModel): void {
    this.painterModel = painterModel;
  }

  setPainterController(painterController: PainterController): void {
    this.painterController = painterController;
  }

  update(): void {
    this.repaint();
  }

  toString(): string {
    return 'PainterView';
  }
}
