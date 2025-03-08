import { Point } from '../../types';
import { Ellipse } from '../ellipse';
import { FreePath } from '../free-path';
import { Line } from '../line';
import { Rectangle } from '../rectangle';

export abstract class AbstractLayerManager {
  abstract setStartPoint(point: Point): void;

  abstract setEndPoint(point: Point): void;

  abstract draw(ctx: CanvasRenderingContext2D): void;

  abstract isValidDrawing(): boolean;

  abstract createLayer(): Line | Rectangle | Ellipse | FreePath;

  abstract reset(): void;

  toString(): string {
    return 'AbstractLayerManager';
  }
}
