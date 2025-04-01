import express from "express";
import { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlogById } from "../controllers/blog.Controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/add", createBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);
export default blogRouter