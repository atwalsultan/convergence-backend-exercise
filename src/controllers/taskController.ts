// Third-party packages
import { Request, Response } from "express";
import { get } from "lodash";

// Local packages
import { createTask, deleteTask, findAndUpdate, findFilteredTasks, findTask, findTasks } from "../services/taskService";

export async function createTaskHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const task = await createTask({ ...body, user: userId });

  return res.send(task);
}

export async function updateTaskHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const taskId = get(req, "params.taskId");
  const update = req.body;

  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (String(task.user) !== userId) {
    return res.sendStatus(401);
  }

  const updatedTask = await findAndUpdate({ taskId }, update, { new: true });

  return res.send(updatedTask);
}

export async function getTaskHandler(req: Request, res: Response) {
  const taskId = get(req, "params.taskId");
  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  return res.send(task);
}

export async function getTasksHandler(req: Request, res: Response) {
  const tasks = await findTasks();

  return res.send(tasks);
}

export async function getFilteredTasksHandler(req: Request, res: Response) {
  const filter = get(req, "params.filter");
  const filteredTasks = await findFilteredTasks(filter);

  if (!filteredTasks) {
    return res.status(400).send("Please select a valid filter (done or pending)");
  }

  return res.send(filteredTasks);
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const taskId = get(req, "params.taskId");

  const task = await findTask({ taskId });

  if (!task) {
    return res.sendStatus(404);
  }

  if (String(task.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteTask({ taskId });

  return res.sendStatus(200);
}