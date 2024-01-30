import React, { useState } from 'react';
import "./PluginsFrame.css"
import Toolbar from './toolbar/Toolbar';
import Frame from './frame/Frame';
import { DragDropContext } from 'react-beautiful-dnd';


const PluginsFrame = () => {
    const [allPlugins, setAllPlugins] = useState([
        {id:1, pluginName:"Plagin1"},
        {id:2, pluginName:"Plagin2"},
        {id:3, pluginName:"Plagin3"}
    ])
    const [pluginOff, setPluginOff] = useState(allPlugins);
    const [pluginOn, setPluginOn] = useState([]);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        if(result.destination.droppableId == "frame"){
            const match = result.draggableId.match(/-(\d+)/);
            const pluginNumber = match ? match[1] : null;
            console.log(allPlugins[pluginNumber])
            setPluginOn(allPlugins[pluginNumber])
        }
    }

    return (
        <div className='plugins-frame_wrapper'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Toolbar plugins={pluginOff} />
                <Frame plugins={pluginOn}/>
            </DragDropContext>
        </div>
    );
}

export default PluginsFrame;
