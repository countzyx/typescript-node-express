import { RequestHandler } from 'express';
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

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
  next();
};
