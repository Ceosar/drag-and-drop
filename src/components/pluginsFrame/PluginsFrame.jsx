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
    ])
    const [pluginOff, setPluginOff] = useState(allPlugins);
    const [pluginOn, setPluginOn] = useState([]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        else {
            const draggedPluginId = parseInt(result.draggableId.split('-')[1]);
            const draggedPlugin = allPlugins.find((plugin) => plugin.id === draggedPluginId);

            if (!draggedPlugin) {
                return;
            }
            console.log(result)

            if (result.destination.droppableId.startsWith('frame') && result.source.droppableId === 'toolbar') {
                const updatedPlugin = { ...draggedPlugin, tableIndex: parseInt(result.destination.droppableId.split('-')[1]) };
                setPluginOn((prevPlugins) => [...prevPlugins, updatedPlugin]);
                setPluginOff((prevPlugins) => prevPlugins.filter((plugin) => plugin.id !== draggedPluginId));
            } else if (result.destination.droppableId === 'toolbar' && result.source.droppableId.startsWith('frame')) {
                setPluginOff((prevPlugins) => [...prevPlugins, draggedPlugin]);
                setPluginOn((prevPlugins) => prevPlugins.filter((plugin) => plugin.id !== draggedPluginId));
            }
        }
    }

    return (
        <div className='plugins-frame_wrapper'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Frame plugins={pluginOn}/>
                <Toolbar plugins={pluginOff} />
            </DragDropContext>
        </div>
    );
}

export default PluginsFrame;
