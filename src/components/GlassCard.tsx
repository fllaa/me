import type React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
	children,
	className,
	hover = false,
}) => {
	return (
		<div
			className={cn(
				"bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6",
				hover &&
					"transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:border-white/30",
				className,
			)}
		>
			{children}
		</div>
	);
};

export default GlassCard;
