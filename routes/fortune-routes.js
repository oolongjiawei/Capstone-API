import express from 'express';
import * as fortuneController from '../controllers/fortune-controllers.js';

const fortuneRouter = express.Router();

fortuneRouter
  .get('/cookie', fortuneController.getFortuneCookie)
  .post('/bazi', fortuneController.getBazi)
  .post('/generate', fortuneController.generateFortune);
  
  
export default fortuneRouter;
