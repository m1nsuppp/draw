import { createContext, useContext } from 'react';
import { PainterView } from '../lib/painter/painter.view';

export type PainterContextValue = {
  painterView: PainterView | null;
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
