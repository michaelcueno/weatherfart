import { Configuration, OpenAIApi } from "openai";
import * as axios from 'axios';

interface WeatherResponse {
  time?: number;
  summary?: string;
  icon?: string;
  nearestStormDistance?: number | string;
  nearestStormBearing?: number | string;
  precipIntensity?: number;
  precipProbability?: number;
  precipIntensityError?: number;
  precipType?: number;
  temperature?: number | string;
  apparentTemperature?: number | string;
  dewPoint?: number;
  humidity?: number;
  pressure?: number;
  windSpeed?: number;
  windGust?: number;
  windBearing?: number;
  cloudCover?: number;
  uvIndex?: number;
  visibility?: number;
  ozone?: number;
}

const weatherKey = process.env.WEATHER_API_KEY;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const input = process.argv.slice(2).join(" ");

const weather_preable = `Give me a weather report based on the following JSON weather data: `;

const openai = new OpenAIApi(configuration);

const system_message = `You are a very rude and condescending local news weather man. You have a sense of humor but can only tell fart jokes. 
When asked for a weather report, you MUST INCLUDE FART JOKES in the report. You must also begin the report by insulting the user.`;

// Use Axios to fetch the wather from api.pirateweather.net
async function getWeatherReport(lat: string, long: string) {
  const url = `https://api.pirateweather.net/forecast/${weatherKey}/${lat},${long}\?\&units\=us`;
	const response: any = await axios.default
		.request({
      method: 'get',
      url, 
      params: { category: 'all', count: '2' },
      headers: {
        'X-RapidAPI-Key': 'your-rapid-key',
        'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
      },
		})
	
	const current = response?.data?.currently as WeatherResponse;;
	delete current.time;
	delete current.icon;
	if (current.nearestStormDistance === 0) {
	  current.nearestStormDistance = 'No storms'; 
  }
	if (current.nearestStormBearing=== 0) {
	  current.nearestStormDistance = 'No storms'; 
  }
  current.temperature = `${current.temperature} degrees`;
  current.apparentTemperature = `${current.apparentTemperature} degrees`;
  return current;
}

exports.handler = async (event: any) => {
    const lat = event?.queryStringParameters?.lag;
    const long = event?.queryStringParameters?.long;

    const weather = await getWeatherReport(lat, long);
    const input_for_weather = `${weather_preable} ${JSON.stringify(weather)}`;

    const lambdaResponse: any = {
        statusCode: 200,
        body: { chat: [] },
    };
    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
      
        messages: [
           { role: "system", content: system_message },
           { role: "user", content: input_for_weather },
        ],
        temperature: 0.7,
      }); 
      response?.data.choices.forEach((choice) => {
        lambdaResponse.body.chat.push(choice.message);
      });
    } catch (error) {
      lambdaResponse.error = error.message;
    }

    return lambdaResponse;
};
