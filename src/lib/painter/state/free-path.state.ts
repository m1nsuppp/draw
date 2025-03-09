import { FreePathLayerManager } from '../manager/free-path.manager';
import { PainterState } from './painter.state';

export class FreePathState extends PainterState {
  freePathManager: FreePathLayerManager;
  private static instance: FreePathState | null = null;

  private constructor() {
    super();

    this.freePathManager = new FreePathLayerManager();
  }

  static getInstance(): FreePathState {
    if (!FreePathState.instance) {
      FreePathState.instance = new FreePathState();
    }

    return FreePathState.instance;
  }

  createLayerManager(): FreePathLayerManager {
    return new FreePathLayerManager();
  }

  toString(): string {
    return 'FreePathState';
  }
}
