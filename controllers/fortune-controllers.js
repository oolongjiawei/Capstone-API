import knex from 'knex';
import knexConfig from '../knexfile.js';
import BaziConverter from '../functions/BaziConverter.js';
const db = knex(knexConfig.development);

const outputFortuneCookie = async (req, res) => {
  const { save, userId, cookieId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  try {
    let fortune;
    if (!cookieId) { 
      const fortuneCookies = await db('fortune_cookies').select('id', 'message');
      const randomIndex = Math.floor(Math.random() * fortuneCookies.length);
      fortune = fortuneCookies[randomIndex];
    } else {
      fortune = await db('fortune_cookies').where({ id: cookieId }).first();
    }

    if (save) {
      const cookieData = {
        user_id: userId,
        cookie_id: fortune.id,
        cookie_message: fortune.message,
      };
      await db('users_cookies_data').insert(cookieData);
    }

    res.json({ id: fortune.id, fortune: fortune.message });
  } catch (error) {
    console.error('Error generating or saving fortune cookie:', error);
    res.status(500).json({ message: 'Error retrieving or saving fortune cookie' });
  }
};



const getDailyFortuneCookie = async (req, res) => {
  const { userId } = req.params;

  try {
    const today = new Date().toISOString().split('T')[0]; 
    const dailyCookie = await db('users_cookies_data')
      .where({ user_id: userId })
      .andWhereRaw('DATE(created_at) = ?', [today])
      .first();

    if (!dailyCookie) {
      return res.status(404).json({ message: 'No fortune cookie found for today.' });
    }

    res.json({ id: dailyCookie.cookie_id, fortune: dailyCookie.cookie_message });
  } catch (error) {
    console.error('Error retrieving daily fortune cookie for user:', error); 
    res.status(500).json({ message: 'Error retrieving daily fortune cookie for this user' });
  }
};

const getUserSavedCookies = async (req, res) => {
  const { userId } = req.params;

  try {
    const userFortuneCookies = await db('users_cookies_data')
      .where({ user_id: userId })
      .select('cookie_id', 'cookie_message', 'created_at');  // Ensure 'cookie_id' is selected

    if (userFortuneCookies.length === 0) {
      return res.status(404).json({ message: 'No fortune cookies found for this user' });
    }

    res.json(userFortuneCookies);
  } catch (error) {
    console.error('Error retrieving fortune cookies for user:', error); 
    res.status(500).json({ message: 'Error retrieving fortune cookies for this user' });
  }
};


const getAllFortuneCookies = async (req, res) => {
  try {
      const allFortuneCookies = await db('fortune_cookies').select('*');
      res.json(allFortuneCookies);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving all fortune cookies' });
  }
};

const generateBazi = async (req, res) => {

  let { userId, birthYear, birthMonth, birthDay, birthTime, save } = req.body;
  
  birthYear = parseInt(birthYear);
  birthMonth = parseInt(birthMonth);
  birthDay = parseInt(birthDay);
  birthTime = parseInt(birthTime);

  console.log('Received Bazi data:', req.body); 
  console.log('Received Data:', { userId, birthYear, birthMonth, birthDay, birthTime, save });

  if (!userId || !birthYear || !birthMonth || !birthDay || birthTime === undefined) {
    return res.status(400).json({ message: 'Invalid input parameters.' });
  }

  try {
    const baziConverter = new BaziConverter(birthYear, birthMonth, birthDay, birthTime);
    console.log('BaziConverter initialized:', baziConverter);

    const baziResult = baziConverter.getBaziJson();
    console.log('BaziResult:', baziResult);

    const baziData = {
      user_id: userId,
      birth_year: birthYear,
      birth_month: birthMonth,
      birth_day: birthDay,
      birth_time: birthTime,
      bazi_year: baziResult.year,
      bazi_month: baziResult.month,
      bazi_day: baziResult.day,
      bazi_time: baziResult.time,
      element: baziResult.element,
      element_color: baziResult.element_color,
      brief: baziResult.brief,
      symbol_year: baziResult.symbol_year,
      symbol_month: baziResult.symbol_month,
      symbol_day: baziResult.symbol_day,
      symbol_time: baziResult.symbol_time,
    };

    if (save) {
      const existingBaziData = await db('users_bazi_data').where({ user_id: userId }).first();
      if (existingBaziData) {
        await db('users_bazi_data').where({ user_id: userId }).update(baziData);
        return res.status(200).json({ message: 'Bazi data updated.', bazi: baziData });
      } else {
        const [baziDataId] = await db('users_bazi_data').insert(baziData);
        const newBaziData = await db('users_bazi_data').where({ id: baziDataId }).first();
        return res.status(201).json({ message: 'Bazi data saved.', bazi: newBaziData });
      }
    } else {
      
      return res.status(200).json({ message: 'Bazi data generated.', bazi: baziData });
    }
  } catch (error) {
    console.error('Error in Bazi generation:', error);
    res.status(500).json({ message: 'Unable to generate and store Bazi data.', error: error.message });
  }
};

console.log(generateBazi);

const getUserBazi = async (req, res) => {
  const { userId } = req.params;
  try {
    const userFortune = await db('users_bazi_data').where({ user_id: userId }).first();
    if (!userFortune) {
      return res.status(404).json({ message: 'No fortune data found for this user.' });
    }
    res.status(200).json(userFortune);
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve fortune data.', error });
  }
};

const deleteUserFortuneCookie = async (req, res) => {
  const { userId, cookieId } = req.params;

  try {
    const deletedRows = await db('users_cookies_data')
      .where({ user_id: userId, cookie_id: cookieId })
      .del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Fortune cookie not found or already deleted.' });
    }

    res.json({ message: 'Fortune cookie deleted successfully.' });
  } catch (error) {
    console.error('Error deleting fortune cookie:', error);
    res.status(500).json({ message: 'Error deleting fortune cookie.' });
  }
};


export {
    outputFortuneCookie,
    getUserSavedCookies,
    getAllFortuneCookies,
    generateBazi,
    getUserBazi,
    getDailyFortuneCookie,
    deleteUserFortuneCookie,
};
