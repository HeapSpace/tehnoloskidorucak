exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World: " + process.env.AIRTABLE_TOKEN.substring(1,4)
  });
}
