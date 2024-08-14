/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('fortune_cookies').del();

  // Inserts seed entries
  await knex('fortune_cookies').insert([
    { message: 'You will find great opportunities in the near future.' },
    { message: 'Stay positive, and your efforts will be rewarded.' },
    { message: 'New challenges bring new opportunities.' },
    { message: 'Today is a good day to focus on self-care.' },
    { message: 'Unexpected events will lead to positive outcomes.' },
    { message: 'With integrity and consistency -- your credits are piling up.' },
    { message: 'Reach out your hand today to support others who need you.' },
    { message: 'It is not the outside riches but the inside ones that produce happiness.' },
    { message: 'We can admire all we see, but we can only pick one.' },
    { message: 'To courageously shoulder the responsibility of one\'s mistake is character.' },
    { message: 'We can\'t help everyone. But everyone can help someone.' },
    { message: 'You discover treasures where others see nothing unusual.' },
    { message: 'You will be unusually successful in business.' },
    { message: 'Your spirit of adventure leads you down an exciting new path.' },
    { message: 'Genius is one percent inspiration and ninety-nine percent perspiration.' },
    { message: 'You are the master of every situation.' },
    { message: 'Be brave enough to live creatively.' },
    { message: 'Cookies go stale. Fortunes are forever.' },
    { message: 'Your ingenuity and imagination will get results.' },
    { message: 'Unnecessary possessions are unnecessary burdens.' },
    { message: 'Ability is not something to be shown off.' },
    { message: 'If you wish to see the best in others, show the best of yourself.' },
    { message: 'Your power is in your ability to decide.' },
    { message: 'Wherever you go, whenever you can, try to leave a gift.' },
    { message: 'Kind words can be short and easy to speak, but their echoes are truly endless.' },
    { message: 'Age can never hope to with you while your heart is young.' },
    { message: 'Example is better than perception.' },
    { message: 'Don\'t be pushed by your problems. Be led by your dreams.' },
    { message: 'Many receive advice; only the wise profit from it.' },
    { message: 'You will have good luck and overcome many hardships.' },
    { message: 'Today\'s profits are yesterday\'s good well-ripened.' },
    { message: 'LSDBS - Let Something Good Be Said.' },
    { message: 'I think and that is all that I am.' },
    { message: 'Judge each day not by the harvest you reap but by the seeds you plant.' },
    { message: 'Yesterday was a dare to struggle. Today is a dare to win.' },
    { message: 'Make every day your best. You will improve yourself greatly.' },
    { message: 'You must be willing to act today in order to succeed.' },
    { message: 'Venture not all in one boat.' },
    { message: 'Suppressing a moment of anger may save a day of sorrow.' },
    { message: 'Never be less than your dreams.' },
    { message: 'The good times start when I count to 3: 1... 2... 3.' },
    { message: 'An inch of time is an inch of gold.' },
    { message: 'If you chase two rabbits, both will escape.' },
    { message: 'You will soon be surrounded by good friends and laughter.' },
    { message: 'Haste does not bring success.' },
    { message: 'You will stumble into the path that will lead your life to happiness.' },
    { message: 'You will always be successful in your professional career.' },
    { message: 'Good news will come to you from far away.' },
    { message: 'Be smart, but never show it.' },
    { message: 'The only certainty is that nothing is certain.' },
    { message: 'You or a close friend will be married soon.' },
    { message: 'We will not know the worth of water ’til the well is dry.' },
    { message: 'You are talented in many ways.' },
    { message: 'Do your best to make it happen.' },
    { message: 'You will find great forces in unexpected places.' },
    { message: 'What you see in the mirror, and what you are can be two different images.' },
    { message: 'Excuses are easy to manufacture, and hard to sell.' },
    { message: 'Do unto others as you wish others do unto you.' },
    { message: 'Struggle as hard as you can for whatever you believe in.' },
    { message: 'You have a pair of shining eyes.' },
    { message: 'You should be able to undertake and complete anything.' },
    { message: 'Your principles mean more to you than any money or success.' },
    { message: 'Forgiveness does not change the past, but it does enlarge the future.' },
    { message: 'Stand tall! Don\'t look down upon yourself.' },
    { message: 'Every truly great accomplishment is at first impossible.' },
    { message: 'Wise men seldom talk.' },
    { message: 'If you have a job without aggravations, you don\'t have a job.' },
    { message: 'You are broad-minded and socially active.' },
    { message: 'Don\'t put off till tomorrow what can be enjoyed today.' },
    { message: 'Enthusiastic leadership gets you a promotion when you least expect it.' },
    { message: 'Calamity is the touchstone of a brave mind.' },
    { message: 'Everything you add to the truth subtracts from the truth.' },
    { message: 'You are going to take a vacation.' },
    { message: 'Commitment is the stuff character is made of; the power to change the face of things.' },
    { message: 'A friend asks only for your time, not your money.' },
    { message: 'A handful of patience is worth more than a bushel of brains.' },
    { message: 'To be eighty years young is more cheerful and hopeful than forty years old.' },
    { message: 'A person is not wise simply because one talks a lot.' },
    { message: 'It takes guts to get out of the ruts.' },
    { message: 'The greatest quality is seeking to serve others.' },
    { message: 'Winning isn\'t everything but the will to win is.' },
    { message: 'You display the wonderful traits of charm and courtesy.' },
    { message: 'You will be awarded some great honor.' },
    { message: 'Don\'t build your happiness on others\' sorrow.' },
    { message: 'A kiss is not a kiss without the heart.' },
    { message: 'Don\'t be afraid of fear.' },
    { message: 'There\'s no point to being grown up if you can\'t be childish sometimes.' },
    { message: 'You will learn something new every day.' },
    { message: 'You can\'t go far in a rowboat without oars.' },
    { message: 'Failure is the virtual way to prepare you for great responsibilities.' },
    { message: 'Many receive advice; only the wise profit by it.' },
    { message: 'Your cheerful outlook is one of your assets.' },
    { message: 'You can\'t have everything... where would you put it all?' },
    { message: 'You have an unusually magnetic personality.' },
    { message: 'What if, today, we were grateful for everything?' },
    { message: 'You never hesitate to tackle the most difficult problems.' },
    { message: 'Your emotional nature is strong and sensitive.' },
    { message: 'Serious trouble will bypass you.' },
    { message: 'You have an iron will, which helps you succeed in everything.' },
    { message: 'Three can keep a secret if you get rid of two.' },
    { message: 'Everywhere you choose to go, friendly faces will greet you.' },
    { message: 'Nothing gets in the way of your vision of yourself in the future.' },
    { message: 'To understand is hard. Once one understands, action is easy.' },
    { message: 'The philosophy of one century is the common sense of the next.' },
    { message: 'You will make many changes before settling satisfactorily.' },
    { message: 'When in anger, sing the alphabet.' },
    { message: 'Wealth is a means to an end... not the end itself.' },
    { message: 'It\'s high time for one of your most promising ideas.' },
    { message: 'Small opportunities are often the beginning of great enterprises.' },
    { message: 'People are drawn to you and look to you for advice.' },
    { message: 'Keep your feet on the ground even though friends flatter you.' },
    { message: 'Do a good deed anonymously. You will make a difference in your life.' },
    { message: 'Financial prosperity is coming your way!' },
    { message: 'Your faith will be rewarded.' },
    { message: 'You are very articulate.' },
    { message: 'You have an important goal to achieve and you will succeed.' },
    { message: 'You will find satisfaction in your work and personal life.' },
    { message: 'Good fortune is coming your way.' },
    { message: 'Don\'t waste your time trying to change the world.' },
    { message: 'In every person, there is a place for wonder and amazement.' },
    { message: 'You have a great future ahead of you.' },
    { message: 'The best time for new beginnings is now.' },
    { message: 'Love yourself and all will be fine.' },
    { message: 'Embrace the new and fresh ideas.' },
    { message: 'Your future is as bright as your faith.' },
    { message: 'You will be a shining light in the lives of others.' },
    { message: 'You will overcome any obstacle that stands in your way.' },
    { message: 'You are on the right path towards achieving your dreams.' },
    { message: 'Your hard work will pay off in unexpected ways.' },
    { message: 'Positive changes are ahead in your career.' },
    { message: 'You will be recognized for your efforts and talents.' },
    { message: 'The universe is aligning to bring you success.' },
    { message: 'New adventures await you around the corner.' },
    { message: 'A pleasant surprise is in store for you.' },
    { message: 'Your kindness will be repaid many times over.' },
    { message: 'Success and happiness are yours for the taking.' },
    { message: 'You have the power to create your own destiny.' },
    { message: 'Your creativity will lead you to new opportunities.' },
    { message: 'You are destined for greatness.' },
    { message: 'Embrace the challenges that come your way.' },
    { message: 'You will be surrounded by supportive and loving people.' },
    { message: 'Your dreams are within reach.' },
    { message: 'You will achieve your goals with determination and hard work.' },
    { message: 'The best is yet to come.' },
    { message: 'You will find joy in the simple things in life.' },
    { message: 'Good things are coming to you soon.' },
    { message: 'You will experience great success in your endeavors.' },
    { message: 'Your positive attitude will attract positive outcomes.' },
    { message: 'You are about to enter a period of great prosperity.' },
    { message: 'Your efforts will be rewarded in unexpected ways.' },
    { message: 'You have the strength to overcome any obstacles in your path.' },
    { message: 'Your hard work and dedication will lead to success.' },
    { message: 'The universe is guiding you towards success.' },
    { message: 'A new opportunity will present itself to you soon.' },
    { message: 'You are on the brink of a significant breakthrough.' },
    { message: 'Your future is full of promise and excitement.' },
    { message: 'You will find fulfillment and happiness in your pursuits.' },
    { message: 'Your talents and abilities will be recognized and rewarded.' },
    { message: 'You are capable of achieving your dreams.' },
    { message: 'Your journey is just beginning and it will be extraordinary.' },
    { message: 'You will experience growth and expansion in your life.' },
    { message: 'Success is on the horizon for you.' },
    { message: 'You will make a positive impact on those around you.' },
    { message: 'Your passion and dedication will lead to success.' },
    { message: 'You are destined for greatness and prosperity.' }
  ]);
}
