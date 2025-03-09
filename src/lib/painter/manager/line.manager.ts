import { Point } from '../../types';
import { Line } from '../line';
import { AbstractBoundingBoxManager } from './bounding-box.manager';

export class LineLayerManager extends AbstractBoundingBoxManager {
  startX: number;
  startY: number;

  endX: number;
  endY: number;

  constructor() {
    super();

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;
  }

  setStartPoint(point: Point): void {
    this.startX = point.x;
    this.startY = point.y;
  }

  setEndPoint(point: Point): void {
    this.endX = point.x;
    this.endY = point.y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }

  isValidDrawing(): boolean {
    return this.startX !== this.endX || this.startY !== this.endY;
  }

  createLayer(): Line {
    return new Line(this.startX, this.startY, this.endX, this.endY);
  }

  reset(): void {
    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;
  }

  toString(): string {
    return 'LineManager';
  }
}
