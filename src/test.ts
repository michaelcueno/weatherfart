const lambda = require('./index');

lambda.handler({
  queryStringParameters: {
    lat: '37.8267',
    long: '-122.4233',
  },
})
  .then((response: any) => {
    console.log(JSON.stringify(response.body.chat));
  });
