import { useCallback, useState } from 'react';
import { ToolButtonPanel } from './components/tool-button-panel';
import { PainterView } from './lib/painter/painter.view';
import { PainterContext } from './contexts/painter-context';
import { PainterController } from './lib/painter/painter.controller';
import { PainterModel } from './lib/painter/painter.model';

export function App() {
  const [painterModel, setPainterModel] = useState<PainterModel | null>(null);
  const [painterView, setPainterView] = useState<PainterView | null>(null);
  const [painterController, setPainterController] = useState<PainterController | null>(null);

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

    const painterModel = new PainterModel();
    const painterView = new PainterView(canvas);
    const painterController = new PainterController();

    painterView.setPainterController(painterController);
    painterView.setPainterModel(painterModel);

    painterController.setPainterModel(painterModel);
    painterController.setPainterView(painterView);

    setPainterModel(painterModel);
    setPainterView(painterView);
    setPainterController(painterController);
  }, []);

  return (
    <main className="w-screen h-screen overflow-hidden flex">
      <PainterContext.Provider value={{ painterView, painterModel, painterController }}>
        <div className="w-full h-full">
          <canvas ref={canvasRef} />
        </div>
        <ToolButtonPanel />
      </PainterContext.Provider>
    </main>
  );
}
