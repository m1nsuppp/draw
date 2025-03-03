import { AbstractLayer } from './layer';

export class Rectangle extends AbstractLayer {
  constructor(x: number, y: number, width: number, height: number) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  x: number;
  y: number;
  width: number;
  height: number;

  draw(ctx: CanvasRenderingContext2D): void {
    this.applyStyle(ctx);

    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  toString(): string {
    return 'Rectangle';
  }
}
