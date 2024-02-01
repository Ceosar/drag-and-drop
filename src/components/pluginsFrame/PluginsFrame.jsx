// PluginsFrame.js
import React, { useState } from 'react';
import "./PluginsFrame.css"
import Toolbar from './toolbar/Toolbar';
import Frame from './frame/Frame';
import { DragDropContext } from 'react-beautiful-dnd';

const PluginsFrame = () => {
    const [allPlugins, setAllPlugins] = useState([
        { id: 1, pluginName: "Plagin1" },
        { id: 2, pluginName: "Plagin2" },
        { id: 3, pluginName: "Plagin3" },
        { id: 4, pluginName: "Plagin4" },
        { id: 5, pluginName: "Plagin5" }
    ]);
    const [pluginOff, setPluginOff] = useState(allPlugins);
    const [pluginOn, setPluginOn] = useState([]);
    const [activeFrames, setActiveFrames] = useState(6);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        } else {
            const draggedPluginId = parseInt(result.draggableId.split('-')[1]);
            const draggedPlugin = allPlugins.find((plugin) => plugin.id === draggedPluginId);

            if (!draggedPlugin) {
                return;
            }

            const destinationFrameIndex = parseInt(result.destination.droppableId.split('-')[1]);

            const updatedPlugin = { ...draggedPlugin, tableIndex: destinationFrameIndex };

            setPluginOn((prevPlugins) => [...prevPlugins, updatedPlugin]);
            setPluginOff((prevPlugins) => prevPlugins.filter((plugin) => plugin.id !== draggedPluginId));
        }
    };

    return (
        <div className='plugins-frame_wrapper'>
            <DragDropContext onDragEnd={onDragEnd}>
                {[...Array(activeFrames)].map((_, index) => (
                    <Frame key={index} plugins={pluginOn} frameIndex={index} />
                ))}
                <Toolbar plugins={pluginOff} />
            </DragDropContext>
        </div>
    );
};

export default PluginsFrame;
