import React from 'react';
import "./PluginComponent.css"

const PluginComponent = ({onDragStart, onDragEnd}) => {

    return (
        <div
        className='plugin-component_wrapper'
        draggable
        onDragStart={(e) => onDragStart(e, "Plugin 1")}
        onDragEnd={onDragEnd}
        >
            Plugin 1
        </div>
    );
}

export default PluginComponent;
