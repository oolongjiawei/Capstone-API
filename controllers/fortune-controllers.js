import knex from 'knex';
import knexConfig from '../knexfile.js';
import BaziConverter from '../functions/BaziConverter.js';

const db = knex(knexConfig.development);

const outputFortuneCookie = async (req, res) => {
  const { save, userId } = req.body;

  try {
      const fortuneCookies = await db('fortune_cookies').select('message');
      const randomIndex = Math.floor(Math.random() * fortuneCookies.length);
      const fortune = fortuneCookies[randomIndex];

      if (save && userId) {
          const cookieData = {
              user_id: userId,
              cookie_message: fortune.message,
          };
          await db('users_cookies_data').insert(cookieData);
      }

      res.json({ fortune: fortune.message });
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving or saving fortune cookie' });
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
  const { userId, birthYear, birthMonth, birthDay, birthTime, save } = req.body;

  if (!birthYear || !birthMonth || !birthDay || birthTime === undefined) {
    return res.status(400).json({ message: 'Invalid input parameters.' });
  }

  console.log('Received data:', { userId, birthYear, birthMonth, birthDay, birthTime, save });

  try {
    const baziConverter = new BaziConverter(birthYear, birthMonth, birthDay, birthTime);
    const baziResult = baziConverter.getBaziJson();
    const baziEnglish = baziConverter.translateBaziEnglish();

    console.log('Generated Bazi:', baziResult);

    const baziData = {
      birth_year: birthYear,
      birth_month: birthMonth,
      birth_day: birthDay,
      birth_time: birthTime,
      bazi_year: baziResult.year,
      bazi_month: baziResult.month,
      bazi_day: baziResult.day,
      bazi_time: baziResult.time,
      symbol_year: baziEnglish.year,
      symbol_month: baziEnglish.month,
      symbol_day: baziEnglish.day,
      symbol_time: baziEnglish.time,
      element: baziResult.element,
      element_color: baziResult.element_color,
      brief: baziResult.brief,
    };

    if (save) {
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required to save data.' });
      }

      // post result to users_bazi_data 
      const [baziDataId] = await db('users_bazi_data').insert({
        ...baziData,
        user_id: userId,
      });

      const newBaziData = await db('users_bazi_data').where({ id: baziDataId }).first();
      console.log('Inserted Bazi Data:', newBaziData);

      return res.status(201).json({ message: 'Bazi data saved.', bazi: newBaziData });
    }

    // if not save， just return result
    return res.status(200).json({ message: 'Bazi data generated.', bazi: baziData });
  } catch (error) {
    res.status(500).json({ message: 'Error generating Bazi.', error });
  }
};



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

export {
    outputFortuneCookie,
    getAllFortuneCookies,
    generateBazi,
    getUserBazi,
};
