var lambda = require('./index');
lambda.handler({
    queryStringParameters: {
        lat: '37.8267',
        long: '-122.4233'
    }
});
