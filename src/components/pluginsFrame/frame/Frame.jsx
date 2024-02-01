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
                    {plugins
                        .filter((plugin) => plugin.tableIndex === frameIndex)
                        .map((element, index) => (
                            <PluginComponent
                                key={index}
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
    );
};

export default Frame;
