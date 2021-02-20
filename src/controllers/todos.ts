import { RequestHandler, response } from 'express';
import * as _ from 'lodash';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const todoText = (req.body as { text: string }).text;
  const newTodo = new Todo(_.uniqueId(), todoText);
  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created todo', todo: newTodo });
  next();
};

export const getTodos: RequestHandler = (_0, res, next) => {
  res.json({ todos: TODOS });
  next();
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((t) => t.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ message: `ID ${todoId} not found` });
  }

  TODOS[todoIndex] = new Todo(todoId, updatedText);

  res.json({ message: `Todo ID ${todoId} updated`, todo: TODOS[todoIndex] });
  next();
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((t) => t.id === todoId);

  if (todoIndex === -1) {
    res.status(404).json({ message: `ID ${todoId} not found` });
  }

  const deletedTodo = TODOS[todoIndex];
  TODOS.splice(todoIndex, 1);

  res.json({ message: `Todo ID ${todoId} deleted`, todo: deletedTodo });
  next();
};
