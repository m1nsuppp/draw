export abstract class AbstractLayer {
  constructor() {
    this.strokeColor = 'red';
    this.strokeWidth = 10;
    this.fillColor = 'blue';
  }

  strokeColor: string;
  strokeWidth: number;
  fillColor: string;

  abstract draw(ctx: CanvasRenderingContext2D): void;

  setStrokeColor(color: string): void {
    this.strokeColor = color;
  }

  setStrokeWidth(width: number): void {
    this.strokeWidth = width;
  }

  setFillColor(color: string): void {
    this.fillColor = color;
  }

  applyStyle(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = this.strokeWidth;
    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;
  }

  toString(): string {
    return 'Layer';
  }
}

export type LayerType = 'line' | 'rectangle' | 'ellipse' | 'free-path';
