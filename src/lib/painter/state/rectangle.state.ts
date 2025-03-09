import { RectangleLayerManager } from '../manager/rectangle.manager';
import { PainterState } from './painter.state';

export class RectangleState extends PainterState {
  rectangleManager: RectangleLayerManager;
  static instance: RectangleState | null;

  private constructor() {
    super();

    this.rectangleManager = new RectangleLayerManager();
  }

  static getInstance(): RectangleState {
    if (!RectangleState.instance) {
      RectangleState.instance = new RectangleState();
    }

    return RectangleState.instance;
  }

  createLayerManager(): RectangleLayerManager {
    return new RectangleLayerManager();
  }

  toString(): string {
    return 'RectangleState';
  }
}
