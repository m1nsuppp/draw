import { TabGroup, TabList, Tab } from '@headlessui/react';
import { usePainter } from '../../contexts/painter-context';

const BUTTONS: { id: string; name: string }[] = [
  { id: 'line', name: 'Line' },
  { id: 'rectangle', name: 'Rectangle' },
  { id: 'circle', name: 'Circle' },
  { id: 'text', name: 'Text' },
];

export function ToolButtonPanel() {
  const { painterView } = usePainter();

  console.log(painterView);

  return (
    <div className="w-80 h-screen bg-white shadow-xl shrink-0">
      <TabGroup>
        <TabList className="flex flex-col gap-3">
          {BUTTONS.map((button) => (
            <Tab
              key={button.id}
              className="w-full hover:bg-gray-100 text-left px-3 py-2 data-[selected]:bg-gray-200"
            >
              {button.name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
}
