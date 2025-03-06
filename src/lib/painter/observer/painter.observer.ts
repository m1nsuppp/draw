export abstract class AbstractPainterObserver {
  abstract update(): void;

  toString(): string {
    return 'PainterObserver';
  }
}
