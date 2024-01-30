import React from 'react';
import "./PluginComponent.css"
import { Draggable } from 'react-beautiful-dnd';

const PluginComponent = ({plugins, index, isSelected, onSelect, className}) => {
    return (
        <Draggable draggableId={`pluginElement-${plugins.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    // className={`plugin-component_wrapper ${snapshot.isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
                    className={`${className} ${snapshot.isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onSelect}
                >
                    {plugins.pluginName}
                </div>
            )}
        </Draggable>
    );
}

export default PluginComponent;
