import React from "react";
import Navigation from "@/components/Navigation";
import GlassCard from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import {
	Calendar,
	MapPin,
	Award,
	Code,
	Database,
	Cloud,
	Smartphone,
	Briefcase,
} from "lucide-react";

const About = () => {
	const skills = {
		Frontend: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Vue.js",
			"Angular",
		],
		Backend: ["Node.js", "Python", "Express.js", "FastAPI", "Django", "Go"],
		Database: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Prisma", "Supabase"],
		Cloud: [
			"AWS",
			"Docker",
			"Kubernetes",
			"Vercel",
			"Netlify",
			"GitHub Actions",
		],
		Mobile: ["React Native", "Flutter", "iOS", "Android"],
		Tools: ["Git", "VS Code", "Figma", "Postman", "Jest", "Cypress"],
	};

	const experience = [
		{
			title: "Senior Frontend Developer",
			company: "TechCorp Solutions",
			period: "2022 - Present",
			location: "San Francisco, CA",
			description:
				"Leading a team of 5 developers in building scalable web applications. Implemented micro-frontend architecture and improved performance by 40%.",
			achievements: [
				"Led migration from legacy jQuery to React ecosystem",
				"Established component library used across 10+ projects",
				"Mentored junior developers and conducted code reviews",
			],
		},
		{
			title: "Full-Stack Developer",
			company: "StartupXYZ",
			period: "2020 - 2022",
			location: "Remote",
			description:
				"Developed end-to-end features for a SaaS platform serving 50K+ users. Built REST APIs and implemented real-time features.",
			achievements: [
				"Built real-time collaboration features using WebSockets",
				"Optimized database queries reducing response time by 60%",
				"Implemented CI/CD pipeline reducing deployment time by 80%",
			],
		},
		{
			title: "Junior Developer",
			company: "WebAgency Pro",
			period: "2019 - 2020",
			location: "New York, NY",
			description:
				"Contributed to client projects ranging from e-commerce to corporate websites. Focused on responsive design and performance optimization.",
			achievements: [
				"Developed responsive websites for 20+ clients",
				"Improved website loading speeds by implementing best practices",
				"Collaborated with designers to create pixel-perfect implementations",
			],
		},
	];

	const education = [
		{
			degree: "Bachelor of Science in Computer Science",
			school: "University of Technology",
			period: "2015 - 2019",
			location: "Boston, MA",
		},
	];

	const certifications = [
		"AWS Certified Solutions Architect",
		"Google Cloud Professional Developer",
		"Meta React Developer Certificate",
		"MongoDB Certified Developer",
	];

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
			</div>

			<Navigation />

			<main className="relative z-10 pt-20 md:pt-32 px-4 pb-20">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
							<div className="text-6xl">👨‍💻</div>
						</div>
						<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
							About Me
						</h1>
						<p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
							I'm a passionate Software Engineer with 5+ years of experience
							building scalable web applications and leading development teams.
							I love turning complex problems into simple, beautiful solutions.
						</p>
					</div>

					<div className="grid lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Experience */}
							<section>
								<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
									<Briefcase className="w-6 h-6 text-blue-400" />
									Experience
								</h2>
								<div className="space-y-6">
									{experience.map((job, index) => (
										<GlassCard
											key={index}
											className="hover:bg-white/15 transition-all duration-300"
										>
											<div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
												<div>
													<h3 className="text-xl font-bold text-white">
														{job.title}
													</h3>
													<p className="text-blue-400 font-semibold">
														{job.company}
													</p>
												</div>
												<div className="text-gray-400 text-sm mt-2 md:mt-0 md:text-right">
													<div className="flex items-center gap-1">
														<Calendar className="w-4 h-4" />
														{job.period}
													</div>
													<div className="flex items-center gap-1 mt-1">
														<MapPin className="w-4 h-4" />
														{job.location}
													</div>
												</div>
											</div>
											<p className="text-gray-300 mb-4 leading-relaxed">
												{job.description}
											</p>
											<div className="space-y-2">
												{job.achievements.map((achievement, i) => (
													<div
														key={i}
														className="flex items-start gap-2 text-gray-400"
													>
														<div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
														<span className="text-sm">{achievement}</span>
													</div>
												))}
											</div>
										</GlassCard>
									))}
								</div>
							</section>

							{/* Education */}
							<section>
								<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
									🎓 Education
								</h2>
								{education.map((edu, index) => (
									<GlassCard key={index}>
										<div className="flex flex-col md:flex-row md:justify-between md:items-start">
											<div>
												<h3 className="text-xl font-bold text-white">
													{edu.degree}
												</h3>
												<p className="text-blue-400 font-semibold">
													{edu.school}
												</p>
											</div>
											<div className="text-gray-400 text-sm mt-2 md:mt-0 md:text-right">
												<div className="flex items-center gap-1">
													<Calendar className="w-4 h-4" />
													{edu.period}
												</div>
												<div className="flex items-center gap-1 mt-1">
													<MapPin className="w-4 h-4" />
													{edu.location}
												</div>
											</div>
										</div>
									</GlassCard>
								))}
							</section>
						</div>

						{/* Sidebar */}
						<div className="space-y-8">
							{/* Skills */}
							<section>
								<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
									<Code className="w-6 h-6 text-purple-400" />
									Skills
								</h2>
								<div className="space-y-6">
									{Object.entries(skills).map(([category, skillList]) => {
										const icons = {
											Frontend: Code,
											Backend: Database,
											Database: Database,
											Cloud: Cloud,
											Mobile: Smartphone,
											Tools: Code,
										};
										const Icon = icons[category as keyof typeof icons];

										return (
											<GlassCard key={category}>
												<div className="flex items-center gap-2 mb-3">
													<Icon className="w-5 h-5 text-blue-400" />
													<h3 className="font-semibold text-white">
														{category}
													</h3>
												</div>
												<div className="flex flex-wrap gap-2">
													{skillList.map((skill) => (
														<Badge
															key={skill}
															variant="secondary"
															className="bg-white/20 text-white border-white/30"
														>
															{skill}
														</Badge>
													))}
												</div>
											</GlassCard>
										);
									})}
								</div>
							</section>

							{/* Certifications */}
							<section>
								<h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
									<Award className="w-6 h-6 text-yellow-400" />
									Certifications
								</h2>
								<GlassCard>
									<div className="space-y-3">
										{certifications.map((cert, index) => (
											<div key={index} className="flex items-start gap-2">
												<Award className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
												<span className="text-gray-300 text-sm">{cert}</span>
											</div>
										))}
									</div>
								</GlassCard>
							</section>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default About;
