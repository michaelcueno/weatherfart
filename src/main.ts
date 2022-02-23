// import * as axios from 'axios';
import { APIGatewayRequest } from './types';

export async function handler(request: APIGatewayRequest) {
  const response = {
    statusCode: 200,
    body: `oh good, you requested ${request.rawPath}`,
  }

  return response;
}

