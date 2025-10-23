# WashingtonTaxDesk.com - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Setup
- [ ] PostgreSQL database provisioned
- [ ] Claude API key confirmed working
- [ ] CustomGPT API key confirmed working
- [ ] All environment variables documented
- [ ] Security audit completed

### 2. Code Quality
- [ ] All TypeScript errors resolved
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in production build
- [ ] All routes tested and working
- [ ] Mobile responsiveness verified

### 3. Database
- [ ] Prisma schema validated
- [ ] Database migrations ready
- [ ] Backup strategy in place
- [ ] Connection pooling configured

## Deployment to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. Initialize git if not already done:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub/GitLab/Bitbucket:
```bash
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Step 2: Set Up Database

**Option A: Vercel Postgres (Easiest)**
1. Go to Vercel dashboard
2. Navigate to Storage
3. Create new Postgres database
4. Copy connection string

**Option B: Supabase**
1. Create account at https://supabase.com
2. Create new project
3. Go to Settings > Database
4. Copy connection string in "Connection pooling" mode

**Option C: Other Providers**
- Railway
- PlanetScale
- Neon
- Amazon RDS

### Step 3: Deploy to Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in or create account

2. **Import Project**
   - Click "Add New..." > "Project"
   - Import your Git repository
   - Select the repository

3. **Configure Project**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   DATABASE_URL=your_postgres_connection_string
   CLAUDE_API_KEY=your_claude_api_key_from_anthropic
   CUSTOMGPT_API_KEY=your_customgpt_api_key
   NEXTAUTH_SECRET=generate_a_random_32_character_string_here
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will provide a URL

### Step 4: Post-Deployment Setup

1. **Run Database Migrations**
   In Vercel dashboard:
   - Go to Settings > Environment Variables
   - Verify DATABASE_URL is set
   
   Then locally:
   ```bash
   npx prisma db push
   ```

2. **Verify Deployment**
   - [ ] Homepage loads correctly
   - [ ] All navigation links work
   - [ ] Chat page loads
   - [ ] Claude AI responds
   - [ ] CustomGPT responds
   - [ ] Document upload works
   - [ ] All audience pages load

3. **Configure Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings > Domains
   - Add your custom domain (washingtontaxdesk.com)
   - Update DNS records as instructed
   - Wait for DNS propagation (up to 48 hours)

## Alternative Deployment Options

### Docker Deployment

1. **Create Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build and Run**
```bash
docker build -t washington-tax-desk .
docker run -p 3000:3000 \
  -e DATABASE_URL="your_db_url" \
  -e CLAUDE_API_KEY="your_key" \
  -e CUSTOMGPT_API_KEY="your_key" \
  washington-tax-desk
```

### AWS Deployment

1. **Use AWS Amplify**
   - Connect Git repository
   - Configure build settings
   - Add environment variables
   - Deploy

2. **Use EC2**
   - Launch Ubuntu instance
   - Install Node.js and PostgreSQL
   - Clone repository
   - Configure environment
   - Use PM2 for process management
   - Set up Nginx reverse proxy

## Monitoring & Maintenance

### 1. Set Up Monitoring

**Vercel Analytics** (Built-in)
- Automatically tracks page views
- Performance metrics
- Error tracking

**Sentry** (Recommended for Errors)
```bash
npm install @sentry/nextjs
```

**Logging**
- Use Vercel logs for debugging
- Set up log aggregation (Datadog, LogRocket)

### 2. Performance Optimization

- Enable Vercel caching
- Optimize images (Next.js Image component)
- Implement rate limiting on API routes
- Add CDN for static assets
- Monitor API response times

### 3. Security

- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Set up security headers
- [ ] Regular dependency updates
- [ ] Monitor for vulnerabilities

### 4. Backup Strategy

**Database Backups**
- Daily automated backups
- Point-in-time recovery
- Test restore procedures

**Code Backups**
- Git repository (already backed up)
- Tagged releases for each deployment

## Scaling Considerations

### When to Scale

- Response times > 2 seconds
- CPU usage > 80%
- Memory usage > 85%
- Database connections maxed out
- High error rates

### Scaling Options

1. **Vertical Scaling**
   - Upgrade Vercel plan
   - Increase database resources
   - Add more memory/CPU

2. **Horizontal Scaling**
   - Vercel handles automatically
   - Add database read replicas
   - Implement caching (Redis)

3. **Performance Optimization**
   - Add CDN for assets
   - Implement API response caching
   - Optimize database queries
   - Use connection pooling

## Troubleshooting Deployment Issues

### Build Failures

**TypeScript Errors**
```bash
# Check for errors
npm run build

# Fix type issues
npm run lint
```

**Missing Dependencies**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Runtime Errors

**Database Connection Issues**
- Verify DATABASE_URL format
- Check database is accessible from Vercel
- Ensure connection pooling is enabled
- Check database firewall rules

**API Key Issues**
- Verify keys are set in Vercel environment
- Check for extra spaces or quotes
- Test keys locally first
- Verify key permissions

**Environment Variables Not Loading**
- Redeploy after adding new variables
- Check variable names match exactly
- Ensure no typos in .env.local

## Rollback Procedure

If deployment fails:

1. **In Vercel Dashboard**
   - Go to Deployments
   - Find last working deployment
   - Click "..." menu
   - Select "Promote to Production"

2. **Via Git**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Claude API Docs**: https://docs.anthropic.com

## Post-Launch Tasks

- [ ] Monitor error rates
- [ ] Check response times
- [ ] Verify all features working
- [ ] Test on multiple devices
- [ ] Set up Google Analytics
- [ ] Configure SEO metadata
- [ ] Submit sitemap to Google
- [ ] Set up uptime monitoring
- [ ] Create backup procedures
- [ ] Document known issues

## Maintenance Schedule

**Daily**
- Monitor error logs
- Check uptime
- Review API usage

**Weekly**
- Review analytics
- Check performance metrics
- Update dependencies (if needed)

**Monthly**
- Security audit
- Dependency updates
- Backup verification
- Performance review

---

**Need Help?** Contact: support@washingtontaxdesk.com
