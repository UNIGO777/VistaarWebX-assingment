const Category = require('../models/Category');
const Product = require('../models/Product');

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(400).json({ error: 'Failed to create category', details: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const products = await Product.find({ categoryId: category._id });
    return res.status(200).json({ category, products });
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    return res.status(500).json({ error: 'Failed to fetch category', details: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(400).json({ error: 'Failed to update category', details: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await Product.updateMany({ categoryId: category._id }, { categoryId: null });
    return res.status(200).json({ message: 'Category deleted successfully', category });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};
