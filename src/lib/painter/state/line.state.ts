import { LineLayerManager } from '../manager/line.manager';
import { PainterState } from './painter.state';

export class LineState extends PainterState {
  lineManager: LineLayerManager;
  static instance: LineState | null;

  private constructor() {
    super();

    this.lineManager = new LineLayerManager();
  }

  static getInstance(): LineState {
    if (!LineState.instance) {
      LineState.instance = new LineState();
    }

    return LineState.instance;
  }

  createLayerManager(): LineLayerManager {
    return new LineLayerManager();
  }

  toString(): string {
    return 'LineState';
  }
}
