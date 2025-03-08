import { TabGroup, TabList, Tab } from '@headlessui/react';
import { usePainter } from '../../contexts/painter-context';
import { LineLayerManager } from '../../lib/painter/manager/line.manager';
import { AbstractLayerManager } from '../../lib/painter/manager/layer.manager';
import { RectangleLayerManager } from '../../lib/painter/manager/rectangle.manager';
import { EllipseLayerManager } from '../../lib/painter/manager/ellipse.manager';
import { FreePathLayerManager } from '../../lib/painter/manager/free-path.manager';
import { useMemo } from 'react';

export function ToolButtonPanel() {
  const { painterController } = usePainter();

  const buttons: {
    id: string;
    name: string;
    manager: AbstractLayerManager;
  }[] = useMemo(() => {
    return [
      {
        id: 'line',
        name: 'Line',
        manager: new LineLayerManager(),
      },
      {
        id: 'rectangle',
        name: 'Rectangle',
        manager: new RectangleLayerManager(),
      },
      {
        id: 'ellipse',
        name: 'Ellipse',
        manager: new EllipseLayerManager(),
      },
      {
        id: 'free-path',
        name: 'Free Path',
        manager: new FreePathLayerManager(),
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
                painterController?.setLayerManager(button.manager);
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
