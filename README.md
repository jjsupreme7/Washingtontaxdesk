# WashingtonTaxDesk.com - Professional Washington State Tax Platform

A comprehensive, AI-powered Washington State tax resource platform serving individuals, small businesses, large enterprises, accounting firms, and law firms.

## 🚀 Features

### Dual AI System
- **Claude AI**: Real-time web scraping of https://dor.wa.gov/ for current Washington State tax information
- **CustomGPT**: Specialized tax agent for complex scenarios and strategic planning
- **Intelligent Routing**: Switch between AI assistants seamlessly in one unified interface

### Document Processing
- Upload and analyze PDF, Word, and text documents
- Batch processing for enterprise and professional firms
- AI-powered document analysis with both Claude and CustomGPT

### Audience-Specific Solutions
- **Individuals**: Personal tax guidance and compliance
- **Small Businesses**: Simplified B&O tax, sales tax, and business licensing
- **Enterprise**: Multi-state compliance, complex entity structures, Fortune 500 solutions
- **Accounting Firms**: Professional tools, client portfolio management, collaboration features
- **Law Firms**: Tax litigation support, audit defense resources, compliance documentation

### Enterprise Features
- Multi-user team collaboration with role-based permissions
- Bulk document upload and analysis
- Complete audit trails for compliance
- Enterprise-grade security (SOC 2, encryption, SSO)
- Advanced analytics and reporting

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **AI Services**: 
  - Anthropic Claude API (with web scraping)
  - CustomGPT API
- **Styling**: Tailwind CSS
- **Document Processing**: pdf-parse, mammoth (Word docs)
- **Web Scraping**: axios, cheerio
- **Hosting**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Claude API key (provided in .env.local)
- CustomGPT API key (provided in .env.local)

## 🔧 Installation

1. **Clone or extract the project**
```bash
cd washington-tax-desk
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file with the following variables:
- `DATABASE_URL`: Your PostgreSQL connection string
- `CLAUDE_API_KEY`: Your Anthropic Claude API key
- `CUSTOMGPT_API_KEY`: Your CustomGPT API key
- `NEXTAUTH_SECRET`: Generate a secure secret for production
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for local dev)
- `NEXT_PUBLIC_APP_URL`: Your public application URL

See `.env.example` for the template.

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`

## 🚀 Deployment to Vercel

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables in Vercel**
   - Add all variables from `.env.local`
   - Ensure `DATABASE_URL` points to your production database

4. **Deploy**
   - Vercel will automatically build and deploy
   - Set up a PostgreSQL database (Vercel Postgres, Supabase, or other)

## 📁 Project Structure

```
washington-tax-desk/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── images/                # Static images
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── chat/         # Unified AI chat endpoint
│   │   │   └── documents/    # Document upload & analysis
│   │   ├── chat/             # AI assistant page
│   │   ├── enterprise/       # Enterprise solutions page
│   │   ├── accounting-firms/ # Accounting firms page
│   │   ├── law-firms/        # Law firms page
│   │   ├── individuals/      # Individual solutions page
│   │   ├── small-business/   # Small business page
│   │   ├── resources/        # Resource library
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── chat/
│   │   │   └── UnifiedChatbot.tsx  # Main chatbot component
│   │   ├── layout/
│   │   │   ├── Header.tsx    # Navigation header
│   │   │   └── Footer.tsx    # Footer
│   │   └── ui/               # Reusable UI components
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client
│   │   ├── claude-service.ts # Claude AI integration
│   │   ├── customgpt-service.ts # CustomGPT integration
│   │   └── document-processor.ts # Document processing
│   └── types/                # TypeScript type definitions
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🔑 Key Features Explained

### 1. Unified Chat Interface
Located at `/chat`, this page provides:
- Toggle between Claude AI and CustomGPT
- Real-time responses with streaming support
- Document upload for both AI systems
- Conversation history tracking

### 2. Washington DOR Integration
The Claude service (`lib/claude-service.ts`) includes:
- Real-time web scraping of dor.wa.gov
- Automatic content extraction and formatting
- Fallback handling for connection issues
- Context-aware responses based on scraped data

### 3. Document Analysis
Both AI systems can:
- Process PDF, Word, and text files
- Extract text from documents
- Analyze for tax compliance
- Provide actionable recommendations
- Handle batch uploads for firms

### 4. Audience Segmentation
Separate pages for each audience type with tailored:
- Messaging and examples
- Feature highlights
- Use cases and testimonials
- Call-to-action buttons

## 🔐 Security Features

- Environment variable protection
- Input sanitization
- File type validation
- Size limits on uploads
- SQL injection prevention (via Prisma)
- CORS configuration
- Rate limiting capabilities

## 📊 Database Models

Key Prisma models include:
- **User**: User accounts with role-based access
- **FirmProfile**: Additional data for accounting/law firms
- **Document**: Document storage and tracking
- **ChatSession**: Conversation history
- **Resource**: Tax resource library
- **AuditLog**: Enterprise compliance tracking

## 🎨 Branding & Design

- **Colors**: Washington State themed (blues and greens)
- **Typography**: Inter font family
- **Icons**: Lucide React icons
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG compliant

## 🔧 API Endpoints

### `/api/chat` (POST)
Send messages to AI assistants
```json
{
  "messages": [{"role": "user", "content": "..."}],
  "botType": "claude" | "customgpt"
}
```

### `/api/documents` (POST)
Upload and analyze documents
```
FormData with:
- files: File[]
- botType: "claude" | "customgpt"
```

## 🧪 Testing

Before deployment, test:
1. AI chat functionality with both Claude and CustomGPT
2. Document upload and analysis
3. Page navigation and responsive design
4. Form submissions
5. Database connections

## 📈 Scaling Considerations

For high-traffic scenarios:
1. Implement Redis caching for API responses
2. Use CDN for static assets
3. Add rate limiting on API routes
4. Implement job queues for document processing
5. Set up database read replicas
6. Enable Vercel Analytics

## 🐛 Troubleshooting

### Claude API Issues
- Verify API key is correct
- Check API rate limits
- Review error logs in console

### CustomGPT Connection
- Confirm API key format
- Check CustomGPT API documentation
- Test with Postman/curl first

### Database Connection
- Ensure DATABASE_URL is correct
- Run `npx prisma db push` to sync schema
- Check database server is running

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## 📞 Support

For issues or questions:
- Email: info@washingtontaxdesk.com
- Phone: (206) 555-1234

## 📄 License

Copyright © 2025 WashingtonTaxDesk.com. All rights reserved.

## 🙏 Acknowledgments

- Washington State Department of Revenue for public tax information
- Anthropic for Claude AI API
- CustomGPT for specialized agent capabilities
- Vercel for hosting platform
