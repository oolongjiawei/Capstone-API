import express from 'express';
import * as fortuneController from '../controllers/fortune-controllers.js';

const fortuneRouter = express.Router();

fortuneRouter
  .post('/cookie', fortuneController.outputFortuneCookie)
  .get('/user/:userId/cookies', fortuneController.getAllFortuneCookies)
  .post('/bazi', fortuneController.generateBazi) 
  .get('/user/:userId/bazi', fortuneController.getUserBazi);
  

export default fortuneRouter;
