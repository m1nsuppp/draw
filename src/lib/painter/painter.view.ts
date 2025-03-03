import type { Point } from '../types';
import { PainterController } from './painter.controller';
import { PainterModel } from './painter.model';

export class PainterView {
  constructor(canvas: HTMLCanvasElement) {
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

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  painterModel: PainterModel | null;
  painterController: PainterController | null;

  canvasImageData: ImageData | null;

  handleMouseEvent = (e: MouseEvent): void => {
    const canvas = this.canvas;
    const painterController = this.painterController;
    if (!painterController) {
      return;
    }

    this.saveImageData();

    const pressedPoint = this.getRelativePosition(e, canvas);
    painterController.handleMouseDown(pressedPoint);

    const handleMouseMove = (e: MouseEvent) => {
      const movedPoint = this.getRelativePosition(e, canvas);
      painterController.handleMouseMove(movedPoint);
    };
    canvas.addEventListener('mousemove', handleMouseMove, false);

    const handleMouseUp = (e: MouseEvent) => {
      const releasedPoint = this.getRelativePosition(e, canvas);
      painterController.handleMouseUp(releasedPoint);

      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
    canvas.addEventListener('mouseup', handleMouseUp, false);
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

    if (this.painterController) {
      if (this.painterController.isValidDrawing()) {
        this.painterController.draw(this.ctx);
      }
    }
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

  toString(): string {
    return 'PainterView';
  }
}
