import { type Point } from '../types';
import { AbstractLayerManager } from './manager/layer.manager';
import { PainterModel } from './painter.model';
import { PainterView } from './painter.view';

export class PainterController {
  constructor() {
    this.painterModel = null;
    this.painterView = null;
  }

  painterModel: PainterModel | null;
  painterView: PainterView | null;

  points: Point[] = [];

  handleMouseDown(point: Point): void {
    const layerManager = this.painterModel?.getLayerManager();
    layerManager?.setStartPoint(point);
  }

  handleMouseUp(point: Point): void {
    if (!this.painterModel) {
      return;
    }

    const layerManager = this.painterModel.getLayerManager();
    layerManager.setEndPoint(point);

    const layer = layerManager.createLayer();
    layerManager.reset();
    this.painterModel.addLayer(layer);
  }

  handleMouseMove(point: Point): void {
    if (!this.painterModel) {
      return;
    }

    const layerManager = this.painterModel.getLayerManager();
    layerManager.setEndPoint(point);

    this.painterView?.draw();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.painterModel) {
      return;
    }

    const layerManager = this.painterModel.getLayerManager();
    if (layerManager.isValidDrawing()) {
      layerManager.draw(ctx);
    }
  }

  setPainterModel(painterModel: PainterModel): void {
    this.painterModel = painterModel;
  }

  setPainterView(painterView: PainterView): void {
    this.painterView = painterView;
  }

  setLayerManager(layerManager: AbstractLayerManager): void {
    if (!this.painterModel) {
      return;
    }

    this.painterModel.setLayerManager(layerManager);
  }

  toString(): string {
    return 'PainterController';
  }
}
