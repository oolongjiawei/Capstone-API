import express from 'express';
import * as fortuneController from '../controllers/fortune-controllers.js';

const fortuneRouter = express.Router();

fortuneRouter
  .post('/cookie', fortuneController.outputFortuneCookie)
  .get('/cookies', fortuneController.getAllFortuneCookies)
  .get('/user/:userId/cookies', fortuneController.getUserFortuneCookies)
  .post('/bazi', fortuneController.generateBazi) 
  .get('/user/:userId/bazi', fortuneController.getUserBazi);
  

export default fortuneRouter;
