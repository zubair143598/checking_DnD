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

const Checking = () => {
  const [list, setList] = useState(initialState);
  const [filter,setfilter]=useState("all")
  
  const handleCheckedBox = (itemId) => {
      const updatedList = list.map((value) => {
          if (value.id === itemId) {
              return {
                  ...value,
                  complete: !value.complete,
                };
            }
            return value;
        });
        setList(updatedList);
    };
    
      
    
    
    const handleFilter=(newfilter)=>{
        setfilter(newfilter)
      }
      

      const filterlist = list.filter((item)=>{
        if(filter==="all"){
            return true
        }
        else if(filter==="active")
        {
            return !item.complete
        }
        else if(filter === "complete")
        {
            return item.complete
        }
        return true
      })


  return (
    <div className="h-screen grid grid-cols-2">
      <div></div>
      <div>
        {filterlist.map((items) => {
          return (
            <div className="flex " key={items.id}>
              <input
                type="checkbox"
                onChange={() => handleCheckedBox(items.id)}
                checked={items.complete}
              />
              <p>{items.task}</p>
            </div>
          );
        })}
        <button onClick={()=>handleFilter("all")} >All</button>
        <button onClick={()=>handleFilter("active")} className="mx-4" >Active</button>
        <button onClick={()=>handleFilter("complete")} >Complete</button>

      </div>
    </div>
  );
};

export default Checking;
