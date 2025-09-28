import todoModel from "../Model/todo.model.js";

export async function FetchTasks(req, res) {
  try {
    const tasks = await todoModel.find();

    res.status(200).json({ tasks });
  } catch (err) {
    console.error("Error fetching tasks", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

export async function AddTask(req, res) {
  try {
    const { task, isCompleted } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }
    const newTask = await todoModel.create({
      task,
      isCompleted: isCompleted || false,
    });
    return res
      .status(201)
      .json({ message: "task added successfully", newTask });
  } catch (err) {
    res.status(500).json({ error: "Failed to Add task" });
  }
}
