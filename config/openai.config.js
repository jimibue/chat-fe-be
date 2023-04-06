// this file we want to setup connection
// to openai
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

// // check to see if this a production enviroment
if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

const config = new Configuration({
    organization:process.env.ORGANIZATION,
    apiKey:process.env.OPENAI_API_KEY
})

const my_openai = new OpenAIApi(config)
export default my_openai;