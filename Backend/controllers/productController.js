import ProductModel from "../models/productModel.js";
import fs from 'fs';

// Thêm sản phẩm
const addProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding product' });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error retrieving products' });
  }
};

// Xóa sản phẩm
const removeProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.body.id);
    fs.unlink(`uploads/${product.ImagePD}`, (err) => {
      if (err) console.log(err);
    });
    await ProductModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product Removed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error removing product' });
  }
};
// code da chinh sua
const updateProduct = async (req, res) => {
  try {
    const { id, ...updateData } = req.body; // Lấy ID từ body
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error retrieving product' });
  }
};

const searchProduct = async (req, res) => {
  const { q } = req.query; // Lấy từ khóa từ query parameter
  try {
    const products = await ProductModel.find({
      name: { $regex: q, $options: 'i' } // Tìm kiếm không phân biệt hoa thường
    });
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tìm kiếm sản phẩm' });
  }
};
export { addProduct, listProduct, removeProduct, updateProduct, getProductById, searchProduct };
