import React, { useState } from 'react';
import "./Frame.css"
import { Droppable } from 'react-beautiful-dnd';
import PluginComponent from '../../plugin/PluginComponent';

const Frame = ({ plugins }) => {
    const [selectedPlugin, setSelectedPlugin] = useState(null);
    const [activeFrames, setActiveFrames] = useState(6);

    const handleSelectPlugin = (index) => {
        setSelectedPlugin(index);
    };

    const renderFrames = () => {
        const frames = [];

        for (let i = 0; i < activeFrames; i++) {
            frames.push(
                <Droppable key={i} droppableId={`frame-${i}`}>
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
            );
        }

        return frames;
    };


    return (
        <div className='frame_wrapper'>
            {renderFrames()}
        </div>
    );
}

export default Frame;
