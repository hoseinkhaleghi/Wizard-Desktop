import React, { useState } from "react";
import "./App.css";
import { Rnd } from "react-rnd";
import Draggable from "react-draggable";

const App: React.FC = () => {
  const [windows, setWindows] = useState<{ id: number; title: string; visible: boolean }[]>([]);
  const [nextId, setNextId] = useState(1);

  const openWindow = (title: string) => {
    setWindows([...windows, { id: nextId, title, visible: true }]);
    setNextId(nextId + 1);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.filter((win) => win.id !== id));
  };

  const toggleWindow = (id: number) => {
    setWindows(
      windows.map((win) => (win.id === id ? { ...win, visible: !win.visible } : win))
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 5 }, (_, index) => (
            <Draggable key={index}>
              <div className="icon" onDoubleClick={() => openWindow(`Icon ${index + 1}`)}>
                📁 Icon {index + 1}
              </div>
            </Draggable>
          ))}
        </div>
        <div className="flex flex-row relative">
            {windows.map((win) =>
              win.visible ? (
                <Rnd
                  key={win.id}
                  default={{
                    x: 50,
                    y: 50,
                    width: 500,
                    height: 300,
                  }}
                  minWidth={200}
                  minHeight={300}
                  bounds="window"
                  enableResizing={{

                    top: true,
                    right: true,
                    bottom: true,
                    left: true,
                    topRight: true,
                    bottomRight: true,
                    bottomLeft: true,
                    topLeft: true,
                  }}
                  dragHandleClassName="window-header"
                >
                  <div className="border bg-white shadow-lg rounded-lg w-full h-full">
                    <div className="window-header bg-blue-600 text-white p-2 flex justify-between cursor-move">
                      <span className="font-semibold text-lg">{win.title}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleWindow(win.id)}
                          className="text-white hover:text-gray-300"
                        >
                          -
                        </button>
                        <button
                          onClick={() => closeWindow(win.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          X
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-gray-300 p-4">
                      محتویات تب
                    </div>
                  </div>
                </Rnd>
              ) : null
            )}
        </div>
      </div>

      <div className="bg-gray-800 p-2 flex justify-around">
        {windows.map((win) => (
          <div key={win.id} className="flex flex-row gap-5">
            <button onClick={() => toggleWindow(win.id)} className="text-white">
              {win.title}
            </button>
            <button className="text-white" onClick={() => closeWindow(win.id)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
