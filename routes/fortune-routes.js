import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import knex from 'knex';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig.development);
const fortuneRouter = express.Router();


fortuneRouter.post('/register', async (req, res) => {
  const {  } = req.body;
  try {

  } catch (error) {
    res.status(400).json({ message: 'Error' });
  }
});


export default fortuneRouter;