const axios = require("axios");
const PAGE_ID = "616348874889629";
const PAGE_ACCESS_TOKEN =
        "EAAiQNfo3ZBq8BOZChpeV6v8NDZAvKwv1l5WeSUKv6iRdYN91nZCntWZCLpYTFhWZBtxK8Rw8QmjVUCseqFVDLpbVOfYrT1zfNWuiiXBoJJK9raphpHvdKIUWZCH7lfSrSOYHOSZBajvsO4lzNa4VeB3DIGuvVvkT6lN7QSHZCQaSha8dYOI4dJ3hfId6hN0nFhiE1l9It7kFTW0FsFlYPrXrt9IexEiF42I4jXCYAVvPiCegZD";

axios.post(`https://graph.facebook.com/${PAGE_ID}/subscribed_apps`, {
        access_token: PAGE_ACCESS_TOKEN,
        subscribed_fields: "feed",
})
        .then(() => console.log("Subscribed successfully!"))
        .catch((err) => console.error("Error:", err.response.data));
