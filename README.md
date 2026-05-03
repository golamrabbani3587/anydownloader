# Any Downloader — Landing Page

## Deploy to Vercel in 3 Steps

### 1. Push this folder to GitHub
```bash
cd /Users/md.golamrabbani/projects/prodownloader/landing
git init
git add .
git commit -m "Initial landing page"
# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/any-downloader-site.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to **vercel.com** → New Project
2. Import your GitHub repo
3. Click **Deploy** (Vercel auto-detects Next.js)

### 3. Add Your Google Drive Download Link
Once deployed, go to **Vercel → Project Settings → Environment Variables** and add:

| Variable Name | Value |
|---|---|
| `DOWNLOAD_URL` | `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID&confirm=t` |

**How to get your Google Drive File ID:**
- Upload your DMG to Google Drive
- Right-click → Share → Copy link
- The link looks like: `https://drive.google.com/file/d/1ABC123XYZ.../view?usp=sharing`
- Your File ID is: `1ABC123XYZ...` (the part between `/d/` and `/view`)

Then Vercel will **redeploy automatically** and the Download button will trigger a direct file download.

---

## Update the Site URL
In `pages/index.js`, change `SITE_URL` to your actual Vercel URL:
```js
const SITE_URL = "https://your-app.vercel.app"; // or your custom domain
```
