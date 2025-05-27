import type React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API } from "@/lib/api";
import { useChatStore, type Message } from "@/hooks/stores/use-chat-stores";
import { MessageSquare, Send, User, Bot } from "lucide-react";
import Markdown from "react-markdown";
import { useShallow } from "zustand/react/shallow";

const ChatInterface = () => {
	const {
		messages,
		sessionId,
		disableStreamMessage,
		pushMessage,
		streamMessage,
		setSessionId,
		reset,
	} = useChatStore(
		useShallow((state) => ({
			messages: state.messages,
			sessionId: state.sessionId,
			disableStreamMessage: state.disableStreamMessage,
			pushMessage: state.pushMessage,
			streamMessage: state.streamMessage,
			setSessionId: state.setSessionId,
			reset: state.reset,
		})),
	);
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const showSuggestions = useMemo(() => messages.length === 0, [messages]);

	const suggestions = [
		"What are your tech stacks?",
		"Tell me about your latest project",
		"How can I contact you?",
		"What's your experience as a software engineer?",
		"Show me your resume",
		"What programming languages do you know?",
	];

	const getAIResponse = async (userMessage: string): Promise<string> => {
		const api = new API();
		const data = await api.chatCompletions({
			prompt: userMessage,
			sessionId: sessionId ?? undefined,
		});

		setSessionId(data.session_id);

		return data.text;
	};

	const streamResponse = async (content: string, messageId: string) => {
		const words = content.split(" ");
		let currentContent = "";

		for (let i = 0; i < words.length; i++) {
			currentContent += (i > 0 ? " " : "") + words[i];

			streamMessage(messageId, i, words, currentContent);

			// Random delay between 30-100ms for more natural typing
			const delay = Math.random() * 70 + 30;
			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		// Mark streaming as complete
		disableStreamMessage(messageId);
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSend = async (message?: string) => {
		const messageToSend = message || inputValue;
		if (!messageToSend.trim()) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: messageToSend,
			isUser: true,
			timestamp: new Date().toISOString(),
		};

		pushMessage(userMessage);
		setInputValue("");
		setIsTyping(true);
		const aiMessageId = (Date.now() + 1).toString();
		const responseContent = await getAIResponse(messageToSend);

		const aiMessage: Message = {
			id: aiMessageId,
			content: "",
			isUser: false,
			timestamp: new Date().toISOString(),
			isStreaming: true,
		};

		pushMessage(aiMessage);
		setIsTyping(false);

		// Start streaming the response
		await streamResponse(responseContent, aiMessageId);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className="flex flex-col h-full max-w-4xl mx-auto">
			{/* Messages Area */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.length === 0 && (
					<div className="text-center py-12">
						<div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
							<MessageSquare className="w-8 h-8 text-blue-400" />
						</div>
						<h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
							Hi, I'm Fallah Andy Prakasa
						</h1>
						<p className="text-gray-400 text-lg mb-8">
							Software Engineer & Cloud Engineer
						</p>
						<p className="text-gray-500 max-w-md mx-auto">
							Ask me anything about my experience, projects, or how we can work
							together!
						</p>
					</div>
				)}

				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex gap-3 animate-fade-in ${
							message.isUser ? "justify-end" : "justify-start"
						}`}
					>
						{!message.isUser && (
							<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 flex-shrink-0">
								<Bot className="w-4 h-4 text-blue-400" />
							</div>
						)}

						<div
							className={`max-w-[70%] p-4 rounded-2xl backdrop-blur-md border ${
								message.isUser
									? "bg-blue-500/20 border-blue-500/30 text-white ml-auto"
									: "bg-white/10 border-white/20 text-gray-100"
							}`}
						>
							<div className="whitespace-pre-line leading-relaxed">
								<Markdown>{message.content}</Markdown>
								{message.isStreaming && (
									<span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse" />
								)}
							</div>
							<div className="text-xs opacity-60 mt-2">
								{new Date(message.timestamp).toLocaleTimeString()}
							</div>
						</div>

						{message.isUser && (
							<div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10 flex-shrink-0">
								<User className="w-4 h-4 text-green-400" />
							</div>
						)}
					</div>
				))}

				{isTyping && (
					<div className="flex gap-3 animate-fade-in">
						<div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
							<Bot className="w-4 h-4 text-blue-400" />
						</div>
						<div className="bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-md">
							<div className="flex space-x-2">
								<div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
								<div
									className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
									style={{ animationDelay: "0.1s" }}
								></div>
								<div
									className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
									style={{ animationDelay: "0.2s" }}
								></div>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Suggestions */}
			{showSuggestions && messages.length === 0 && (
				<div className="px-4 pb-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
						{suggestions.map((suggestion, index) => (
							<Button
								key={index}
								variant="outline"
								onClick={() => handleSend(suggestion)}
								className="p-4 h-auto text-left justify-start bg-white/5 border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
							>
								<span className="text-gray-300">{suggestion}</span>
							</Button>
						))}
					</div>
				</div>
			)}

			{/* Input Area */}
			<div className="p-4 border-t border-white/10 backdrop-blur-md">
				<div className="flex gap-3 max-w-2xl mx-auto">
					<div className="flex-1 relative">
						<Input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyPress}
							placeholder="Ask me anything about my experience..."
							className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl px-6 py-4 focus:bg-white/15 focus:border-blue-500/50 backdrop-blur-sm"
						/>
					</div>
					{messages.length !== 0 && (
						<Button
							onClick={() => reset()}
							className="rounded-2xl px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 hover:scale-105"
						>
							Reset
						</Button>
					)}
					<Button
						onClick={() => handleSend()}
						disabled={!inputValue.trim() || isTyping}
						className="rounded-2xl px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
					>
						<Send className="w-5 h-5" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
