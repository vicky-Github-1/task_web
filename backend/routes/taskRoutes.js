import express from "express";
const router = express.Router();
import auth from "../middleware/authMiddleware.js";
import role from "../middleware/roleMiddleware.js";
import { createTask, getTasks, updateTask, deleteTask , getAllTasks} from "../controllers/taskController.js";

router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/all", auth, role, getAllTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;