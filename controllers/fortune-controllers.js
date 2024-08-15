import knex from 'knex';
import knexConfig from '../knexfile.js';
import BaziConverter from '../functions/BaziConverter.js';

const db = knex(knexConfig.development);

const getFortuneCookie = async (req, res) => {
    try {
        const fortuneCookies = await db('fortune_cookies').select('message');
        const randomIndex = Math.floor(Math.random() * fortuneCookies.length);
        const fortune = fortuneCookies[randomIndex];
        res.json({ fortune: fortune.message });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving fortune cookie' });
    }
};

const getBazi = (req, res) => {
  const { year, month, day, hour } = req.body;
  try {
    const bazi = new BaziConverter(year, month, day, hour);
    res.json({
      baziJson: bazi.getBaziJson(),
      baziWithElementalZodiac: bazi.getBaziJsonWithElementalZodiac(),
      baziEnglish: bazi.translateBaziEnglish(),
      baziChineseFull: bazi.getBaziChineseFullString(),
    });
  } catch (error) {
    res.status(400).json({ message: 'Error generating Bazi', error });
  }
};

const generateFortune = async (req, res) => {
    const { userId, birthDate } = req.body;
    const fortuneData = {
      jia_zi: 'Example Jia-Zi', 
      lucky_color: 'Example Color', 
      suggestion: 'Example Suggestion', 
      user_id: userId,
    };
  
    try {
      const [fortuneId] = await db('fortunes').insert(fortuneData);
      const newFortune = await db('fortunes').where({ id: fortuneId }).first();
      res.status(201).json(newFortune);
    } catch (error) {
      res.status(500).json({ message: 'Unable to generate fortune data.' });
    }
  };

export {
    getFortuneCookie,
    getBazi,
    generateFortune,
    
};
