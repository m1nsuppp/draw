import { Rectangle } from '../rectangle';
import { AbstractBoundingBoxManager } from './bounding-box.manager';

export class RectangleLayerManager extends AbstractBoundingBoxManager {
  constructor() {
    super();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const width = this.endX - this.startX;
    const height = this.endY - this.startY;

    ctx.fillRect(this.startX, this.startY, width, height);
    ctx.strokeRect(this.startX, this.startY, width, height);
  }

  createLayer(): Rectangle {
    const width = this.endX - this.startX;
    const height = this.endY - this.startY;

    return new Rectangle(this.startX, this.startY, width, height);
  }

  toString(): string {
    return 'RectangleLayerManager';
  }
}
