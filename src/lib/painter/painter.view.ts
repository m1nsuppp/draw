import type { Point } from '../types';
import { Ellipse } from './ellipse';
import { LayerType } from './layer';
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
    this.painterModel = new PainterModel();
    this.selectedLayerType = 'line';

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;

    this.points = [];

    canvas.addEventListener('mousedown', this.handleMouseEvent, false);
  }

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  painterModel: PainterModel;
  selectedLayerType: LayerType;

  startX: number;
  startY: number;

  endX: number;
  endY: number;

  points: Point[];

  handleMouseEvent = (e: MouseEvent): void => {
    const canvas = this.canvas;

    const canvasImageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);

    const pressedPoint = this.getRelativePosition(e, canvas);
    this.startX = pressedPoint.x;
    this.startY = pressedPoint.y;

    const handleMouseMove = (e: MouseEvent) => {
      const movedPoint = this.getRelativePosition(e, canvas);
      this.endX = movedPoint.x;
      this.endY = movedPoint.y;

      this.points.push({ x: this.endX, y: this.endY });

      this.ctx.putImageData(canvasImageData, 0, 0);

      this.draw(this.ctx);
    };
    canvas.addEventListener('mousemove', handleMouseMove, false);

    const handleMouseUp = (e: MouseEvent) => {
      const releasedPoint = this.getRelativePosition(e, canvas);
      this.endX = releasedPoint.x;
      this.endY = releasedPoint.y;

      this.points.push({ x: this.endX, y: this.endY });

      this.ctx.putImageData(canvasImageData, 0, 0);

      this.draw(this.ctx);

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

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.selectedLayerType === 'line') {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    } else if (this.selectedLayerType === 'rectangle') {
      const width = this.endX - this.startX;
      const height = this.endY - this.startY;

      ctx.fillRect(this.startX, this.startY, width, height);
      ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (this.selectedLayerType === 'ellipse') {
      const width = this.endX - this.startX;
      const height = this.endY - this.startY;

      Ellipse.drawEllipseByBezierCurve(ctx, this.startX, this.startY, width, height);
    } else if (this.selectedLayerType === 'free-path') {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);

      this.points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });

      ctx.stroke();
    }
  }

  setSelectedLayerType(layerType: LayerType): void {
    this.selectedLayerType = layerType;
  }

  repaint(): void {
    this.painterModel.drawLayers(this.ctx);
  }

  toString(): string {
    return 'PainterView';
  }
}
