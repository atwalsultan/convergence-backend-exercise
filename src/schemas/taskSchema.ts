// Third-party packages
import { object, string, boolean } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    done: boolean().required("Please specify whether the task is done or not")
  }),
};

const params = {
  params: object({
    taskId: string().required("taskId is required"),
  }),
};

export const createTaskSchema = object({
  ...payload,
});

export const updateTaskSchema = object({
  ...params,
  ...payload,
});

export const deleteTaskSchema = object({
  ...params,
});
