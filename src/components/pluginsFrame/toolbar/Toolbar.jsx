import React, { useState } from 'react';
import "./Toolbar.css"
import PluginComponent from '../../plugin/PluginComponent';
import { Droppable } from 'react-beautiful-dnd';

const Toolbar = ({ plugins }) => {
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    const handleSelectPlugin = (index) => {
        setSelectedPlugin(index);
    };

    return (
        <Droppable droppableId="toolbar">
            {(provided, snapshot) => (
                <div
                    className={`toolbar_wrapper  ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
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
                            className="toolbar_plugin-component"
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default Toolbar;
