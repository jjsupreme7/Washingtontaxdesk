'use client';

import React from 'react';
import UnifiedChatbot from '@/components/chat/UnifiedChatbot';
import { Sparkles, Bot, Upload, Shield, Zap } from 'lucide-react';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Tax Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get instant answers to your Washington State tax questions with our dual AI system. 
            Choose between Claude AI with real-time WA DOR data or our specialized CustomGPT agent.
          </p>
        </div>

        {/* Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-wa-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm">Claude AI</h3>
              <p className="text-xs text-gray-600">Real-time WA DOR</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Bot className="w-8 h-8 text-wa-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm">CustomGPT</h3>
              <p className="text-xs text-gray-600">Specialized Agent</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Upload className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm">Upload Docs</h3>
              <p className="text-xs text-gray-600">Instant Analysis</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Shield className="w-8 h-8 text-orange-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm">Secure</h3>
              <p className="text-xs text-gray-600">Enterprise Grade</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <Zap className="w-8 h-8 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm">Fast</h3>
              <p className="text-xs text-gray-600">Instant Responses</p>
            </div>
          </div>
        </div>

        {/* Chatbot Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ height: '70vh' }}>
            <UnifiedChatbot />
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-wa-blue-600 p-6 rounded-r-lg">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              💡 Tips for Best Results:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Claude AI:</strong> Best for questions requiring current Washington DOR information and regulations</li>
              <li>• <strong>CustomGPT:</strong> Specialized for complex tax scenarios and strategic planning</li>
              <li>• <strong>Document Upload:</strong> Upload PDFs, Word docs, or text files for AI-powered analysis</li>
              <li>• <strong>Switch Anytime:</strong> Toggle between AI assistants to get different perspectives</li>
              <li>• <strong>Be Specific:</strong> Provide details about your situation for more accurate guidance</li>
            </ul>
          </div>
        </div>

        {/* Sample Questions */}
        <div className="mt-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Example Questions to Ask:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'What is the current B&O tax rate for my business category?',
              'How do I register for a Washington State business license?',
              'What are the sales tax requirements for e-commerce?',
              'How does the estate tax work in Washington?',
              'What tax incentives are available for small businesses?',
              'How do I handle multi-state tax compliance?',
            ].map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-wa-blue-300"
              >
                <p className="text-gray-700 text-sm">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
