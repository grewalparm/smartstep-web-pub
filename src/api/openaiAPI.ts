import axios from "axios";
import { ChatCompletionMessage } from "../types/types";

const apigwURL = "https://yb63f6teoh.execute-api.us-east-1.amazonaws.com/prod/";
const getChatCompletionEndpoint = "getChatCompletion";


export async function getChatCompletion(messages: ChatCompletionMessage[]) {
  try {
    const response = await axios.post(
      apigwURL + getChatCompletionEndpoint,
      messages
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

