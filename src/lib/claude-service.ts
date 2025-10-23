import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';
import * as cheerio from 'cheerio';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export class ClaudeService {
  /**
   * Scrape content from Washington DOR website
   */
  private async scrapeWADORContent(query: string): Promise<string> {
    try {
      // Search Washington DOR site
      const searchUrl = `https://dor.wa.gov/search?keys=${encodeURIComponent(query)}`;
      
      let scrapedContent = '';
      
      try {
        const response = await axios.get(searchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          timeout: 10000,
        });
        
        const $ = cheerio.load(response.data);
        
        // Extract relevant content from search results
        $('.search-result, .view-content, article, .field-content').each((_, element) => {
          const text = $(element).text().trim();
          if (text.length > 50) {
            scrapedContent += text + '\n\n';
          }
        });
      } catch (scrapeError) {
        console.error('Scraping error:', scrapeError);
        scrapedContent = 'Unable to fetch real-time data from DOR website.';
      }
      
      // Fallback to general Washington tax information
      if (scrapedContent.length < 100) {
        scrapedContent = `
Washington Department of Revenue Information:

The Washington Department of Revenue (DOR) administers state taxes and programs including:
- Business & Occupation (B&O) Tax
- Sales and Use Tax
- Property Tax
- Estate Tax
- Excise Taxes
- Timber Tax
- Public Utility Tax

For specific information about "${query}", please visit https://dor.wa.gov/ or contact DOR directly.

Key Resources:
- Tax Rates: https://dor.wa.gov/taxes-rates
- File & Pay: https://dor.wa.gov/file-pay-taxes
- Tax Incentives: https://dor.wa.gov/tax-incentives
- Contact DOR: 360-705-6705
        `;
      }
      
      return scrapedContent.substring(0, 4000); // Limit content length
    } catch (error) {
      console.error('Error scraping WA DOR:', error);
      return 'Unable to retrieve information from Washington DOR at this time.';
    }
  }

  /**
   * Send message to Claude with WA DOR context
   */
  async sendMessage(
    messages: Message[],
    includeWAContext: boolean = true
  ): Promise<string> {
    try {
      const latestUserMessage = messages[messages.length - 1]?.content || '';
      
      let systemPrompt = `You are an expert Washington State tax assistant. You provide accurate, professional guidance on Washington State tax matters including B&O tax, sales tax, property tax, and other state-specific tax issues.

IMPORTANT INSTRUCTIONS:
- Always provide accurate information based on official Washington DOR sources
- Be professional and helpful to individuals, businesses, accounting firms, and law firms
- Cite Washington State tax codes and regulations when applicable
- If you're unsure, recommend contacting WA DOR or a tax professional
- Never provide advice that could be considered tax evasion or fraud`;

      // Scrape relevant content from WA DOR if context is needed
      let contextContent = '';
      if (includeWAContext && latestUserMessage) {
        contextContent = await this.scrapeWADORContent(latestUserMessage);
        systemPrompt += `\n\nCURRENT WASHINGTON DOR INFORMATION:\n${contextContent}`;
      }

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: systemPrompt,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
      });

      const textContent = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === 'text'
      );

      return textContent?.text || 'I apologize, but I was unable to generate a response.';
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to get response from Claude AI');
    }
  }

  /**
   * Analyze uploaded documents
   */
  async analyzeDocument(
    documentText: string,
    documentType: string,
    userContext?: string
  ): Promise<any> {
    try {
      const prompt = `Analyze this ${documentType} document for Washington State tax compliance and provide insights:

${userContext ? `User Context: ${userContext}\n\n` : ''}

Document Content:
${documentText.substring(0, 10000)}

Please provide:
1. Document Summary
2. Key Tax Implications for Washington State
3. Compliance Considerations
4. Recommended Actions
5. Potential Issues or Red Flags

Format your response as a structured JSON object.`;

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const textContent = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === 'text'
      );

      const analysisText = textContent?.text || '{}';
      
      try {
        // Try to parse as JSON if Claude returned JSON
        return JSON.parse(analysisText);
      } catch {
        // If not JSON, return as structured text
        return {
          summary: analysisText,
          analysisType: 'text',
          documentType: documentType,
        };
      }
    } catch (error) {
      console.error('Document analysis error:', error);
      throw new Error('Failed to analyze document');
    }
  }

  /**
   * Batch analyze multiple documents (for enterprise/firms)
   */
  async batchAnalyzeDocuments(
    documents: Array<{ text: string; type: string; name: string }>
  ): Promise<any[]> {
    const results = [];
    
    for (const doc of documents) {
      try {
        const analysis = await this.analyzeDocument(doc.text, doc.type, doc.name);
        results.push({
          documentName: doc.name,
          analysis,
          status: 'success',
        });
      } catch (error) {
        results.push({
          documentName: doc.name,
          error: (error as Error).message,
          status: 'error',
        });
      }
    }
    
    return results;
  }
}

export const claudeService = new ClaudeService();
