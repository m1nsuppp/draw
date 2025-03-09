import { AbstractLayer } from '../layer';
import { AbstractPainterState } from './painter.state';

export abstract class AbstractPainterContext {
  abstract setState(state: AbstractPainterState): void;

  abstract repaintView(): void;

  abstract addLayer(layer: AbstractLayer): void;

  toString(): string {
    return 'AbstractPainterContext';
  }
}
