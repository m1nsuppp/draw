import { TabGroup, TabList, Tab } from '@headlessui/react';
import { usePainter } from '../../contexts/painter-context';
import { LayerType } from '../../lib/painter/layer';

const BUTTONS: { id: string; name: string; type: LayerType }[] = [
  { id: 'line', name: 'Line', type: 'line' },
  { id: 'rectangle', name: 'Rectangle', type: 'rectangle' },
  { id: 'ellipse', name: 'Ellipse', type: 'ellipse' },
  { id: 'free-path', name: 'Free Path', type: 'free-path' },
];

export function ToolButtonPanel() {
  const { painterView } = usePainter();

  return (
    <div className="w-80 h-screen bg-white shadow-xl shrink-0">
      <TabGroup>
        <TabList className="flex flex-col gap-3">
          {BUTTONS.map((button) => (
            <Tab
              key={button.id}
              className="w-full hover:bg-gray-100 text-left px-3 py-2 data-[selected]:bg-gray-200"
              onClick={() => {
                painterView?.setSelectedLayerType(button.type);
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
