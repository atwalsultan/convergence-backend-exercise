// Third-party packages
import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

// Local packages
import Task, { TaskDocument } from "../models/taskModel";

// Create task
export function createTask(input: DocumentDefinition<TaskDocument>) {
  return Task.create(input);
}

// Get single task
export function findTask(
  query: FilterQuery<TaskDocument>,
  options: QueryOptions = { lean: true }
) {
  return Task.findOne(query, {}, options);
}

// Get all tasks
export function findTasks() {
  return Task.find();
}

// Get filtered tasks
export function findFilteredTasks(filter: string) {
  switch (filter) {
    case "done":
      return Task.find({ "done": true });
    case "pending":
      return Task.find({ "done": false });
    default:
     return null;
  }
}

// Update a task
export function findAndUpdate(
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>,
  options: QueryOptions
) {
  return Task.findOneAndUpdate(query, update, options);
}

// Delete a task
export function deleteTask(query: FilterQuery<TaskDocument>) {
  return Task.deleteOne(query);
}