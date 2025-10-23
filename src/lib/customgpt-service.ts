import axios from 'axios';

interface CustomGPTMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class CustomGPTService {
  private apiKey: string;
  private baseUrl: string = 'https://app.customgpt.ai/api/v1';

  constructor() {
    this.apiKey = process.env.CUSTOMGPT_API_KEY || '';
  }

  /**
   * Send message to CustomGPT agent
   */
  async sendMessage(
    messages: CustomGPTMessage[],
    sessionId?: string
  ): Promise<{ response: string; sessionId: string }> {
    try {
      // Extract the latest user message
      const latestMessage = messages[messages.length - 1]?.content || '';

      // Parse the API key to get project ID (format: projectId|apiKey)
      const [projectId, apiToken] = this.apiKey.split('|');

      if (!projectId || !apiToken) {
        throw new Error('Invalid CustomGPT API key format. Expected format: projectId|apiKey');
      }

      // CustomGPT API endpoint for sending messages
      const response = await axios.post(
        `${this.baseUrl}/projects/${projectId}/conversations/send`,
        {
          prompt: latestMessage,
          session_id: sessionId || undefined,
          response_source: 'default',
        },
        {
          headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );

      return {
        response: response.data.data?.openai_response || response.data.data?.response || response.data.response || 'No response received',
        sessionId: response.data.data?.session_id || response.data.session_id || sessionId || `session-${Date.now()}`,
      };
    } catch (error: any) {
      console.error('CustomGPT API error:', error.response?.data || error.message);

      // Provide fallback response
      return {
        response: 'I apologize, but I\'m having trouble connecting to the specialized tax assistant. Please try again or use the Claude AI assistant.',
        sessionId: sessionId || `session-${Date.now()}`,
      };
    }
  }

  /**
   * Analyze document using CustomGPT
   */
  async analyzeDocument(
    documentText: string,
    documentType: string
  ): Promise<any> {
    try {
      const prompt = `Please analyze this ${documentType} document and provide tax insights:\n\n${documentText.substring(0, 8000)}`;

      const response = await this.sendMessage([
        { role: 'user', content: prompt }
      ]);

      return {
        summary: response.response,
        documentType,
        source: 'CustomGPT',
      };
    } catch (error) {
      console.error('CustomGPT document analysis error:', error);
      throw new Error('Failed to analyze document with CustomGPT');
    }
  }

  /**
   * Query specific tax information
   */
  async queryTaxInfo(query: string): Promise<string> {
    try {
      const response = await this.sendMessage([
        { role: 'user', content: query }
      ]);
      
      return response.response;
    } catch (error) {
      console.error('CustomGPT query error:', error);
      throw new Error('Failed to query tax information');
    }
  }
}

export const customGPTService = new CustomGPTService();
