var config = require("./config");
var Twit = require("twit");
var T = new Twit(config.twitConfig);
var topAccounts = require("./accounts").accounts;

/*======================
  ======================
  REPLY NEW TWEETS FROM ACCOUNTS INCLUDED IN ./accounts.js WITH #endSarsNow X5 ⚡
  ======================
  ======================
*/
const replyTopAccounts = () => {
  console.log("Getting ready to reply top accounts...");
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
      if (err) {
        console.log("error replying " + tweet.user.screen_name);
      } else {
        console.log("successfully replied  " + tweet.user.screen_name);
      }
    });
  });
};

/*======================
  ======================
  SEARCH AND RETWEET ALL TWEETS WITH (#)endsars,SarsAlert ⚡
  ======================
  ======================
*/
const searchAndRetweetHashTag = (callback = null) => {
  console.log("Getting ready to retweet #endSars...");
  T.get(
    "search/tweets",
    {
      q:
        "(#EndSars OR #EndSarsParmanentlyNow OR #EndSARSNotBanSARS OR #EndSARSBrutality OR  #EndPoliceBrutality)",
      result_type: "recent",
      count: 30,
    },
    function (err, data, response) {
      if (data) {
        data.statuses.forEach((tweet) => {
          let tweetId = tweet.id_str;
          let tweetText = tweet.text;
          // ignore retweeted tweets 👇
          if (tweetText.split(" ")[0] == "RT") {
            // doNothing()
          } else {
            //   console.log(tweetText+"\n_______")
            // RETWEET TWEET
            T.post("statuses/retweet/:id", { id: tweetId }, function (
              err,
              data,
              response
            ) {
              if (err) {
                console.log(
                  "Error while retweeting tweet - " +
                    tweetId +
                    " duplicate maybe"
                );
              }
              console.log("Retweeted successfully!");
            });
          }
        });
      } else if (err) {
        console.log("Search tweet error!");
      }
    }
  );
};
module.exports = {
  searchAndRetweetHashTag,
  replyTopAccounts,
};
