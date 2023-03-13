require(".").handler({
  queryStringParameters: {
    lat: 40.7128,
    long: -74.0060
  }
}).then(response => {
  console.log(JSON.stringify(response.body));
});
