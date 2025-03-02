import { type Point } from '../types';
import { Layer } from './layer';

export class FreePath extends Layer {
  constructor(points: Point[]) {
    super();

    this.points = [];

    for (const point of points) {
      this.points.push(point);
    }
  }

  points: Point[];

  draw(ctx: CanvasRenderingContext2D): void {
    this.applyStyle(ctx);

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    ctx.stroke();
  }

  toString(): string {
    return 'FreePath';
  }
}
