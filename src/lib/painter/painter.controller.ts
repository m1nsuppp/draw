import { type Point } from '../types';
import { Ellipse } from './ellipse';
import { FreePath } from './free-path';
import { type LayerType } from './layer';
import { Line } from './line';
import { PainterModel } from './painter.model';
import { PainterView } from './painter.view';
import { Rectangle } from './rectangle';

export class PainterController {
  constructor() {
    this.painterModel = null;
    this.painterView = null;

    this.points = [];

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;
  }

  painterModel: PainterModel | null;
  painterView: PainterView | null;

  points: Point[] = [];

  startX: number;
  startY: number;

  endX: number;
  endY: number;

  handleMouseDown(point: Point): void {
    const selectedLayerType = this.painterModel?.getSelectedLayerType() || 'line';

    this.startX = point.x;
    this.startY = point.y;

    if (selectedLayerType === 'free-path') {
      this.points.push({ x: this.startX, y: this.startY });
    }
  }

  handleMouseUp(point: Point): void {
    const selectedLayerType = this.painterModel?.getSelectedLayerType() || 'line';

    this.endX = point.x;
    this.endY = point.y;

    if (selectedLayerType === 'line') {
      this.painterModel?.addLayer(new Line(this.startX, this.startY, this.endX, this.endY));
    } else if (selectedLayerType === 'rectangle') {
      const x = Math.min(this.startX, this.endX);
      const y = Math.min(this.startY, this.endY);
      const width = Math.abs(this.startX - this.endX);
      const height = Math.abs(this.startY - this.endY);

      this.painterModel?.addLayer(new Rectangle(x, y, width, height));
    } else if (selectedLayerType === 'ellipse') {
      const x = Math.min(this.startX, this.endX);
      const y = Math.min(this.startY, this.endY);
      const width = Math.abs(this.startX - this.endX);
      const height = Math.abs(this.startY - this.endY);

      this.painterModel?.addLayer(new Ellipse(x, y, width, height));
    } else if (selectedLayerType === 'free-path') {
      this.painterModel?.addLayer(new FreePath(this.points));
    }

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;

    if (selectedLayerType === 'free-path') {
      this.points = [];
    }

    this.painterView?.repaint();
  }

  handleMouseMove(point: Point): void {
    this.endX = point.x;
    this.endY = point.y;

    if (this.painterModel?.getSelectedLayerType() === 'free-path') {
      this.points.push({ x: this.endX, y: this.endY });
    }

    this.painterView?.draw();
  }

  isValidDrawing(): boolean {
    return this.startX !== this.endX || this.startY !== this.endY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const selectedLayerType = this.painterModel?.getSelectedLayerType() || 'line';

    if (selectedLayerType === 'line') {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    } else if (selectedLayerType === 'rectangle') {
      const width = this.endX - this.startX;
      const height = this.endY - this.startY;

      ctx.fillRect(this.startX, this.startY, width, height);
      ctx.strokeRect(this.startX, this.startY, width, height);
    } else if (selectedLayerType === 'ellipse') {
      const width = this.endX - this.startX;
      const height = this.endY - this.startY;

      Ellipse.drawEllipseByBezierCurve(ctx, this.startX, this.startY, width, height);
    } else if (selectedLayerType === 'free-path') {
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);

      this.points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });

      ctx.stroke();
    }
  }

  setSelectedLayerType(layerType: LayerType): void {
    if (!this.painterModel) {
      return;
    }

    this.painterModel.setSelectedLayerType(layerType);
  }

  setPainterModel(painterModel: PainterModel): void {
    this.painterModel = painterModel;
  }

  setPainterView(painterView: PainterView): void {
    this.painterView = painterView;
  }

  toString(): string {
    return 'PainterController';
  }
}
