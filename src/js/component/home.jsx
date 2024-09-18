import React from "react";

//include images into your bundle

import ToDoAPI from "./TodoList..jsx";
import OseaVisualTodDo from "./userGayer.jsx";

//create your first component
const Home = () => {
  return (
    <div className="text-center">
      {/* <ToDoAPI /> */}
      <OseaVisualTodDo/>
    </div>
  );
};

export default Home;
