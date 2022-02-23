

// Duck typed from example request
export interface APIGatewayRequest {
  version: string;
  routeKey: string; //  "GET /weather_fart_api",
  rawPath: string; // "/weather_fart_api",
  rawQueryString: string; //  "hey=cool",
  headers: {
    accept: string; //"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    'accept-encoding': string; // "gzip, deflate, br",
    'accept-language': string; // "en-US,en;q=0.9",
    'content-length': string;  // "0",
    dnt: string; // "1",
    host: string; // "scagb2vw94.execute-api.us-west-2.amazonaws.com",
    'sec-ch-ua': string; // "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
//    'sec-ch-ua-mobile': "?0",
//    'sec-ch-ua-platform': "\"macOS\"",
//    'sec-fetch-dest': "document",
//    'sec-fetch-mode': "navigate",
//    'sec-fetch-site': "none",
//    'sec-fetch-user': "?1",
//    'upgrade-insecure-requests': "1",
    'user-agent': string; // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
//    'x-amzn-trace-id': "Root=1-62169962-792b626f4b606f3e771559fe",
//    'x-forwarded-for': "75.172.114.190",
//    'x-forwarded-port': "443",
//    'x-forwarded-proto': "https"
  },
  queryStringParameters: any; // Todo define api
  requestContext: {
    accountId: string; // "144815621881",
    apiId: string; // "scagb2vw94",
    domainName: string; // "scagb2vw94.execute-api.us-west-2.amazonaws.com",
    domainPrefix: string; // "scagb2vw94",
    http: {
      method: string; // "GET",
      path: string; // "/weather_fart_api",
      protocol: string; // "HTTP/1.1",
      sourceIp: string; // "75.172.114.190",
      userAgent: string; // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36"
    },
    requestId: string; // "OAznbivovHcEPHg=",
    routeKey: string; // "GET /weather_fart_api",
    stage: string; // "$default",
    time: string; // "23/Feb/2022:20:30:26 +0000",
    timeEpoch: string; // 1645648226527
  },
  isBase64Encoded: boolean;
}

