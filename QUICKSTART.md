# WashingtonTaxDesk.com - Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will help you get WashingtonTaxDesk.com running locally in just a few minutes.

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js 18 or higher installed ([Download here](https://nodejs.org/))
- ✅ A PostgreSQL database (local or cloud)
- ✅ A code editor (VS Code recommended)

## Step 1: Extract and Navigate

```bash
cd washington-tax-desk
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Prisma ORM
- Claude AI SDK
- Document processing libraries
- And more...

## Step 3: Configure Database

1. **Option A: Local PostgreSQL**
   ```bash
   # Install PostgreSQL if you haven't
   # macOS: brew install postgresql
   # Ubuntu: sudo apt-get install postgresql
   
   # Create database
   createdb washington_tax_desk
   ```

2. **Option B: Cloud Database (Recommended)**
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Free tier available)
   - [Supabase](https://supabase.com/) (Free tier available)
   - [Neon](https://neon.tech/) (Free tier available)

3. **Update .env.local**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/washington_tax_desk"
   # OR your cloud database URL
   ```

## Step 4: Initialize Database

```bash
npx prisma generate
npx prisma db push
```

This creates all necessary tables in your database.

## Step 5: Verify API Keys

The API keys are already configured in `.env.local`:
- ✅ Claude API Key (provided)
- ✅ CustomGPT API Key (provided)

You don't need to change these unless you want to use your own keys.

## Step 6: Start Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready on http://localhost:3000
```

## Step 7: Test the Application

Open your browser and visit: **http://localhost:3000**

### Test Checklist:
- [ ] Homepage loads with hero section
- [ ] Navigation menu works
- [ ] Click "Get Started" or "AI Assistant"
- [ ] Chat page loads
- [ ] Type a message and send (test Claude AI)
- [ ] Switch to CustomGPT and test
- [ ] Try uploading a document (PDF/Word/Text)

### Sample Test Questions:
1. "What is the B&O tax rate in Washington?"
2. "How do I register a business in Washington State?"
3. "What are sales tax requirements for online businesses?"

## Common Issues & Solutions

### Issue: Database Connection Failed
**Solution**: Check your DATABASE_URL in .env.local
```bash
# Test connection
npx prisma db push
```

### Issue: "Module not found" errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use
**Solution**: Kill the process or use a different port
```bash
# Kill process on port 3000
npx kill-port 3000

# Or start on different port
PORT=3001 npm run dev
```

### Issue: Claude API not responding
**Solution**: Check your internet connection and API key
```bash
# Test API key in browser or curl
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY"
```

## Next Steps

### 1. Explore the Application
- Browse all audience pages (Individuals, Small Business, Enterprise, etc.)
- Test the resource library
- Try the contact form

### 2. Customize Content
- Edit `src/app/page.tsx` for homepage
- Modify `src/components/layout/Header.tsx` for navigation
- Update branding in `tailwind.config.js`

### 3. Add Your Branding
- Replace logo in header component
- Update colors in Tailwind config
- Add your company information in footer

### 4. Deploy to Production
See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

Quick deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

## Project Structure Overview

```
washington-tax-desk/
├── src/
│   ├── app/              # Pages and routes
│   │   ├── page.tsx      # Homepage
│   │   ├── chat/         # AI assistant page
│   │   ├── api/          # API endpoints
│   │   └── ...
│   ├── components/       # React components
│   │   ├── chat/         # Chatbot components
│   │   └── layout/       # Header, Footer
│   └── lib/              # Services and utilities
│       ├── claude-service.ts    # Claude AI integration
│       ├── customgpt-service.ts # CustomGPT integration
│       └── document-processor.ts # File processing
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
└── package.json          # Dependencies
```

## Key Features to Test

### 1. Dual AI System
- **Claude AI**: Best for current WA DOR information
- **CustomGPT**: Specialized tax scenarios
- Toggle between them in the chat interface

### 2. Document Upload
- Upload PDF, Word, or text files
- Get instant AI analysis
- Works with both AI systems

### 3. Audience-Specific Pages
- `/individuals` - For individual taxpayers
- `/small-business` - For small businesses
- `/enterprise` - For large corporations
- `/accounting-firms` - For CPAs
- `/law-firms` - For legal professionals

### 4. Real-Time WA DOR Data
Claude AI scrapes https://dor.wa.gov/ in real-time for current information.

## Development Tips

### Hot Reload
Next.js automatically reloads when you make changes. Just save your files!

### Debug Mode
```bash
# Run with debug output
DEBUG=* npm run dev
```

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (careful!)
npx prisma db push --force-reset
```

### TypeScript Help
```bash
# Check for type errors
npm run lint

# Build to verify everything works
npm run build
```

## Getting Help

### Documentation
- [README.md](README.md) - Complete project documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Claude API Docs](https://docs.anthropic.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Support
- Email: info@washingtontaxdesk.com
- Issues: Create an issue in your repository

## Success Checklist

Before deploying to production, verify:
- [ ] Application runs without errors
- [ ] All pages load correctly
- [ ] Chat functionality works (both AIs)
- [ ] Document upload and analysis works
- [ ] Database is configured and accessible
- [ ] Environment variables are set
- [ ] API keys are valid
- [ ] Build succeeds (`npm run build`)
- [ ] All tests pass (if you added tests)
- [ ] Responsive design works on mobile

## What's Next?

1. **Customize**: Update branding, colors, and content
2. **Extend**: Add new features or pages
3. **Deploy**: Follow DEPLOYMENT.md to go live
4. **Monitor**: Set up analytics and error tracking
5. **Scale**: Add caching, CDN, and optimizations

---

**Estimated Time**: 5-15 minutes  
**Difficulty**: Beginner-friendly  
**Support**: Available via email

**Congratulations! 🎉** You now have a fully functional Washington State tax platform with dual AI assistance!
