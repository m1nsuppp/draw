import { Layer } from './layer';

export class Rectangle extends Layer {
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
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;

    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  toString(): string {
    return 'Rectangle';
  }
}
