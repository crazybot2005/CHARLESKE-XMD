const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV01WcURMYlFKYWJqb251akJESEl4ekF6S0hjZnVWZHJPSzR1T0tZUFEzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0RBOVZpRVBvVzl0c0JVRmFqdFFNMmZDSHdncno1LzNzRTdnYlpRMjBUUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0Qml3RzUrVWRudTA1K0NJdjROc1VieDgvY3RtMVVNVkFOdlRuM0lKUDJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1dytUQmNJK1BVaFZ4aVU5dEpCMXJFeTYzcm5DWjNvaUhkT0IxYUY2WVZNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRHR05LYWc5TEs4R2NuVWY5THVCbnBmckxrZ2NGb0xkaFhsR1A0bC9NVWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhwdWhFQkhKLzBQaHFpSTJjUGRSWFc3TXN3Nng5cHV3cVRIQ2dLeVRjMXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUJuMzN0WktPTVdtYWFwYWszOHRzdzgvY0Z2QklURGYwNkZLdGRJVHFFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFUwNXdFeVRuNWtrMlhQSlhZN2pmZWYxVXRNOGUyakE0ZmtUcm9sSTJWVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJKTitKV3g0cmVYZWNhMXI4NGdwakN3Z1hqbnhmU25WQ2FpWVJMbnpsd3ZmT3M0ZHJaOVEycDgwTzRtaUI5NEVBQzVDTlFyaTVvNHY3RElZMFdtNWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEsImFkdlNlY3JldEtleSI6IkREcWlEMHhnYk92ZnVDWXNBTlJiRDV5WW5GR2xndnNTY0JpUXVuWXNoODQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5ODgzNTY1NTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ3QUM2MzM0QTIwNUQ1QzI0M0FEMDdCMkIzRjJBOUMyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4MjIyNzd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxOTg4MzU2NTU2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3MUVGMzcwN0JFRDQ4OTI3QzA5NDhGODQ3NjZEREUzRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODIyMjc4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk4ODM1NjU1NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMkU4NjY5NUQyNTRDREE2QzY5NUM0REUzQTREQTY2NkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NzgyMjI5MH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjkxOTg4MzU2NTU2Mzo0NEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI0OTgxNzI1OTMxNTI0MTo0NEBsaWQiLCJuYW1lIjoi8J2Zj/CdmafwnZme8J2ZqPCdmZ3wnZmWIOKdpOKAjfCfqbkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ055NDZhQURFTFhOdHNFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InVXVlJOWGttYnRHdW84ajUrMlpoN0wwdndjQXJiSU1JczRybXhNa1JPbkE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ims5NUZxWXpUYmF3c1RJRUJCemdzRXhxaXcrZ1UwcFkxRU1VODZzdmwrdXZuUmhncjR2ZnlTYjZDVjZQK3JDaEIrU0V5K01NakFuN2w2MEpidXh5VkJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI0RHRRZHd0SzQ4dWFiYVFSZS8wQThmcU1TV2ZlWDh3ZHlJa21pMXhDNWtVbUhzRjRzeStiUERoQkpocnlheXJWMlZBL2wxb1ZGRkNMbXpYV0JiaE5oUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTg4MzU2NTU2Mzo0NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJibGxVVFY1Sm03UnJxUEkrZnRtWWV5OUw4SEFLMnlEQ0xPSzVzVEpFVHB3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDc4MjIyNzQsImxhc3RQcm9wSGFzaCI6IjRaUlA2UyIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSW9KIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Charles ke",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Charles ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

