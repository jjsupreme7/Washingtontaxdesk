'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Building2,
  Building,
  Calculator,
  Scale,
  Sparkles,
  FileText,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  const audiences = [
    {
      title: 'Individuals',
      icon: Users,
      description: 'Personal tax guidance and resources for Washington residents',
      link: '/individuals',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Small Businesses',
      icon: Building2,
      description: 'Simplified tax compliance for growing Washington businesses',
      link: '/small-business',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Enterprise',
      icon: Building,
      description: 'Comprehensive solutions for Fortune 500 and multi-state corporations',
      link: '/enterprise',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Accounting Firms',
      icon: Calculator,
      description: 'Professional tools and resources for CPAs and accounting practices',
      link: '/accounting-firms',
      color: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Law Firms',
      icon: Scale,
      description: 'Tax litigation support and compliance resources for legal professionals',
      link: '/law-firms',
      color: 'from-red-500 to-red-600',
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Dual AI Assistance',
      description: 'Choose between Claude AI with real-time WA DOR data or specialized CustomGPT',
    },
    {
      icon: FileText,
      title: 'Document Analysis',
      description: 'Upload and analyze tax documents with advanced AI for instant insights',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance for professional firms',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Updates',
      description: 'Live scraping of Washington DOR for the most current information',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-wa-blue-900 via-wa-blue-800 to-wa-green-800 text-white overflow-hidden animate-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Washington State Tax Solutions
              <span className="block text-wa-green-300 mt-2">Powered by Advanced AI</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Professional tax guidance for individuals, businesses, and firms with real-time 
              Washington DOR data integration
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/chat"
                className="px-8 py-4 bg-white text-wa-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                Start AI Assistant
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-wa-blue-900 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Audience Segments */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tailored Solutions for Every Client
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're an individual, business, or professional firm, we have the right 
              tools and resources for your Washington State tax needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {audiences.map((audience, index) => (
              <Link
                key={index}
                href={audience.link}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-wa-blue-500"
              >
                <div className={`p-6 bg-gradient-to-br ${audience.color} text-white`}>
                  <audience.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{audience.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{audience.description}</p>
                  <div className="flex items-center text-wa-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                    <span>Learn More</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Professional Results
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology meets Washington State tax expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-wa-blue-100 to-wa-green-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-wa-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose WashingtonTaxDesk?
              </h2>
              <div className="space-y-4">
                {[
                  'Real-time access to Washington DOR information',
                  'Dual AI system: Claude + CustomGPT for comprehensive answers',
                  'Advanced document analysis and batch processing',
                  'Enterprise-grade security and compliance',
                  'Multi-user team collaboration for firms',
                  'Scalable solutions from individual to Fortune 500',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-wa-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/chat"
                className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-wa-blue-600 to-wa-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Try AI Assistant Now
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-wa-blue-50 to-wa-green-50 p-8 rounded-2xl">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-gray-600">Active Users</span>
                    <span className="text-2xl font-bold text-wa-blue-600">10,000+</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-gray-600">Documents Analyzed</span>
                    <span className="text-2xl font-bold text-wa-green-600">50,000+</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-gray-600">Professional Firms</span>
                    <span className="text-2xl font-bold text-purple-600">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Satisfaction Rate</span>
                    <span className="text-2xl font-bold text-orange-600">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-wa-blue-900 to-wa-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Simplify Your Washington Tax Compliance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of individuals, businesses, and firms who trust WashingtonTaxDesk 
            for their tax needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/chat"
              className="px-8 py-4 bg-white text-wa-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-wa-blue-900 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
