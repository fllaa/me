
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Filter } from 'lucide-react';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.',
      image: '/placeholder.svg',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'Full-Stack',
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Task Management SaaS',
      description: 'A collaborative project management tool built with Next.js and real-time features using WebSockets.',
      image: '/placeholder.svg',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket'],
      category: 'Frontend',
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'AI Chat Bot',
      description: 'Natural language processing chatbot built with Python and integrated with multiple messaging platforms.',
      image: '/placeholder.svg',
      tags: ['Python', 'NLP', 'FastAPI', 'Docker'],
      category: 'Backend',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Mobile Weather App',
      description: 'Cross-platform mobile application with real-time weather data and location-based forecasts.',
      image: '/placeholder.svg',
      tags: ['React Native', 'TypeScript', 'REST API'],
      category: 'Mobile',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 5,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for data analysis with charts, filters, and real-time updates.',
      image: '/placeholder.svg',
      tags: ['React', 'D3.js', 'Python', 'FastAPI'],
      category: 'Frontend',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'Microservices Architecture',
      description: 'Scalable microservices system with Docker, Kubernetes, and monitoring solutions.',
      image: '/placeholder.svg',
      tags: ['Docker', 'Kubernetes', 'Go', 'MongoDB'],
      category: 'Backend',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ];

  const filters = ['All', 'Frontend', 'Backend', 'Full-Stack', 'Mobile'];

  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const featuredProjects = projects.filter(project => project.featured);

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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my work in web development, mobile apps, and software engineering
            </p>
          </div>

          {/* Featured Projects */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              ⭐ Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <GlassCard key={project.id} hover className="group">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center">
                    <div className="text-6xl">🚀</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* All Projects */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-2xl font-bold text-white">All Projects</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <div className="flex gap-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter}
                      size="sm"
                      variant={selectedFilter === filter ? "default" : "outline"}
                      onClick={() => setSelectedFilter(filter)}
                      className={
                        selectedFilter === filter
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "border-white/30 text-white hover:bg-white/10"
                      }
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <GlassCard key={project.id} hover className="group">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center">
                    <div className="text-4xl">💻</div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Github className="w-3 h-3" />
                    </Button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Projects;
