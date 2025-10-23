'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Upload, X, FileText } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  botType?: 'claude' | 'customgpt';
  timestamp?: string;
}

export default function UnifiedChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Washington State Tax Assistant. I can help with tax questions using either Claude AI (with real-time WA DOR data) or our specialized CustomGPT agent. How can I assist you today?',
      botType: 'claude',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBot, setSelectedBot] = useState<'claude' | 'customgpt'>('claude');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() && uploadedFiles.length === 0) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // If files are uploaded, process them first
      if (uploadedFiles.length > 0) {
        await handleFileUpload();
      }

      // Send chat message
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          botType: selectedBot,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        botType: selectedBot,
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
          botType: selectedBot,
        },
      ]);
    } finally {
      setIsLoading(false);
      setUploadedFiles([]);
      setShowFileUpload(false);
    }
  };

  const handleFileUpload = async () => {
    if (uploadedFiles.length === 0) return;

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('botType', selectedBot);

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const data = await response.json();
      
      // Add analysis results to chat
      const analysisMessage: Message = {
        role: 'assistant',
        content: `I've analyzed ${data.filesProcessed} document(s). Here are the results:\n\n${data.results
          .map((r: any) => `📄 ${r.fileName}: ${r.status === 'success' ? 'Successfully analyzed' : r.error}`)
          .join('\n')}`,
        botType: selectedBot,
      };

      setMessages((prev) => [...prev, analysisMessage]);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
      setShowFileUpload(true);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-wa-blue-700 to-wa-green-700 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {selectedBot === 'claude' ? (
              <Sparkles className="w-6 h-6" />
            ) : (
              <Bot className="w-6 h-6" />
            )}
            <div>
              <h3 className="font-semibold text-lg">WA Tax Assistant</h3>
              <p className="text-sm opacity-90">
                {selectedBot === 'claude' ? 'Claude AI with WA DOR Data' : 'CustomGPT Specialist'}
              </p>
            </div>
          </div>
          
          {/* Bot Selector */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedBot('claude')}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedBot === 'claude'
                  ? 'bg-white text-wa-blue-700 font-semibold'
                  : 'bg-wa-blue-600 hover:bg-wa-blue-500'
              }`}
            >
              Claude AI
            </button>
            <button
              onClick={() => setSelectedBot('customgpt')}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedBot === 'customgpt'
                  ? 'bg-white text-wa-green-700 font-semibold'
                  : 'bg-wa-green-600 hover:bg-wa-green-500'
              }`}
            >
              CustomGPT
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-wa-blue-600 text-white'
                  : message.botType === 'claude'
                  ? 'bg-white border-2 border-wa-blue-200'
                  : 'bg-white border-2 border-wa-green-200'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center space-x-2 mb-2">
                  {message.botType === 'claude' ? (
                    <Sparkles className="w-4 h-4 text-wa-blue-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-wa-green-600" />
                  )}
                  <span className="text-xs font-semibold text-gray-600">
                    {message.botType === 'claude' ? 'Claude AI' : 'CustomGPT'}
                  </span>
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-wa-blue-600"></div>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* File Upload Area */}
      {showFileUpload && uploadedFiles.length > 0 && (
        <div className="p-3 bg-blue-50 border-t border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              {uploadedFiles.length} file(s) selected
            </span>
            <button
              onClick={() => {
                setUploadedFiles([]);
                setShowFileUpload(false);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-2 rounded"
              >
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t bg-white rounded-b-lg">
        <div className="flex items-end space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Upload documents"
          >
            <Upload className="w-5 h-5 text-gray-600" />
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Washington State taxes..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wa-blue-500 resize-none"
            rows={1}
          />

          <button
            onClick={handleSendMessage}
            disabled={isLoading || (!input.trim() && uploadedFiles.length === 0)}
            className="p-3 bg-wa-blue-600 text-white rounded-lg hover:bg-wa-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          Using {selectedBot === 'claude' ? 'Claude AI' : 'CustomGPT'} • Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
