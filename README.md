# 🏔️ Himalayan Healing School — Website

> Built with love by her husband. Powered by GitHub Pages (free hosting).

---

## 📁 File Structure

```
himalayan-healing-school/
├── index.html        ← Main page — ALL content edits go here
├── css/
│   └── style.css     ← Colors & styling
├── js/
│   └── main.js       ← Animations & interactions (rarely needs editing)
├── images/           ← Add photos here (profile, retreat, gallery)
└── README.md         ← This guide
```

---

## ✏️ How to Update Content

Open `index.html` in any text editor (Notepad, VS Code, etc.)
Search for `<!-- EDIT` to jump to every editable section.

| What to change | Search for |
|---|---|
| Page title & SEO | `EDIT: Page title` |
| Hero tagline & badges | `EDIT: Main headline` |
| About bio text | `EDIT: Bio paragraphs` |
| Stats numbers | `EDIT: Stats` |
| Service cards | `EDIT icon, title, description` |
| Events & dates | `EDIT all fields` |
| Testimonials | `EDIT quote, name, location` |
| Social links | `EDIT: Social media links` |
| Footer | `EDIT: tagline` |

**To add a new service card:** find the comment `ADD A NEW SERVICE` and paste a copy of a card block there.
**To add a new event:** find `ADD A NEW EVENT` and paste a copy of an event card there.
**To hide an event:** add `style="display:none"` to its `<div>`.

---

## 🚀 Deploy to GitHub Pages (FREE)

### Step 1 — Create a GitHub account
Go to **https://github.com** → Sign Up (free)

### Step 2 — Create a new repository
1. Click the **+** button → **New repository**
2. Name it: `himalayan-healing-school` (or `mukunverma.github.io` for a cleaner URL)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
**Option A — Simple drag & drop (easiest):**
1. Open your new repo on GitHub
2. Click **uploading an existing file**
3. Drag the entire `himalayan-healing-school` folder contents (index.html, css/, js/, images/)
4. Click **Commit changes**

**Option B — Using GitHub Desktop app (recommended for future updates):**
1. Download **GitHub Desktop** from https://desktop.github.com
2. Clone your new repo to your computer
3. Copy all site files into the cloned folder
4. In GitHub Desktop: write a commit message → click **Commit** → **Push origin**

### Step 4 — Enable GitHub Pages
1. In your repo, go to **Settings** → **Pages** (left sidebar)
2. Under **Source**, select **Deploy from a branch**
3. Branch: **main** | Folder: **/ (root)**
4. Click **Save**
5. Wait 2–3 minutes → your site is live at:
   `https://YOUR-USERNAME.github.io/himalayan-healing-school/`

---

## 🌐 Connect Your Custom Domain (himalayanhealingschool.com)

If you have the domain registered (e.g. on GoDaddy, Namecheap, Google Domains):

### In GitHub:
1. Settings → Pages → **Custom domain**
2. Enter: `himalayanhealingschool.com`
3. Click Save — GitHub will create a `CNAME` file automatically

### In your domain registrar (DNS settings):
Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-USERNAME.github.io |

DNS changes take 10 min – 24 hours to propagate.
Then tick **Enforce HTTPS** in GitHub Pages settings. ✅

---

## 📧 Enable Real Contact Form Emails (FREE)

Currently the form shows a success message but doesn't send email.
To receive real messages in your inbox:

1. Go to **https://formspree.io** → Sign up free
2. Create a new form → copy your endpoint URL (looks like `https://formspree.io/f/xabcdefg`)
3. In `index.html`, find the `<form>` tag in the CONNECT section
4. Change it to:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
5. Remove the `onsubmit="handleForm(event)"` attribute
6. Done — form submissions go straight to your email!

---

## 🖼️ Adding Real Photos

1. Add photos to the `images/` folder
2. In `index.html`, replace the about-orb section with an `<img>` tag:
   ```html
   <img src="images/mukun-photo.jpg" alt="Mukun Verma" class="about-photo" />
   ```
3. In `style.css`, add:
   ```css
   .about-photo { width: 340px; height: 340px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(168,85,247,0.4); }
   ```

---

## 🔄 How to Update the Site After Changes

1. Edit the files on your computer
2. Open **GitHub Desktop** → you'll see the changed files
3. Write a short message (e.g. "Updated April event details")
4. Click **Commit to main** → **Push origin**
5. Site updates automatically within ~1 minute ✅

---

## 💜 Made with love — for Mukun, by her husband
