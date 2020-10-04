const bot = require("./modules/bot");
setInterval(() => {
  bot.searchAndRetweetHashTag();
  bot.replyTopAccounts();
}, 300000);
// 5 MIN
