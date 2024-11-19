const Product = require('../models/Product');
const Category = require('../models/Category');

exports.createProduct = async (req, res) => {
  try {
      const { categoryId, ...productData } = req.body;
      console.log(categoryId,productData);
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const product = new Product({...productData,categoryId:category._id});
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(400).json({ error: 'Failed to create product', details: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId');
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('categoryId');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { categoryId, ...updateData } = req.body;
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(400).json({ error: 'Failed to update product', details: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};
