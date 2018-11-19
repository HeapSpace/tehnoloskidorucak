import fetch from "node-fetch";

const WEBHOOK_ID = process.env.WEBHOOK_ID;
const DEPLOY_PASSWORD = process.env.DEPLOY_PASSWORD;

const API_ENDPOINT = "https://api.netlify.com/build_hooks/" + WEBHOOK_ID;

exports.handler = async (event, context) => {
  const code = event.queryStringParameters.code
  if (code !== DEPLOY_PASSWORD) {
  	return {
  		statusCode: 403,
  		body: 'No.'
  	}
  }
  return fetch(API_ENDPOINT, { method: 'POST' })
    .then(data => ({
      statusCode: 200,
      body: data
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
