import { Ellipse } from '../ellipse';
import { AbstractBoundingBoxManager } from './bounding-box.manager';

export class EllipseLayerManager extends AbstractBoundingBoxManager {
  constructor() {
    super();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const width = this.endX - this.startX;
    const height = this.endY - this.startY;

    Ellipse.drawEllipseByBezierCurve(ctx, this.startX, this.startY, width, height);
  }

  createLayer(): Ellipse {
    return new Ellipse(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY);
  }

  toString(): string {
    return 'EllipseLayerManager';
  }
}
