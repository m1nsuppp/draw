import { Point } from '../../types';
import { AbstractPainterContext } from './painter.context';

export abstract class AbstractPainterState {
  abstract press(context: AbstractPainterContext, point: Point): void;

  abstract drag(context: AbstractPainterContext, point: Point): void;

  abstract release(context: AbstractPainterContext, point: Point): void;

  abstract draw(context: AbstractPainterContext, ctx: CanvasRenderingContext2D): void;

  toString(): string {
    return 'AbstractPainterState';
  }
}
