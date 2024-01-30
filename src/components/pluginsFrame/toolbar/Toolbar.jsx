import React, { useState } from 'react';
import "./Toolbar.css"
import PluginComponent from '../../plugin/PluginComponent';
import { Droppable } from 'react-beautiful-dnd';

const Toolbar = ({ plugins }) => {
    const [selectedPlugin, setSelectedPlugin] = useState(null);

    const handleSelectPlugin = (index) => {
        setSelectedPlugin(index);
    };

    console.log(plugins)

    return (
        <Droppable droppableId="toolbar">
            {(provided, snapshot) => (
                <div
                    className={`toolbar_wrapper ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
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

export default Toolbar;
