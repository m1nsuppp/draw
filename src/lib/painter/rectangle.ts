export class Rectangle {
  constructor(x: number, y: number, width: number, height: number) {
    this.strokeColor = 'red';
    this.strokeWidth = 10;

    this.fillColor = 'blue';

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  strokeColor: string;
  strokeWidth: number;

  fillColor: string;

  x: number;
  y: number;
  width: number;
  height: number;

  drawRectangle(ctx: CanvasRenderingContext2D): void {
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
