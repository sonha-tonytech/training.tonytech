import { Configuration, OpenAIApi } from "openai";
require("dotenv").config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getAnswerFromOpenAPI = async (question: string) => {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: question}],
  });
  return chatCompletion.data.choices[0].message.content;
}
