import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");

  function handleAddTask() {
    setTodo((prev) => [...prev, task]);
  }
  function handleDeleteTask(id) {}
  return (
    <div className="app-container">
      <div className="input-container">
        <input
          placeholder="enter the task..."
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div className="tasks-container">
        {todo.map((item, i) => (
          <div key={i} className="task-container">
            <p>{item}</p>
            <input type="checkbox" id="iscomplete"></input>
            <label for="iscomplete">completed</label>
            <button>Edit</button>

            <button onClick={() => handleDeleteTask(i)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
