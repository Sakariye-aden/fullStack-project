import express from 'express';
import { LoggIn, register } from '../Controllers/Auth.js';
import { ValidateUser } from '../middleware/ValidateZod.js';
import { schemaCheck } from '../Schema.js/UserShema.js';
const Route = express.Router();

Route.post('/register', ValidateUser(schemaCheck), register)
Route.post('/login', LoggIn)

export default Route