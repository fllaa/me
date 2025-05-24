
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import GlassCard from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'john.doe@example.com',
      href: 'mailto:john.doe@example.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/johndoe',
      color: 'text-blue-400'
    },
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/johndoe',
      color: 'text-gray-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/johndoe',
      color: 'text-blue-300'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message sent successfully!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Let's discuss your next project or just say hello. I'm always open to new opportunities and collaborations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-6">Send me a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-blue-500/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-blue-500/50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-blue-500/50"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15 focus:border-blue-500/50 resize-none"
                      placeholder="Tell me about your project or just say hello..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </GlassCard>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{info.label}</p>
                          <p className="text-white font-medium">{info.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Social Links */}
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-6">Connect with me</h2>
                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-200 group hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <Icon className={`w-6 h-6 ${social.color}`} />
                        </div>
                        <span className="text-gray-300 text-sm font-medium">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Availability */}
              <GlassCard>
                <h2 className="text-2xl font-bold text-white mb-4">Availability</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Available for new projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">Open to freelance work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Interested in full-time roles</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30">
                  <p className="text-green-400 text-sm font-medium">
                    ⚡ Usually responds within 24 hours
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
