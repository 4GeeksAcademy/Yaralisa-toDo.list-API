import React from "react";

//include images into your bundle

import ToDoAPI from "./TodoList..jsx";
import TodoList from "./Todolistbueno.jsx";

//create your first component
const Home = () => {
  return (
    <div className="text-center">
      {/* <ToDoAPI /> */}
      <TodoList/>
    </div>
  );
};

export default Home;
