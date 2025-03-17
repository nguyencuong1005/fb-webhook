const express = require("express");
const axios = require("axios");
const app = express();
const PAGE_ID = process.env.PAGE_ID;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.use(express.json());

app.get("/webhook", (req, res) => {
        const VERIFY_TOKEN = "saigon1005";
        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (mode === "subscribe" && token === VERIFY_TOKEN) {
                console.log("Webhook verified!");
                res.status(200).send(challenge);
        } else {
                res.sendStatus(403);
        }
});

app.post("/webhook", (req, res) => {
        const body = req.body;
        if (body.object === "page") {
                body.entry.forEach((entry) => {
                        entry.changes.forEach((change) => {
                                if (change.field === "feed" && change.value.item === "reaction") {
                                        const reaction = change.value;
                                        console.log("New reaction:", reaction);

                                        if (reaction.reaction_type === "haha") {
                                                const userId = reaction.from.id;
                                                axios.post(
                                                        `https://graph.facebook.com/${PAGE_ID}/blocked`,
                                                        {
                                                                user: userId,
                                                                access_token: PAGE_ACCESS_TOKEN,
                                                        }
                                                )
                                                        .then(() => {
                                                                console.log(
                                                                        `Blocked user ${userId} (${reaction.from.name}) from the page.`
                                                                );
                                                        })
                                                        .catch((err) => {
                                                                console.error(
                                                                        "Error blocking user:",
                                                                        err.response
                                                                                ? err.response.data
                                                                                : err.message
                                                                );
                                                        });
                                        }
                                }
                        });
                });
                res.sendStatus(200);
        } else {
                res.sendStatus(404);
        }
});

app.listen(3000, () => {
        console.log("Server running on port 3000");
});
