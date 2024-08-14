import express from 'express';
import { getFortuneCookie } from '../controllers/fortune-controllers.js';

const fortuneRouter = express.Router();

fortuneRouter
  .get('/cookie', getFortuneCookie);



export default fortuneRouter;