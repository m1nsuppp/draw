export class Line {
  constructor(startX: number, startY: number, endX: number, endY: number) {
    this.strokeColor = 'green';
    this.strokeWidth = 10;

    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  private strokeColor: string;
  private strokeWidth: number;
  private startX: number;
  private startY: number;
  private endX: number;
  private endY: number;

  drawLine(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.strokeColor;

    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }

  toString(): string {
    return 'LinePiece';
  }
}
