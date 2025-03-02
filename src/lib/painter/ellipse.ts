import { Layer } from './layer';

export class Ellipse extends Layer {
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

    this.drawEllipseByBezierCurve(ctx, this.x, this.y, this.width, this.height);
  }

  drawEllipseByBezierCurve(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const kappa = 0.5522848;
    const ox = (width / 2) * kappa;
    const oy = (height / 2) * kappa;
    const xe = x + width;
    const ye = y + height;
    const xm = x + width / 2;
    const ym = y + height / 2;

    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

    ctx.fill();
    ctx.stroke();
  }

  toString(): string {
    return 'Ellipse';
  }
}
