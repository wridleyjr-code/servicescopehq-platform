# Netlify Deployment Guide

## Automatic Deployment (Recommended)

### Step 1: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** and choose **"Sign up with GitHub"**
3. Authorize Netlify to access your GitHub account
4. Click **"New site from Git"**
5. Select **GitHub** as your Git provider
6. Search for and select **`servicescopehq-platform`**
7. Click **"Deploy site"**

Netlify will automatically:
- Detect the `netlify.toml` configuration
- Build your site
- Deploy to a live URL
- Set up automatic redeploys on every push to `main`

### Step 2: Your Live Site

After deployment, you'll get a URL like:
```
https://[random-name].netlify.app
```

Or customize it by going to **Site settings → General → Site details → Change site name**

---

## Manual Deployment (Using Netlify CLI)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Authenticate

```bash
netlify login
```

This opens a browser window to authenticate with your Netlify account.

### Step 3: Deploy

```bash
netlify deploy --prod
```

This deploys your site to production.

---

## Configuration Files

### `netlify.toml`
- Specifies build commands
- Configures redirect rules
- Sets up serverless functions (optional)

### `package.json`
- Node.js project configuration
- Scripts and dependencies
- Engine version requirements

### `app.json`
- Application metadata
- Compatible with multiple platforms

---

## Features Enabled

✅ **Static Site Hosting**
- Serves your HTML, CSS, and JavaScript files
- Global CDN for fast performance
- Automatic HTTPS

✅ **Automatic Deployments**
- Every push to `main` triggers a new deploy
- Preview deployments for pull requests (optional)

✅ **Redirect Rules**
- All routes redirect to `joke-generator.html`
- Supports API routing if needed

---

## Environment Variables (Optional)

If you need environment variables later, add them in:
1. Go to your Netlify site dashboard
2. **Site settings → Build & deploy → Environment**
3. Add your variables

---

## Troubleshooting

### Site won't deploy
- Check build logs in Netlify dashboard
- Ensure `netlify.toml` is in the root directory
- Verify all files are committed to GitHub

### Site deployed but shows errors
- Open browser DevTools (F12)
- Check Console and Network tabs
- Check Netlify deploy logs

### Want to rollback a deployment
- Go to **Deploys** tab in Netlify dashboard
- Click any previous deploy and select **"Publish deploy"**

---

## Next Steps

1. **Deploy now** using the steps above
2. **Share your live URL** with others
3. **Test the joke generator** at your live site
4. **Monitor performance** in Netlify Analytics

Need help? Visit [Netlify Support](https://support.netlify.com)
