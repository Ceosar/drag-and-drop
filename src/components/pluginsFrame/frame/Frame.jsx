import React, { useState } from 'react';
import "./Frame.css"
import { Droppable } from 'react-beautiful-dnd';
import PluginComponent from '../../plugin/PluginComponent';

const Frame = ({plugins}) => {
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    const handleSelectPlugin = (index) => {
        setSelectedPlugin(index);
    };
    console.log(plugins)
    return (
        <Droppable droppableId="frame">
            {(provided, snapshot) => (
                <div
                    className={`frame_wrapper ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {plugins && plugins.map((element, index) => (
                        <PluginComponent
                            key={index}
                            plugins={element}
                            isSelected={index === selectedPlugin}
                            onSelect={() => handleSelectPlugin(index)}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default Frame;
