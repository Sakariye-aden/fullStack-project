import express from 'express';
import { getProfile, LoggIn, register } from '../Controllers/Auth.js';
import { ValidateUser } from '../middleware/ValidateZod.js';
import { schemaCheck } from '../Schema.js/UserShema.js';
import { loginLimit } from '../middleware/LimitReq.js';
import { protect } from '../middleware/Protect.js';
const Route = express.Router();

Route.post('/register', ValidateUser(schemaCheck), register)
Route.post('/login', loginLimit ,LoggIn)
Route.get('/me', protect , getProfile)

export default Route