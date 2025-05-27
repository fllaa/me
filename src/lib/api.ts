import axios, { AxiosInstance } from "axios";

interface ChatCompletionRequest {
	prompt: string;
	sessionId?: string;
}

interface ChatCompletionResponse {
	finish_reason: string;
	session_id: string;
	text: string;
}

export class API {
	private readonly instance: AxiosInstance;
	private readonly baseURL = "https://api.flla.my.id";

	constructor() {
		this.instance = axios.create({
			baseURL: this.baseURL,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	public async chatCompletions(data: ChatCompletionRequest) {
		const response = await this.instance.post<ChatCompletionResponse>(
			"/chats/completions",
			data,
		);
		return response.data;
	}
}
