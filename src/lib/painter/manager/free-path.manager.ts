import { Point } from '../../types';
import { FreePath } from '../free-path';
import { AbstractBoundingBoxManager } from './bounding-box.manager';

export class FreePathLayerManager extends AbstractBoundingBoxManager {
  points: Point[];

  constructor() {
    super();

    this.points = [];
  }

  setStartPoint(point: Point): void {
    this.points.push(point);
  }

  setEndPoint(point: Point): void {
    this.points.push(point);
  }

  isValidDrawing(): boolean {
    return this.points.length > 1;
  }

  createLayer(): FreePath {
    return new FreePath(this.points);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (const point of this.points) {
      ctx.lineTo(point.x, point.y);
    }

    ctx.stroke();
  }

  reset(): void {
    this.points = [];
  }

  toString(): string {
    return 'FreePathLayerManager';
  }
}
