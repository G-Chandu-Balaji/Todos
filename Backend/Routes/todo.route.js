import { AddTask, FetchTasks } from "../Controller/todo.controller.js";
import express from "express";

const router = express.Router();
router.get("/", FetchTasks);
router.post("/", AddTask);
//   router.delete("/:id", DeleteTask);
//   router.put("/:id", EditTask);

export default router;
