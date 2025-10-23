# WashingtonTaxDesk.com - System Architecture

## Overview

WashingtonTaxDesk.com is a full-stack web application built with Next.js 14, featuring a dual AI chatbot system, document processing capabilities, and enterprise-grade features for professional tax services.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (Next.js Frontend - React Components + Tailwind CSS)       │
└─────────────────────────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│              (Next.js API Routes - Node.js)                  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Chat API     │  │ Document API │  │  Auth API    │     │
│  │ /api/chat    │  │ /api/docs    │  │ /api/auth    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                             │
                             ↓
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │ Claude Service │  │CustomGPT Service│  │Document Proc │ │
│  │ - WA DOR scrape│  │ - Specialized   │  │ - PDF parse  │ │
│  │ - AI responses │  │ - Tax expertise │  │ - Word parse │ │
│  └────────────────┘  └────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
          │                      │                    │
          ↓                      ↓                    ↓
┌──────────────┐     ┌──────────────┐      ┌──────────────┐
│  Claude API  │     │ CustomGPT API│      │   File Store │
│ (Anthropic)  │     │              │      │  (Uploads)   │
└──────────────┘     └──────────────┘      └──────────────┘
          ↓
┌──────────────┐
│  WA DOR Site │
│ dor.wa.gov   │
└──────────────┘
          │
          ↓
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│                 PostgreSQL Database                          │
│                    (via Prisma ORM)                          │
│                                                              │
│  Users │ Documents │ ChatSessions │ Resources │ AuditLogs   │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Frontend Layer

**Technology**: Next.js 14 with App Router, React 18, TypeScript

**Key Components**:
- `UnifiedChatbot.tsx`: Main chat interface with dual AI toggle
- `Header.tsx`: Navigation with audience-specific dropdown
- `Footer.tsx`: Site footer with links and contact
- Page components for each audience segment

**Features**:
- Server-side rendering (SSR) for SEO
- Client-side interactivity for chatbot
- Responsive design (mobile-first)
- Tailwind CSS for styling
- Framer Motion for animations

### 2. API Layer

**Technology**: Next.js API Routes (Node.js)

**Endpoints**:

#### `/api/chat` (POST)
- Receives messages from frontend
- Routes to Claude or CustomGPT based on `botType`
- Returns AI response with session tracking
- Handles error cases gracefully

#### `/api/documents` (POST)
- Accepts file uploads (multipart/form-data)
- Validates file types and sizes
- Processes documents (text extraction)
- Sends to AI for analysis
- Returns structured analysis results

#### `/api/auth/[...nextauth]`
- NextAuth.js integration
- Handles authentication flows
- Session management
- JWT tokens

### 3. Service Layer

#### Claude Service (`lib/claude-service.ts`)

**Responsibilities**:
- Integrate with Anthropic Claude API
- Scrape Washington DOR website in real-time
- Parse and format scraped content
- Send context-aware prompts to Claude
- Handle document analysis
- Batch processing for enterprise users

**Key Functions**:
```typescript
- scrapeWADORContent(query: string): Promise<string>
- sendMessage(messages: Message[]): Promise<string>
- analyzeDocument(text: string, type: string): Promise<any>
- batchAnalyzeDocuments(docs: Document[]): Promise<any[]>
```

**Web Scraping**:
- Uses axios for HTTP requests
- Cheerio for HTML parsing
- Extracts relevant content from DOR pages
- Fallback to general information if scraping fails
- Respects robots.txt and rate limits

#### CustomGPT Service (`lib/customgpt-service.ts`)

**Responsibilities**:
- Connect to CustomGPT API
- Send specialized tax queries
- Maintain session state
- Handle API errors gracefully

**Key Functions**:
```typescript
- sendMessage(messages: Message[], sessionId?: string)
- analyzeDocument(text: string, type: string)
- queryTaxInfo(query: string)
```

#### Document Processor (`lib/document-processor.ts`)

**Responsibilities**:
- Extract text from various file formats
- Validate file types and sizes
- Batch process multiple documents
- Error handling for corrupted files

**Supported Formats**:
- PDF (via pdf-parse)
- Word (.doc, .docx via mammoth)
- Text (.txt)

### 4. Data Layer

**Technology**: PostgreSQL with Prisma ORM

**Key Models**:

```prisma
User
- Authentication and profile
- Role-based access (Individual, Small Business, Enterprise, Firm)

FirmProfile
- Additional data for accounting/law firms
- Team member management
- Client portfolio tracking

Document
- File metadata and storage path
- Processing status
- AI analysis results (JSON)

ChatSession
- Conversation history
- Bot type tracking
- User association

Resource
- Tax resource library
- Categorization and tagging
- Access control by role

AuditLog
- Enterprise compliance tracking
- User actions and changes
- IP address and user agent
```

