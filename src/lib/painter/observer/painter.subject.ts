import { type AbstractPainterObserver } from './painter.observer';

export abstract class AbstractPainterSubject {
  abstract notifyObservers(): void;

  abstract registerObserver(observer: AbstractPainterObserver): void;

  abstract unregisterObserver(observer: AbstractPainterObserver): void;

  toString(): string {
    return 'PainterSubject';
  }
}
