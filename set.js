const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0NOT1h2azNuRkxTeGNaT2FiSVVEN3JLM0ZFZ25KaVViR2FFSi9JdkVFOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmVteFhQdDdNV2g4VndUcmc5Nk5heXVhTFlMblh1amRjdHNwcWJTVWtIdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRDdFdzBrRFVsVEVwTzQxY1l1UDJubndZTFkrQXVHeWN1SUJzaHFseDBZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvZlo0TFdKU3VlZnk2Yy9jcW5FU0RubVFCRHo4RTU1enpGWWRBQm5GbjBzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktHNnBUK0o0eDFlZkk0Tmw1OTJKUmk5SWVWV0dGTG96Q3NoM2NJZzIvbWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxoaEUxWmxyd3pIbnozTWxXUXNRMjFYclRGYVY4QkgzYlkrKzFFbkwvVDQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUtBZWdNQlJqQWRuaGswMVdFRVN1azRUSlVLeGlMQnYyMUZvNllOVElrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUFBUytDZFFITE9MczNOTndTckhlbjB1V0NaaElHdERDVlBlM2xLL29tND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpDTm82R3ZYN0wxWXA1NXRrMjBEOXg4YjNLbmdLa1V2bVd2em4yZHROTVpGeWtKWVN1a1Z3cVExSnNTM3VOdGtPUS9aT2RWaVJaeVVwTUNhUTJCaUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU1LCJhZHZTZWNyZXRLZXkiOiJhaVZraGhVdUFVbXpIbjNVdVBaRVVpNnVRV3FlNytaKzQwTk12UGw0WXdRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJRUmNwYzNHQlRwMmZOT1V3cWhVMDJ3IiwicGhvbmVJZCI6ImU3ZDNlNDI5LTM0ZDMtNDFjMC1iNDkwLThiMDYxMTc2MDdjNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaeitxN1A1MGZROUIzYlFyVWpkL1ZKNG80T289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFl3dXpNZ1lKNmtCYUQ5L0UrREpNZkZuL3RNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdUUTYzTEo3IiwibWUiOnsiaWQiOiIyNTQ3OTQzMTYzNzU6MzBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01EUHFxTUNFSjZyNnJRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjNLdHJhUWNoQUduN2VCRGlYd1JteXVpVjNjdTB4bkFIZGRiWEhRWW1ualk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InRQUlp4Y2tSMjBkWC8zVjJaN01pT3NsbXFib0Q0OVNZTFRMM1FMNHBjblFBMmJWNDc1UFRKalljQVd5QzhCNGlXeHBuSzhHaVFDYUpzekRsRkdrVkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDYVBQSEVIK2o0RHJTQVVCQzArS0FLdmlsZFlOdUlGcG9wRGFDc0wzUW40cW1KYlUwWk1SWDBna3RkM0ZCZ2xKdVN6NVphYThpcXhFYnMrdHhqSzJCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5NDMxNjM3NTozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkeXJhMmtISVFCcCszZ1E0bDhFWnNyb2xkM0x0TVp3QjNYVzF4MEdKcDQyIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNDA2ODkxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo0NCJ9',
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
