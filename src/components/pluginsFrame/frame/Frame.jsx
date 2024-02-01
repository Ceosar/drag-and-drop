// Frame.js
import React, { useState } from 'react';
import "./Frame.css";
import { Droppable } from 'react-beautiful-dnd';
import PluginComponent from '../../plugin/PluginComponent';

const Frame = ({ plugins, frameIndex }) => {
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    const handleSelectPlugin = (index) => {
        setSelectedPlugin(index);
    };

    return (
        <Droppable droppableId={`frame-${frameIndex}`} key={frameIndex}>
            {(provided, snapshot) => (
                <div
                    className={`frame_container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {plugins.map((element, index) => (
                        <PluginComponent
                            key={element.id}
                            index={index}
                            plugins={element}
                            className="frame_plugin-component"
                            isOnFrame={true}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Frame;
