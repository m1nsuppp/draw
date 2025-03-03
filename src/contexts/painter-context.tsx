import { createContext, useContext } from 'react';
import { PainterView } from '../lib/painter/painter.view';
import { PainterController } from '../lib/painter/painter.controller';
import { PainterModel } from '../lib/painter/painter.model';

export type PainterContextValue = {
  painterModel: PainterModel | null;
  painterView: PainterView | null;
  painterController: PainterController | null;
};

export const PainterContext = createContext<PainterContextValue | undefined>(undefined);
PainterContext.displayName = 'PainterContext';

export function usePainter(): PainterContextValue {
  const context = useContext(PainterContext);
  if (!context) {
    throw new Error();
  }

  return context;
}
