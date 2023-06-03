import React, { useState } from "react";

const initialState = [
  {
    id: 1,
    task: "buy apple",
    complete: false,
  },
  {
    id: 2,
    task: "buy Mango",
    complete: false,
  },
  {
    id: 3,
    task: "buy banana",
    complete: false,
  },
  {
    id: 4,
    task: "buy karela",
    complete: false,
  },
  {
    id: 5,
    task: "buy pineApple",
    complete: false,
  },
];

const Checking2 = () => {
  const [list, setList] = useState(initialState);

  const handleCheck = (itemId) => {
    const checkedList = list.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          complete: !item.complete,
          task:"going to no where"
        };
      }
      return item;
    });
    setList(checkedList);
  };

  return (
    <div>
      {list.map((value) => {
        return (
          <div className="flex" key={value.id}>
            <input
              checked={value.complete}
              onChange={() => handleCheck(value.id)}
              type="checkbox"
            />
            <p>{value.task}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Checking2;
