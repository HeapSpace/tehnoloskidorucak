import fetch from "node-fetch";

const API_ENDPOINT =
  "https://api.airtable.com/v0/appNUbQdF6KjbUOHy/Meetups";

const API_TOKEN = process.env.AIRTABLE_TOKEN;

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT + "?api_key=" + API_TOKEN)
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: `${data}`
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
