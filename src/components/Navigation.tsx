import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Briefcase, Mail, Download } from "lucide-react";

const Navigation = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const location = useLocation();

	const navItems = [
		{ path: "/", label: "Chat", icon: Home },
		{ path: "/about", label: "About", icon: User },
		{ path: "/projects", label: "Projects", icon: Briefcase },
		{ path: "/contact", label: "Contact", icon: Mail },
	];

	const isActivePath = (path: string) => {
		return location.pathname === path;
	};

	const handleResumeDownload = () => {
		// Simulate resume download
		console.log("Downloading resume...");
	};

	return (
		<>
			{/* Desktop Navigation */}
			<nav className="hidden md:fixed md:top-6 md:left-1/2 md:transform md:-translate-x-1/2 md:flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-2 z-50">
				{navItems.map((item) => {
					const Icon = item.icon;
					return (
						<Link key={item.path} to={item.path}>
							<Button
								variant="ghost"
								className={`rounded-xl px-4 py-2 transition-all duration-200 ${
									isActivePath(item.path)
										? "bg-white/20 text-white"
										: "text-gray-300 hover:text-white hover:bg-white/10"
								}`}
							>
								<Icon className="w-4 h-4 mr-2" />
								{item.label}
							</Button>
						</Link>
					);
				})}

				<div className="w-px h-6 bg-white/20 mx-2" />

				<Button
					onClick={handleResumeDownload}
					variant="ghost"
					className="rounded-xl px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
				>
					<Download className="w-4 h-4 mr-2" />
					Resume
				</Button>
			</nav>

			{/* Mobile Navigation */}
			<div className="md:hidden">
				{/* Mobile Menu Button */}
				<Button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="fixed top-4 right-4 z-50 w-12 h-12 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20 hover:bg-white/10"
					variant="ghost"
				>
					{isMobileMenuOpen ? (
						<X className="w-6 h-6 text-white" />
					) : (
						<Menu className="w-6 h-6 text-white" />
					)}
				</Button>

				{/* Mobile Menu Overlay */}
				{isMobileMenuOpen && (
					<div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
						<div className="fixed top-20 right-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-4 min-w-[200px]">
							<div className="space-y-2">
								{navItems.map((item) => {
									const Icon = item.icon;
									return (
										<Link
											key={item.path}
											to={item.path}
											onClick={() => setIsMobileMenuOpen(false)}
										>
											<Button
												variant="ghost"
												className={`w-full justify-start rounded-xl px-4 py-3 transition-all duration-200 ${
													isActivePath(item.path)
														? "bg-white/20 text-white"
														: "text-gray-300 hover:text-white hover:bg-white/10"
												}`}
											>
												<Icon className="w-4 h-4 mr-3" />
												{item.label}
											</Button>
										</Link>
									);
								})}

								<div className="w-full h-px bg-white/20 my-2" />

								<Button
									onClick={() => {
										handleResumeDownload();
										setIsMobileMenuOpen(false);
									}}
									variant="ghost"
									className="w-full justify-start rounded-xl px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
								>
									<Download className="w-4 h-4 mr-3" />
									Resume
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Navigation;
