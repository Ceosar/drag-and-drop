import React, { useState } from 'react';
import "./Frame.css"
import { Droppable } from 'react-beautiful-dnd';
import PluginComponent from '../../plugin/PluginComponent';

const Frame = ({ plugins }) => {
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    const handleSelectPlugin = (index) => {
        setSelectedPlugin(index);
    };

    return (
        <div className='frame_wrapper'>
            <Droppable droppableId="frame">
                {(provided, snapshot) => (
                    <div
                        className={`frame_container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {plugins && plugins.map((element, index) => (
                            <PluginComponent
                                key={element.id}
                                index={index}
                                plugins={element}
                                isSelected={element.id === selectedPlugin}
                                onSelect={() => handleSelectPlugin(element.id)}
                                className="frame_plugin-component"
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Frame;
