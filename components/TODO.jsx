import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TODO = () => {
  const initialList = [
    {
      id: 1,
      work: 'going to market',
      completed: false,
    },
    {
      id: 2,
      work: 'going to school',
      completed: false,
    },
    {
      id: 3,  
      work: 'going to college',
      completed: false,
    },
    {
      id: 4,
      work: 'going to uni',
      completed: false,
    },
    {
      id: 5,
      work: 'going to bazar',
      completed: false,
    },
  ];

  const [list, setList] = useState(initialList);
  const [filter, setFilter] = useState('all');

  const handleCheckboxChange = (itemId) => {
    const updatedList = list.map((value) => {
      if (value.id === itemId) {
        return {
          ...value,
          completed: !value.completed,
        };
      }
      return value;
    });
    setList(updatedList);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedList = Array.from(list);
    const [removed] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, removed);

    setList(updatedList);
  };

  const filteredList = list.filter((item) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !item.completed;
    } else if (filter === 'completed') {
      return item.completed;
    }
    return true;
  });
  
  useEffect(() => {
    const draggableContextId = window.document.querySelectorAll('[data-rbd-draggable-context-id]')[0].getAttribute('data-rbd-draggable-context-id');
    window.__REACT_BEAUTIFUL_DND_CONTEXT_ID = Number(draggableContextId);
  }, []);

  return (
    <div className="h-screen grid grid-cols-2">
      <div></div>
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filteredList.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="flex"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging ? 'lightblue' : 'white',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                        <p>{item.work}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <button onClick={() => handleFilterChange('all')}>All</button>
          <button onClick={() => handleFilterChange('active')}>Active</button>
          <button onClick={() => handleFilterChange('completed')}>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default TODO;