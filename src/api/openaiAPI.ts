import axios from "axios";
import { ChatCompletionMessage } from "../types/types";

const apigwURL = "https://yb63f6teoh.execute-api.us-east-1.amazonaws.com/prod/";
const getQuestionEndpoint = "getQuestion";
const getChatCompletionEndpoint = "getChatCompletion";

export async function getQuestion() {
  try {
    const response = await axios.get(apigwURL + getQuestionEndpoint);
    // Handle the successful response
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle the error
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

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
