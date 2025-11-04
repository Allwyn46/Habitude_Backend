import TodoModel from "../models/TodoModel.js";

export const createTodo = async (req, res) => {
  try {
    const { userid, title, description, category, date } = req.body;
    await TodoModel.create({
      userid: userid,
      todo_title: title,
      todo_desc: description,
      todo_category: category,
      date: date,
      is_completed: false,
    });

    res.status(201).json({
      message: "Todo Created Successfully",
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Creating Todo",
      message: error.message,
      details: error,
    });
  }
};

export const getAllTodos = async (req, res) => {
  const { userid } = req.body;

  const todos = await TodoModel.findByUserId(userid);

  if (todos) {
    res.status(200).json({
      message: "Fetched data Successfully",
      result: true,
      todos: todos,
    });
  } else {
    res.status(401).json({
      message: "Failed to fetch data",
      result: false,
    });
  }
};

export const getSingleTodos = async (req, res) => {
  const { id } = req.body;

  const todos = await TodoModel.findById(id);

  if (todos) {
    res.status(200).json({
      message: "Fetched data Successfully",
      result: true,
      todos: todos,
    });
  } else {
    res.status(401).json({
      message: "Failed to fetch data",
      result: false,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id, title, description, category, date } = req.body;
    await TodoModel.update(id, {
      todo_title: title,
      todo_desc: description,
      todo_category: category,
      date: date,
      is_completed: is_completed,
    });

    res.status(201).json({
      message: "Todo Updated Successfully",
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Updating Todo",
      message: error.message,
      details: error,
      result: false,
    });
  }
};

export const markcomplete = async (req, res) => {
  try {
    const { id } = req.body;
    await TodoModel.update(id, {
      is_completed: true,
    });

    res.status(200).json({
      message: "Todo Completed Successfully",
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Updating Todo",
      message: error.message,
      details: error,
      result: false,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    await TodoModel.delete(id);

    res.status(200).json({
      message: "Todo Deleted Successfully",
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting Todo",
      message: error.message,
      details: error,
      result: false,
    });
  }
};
