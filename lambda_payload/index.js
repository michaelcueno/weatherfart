"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const axios = __importStar(require("axios"));
const weatherKey = process.env.WEATHER_API_KEY;
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const weather_preable = `Give me a weather report based on the following weather data: `;
const openai = new openai_1.OpenAIApi(configuration);
const system_message = `
You are a rude and condescending local news weather man. You have a sense of humor but can only tell fart jokes.
When asked for a weather report, you MUST INCLUDE FART JOKES in the report. You must also begin the report by insulting the user.
You always end the report with the line: Stay gassy out there.
`;
function getWeatherReport(lat, long) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.pirateweather.net/forecast/${weatherKey}/${lat},${long}\?\&units\=us`;
        const response = yield axios.default
            .request({
            method: 'get',
            url,
            params: { category: 'all', count: '2' },
            headers: {
                'X-RapidAPI-Key': 'your-rapid-key',
                'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
            },
        });
        const current = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.currently;
        ;
        delete current.time;
        delete current.icon;
        if (current.nearestStormDistance === 0) {
            current.nearestStormDistance = 'No storms';
        }
        if (current.nearestStormBearing === 0) {
            current.nearestStormDistance = 'No storms';
        }
        current.temperature = `${current.temperature} degrees`;
        current.apparentTemperature = `${current.apparentTemperature} degrees`;
        return current;
    });
}
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(`event?.queryStringParameters: ${JSON.stringify(event === null || event === void 0 ? void 0 : event.queryStringParameters)}`);
    const lat = (_a = event === null || event === void 0 ? void 0 : event.queryStringParameters) === null || _a === void 0 ? void 0 : _a.lat;
    const long = (_b = event === null || event === void 0 ? void 0 : event.queryStringParameters) === null || _b === void 0 ? void 0 : _b.long;
    const weather = yield getWeatherReport(lat, long);
    console.log('got the weather');
    const input_for_weather = `${weather_preable} ${JSON.stringify(weather)}`;
    const lambdaResponse = {
        statusCode: 200,
        body: "",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        }
    };
    try {
        const response = yield openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: system_message },
                { role: "user", content: input_for_weather },
            ],
            temperature: 0.7,
        });
        let chat = [];
        response === null || response === void 0 ? void 0 : response.data.choices.forEach((choice) => {
            chat.push(choice.message);
        });
        lambdaResponse.body = JSON.stringify({ chat });
    }
    catch (error) {
        lambdaResponse.error = error.message;
    }
    console.log('got chat response');
    console.log(JSON.stringify(lambdaResponse));
    return lambdaResponse;
});
//# sourceMappingURL=index.js.map