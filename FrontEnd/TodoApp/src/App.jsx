import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [refresh, setRefersh] = useState(false);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const URL = "http://localhost:5100/api/todos";
  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        console.log("data", data);
        setTodo(data.tasks);
      } catch (err) {
        console.log("error", err.message);
      }
    };
    FetchData();
  }, [refresh]);

  const handleAddTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
      }
      console.log(data);
    } catch (err) {
      console.log("NetWork error, please try again", err.message);
    } finally {
      console.log("fetching completed");
      setTask("");
      setRefersh((prev) => !prev);
    }
  };
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
      }
      console.log(data);
    } catch (err) {
      console.log("NetWork error, please try again", err.message);
    } finally {
      console.log("fetching completed");
      setRefersh((prev) => !prev);
    }
  };

  const handleUpdateTask = async (id, editTask) => {
    if (!editTask.trim()) return;
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: editTask,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
      }
      console.log(data);
    } catch (err) {
      console.log("NetWork error, please try again", err.message);
    } finally {
      console.log("fetching completed");
      setRefersh((prev) => !prev);
    }
  };
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
        {todo.map((item) => (
          <div key={item._id} className="task-container">
            <input type="checkbox" id="iscomplete" />

            {isEditing == item._id ? (
              <div>
                <input
                  defaultValue={item.task}
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={() => handleUpdateTask(item._id, editTask)}>
                  save
                </button>
                <button onClick={() => setIsEditing(null)}>cancel</button>
              </div>
            ) : (
              <p>{item.task}</p>
            )}
            <div className="btns">
              <button id="editbtn" onClick={() => setIsEditing(item._id)}>
                Edit
              </button>

              <button id="deletebtn" onClick={() => handleDeleteTask(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
