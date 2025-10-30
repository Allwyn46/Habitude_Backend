import CategoryModel from "../models/CategoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    await CategoryModel.create({
      todo_cate_name: category,
    });

    res.status(201).json({
      message: "Category Created Successfully",
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Creating Category",
      message: error.message,
      details: error,
    });
  }
};

export const getAllCategory = async (req, res) => {
  const user = req.user;
  const categories = await CategoryModel.findByUserId(user.id);

  if (todos) {
    res.status(200).json({
      message: "Fetched data Successfully",
      result: true,
      Categories: categories,
    });
  } else {
    res.status(401).json({
      message: "Failed to fetch data",
      result: false,
    });
  }
};

export const updatecategory = async (req, res) => {
  try {
    const { id, category } = req.body;
    await CategoryModel.update(id, {
      todo_cate_name: category,
    });

    res.status(201).json({
      message: "Category Updated Successfully",
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Updating category",
      message: error.message,
      details: error,
      result: false,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await CategoryModel.delete(id);

    res.status(200).json({
      message: "category Deleted Successfully",
      result: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error deleting Category",
      message: error.message,
      details: error,
      result: false,
    });
  }
};
