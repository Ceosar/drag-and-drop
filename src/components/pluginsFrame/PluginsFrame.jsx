// PluginsFrame.js
import React, { useEffect, useState } from 'react';
import "./PluginsFrame.css"
import Toolbar from './toolbar/Toolbar';
import Frame from './frame/Frame';
import { DragDropContext } from 'react-beautiful-dnd';

const PluginsFrame = () => {
    const [allPlugins, setAllPlugins] = useState([
        { id: 1, pluginName: "Общий рейтинг", date: "30.01.12", props: "4.8" },
        { id: 2, pluginName: "Маркетплейсы", date: "01.02.24", props: "25241" },
        { id: 3, pluginName: "Plugin3" },
        { id: 4, pluginName: "Plugin4" },
        { id: 5, pluginName: "Plugin5" }
    ]);
    const [pluginOff, setPluginOff] = useState(allPlugins);
    const [frames, setFrames] = useState([...Array(3)].map(() => []));

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        } else {
            const draggedPluginId = parseInt(result.draggableId.split('-')[1]);
            const draggedPlugin = allPlugins.find((plugin) => plugin.id === draggedPluginId);

            if (!draggedPlugin) {
                return;
            }

            const destinationFrameIndex = parseInt(result.destination.droppableId.split('-')[1]);

            const isFrameFull = frames[destinationFrameIndex] && frames[destinationFrameIndex].length > 0;

            if (isFrameFull) {
                return;
            }

            if (result.source.droppableId === 'toolbar' && result.destination.droppableId === 'toolbar') {
                // Плагин перемещается внутри панели инструментов
                setPluginOff((prevPlugins) => {
                    const updatedPlugins = [...prevPlugins];
                    const sourceIndex = updatedPlugins.findIndex(plugin => plugin.id === draggedPluginId);
                    updatedPlugins.splice(sourceIndex, 1); // Удаляем из исходного места
                    const destinationIndex = result.destination.index;
                    updatedPlugins.splice(destinationIndex, 0, draggedPlugin); // Вставляем в новое место
                    return updatedPlugins;
                });
            } else if (result.source.droppableId === 'toolbar' && result.destination.droppableId.startsWith('frame')) {
                // Плагин перемещается из панели инструментов в фрейм
                setFrames((prevFrames) => {
                    const updatedFrames = [...prevFrames];
                    updatedFrames[destinationFrameIndex] = [...updatedFrames[destinationFrameIndex], draggedPlugin];
                    return updatedFrames;
                });
                setPluginOff((prevPlugins) => prevPlugins.filter((plugin) => plugin.id !== draggedPluginId));
            } else if (result.source.droppableId.startsWith('frame') && result.destination.droppableId.startsWith('frame')) {
                // Плагин перемещается внутри фрейма
                const sourceFrameIndex = parseInt(result.source.droppableId.split('-')[1]);
                const destinationFrameIndex = parseInt(result.destination.droppableId.split('-')[1]);
                if (sourceFrameIndex === destinationFrameIndex) {
                    // Плагин остается в том же фрейме
                    setFrames((prevFrames) => {
                        const updatedFrames = [...prevFrames];
                        const frameIndex = sourceFrameIndex;
                        const sourceIndex = updatedFrames[frameIndex].findIndex(plugin => plugin.id === draggedPluginId);
                        updatedFrames[frameIndex].splice(sourceIndex, 1); // Удаляем из исходного места
                        const destinationIndex = result.destination.index;
                        updatedFrames[frameIndex].splice(destinationIndex, 0, draggedPlugin); // Вставляем в новое место
                        return updatedFrames;
                    });
                } else {
                    // Плагин перемещается между фреймами
                    setFrames((prevFrames) => {
                        const updatedFrames = [...prevFrames];
                        // Удаляем из исходного фрейма
                        const sourceIndex = updatedFrames[sourceFrameIndex].findIndex(plugin => plugin.id === draggedPluginId);
                        updatedFrames[sourceFrameIndex].splice(sourceIndex, 1);
                        // Вставляем в новый фрейм
                        updatedFrames[destinationFrameIndex] = [...updatedFrames[destinationFrameIndex], draggedPlugin];
                        return updatedFrames;
                    });
                }
            } else if (result.source.droppableId.startsWith('frame') && result.destination.droppableId === 'toolbar') {
                // Плагин перемещается из фрейма в панель инструментов
                setPluginOff((prevPlugins) => [...prevPlugins, draggedPlugin]);
                setFrames((prevFrames) => {
                    const updatedFrames = [...prevFrames];
                    const sourceFrameIndex = parseInt(result.source.droppableId.split('-')[1]);
                    updatedFrames[sourceFrameIndex] = updatedFrames[sourceFrameIndex].filter(
                        (plugin) => plugin.id !== draggedPluginId
                    );
                    return updatedFrames;
                });
            }
        }
    }

    useEffect(() => {
        const framesAreFull = frames.every(frame => frame.length > 0);
        if (framesAreFull) {
            setFrames(prevFrames => [...prevFrames, ...Array(3).fill([])]);
        }
    }, [frames]);

    return (
        <div className='plugins-frame_wrapper'>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='frame_wrapper'>
                    {frames.map((frame, index) => (
                        <Frame key={index} plugins={frame} frameIndex={index} />
                    ))}
                </div>
                <Toolbar plugins={pluginOff} />
            </DragDropContext>
        </div>
    );
};

export default PluginsFrame;
