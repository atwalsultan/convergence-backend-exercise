import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import Task, { TaskDocument } from "../models/taskModel";

export function createTask(input: DocumentDefinition<TaskDocument>) {
  return Task.create(input);
}

export function findTask(
  query: FilterQuery<TaskDocument>,
  options: QueryOptions = { lean: true }
) {
  return Task.findOne(query, {}, options);
}

export function findTasks() {
  return Task.find();
}

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

export function findAndUpdate(
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>,
  options: QueryOptions
) {
  return Task.findOneAndUpdate(query, update, options);
}

export function deleteTask(query: FilterQuery<TaskDocument>) {
  return Task.deleteOne(query);
}