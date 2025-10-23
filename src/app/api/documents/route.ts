import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { claudeService } from '@/lib/claude-service';
import { customGPTService } from '@/lib/customgpt-service';
import { documentProcessor } from '@/lib/document-processor';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const botType = formData.get('botType') as string || 'claude';
    const analysisType = formData.get('analysisType') as string || 'full';

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const results = [];

    for (const file of files) {
      try {
        // Validate file
        const validation = documentProcessor.validateFile({
          mimetype: file.type,
          size: file.size,
        }, 25); // 25MB limit for enterprise

        if (!validation.valid) {
          results.push({
            fileName: file.name,
            status: 'error',
            error: validation.error,
          });
          continue;
        }

        // Save file temporarily
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = join(uploadsDir, `${Date.now()}-${file.name}`);
        await writeFile(filePath, buffer);

        // Process document
        const extractedText = await documentProcessor.processDocument(
          filePath,
          file.type
        );

        // Analyze with selected AI service
        let analysis;
        if (botType === 'customgpt') {
          analysis = await customGPTService.analyzeDocument(
            extractedText,
            file.type
          );
        } else {
          analysis = await claudeService.analyzeDocument(
            extractedText,
            file.type,
            file.name
          );
        }

        results.push({
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          status: 'success',
          analysis,
          extractedTextLength: extractedText.length,
        });
      } catch (error: any) {
        console.error(`Error processing ${file.name}:`, error);
        results.push({
          fileName: file.name,
          status: 'error',
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      filesProcessed: files.length,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process documents',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// GET endpoint for document status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get('id');

    if (!documentId) {
      return NextResponse.json(
        { error: 'Document ID is required' },
        { status: 400 }
      );
    }

    // Here you would fetch document status from database
    return NextResponse.json({
      documentId,
      status: 'completed',
      message: 'Document processed successfully',
    });
  } catch (error: any) {
    console.error('Document status error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document status' },
      { status: 500 }
    );
  }
}
