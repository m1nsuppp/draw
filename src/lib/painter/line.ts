import { AbstractLayer } from './layer';

export class Line extends AbstractLayer {
  constructor(startX: number, startY: number, endX: number, endY: number) {
    super();

    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  private startX: number;
  private startY: number;
  private endX: number;
  private endY: number;

  draw(ctx: CanvasRenderingContext2D): void {
    this.applyStyle(ctx);

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }

  toString(): string {
    return 'LinePiece';
  }
}
