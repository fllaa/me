import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, User, Bot } from "lucide-react";

interface Message {
	id: string;
	content: string;
	isUser: boolean;
	timestamp: Date;
	isStreaming?: boolean;
}

const ChatInterface = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [showSuggestions, setShowSuggestions] = useState(true);

	const suggestions = [
		"What are your tech stacks?",
		"Tell me about your latest project",
		"How can I contact you?",
		"What's your experience as a software engineer?",
		"Show me your resume",
		"What programming languages do you know?",
	];

	const getAIResponse = (userMessage: string): string => {
		const message = userMessage.toLowerCase();

		if (
			message.includes("tech stack") ||
			message.includes("technology") ||
			message.includes("programming language")
		) {
			return "I work with a diverse tech stack including:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS\n**Backend:** Node.js, Python, Express.js\n**Database:** PostgreSQL, MongoDB, Redis\n**Cloud:** AWS, Docker, Kubernetes\n**Tools:** Git, VS Code, Figma\n\nI'm always learning new technologies and adapting to project requirements!";
		}

		if (
			message.includes("project") ||
			message.includes("work") ||
			message.includes("portfolio")
		) {
			return "I've worked on several exciting projects:\n\n🚀 **E-commerce Platform** - Full-stack web app with React & Node.js\n💼 **Task Management SaaS** - Built with Next.js and PostgreSQL\n🤖 **AI Chat Bot** - Python-based NLP application\n📱 **Mobile Weather App** - React Native with real-time APIs\n\nWould you like to know more about any specific project?";
		}

		if (
			message.includes("contact") ||
			message.includes("hire") ||
			message.includes("email")
		) {
			return "I'd love to connect with you! Here are the best ways to reach me:\n\n📧 **Email:** john.doe@example.com\n💼 **LinkedIn:** linkedin.com/in/johndoe\n🐱 **GitHub:** github.com/johndoe\n📱 **Phone:** +1 (555) 123-4567\n\nFeel free to reach out for collaborations, job opportunities, or just to chat about tech!";
		}

		if (
			message.includes("experience") ||
			message.includes("background") ||
			message.includes("career")
		) {
			return "I'm a passionate Software Engineer with 5+ years of experience:\n\n🏢 **Senior Frontend Developer** at TechCorp (2022-Present)\n⚡ **Full-Stack Developer** at StartupXYZ (2020-2022)\n🎓 **Junior Developer** at WebAgency (2019-2020)\n\nI specialize in building scalable web applications and have led teams of 3-5 developers. My focus is on clean code, user experience, and modern development practices.";
		}

		if (message.includes("resume") || message.includes("cv")) {
			return "You can download my resume to get a complete overview of my background:\n\n📄 **[Download Resume PDF]** - Includes detailed work experience, education, and skills\n\nThe resume covers my 5+ years in software development, key projects, certifications, and technical expertise. It's always up-to-date with my latest achievements!";
		}

		if (
			message.includes("hello") ||
			message.includes("hi") ||
			message.includes("hey")
		) {
			return "Hello there! 👋 Welcome to my portfolio!\n\nI'm a passionate Software Engineer who loves building amazing digital experiences. I'm here to answer any questions you might have about my work, experience, or how we could collaborate.\n\nWhat would you like to know about me?";
		}

		return "That's an interesting question! I'm here to help you learn more about my background as a Software Engineer. You can ask me about:\n\n• My technical skills and experience\n• Projects I've worked on\n• How to get in touch\n• My career journey\n\nWhat specific aspect would you like to explore?";
	};

	const streamResponse = async (content: string, messageId: string) => {
		const words = content.split(" ");
		let currentContent = "";

		for (let i = 0; i < words.length; i++) {
			currentContent += (i > 0 ? " " : "") + words[i];

			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === messageId
						? {
								...msg,
								content: currentContent,
								isStreaming: i < words.length - 1,
							}
						: msg,
				),
			);

			// Random delay between 30-100ms for more natural typing
			const delay = Math.random() * 70 + 30;
			await new Promise((resolve) => setTimeout(resolve, delay));
		}

		// Mark streaming as complete
		setMessages((prev) =>
			prev.map((msg) =>
				msg.id === messageId ? { ...msg, isStreaming: false } : msg,
			),
		);
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
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setShowSuggestions(false);
		setIsTyping(true);

		// Simulate AI thinking time
		setTimeout(async () => {
			const aiMessageId = (Date.now() + 1).toString();
			const responseContent = getAIResponse(messageToSend);

			const aiMessage: Message = {
				id: aiMessageId,
				content: "",
				isUser: false,
				timestamp: new Date(),
				isStreaming: true,
			};

			setMessages((prev) => [...prev, aiMessage]);
			setIsTyping(false);

			// Start streaming the response
			await streamResponse(responseContent, aiMessageId);
		}, 1000);
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
							Hi, I'm John Doe
						</h1>
						<p className="text-gray-400 text-lg mb-8">
							Software Engineer & Full-Stack Developer
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
								{message.content}
								{message.isStreaming && (
									<span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse" />
								)}
							</div>
							<div className="text-xs opacity-60 mt-2">
								{message.timestamp.toLocaleTimeString()}
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
							onKeyPress={handleKeyPress}
							placeholder="Ask me anything about my experience..."
							className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-2xl px-6 py-4 focus:bg-white/15 focus:border-blue-500/50 backdrop-blur-sm"
						/>
					</div>
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
