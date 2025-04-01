import blogModel from "../models/blog.Model.js";

//get all blog
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blog.find();
        res.status(200).json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi tải bài viết", error })
    }
};

//get blog by id
const getBlogById = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Không tìm thấy bài viết" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Lỗi tải bài viết", error })
    }
}

//create blog 
const createBlog = async (req, res) => {
    try {
        const newBlog = new blogModel(req.body);
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: "Lỗi tạo bài viết", error })
    }
}

//update blog by id
const updateBlog = async (req, res) => {
    try {
        const updateBlog = await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateBlof) {
            return res.status(404).json({ message: "Không tìm thấy bài viết để cập nhật" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Lỗi cập nhật bài viết", error })
    }
}

//delete blog by id
const deleteBlog = async (req, res) => {
    try {
        const deleteBlog = await blogModel.findByIdAndDelete(req.params.id);
        if (!deleteBlog) {
            return res.status(404).json({ message: "Không tìm thấy bài viết để xóa" });
        }
        res.status(200).json({ message: "Xóa bài viết thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi xóa bài viết", error })
    }
}

export { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
