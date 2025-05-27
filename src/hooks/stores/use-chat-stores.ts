import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

export interface Message {
	id: string;
	content: string;
	isUser: boolean;
	timestamp: string;
	isStreaming?: boolean;
}

interface ChatState {
	messages: Message[];
	sessionId: string | null;
	disableStreamMessage: (id: string) => void;
	pushMessage: (message: Message) => void;
	streamMessage: (
		id: string,
		iteration: number,
		words: string[],
		currentContent: string,
	) => void;
	setSessionId: (sessionId: string) => void;
	reset: () => void;
}

export const useChatStore = create<ChatState>()(
	devtools(
		persist(
			(set) => ({
				messages: [],
				sessionId: null,
				disableStreamMessage: (id: string) =>
					set((state) => ({
						...state,
						messages: state.messages.map((m) =>
							m.id === id ? { ...m, isStreaming: false } : m,
						),
					})),
				pushMessage: (message: Message) =>
					set((state) => ({
						...state,
						messages: [...state.messages, message],
					})),
				streamMessage: (
					id: string,
					iteration: number,
					words: string[],
					currentContent: string,
				) =>
					set((state) => ({
						...state,
						messages: state.messages.map((m) =>
							m.id === id
								? {
										...m,
										content: currentContent,
										isStreaming: iteration < words.length - 1,
									}
								: m,
						),
					})),
				setSessionId: (sessionId: string) =>
					set((state) => ({ ...state, sessionId })),
				reset: () => set({ messages: [], sessionId: null }),
			}),
			{
				name: "chat-storage",
			},
		),
	),
);
