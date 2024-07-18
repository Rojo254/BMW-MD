const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lwVTlwdy9Ba3RlUUpNeGJLVDF3elFIc3BxOHloWm9tVEpjV2RFc1VFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnBEZ255ancvVkxHUkExR1F2OTIwMmpyeWc0VnRzZ0pYR3QvTXRPb1Iwdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTEZ6aTJnZ0F0Y2tFZ0l2UkN0MXhkOXlGQkNZTHBmWTVKQnRUV2hya1djPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1ZGxFbjV3cjBQeUk3cmFUUFhKRWl0ZVp4U2l3bjU0SStXVDAyZkw0NFhjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNQNVdqa282cWx0bG1rMGZrcldrOHUzam54bHlPNnNxd2kzWDJmZUpJMjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9QZk5NN1Y3KzRaRXR3MTRnN01ra2gzaWRkVzB2RGZKUE0rTFBDNUwwRVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUxzd2VJSkxpUDZ3TE9ZOEtCcVBkZnpGUnp1Uy82eFd2dDQ0c3Z6Rjhsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUl2YXgrQjJEcFIwd1RZM3F5RVpXTndTb2xhcEsycCtCN2RzK0ZUNXZndz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImIvVTBpUEF5NDljSVBHVFJndlpLZmxyczVwd1lVOVpwM3BENVJPTG9tNjBsM2xwa0hJdGJFb3pEVFlQU3MzZmo5MWN1cmdiNzl6bVdyRjBsdndiTmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzEsImFkdlNlY3JldEtleSI6IlNnMTcyMnNuNmJYK3lZaHc5R3FEdXFLSFNQdXk1VWF3NmJwd0xIaWRYbTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzk0MzE2Mzc1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkI3RDEzODM5REQzODI0OEVFQTUwOTgxNDE4Qzg5ODdCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjEzMjIyNTN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImpNSWE5TFN4U05TczR0SnVfUTRwa0EiLCJwaG9uZUlkIjoiNzIzMWFiNzUtMTBlNC00MDM4LTk0ZGQtNjA2NWJkZDkwOThiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9VazBKQ1FRWXlnR3pSWWhDMm9FYnphUXhSMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTVGw4VFNiYUdraVFHeWo5NHZWcE41Sm5KUUk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWVhRQzVYMk0iLCJtZSI6eyJpZCI6IjI1NDc5NDMxNjM3NToyOUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTC9QcXFNQ0VQeVY1YlFHR0F3Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiM0t0cmFRY2hBR243ZUJEaVh3Um15dWlWM2N1MHhuQUhkZGJYSFFZbW5qWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMGNTMno0MnYxMnBUeGhjcTBoMk1BNVJFSHdnWm1pa2FtaU9lVWZwT2Q5MUY2YXJkRXJ5Q2toZGs0SXB4ajBRWkhFOW5heDVRcHYvcDA0Y0FUZ2ZORHc9PSIsImRldmljZVNpZ25hdHVyZSI6InE4SkpNK1hnMGQzUGpLSEpPZVJIVENCL3RodzJ6OE9VcmswL0dpdmNvdm83VjkxYUgvWHc4YVR4bHVQZnJ6TUhvQUJRS1c1a3BUVmlRSEVXTXo0d2hBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk0MzE2Mzc1OjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmR5cmEya0hJUUJwKzNnUTRsOEVac3JvbGQzTHRNWndCM1hXMXgwR0pwNDIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEzMjIyNTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSjQ0In0=',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "kartel",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "vybz",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW_XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd124f7e9271111c3bcc1.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
