import knex from 'knex';
import knexConfig from '../knexfile.js';

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


export {
    getFortuneCookie,
};
