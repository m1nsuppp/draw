import { TabGroup, TabList, Tab } from '@headlessui/react';
import { usePainter } from '../../contexts/painter-context';
import { useMemo } from 'react';
import { AbstractPainterState } from '../../lib/painter/state/painter.state';
import { LineState } from '../../lib/painter/state/line.state';
import { RectangleState } from '../../lib/painter/state/rectangle.state';
import { EllipseState } from '../../lib/painter/state/ellipse.state';
import { FreePathState } from '../../lib/painter/state/free-path.state';

export function ToolButtonPanel() {
  const { painterController } = usePainter();

  const buttons: {
    id: string;
    name: string;
    state: AbstractPainterState;
  }[] = useMemo(() => {
    return [
      {
        id: 'line',
        name: 'Line',
        state: LineState.getInstance(),
      },
      {
        id: 'rectangle',
        name: 'Rectangle',
        state: RectangleState.getInstance(),
      },
      {
        id: 'ellipse',
        name: 'Ellipse',
        state: EllipseState.getInstance(),
      },
      {
        id: 'free-path',
        name: 'Free Path',
        state: FreePathState.getInstance(),
      },
    ];
  }, []);

  return (
    <div className="w-80 h-screen bg-white shadow-xl shrink-0">
      <TabGroup>
        <TabList className="flex flex-col gap-3">
          {buttons.map((button) => (
            <Tab
              key={button.id}
              className="w-full hover:bg-gray-100 text-left px-3 py-2 data-[selected]:bg-gray-200"
              onClick={() => {
                painterController?.setState(button.state);
              }}
            >
              {button.name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
}
