import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export class DocumentProcessor {
  /**
   * Extract text from PDF
   */
  async extractPDFText(filePath: string): Promise<string> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  }

  /**
   * Extract text from Word document
   */
  async extractWordText(filePath: string): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } catch (error) {
      console.error('Word extraction error:', error);
      throw new Error('Failed to extract text from Word document');
    }
  }

  /**
   * Extract text from plain text file
   */
  async extractTextFile(filePath: string): Promise<string> {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error('Text file extraction error:', error);
      throw new Error('Failed to read text file');
    }
  }

  /**
   * Process document based on file type
   */
  async processDocument(filePath: string, mimeType: string): Promise<string> {
    const extension = path.extname(filePath).toLowerCase();

    switch (extension) {
      case '.pdf':
        return await this.extractPDFText(filePath);
      
      case '.doc':
      case '.docx':
        return await this.extractWordText(filePath);
      
      case '.txt':
      case '.text':
        return await this.extractTextFile(filePath);
      
      default:
        throw new Error(`Unsupported file type: ${extension}`);
    }
  }

  /**
   * Batch process multiple documents
   */
  async batchProcessDocuments(
    files: Array<{ path: string; type: string; name: string }>
  ): Promise<Array<{ name: string; text: string; type: string }>> {
    const results = [];

    for (const file of files) {
      try {
        const text = await this.processDocument(file.path, file.type);
        results.push({
          name: file.name,
          text,
          type: file.type,
        });
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        results.push({
          name: file.name,
          text: `Error: ${(error as Error).message}`,
          type: file.type,
        });
      }
    }

    return results;
  }

  /**
   * Validate file type and size
   */
  validateFile(file: any, maxSizeMB: number = 10): { valid: boolean; error?: string } {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload PDF, Word, or text files only.',
      };
    }

    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizeMB}MB limit.`,
      };
    }

    return { valid: true };
  }
}

export const documentProcessor = new DocumentProcessor();
