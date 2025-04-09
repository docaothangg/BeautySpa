import express from "express";
import multer from "multer";
import { getAllServices, createService, deleteService, getServiceById, updateService, searchServices } from "../controllers/serviceController.js";

const serviceRouter = express.Router();

const storage = multer.diskStorage({ //dis.. tai file len diskStorage()luu tr va dat ten
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`) // ko baoloi-
    }
})
const upload = multer({ storage: storage })
serviceRouter.get("/list", getAllServices);
serviceRouter.get("/:id", getServiceById);
serviceRouter.post("/add", upload.single("image"), createService);
serviceRouter.put("/update/:id", updateService);
serviceRouter.delete("/delete/:id", deleteService);
serviceRouter.get("/search", searchServices);
export default serviceRouter;