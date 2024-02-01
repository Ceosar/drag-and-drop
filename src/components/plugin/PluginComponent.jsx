import React from 'react';
import "./PluginComponent.css"
import { Draggable } from 'react-beautiful-dnd';
import svg from "./../pluginsFrame/images/element_blue.svg"

const PluginComponent = ({ plugins, index, isSelected, onSelect, className, isOnFrame }) => {
    let dayToday = new Date();
    dayToday.setHours(0, 0, 0, 0);
    let currentDay = dayToday.getDate();
    let currentMonth = dayToday.getMonth() + 1;
    let currentYear = dayToday.getFullYear();
    currentDay = currentDay < 10 ? '0' + currentDay : currentDay;
    currentMonth = currentMonth < 10 ? '0' + currentMonth : currentMonth;
    let currentDate = `${currentDay}.${currentMonth}.${currentYear % 100}`
    return (
        <Draggable draggableId={`pluginElement-${plugins.id}`} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`${className} ${snapshot.isDragging ? 'dragging' : ''} ${isSelected ? 'selected' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onSelect}
                >
                    {isOnFrame ? (
                        <div className='plugin-component-on'>
                            <section className='plugin-component-on__title'>
                                <span className='plugin-component-on__name'>
                                    {plugins.pluginName}
                                </span>
                                {plugins.date && (
                                    <label className='plugin-component-on__date'>
                                        {plugins.date === currentDate ? (
                                            'Сегодня'
                                        ) : (
                                            plugins.date
                                        )}
                                    </label>
                                )}
                            </section>
                            <section className='plugin-component-on_props'>
                                {plugins.props && plugins.props}
                            </section>
                            {/* <img className='plugin-component-on_svg' src={svg} alt="" /> */}
                        </div>
                    ) : (
                        <div className='plugin-component-off'>
                            <span className='plugin-component-off__name'>
                                {plugins.pluginName}
                            </span>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default PluginComponent;
