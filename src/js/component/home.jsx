import React from "react";

//include images into your bundle

import ToDoAPI from "./TodoList..jsx";

//create your first component
const Home = () => {
  return (
    <div className="text-center">
      <ToDoAPI />
    </div>
  );
};

export default Home;
