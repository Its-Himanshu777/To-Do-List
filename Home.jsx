import React, { useEffect } from 'react'
// import "./Header.css";
import { useState } from 'react';
import Task from './Task';

const Home = () => {

  const initialArray = localStorage.getItem("task") ? JSON.parse(localStorage.getItem("task")) : [];
  const [task, setTask] = useState(initialArray);

  const [title, setTitle] = useState("")

  const [description, setDescription] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    setTask([...task, { title, description, }]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = (index) => {
    const filteredArr = task.filter((val, i) => {
      return i !== index;
    })
    console.log(filteredArr);
    setTask(filteredArr);
  };

  useEffect(() => {

    localStorage.setItem("task", JSON.stringify(task));
  },
    [task]);

  return (
    <div className="container" >
      <h1>Daily Goals</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Title'
          value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea placeholder='Description'
          value={description} onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="Submit" onClick={deleteTask}>Add</button>

      </form>

      {task.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          description={item.description}
          deleteTask={deleteTask}
          index={index} />
      ))}
    </div>
  )
}
export default Home;