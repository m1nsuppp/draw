import { Ellipse } from './ellipse';
import { Line } from './line';
import { PainterModel } from './painter.model';
import { Rectangle } from './rectangle';

export class PainterView {
  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }

    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'blue';

    this.ctx = ctx;
    this.painterModel = new PainterModel();

    const line = new Line(50, 50, 100, 80);
    line.setStrokeColor('pink');

    const rectangle = new Rectangle(110, 20, 100, 50);
    rectangle.setStrokeColor('red');
    rectangle.setFillColor('blue');

    const ellipse = new Ellipse(110, 120, 100, 80);
    ellipse.setStrokeColor('green');
    ellipse.setFillColor('yellow');

    this.painterModel.addLayer(line);
    this.painterModel.addLayer(rectangle);
    this.painterModel.addLayer(ellipse);
  }

  private ctx: CanvasRenderingContext2D;
  private painterModel: PainterModel;

  repaint(): void {
    this.painterModel.drawLayers(this.ctx);
  }

  toString(): string {
    return 'PainterView';
  }
}
