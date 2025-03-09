import { EllipseLayerManager } from '../manager/ellipse.manager';
import { PainterState } from './painter.state';

export class EllipseState extends PainterState {
  ellipseManager: EllipseLayerManager;
  private static instance: EllipseState | null = null;

  private constructor() {
    super();

    this.ellipseManager = new EllipseLayerManager();
  }

  static getInstance(): EllipseState {
    if (!EllipseState.instance) {
      EllipseState.instance = new EllipseState();
    }

    return EllipseState.instance;
  }

  createLayerManager(): EllipseLayerManager {
    return new EllipseLayerManager();
  }

  toString(): string {
    return 'EllipseState';
  }
}
