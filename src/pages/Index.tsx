import ChatInterface from "@/components/ChatInterface";
import Navigation from "@/components/Navigation";

const Index = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"></div>
			</div>

			{/* Navigation */}
			{/* <Navigation /> */}

			{/* Main Content */}
			<main className="relative z-10 pt-20 md:pt-24 h-screen flex flex-col">
				<ChatInterface />
			</main>
		</div>
	);
};

export default Index;
