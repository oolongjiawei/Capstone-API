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

const getUserFortuneCookies = async (req, res) => {
  const { userId } = req.params;

  try {
    const userFortuneCookies = await db('users_cookies_data')
      .where({ user_id: userId })
      .select('cookie_message', 'created_at'); 

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

  const { userId, birthYear, birthMonth, birthDay, birthTime } = req.body;

  // 添加简单的输入验证
  if (!userId || !birthYear || !birthMonth || !birthDay || birthTime === undefined) {
    return res.status(400).json({ message: 'Invalid input parameters.' });
  }

  // 使用 BaziConverter 生成八字数据
  const baziConverter = new BaziConverter(birthYear, birthMonth, birthDay, birthTime);
  const baziResult = baziConverter.getBaziJson();

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
  };

  try {
    // 检查该用户是否已有八字记录
    const existingBaziData = await db('users_bazi_data').where({ user_id: userId }).first();

    if (existingBaziData) {
      // 如果已有记录，可以选择更新或删除再插入
      await db('users_bazi_data').where({ user_id: userId }).update(baziData);
      return res.status(200).json({ message: 'Bazi data updated.', bazi: baziData });
    } else {
      // 如果没有记录，插入新记录
      const [baziDataId] = await db('users_bazi_data').insert(baziData);
      const newBaziData = await db('users_bazi_data').where({ id: baziDataId }).first();
      return res.status(201).json({ message: 'Bazi data saved.', bazi: newBaziData });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to generate and store bazi data.', error });
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
    getUserFortuneCookies,
    getAllFortuneCookies,
    generateBazi,
    getUserBazi,
};