## Data Flow

### Chat Interaction Flow

```
1. User types message in UnifiedChatbot component
2. Frontend sends POST to /api/chat with messages array and botType
3. API route validates request
4. Routes to ClaudeService or CustomGPTService based on botType
5. Service processes request:
   - ClaudeService: Scrapes WA DOR → Formats context → Sends to Claude API
   - CustomGPTService: Sends directly to CustomGPT API
6. AI response received
7. API route returns response to frontend
8. Frontend updates UI with new message
9. Optional: Save to ChatSession in database
```

### Document Upload Flow

```
1. User selects files in UnifiedChatbot
2. Frontend sends POST to /api/documents with FormData
3. API route receives files
4. Files saved to /uploads directory
5. DocumentProcessor extracts text from each file
6. Text sent to selected AI service for analysis
7. Analysis results compiled
8. API returns results to frontend
9. Frontend displays analysis in chat
10. Optional: Save to Document table with analysis JSON
```

## Security Architecture

### Authentication & Authorization

- NextAuth.js for session management
- JWT tokens for stateless auth
- Role-based access control (RBAC)
- Protected API routes

### Data Security

- Environment variables for secrets
- API keys never exposed to client
- SQL injection prevention via Prisma
- Input sanitization and validation
- File type whitelist for uploads
- Size limits on uploads (10MB default, 25MB enterprise)

### Enterprise Features

- Audit logging for compliance
- Multi-user team access
- Permission-based document access
- Encrypted data at rest
- HTTPS-only in production

## Scalability Considerations

### Horizontal Scaling

- Stateless API design
- Database connection pooling
- CDN for static assets
- Vercel edge functions

### Vertical Scaling

- Optimized database queries
- Indexed database fields
- Caching strategies (Redis-ready)
- Lazy loading components

### Performance Optimization

- Next.js automatic code splitting
- Image optimization (next/image)
- Server-side rendering for initial load
- Client-side caching
- Debounced API calls

## Monitoring & Observability

### Logging

- Server-side: Console logs → Vercel logs
- Client-side: Error boundaries
- API request/response logging

### Metrics

- Vercel Analytics (built-in)
- API response times
- Error rates
- User engagement

### Error Handling

- Try-catch blocks in all async operations
- Graceful degradation
- User-friendly error messages
- Sentry integration ready

## Future Enhancements

### Phase 2 Features

1. **Advanced Analytics Dashboard**
   - Usage statistics
   - Document analysis trends
   - User engagement metrics

2. **Enhanced Collaboration**
   - Real-time chat between team members
   - Shared document workspaces
   - Comment threads on documents

3. **Integration Ecosystem**
   - QuickBooks integration
   - Xero accounting sync
   - Practice management software connectors

4. **Advanced AI Features**
   - Fine-tuned models for specific tax scenarios
   - Predictive analytics
   - Automated compliance checking

### Phase 3 Features

1. **Mobile Applications**
   - iOS and Android native apps
   - React Native implementation

2. **API for Third Parties**
   - Public REST API
   - Webhooks for events
   - Developer portal

3. **Advanced Security**
   - Two-factor authentication
   - Biometric authentication
   - Advanced threat detection

## Technology Decisions & Rationale

### Why Next.js?
- Full-stack framework (frontend + API)
- Excellent SEO with SSR
- Great developer experience
- Vercel deployment optimization
- Large ecosystem and community

### Why PostgreSQL?
- Robust relational database
- ACID compliance for financial data
- Complex query support
- JSON field support for flexibility
- Wide hosting availability

### Why Prisma?
- Type-safe database access
- Automatic migrations
- Excellent TypeScript support
- Easy to use and maintain

### Why Dual AI System?
- Redundancy and reliability
- Different strengths for different queries
- User choice and flexibility
- Competitive advantage

### Why Real-time Scraping?
- Always current information
- No manual updates needed
- Direct from source (WA DOR)
- Better than static data

## Deployment Architecture

### Production Environment (Vercel)

```
┌─────────────────────────────────────┐
│         Vercel Edge Network         │
│   (CDN, SSL, DDoS Protection)      │
└─────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│      Vercel Serverless Functions    │
│      (Next.js API Routes)           │
└─────────────────────────────────────┘
                  │
                  ↓
┌─────────────────────────────────────┐
│     PostgreSQL Database             │
│  (Vercel Postgres / Supabase)       │
└─────────────────────────────────────┘
```

### Benefits
- Automatic scaling
- Global CDN
- Zero-config deployment
- Preview deployments
- Built-in analytics

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Maintained By**: WashingtonTaxDesk Development Team
