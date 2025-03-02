import { type Point } from '../types';
import { Ellipse } from './ellipse';
import { FreePath } from './free-path';
import { Line } from './line';
import { PainterModel } from './painter.model';
import { Rectangle } from './rectangle';

export class PainterView {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }

    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = 'blue';

    this.ctx = ctx;
    this.painterModel = new PainterModel();

    // const line = new Line(50, 50, 100, 80);
    // line.setStrokeColor('pink');
    // this.painterModel.addLayer(line);

    // const rectangle = new Rectangle(110, 20, 100, 50);
    // rectangle.setStrokeColor('red');
    // rectangle.setFillColor('blue');
    // this.painterModel.addLayer(rectangle);

    // const ellipse = new Ellipse(110, 120, 100, 80);
    // ellipse.setStrokeColor('green');
    // ellipse.setFillColor('yellow');
    // this.painterModel.addLayer(ellipse);

    // const freePath = new FreePath([
    //   { x: 10, y: 20 },
    //   { x: 30, y: 140 },
    //   { x: 50, y: 60 },
    // ]);
    // freePath.setStrokeColor('black');
    // this.painterModel.addLayer(freePath);
    canvas.addEventListener('mousedown', this.handleMouseEvent, false);
  }

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private painterModel: PainterModel;

  handleMouseEvent = (e: MouseEvent): void => {
    const canvas = this.canvas;
    const painterViewThis = this;

    const pressedPoint = this.getRelativePosition(e, canvas);
    console.log({ pressedPoint });

    const handleMouseMove = (e: MouseEvent) => {
      const movedPoint = painterViewThis.getRelativePosition(e, canvas);

      console.log({ movedPoint });
    };

    canvas.addEventListener('mousemove', handleMouseMove, false);

    const handleMouseUp = (e: MouseEvent) => {
      const releasedPoint = painterViewThis.getRelativePosition(e, canvas);

      console.log({ releasedPoint });

      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('mouseup', handleMouseUp, false);
  };

  getRelativePosition(e: MouseEvent, canvas: HTMLCanvasElement): Point {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    return { x, y };
  }

  repaint(): void {
    this.painterModel.drawLayers(this.ctx);
  }

  toString(): string {
    return 'PainterView';
  }
}
