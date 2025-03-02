export abstract class Layer {
  constructor() {
    this.strokeColor = 'red';
    this.strokeWidth = 10;
    this.fillColor = 'blue';
  }

  strokeColor: string;
  strokeWidth: number;
  fillColor: string;

  abstract draw(ctx: CanvasRenderingContext2D): void;

  toString(): string {
    return 'Layer';
  }
}
