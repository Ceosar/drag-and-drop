import React, { useState } from 'react';
import "./Frame.css"

const Frame = () => {
    const [droppedItem, setDroppedItem] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedItem = e.dataTransfer.getData("plugin")
        setDroppedItem(droppedItem);
        console.log("drop")
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    return (
        <div
            className='frame_wrapper'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {droppedItem && <div>{droppedItem}</div>}
        </div>
    );
}

export default Frame;
