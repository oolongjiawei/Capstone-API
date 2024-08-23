import express from 'express';
import * as fortuneController from '../controllers/fortune-controllers.js';

const fortuneRouter = express.Router();

fortuneRouter
  .post('/cookie', fortuneController.outputFortuneCookie)
  .get('/cookies', fortuneController.getAllFortuneCookies)
  .get('/user/:userId/saved-cookies', fortuneController.getUserSavedCookies)
  .post('/bazi', fortuneController.generateBazi) 
  .get('/user/:userId/bazi', fortuneController.getUserBazi)
  .get('/user/:userId/daily-cookie', fortuneController.getDailyFortuneCookie)
  .delete('/user/:userId/cookies/:cookieId', fortuneController.deleteUserFortuneCookie);

  
  

export default fortuneRouter;
