var config = require("./config");
var Twit = require("twit");
var T = new Twit(config.twitConfig);
var topAccounts = require("./accounts").accounts;

/*======================
  ======================
  STREAM AND RETWEET ALL TWEETS WITH (#)endsars,SarsAlert ⚡
  ======================
  ======================
*/
const streamTweet = (
  callback,
  keyword = ["#EndSARS", "#SarsAlert", "#EndSarsNow"]
) => {
  var stream = T.stream("statuses/filter", { track: keyword });
  stream.on("tweet", function (tweet) {
    callback(tweet);
  });
};
/* ⬇ */
// streamTweet((tweet) => {
//   let tweetId = tweet.id_str;
//   T.post("statuses/retweet/:id", { id: tweetId }, function (
//     err,
//     data,
//     response
//   ) {
//     console.log(data);
//   });
// });

/*======================
  ======================
  REPLY NEW TWEETS FROM ACCOUNTS INCLUDED IN ./accounts.js WITH #endSarsNow X5 ⚡
  ======================
  ======================
*/
const replyTopAccounts = (callback) => {
  var stream = T.stream("statuses/filter", { follow: topAccounts });
  stream.on("tweet", function (tweet) {
    if (!topAccounts.includes(tweet.user.id_str)) {
      return;
    }
    var res = {
      status:
        "#EndSarsNow\n#EndSarsNow\n#EndSarsNow\n@ " + tweet.user.screen_name,
      in_reply_to_status_id: "" + tweet.id_str,
    };
    T.post("statuses/update", res, function (err, data, response) {
      callback(data);
    });
  });
};
console.log(topAccounts);
