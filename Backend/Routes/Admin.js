import express from "express";


import { verifyAdmin } from "../middleware/Authorize.js";
import { AdminInfo } from "../controllers/Admin.js";
import { protect } from "../middleware/Protect.js";
const route = express.Router()


route.get('/overview', protect, verifyAdmin('admin'), AdminInfo)

export default route