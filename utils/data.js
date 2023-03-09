const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    ``,
];
  
const thoughts = [
    'The computer was born to solve problems that did not exist before.',
    'Before software should be reusable, it should be usable.',
    'Simplicity, carried to the extreme, becomes elegance.',
    'A program is never less than 90% complete, and never more than 95% complete.',
    'Computers are incredibly fast, accurate, and stupid.',
    'Next.js enables you to create full-stack web applications.',
    'A good programmer is someone who always looks both ways before crossing a one-way street.',
    'Hello world',
    'Coding is an endless process of trial and error of trying to get the right command in the right place.',
    'Design is where science and art break even.',
    'Computers are good at following instructions, but not at reading your mind.',
];
  
const reactions = [
    'I disagree!',
    'It is so true',
    'This was awesome',
    'Thank you for the great content',
    'Please check out my video response',
    'Cannot agree more',
    'I do not think so',
    'That is exactly how I feel',
    'Not always true',
];
  
const users = [];
  
// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
// Gets a random username
const getRandomUserName = () =>
  `${getRandomArrItem(names)}${Math.floor(Math.random() * 10 + 1)}`;

// Gets a random email
const getRandomEmail = () =>
`${getRandomArrItem(names)}${Math.floor(Math.random() * 1000 + 1)}@mail.com`;
  
// Function to generate random thoughts that we can add to the database. Includes reactions.
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
         thoughtText: getRandomArrItem(thoughts),
         username: getRandomUserName(),
         reactions: [...getReactions(2)],
      });
    }
    return results;
};
  
// Create the responses that will be added to each video
const getReactions = (int) => {
    if (int === 1) {
      return getRandomArrItem(reactions);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactions),
        username: getRandomUserName(),
      });
    }
    return results;
};
  
// Export the functions for use in seed.js
module.exports = { getRandomUserName, getRandomEmail, getRandomThoughts, getReactions };