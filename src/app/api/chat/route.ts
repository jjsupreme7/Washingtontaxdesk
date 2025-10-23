import { NextRequest, NextResponse } from 'next/server';
import { claudeService } from '@/lib/claude-service';
import { customGPTService } from '@/lib/customgpt-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, botType, sessionId } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Route to appropriate AI service
    let response: string;
    let newSessionId: string | undefined;

    if (botType === 'customgpt') {
      // Use CustomGPT service
      const result = await customGPTService.sendMessage(messages, sessionId);
      response = result.response;
      newSessionId = result.sessionId;
    } else {
      // Default to Claude with WA DOR context
      response = await claudeService.sendMessage(messages, true);
    }

    return NextResponse.json({
      response,
      sessionId: newSessionId,
      botType: botType || 'claude',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process chat request',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// GET endpoint for chat history (if needed)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Here you would fetch chat history from database
    // For now, return empty array
    return NextResponse.json({
      messages: [],
      sessionId,
    });
  } catch (error: any) {
    console.error('Chat history error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}
