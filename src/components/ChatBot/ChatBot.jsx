import React from 'react'
import './ChatBot.css'
import { useState} from "react";
import Modal from "react-modal";
import submitimg from "./images/submit.png";
import Ximg from "./images/X.png";
import chatbot from "./images/chatbot.png"

Modal.setAppElement("#root");


export default function ChatBot() {

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    // const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
    const apiKey =process.env.REACT_APP_API_KEY;
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";

    const addMessage = (sender, message) => {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    };


    const handleSendMessage = async () => {
        const message = userInput.trim();
        if (message.length === 0) return;

        addMessage("user", message);
        setUserInput("");
        setLoading(true);

        const summaryRequest = `Summarize the core of the answer to the user's input in two sentences in Korean: ${message}`;

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [{ role: "user", content: summaryRequest }],
                    max_tokens: 1024,
                    top_p: 1,
                    temperature: 1,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.5,
                    stop: ["문장 생성 중단 단어"],
                }),
            });

            if (!response.ok) {
                throw new Error(`API 요청 실패! 상태 코드: ${response.status}`);
            }

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content || "No response";
            addMessage("bot", aiResponse);
        } catch (error) {
            console.error("오류 발생!", error);
            addMessage("bot", "오류 발생!");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    const [GPTModalIsOpen, setGPTModalIsOpen] = useState(false);

    const openGPTModal = () => {
        setGPTModalIsOpen(true);
    };

    const closeGPTModal = () => {
        setGPTModalIsOpen(false);
    };

    return (
        <div className='chatBot'><img src={chatbot} alt="chatbot" className='chatBotImg' onClick={openGPTModal}/>
                    <Modal
                            isOpen={GPTModalIsOpen}
                            onRequestClose={closeGPTModal}
                            contentLabel="챗지피티"
                            className="gptmodal"
                            overlayClassName="gptoverlay"
                    >
                    <div className="gptModal-container">
                        <div className="gptModal-title-container">
                            <span>Open Ai 검색하기</span>
                            <div className="X-img" onClick={closeGPTModal}>
                                <img src={Ximg} alt="close-img" />
                            </div>
                        </div>
                        <div className="gptModal-chat">
                            {loading && (
                                <span className="gptModal-messageWait">
                                    답변을 기다리고 있습니다
                                </span>
                            )}
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`gptModal-message ${msg.sender}`}
                                >
                                    {msg.sender === "user" && <p>{msg.message}</p>}
                                    {msg.sender === "bot" && (
                                        <>
                                            <div className='chatbot-img2'><img src={chatbot} alt="GPT" /></div> 
                                            <div className="message-content">
                                                <p>{msg.message}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="gptModal-inputDiv">
                            <input
                                type="text"
                                placeholder="질문을 입력해주세요."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div
                                className="submit-img"
                                onClick={handleSendMessage}
                            >
                                <img src={submitimg} alt="gptsubmit-img" />
                            </div>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}
