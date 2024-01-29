import React from 'react';
import "./PluginsFrame.css"
import Toolbar from './toolbar/Toolbar';
import Frame from './frame/Frame';

const PluginsFrame = () => {
    return (
        <div className='plugins-frame_wrapper'>
            <Toolbar/>
            <Frame/>
        </div>
    );
}

export default PluginsFrame;
