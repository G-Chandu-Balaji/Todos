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

  //....................Add Task......................
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      alert("enter a  valid task");
      return;
    }
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

  //.........................  Delete task............................
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

  //...................UpdateTask..............................
  const handleUpdateTask = async (id, task, isCompleted = false) => {
    if (!task.trim()) {
      alert("edited task should not be empty");
      return;
    }
    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          isCompleted,
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
      <h1>TODO</h1>
      {/*.......... task input............. */}
      <div className="input-container">
        <form onSubmit={handleAddTask}>
          <input
            placeholder="enter the task..."
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <button>Add</button>
        </form>
      </div>

      {/*............ Render the todo tasks......... */}
      <div className="tasks-container">
        {todo.map((item) => (
          <div key={item._id} className="task-container">
            {/*...... checkbox .........*/}
            <input
              type="checkbox"
              id="iscomplete"
              checked={item.isCompleted}
              onChange={() =>
                handleUpdateTask(item._id, item.task, !item.isCompleted)
              }
              disabled={isEditing == item._id}
              style={{
                cursor: isEditing == item._id ? "not-allowed" : "pointer",
              }}
            />
            {/*.... task or editTask......... */}
            {isEditing == item._id ? (
              <div>
                <input
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleUpdateTask(item._id, editTask);
                    setIsEditing(null);
                  }}
                >
                  save
                </button>
                <button onClick={() => setIsEditing(null)}>cancel</button>
              </div>
            ) : (
              <p
                style={{
                  textDecoration: item.isCompleted ? "line-through" : "none",
                  color: item.isCompleted ? "#989292" : "#2c2a2a",
                }}
              >
                {item.task}
              </p>
            )}

            {/*........... buttos............. */}
            <div className="btns">
              <button
                id="editbtn"
                onClick={() => {
                  setIsEditing(item._id);
                  setEditTask(item.task);
                }}
                disabled={item.isCompleted}
                style={{
                  background: item.isCompleted ? "#b4b3b3" : "#ffc107",
                  cursor: item.isCompleted ? "not-allowed" : "pointer",
                }}
              >
                Edit
              </button>

              <button
                id="deletebtn"
                onClick={() => handleDeleteTask(item._id)}
                disabled={isEditing == item._id}
                style={{
                  background:
                    isEditing == item._id ? "#b4b3b3" : "rgb(200, 27, 27)",
                  cursor: isEditing == item._id ? "not-allowed" : "pointer",
                }}
              >
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
