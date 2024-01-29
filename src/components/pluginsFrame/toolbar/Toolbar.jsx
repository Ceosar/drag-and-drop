import React, { useState } from 'react';
import "./Toolbar.css"
import PluginComponent from '../plugin/PluginComponent';

const Toolbar = () => {
    const [draggetItem, setDraggetItem] = useState(null);

    const handleDragStart = (e, plugin) => {
        e.dataTransfer.setData("plugin", plugin);
        setDraggetItem(plugin);
    }

    const handleDragEnd = () => {
        setDraggetItem(null);
    }

    return (
        <div className='toolbar_wrapper'>
            <PluginComponent
                onDragStart={(e, plugin) => handleDragStart(e, plugin)}
                onDragEnd={handleDragEnd}
            />
        </div>
    );
}

export default Toolbar;
