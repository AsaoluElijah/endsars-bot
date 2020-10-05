const bot = require("./modules/bot");

bot.searchAndRetweetHashTag();
bot.replyTopAccounts();

setInterval(() => {
  bot.searchAndRetweetHashTag();
}, 300000);
// 5 MIN
