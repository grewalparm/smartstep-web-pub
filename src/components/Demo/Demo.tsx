import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { getChatCompletion, getQuestion } from "../../api/openaiAPI";
import { ChatCompletionMessage } from "../../types/types";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as SendIcon } from "../../images/send.svg";

interface Message {
  id: number;
  sender: string;
  content: string;
  color: string;
  role: string;
}

const Demo: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const handleNextQuestion = () => {
    window.location.reload();
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage: Message = {
        id: chatHistory.length + 1,
        sender: "You",
        content: message,
        color: "blue",
        role: "user",
      };

      setChatHistory([...chatHistory, newMessage]);
      setMessage("");

      setIsSendingMessage(true);
    }
  };

  useEffect(() => {
    if (isSendingMessage) {
      const sendMessage = async () => {
        const chatCompletionMessages: ChatCompletionMessage[] = chatHistory.map(
          ({ role, content }) => {
            return { role, content };
          }
        );

        setIsLoading(true);
        const chatCompletion = await getChatCompletion(chatCompletionMessages);
        setIsLoading(false);
        const chatResponse: Message = {
          id: chatHistory.length,
          role: "assistant",
          sender: "Dr. AI",
          content: chatCompletion["message"]["content"],
          color: "blue",
        };
        setChatHistory((c) => [...c, chatResponse]);
      };

      sendMessage();
      setIsSendingMessage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSendingMessage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const questionContent = await getQuestion();
        setIsLoading(false);
        const question: Message = {
          id: 0,
          role: "assistant",
          sender: "Dr. AI",
          color: "blue",
          content: questionContent["message"]["content"],
        };
        setChatHistory([...chatHistory, question]);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };

    // const question: Message = {
    //   id: 0,
    //   role: "assistant",
    //   sender: "Dr. AI",
    //   color: "blue",
    //   content:
    //     "Hi there,\n this is an example question to make sure you don't charge too much to your card during testing purposes :).",
    // };

    fetchData();
    //setChatHistory([...chatHistory, question]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chatHistory]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  return (
    <div className="flex flex-col max-h-screen h-screen items-start bg-gradient-to-t from-blue-200 to-blue-50 md:items-center">
      <div className="flex flex-row items-center justify-center p-3">
        <Logo className="scale-x-[-1] h-8 w-8" />
        <div className="font-medium">SmartStepAI</div>
      </div>
      <div className="flex flex-col w-full h-full md:w-1/2 bg-white shadow-lg md:rounded-[2rem] md:p-3">
        <h2 className="flex-none text-md font-semibold text-gray-800 p-3 md:p-5">
          Chatting with Dr. AI
        </h2>
        <div
          ref={chatContainerRef}
          className="flex-grow overflow-auto bg-gray-100 rounded-[1.5rem] shadow-lg border border-gray-300 p-5"
        >
          {chatHistory.map((message) => (
            <div
              key={message.id}
              className={`mb-2 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
              ref={message.id === chatHistory.length ? lastMessageRef : null}
            >
              {message.role !== "user" && (
                <span
                  className={`text-xs ${
                    message.role === "user" ? "text-right" : "text-left"
                  } text-gray-500 mb-1`}
                >
                  {message.sender}
                </span>
              )}
              <br />
              <div
                className={`bg-${
                  message.color
                }-300 rounded-lg px-4 py-2 inline-block ${
                  message.role === "user"
                    ? "text-white bg-blue-500"
                    : "bg-gray-300"
                }`}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-row items-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              <div className="pl-2">
                <p>Thinking...</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex border-gray-300 border rounded-full p-2 m-2">
          <input
            type="text"
            className="flex-grow py-2 px-4 focus:outline-none"
            placeholder="Enter your message"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-600 font-semibold py-2 px-4 rounded-full"
            onClick={sendMessage}
          >
            <SendIcon />
          </button>
        </div>
        <button
          className="flex border-blue-500 border rounded-full py-2 px-4 m-2 text-blue-600 justify-center"
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default Demo;
