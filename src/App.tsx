import { useCallback, useState } from 'react';
import { ToolButtonPanel } from './components/ToolButtonPanel';
import { PainterView } from './lib/painter/painter.view';
import { PainterContext } from './contexts/painter-context';

export function App() {
  const [painterView, setPainterView] = useState<PainterView | null>(null);

  const canvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) {
      return;
    }

    const parentElement = canvas.parentElement;
    if (!parentElement) {
      return;
    }

    canvas.width = parentElement.clientWidth;
    canvas.height = parentElement.clientHeight;

    const painterView = new PainterView(canvas);
    painterView.repaint();

    setPainterView(painterView);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden flex">
      <PainterContext.Provider value={{ painterView }}>
        <div className="w-full h-full">
          <canvas ref={canvasRef} />
        </div>
        <ToolButtonPanel />
      </PainterContext.Provider>
    </main>
  );
}
