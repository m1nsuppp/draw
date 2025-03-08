import { Point } from '../../types';
import { AbstractLayerManager } from './layer.manager';

export abstract class AbstractBoundingBoxManager extends AbstractLayerManager {
  constructor() {
    super();

    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;
  }

  startX: number;
  startY: number;

  endX: number;
  endY: number;

  setStartPoint(point: Point): void {
    this.startX = point.x;
    this.startY = point.y;
  }

  setEndPoint(point: Point): void {
    this.endX = point.x;
    this.endY = point.y;
  }

  isValidDrawing(): boolean {
    return this.startX !== this.endX || this.startY !== this.endY;
  }

  reset(): void {
    this.startX = 0;
    this.startY = 0;

    this.endX = 0;
    this.endY = 0;
  }

  toString(): string {
    return 'AbstractBoundingBoxManager';
  }
}
