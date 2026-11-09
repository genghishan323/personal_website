# james-han-site

Personal academic website: one Home page for research and a Studio page for photography, ceramics and sound. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Editing content (no code needed)

| What | File |
| --- | --- |
| Name, title, email, agenda, links, CV date, teaching, bio | `src/content/profile.md` |
| Papers, work in progress, RA projects | `src/content/research.yaml` |
| Studio pieces (one file each) | `src/content/studio/*.md` |
| CV PDF | `public/cv.pdf` |
| Colors and fonts | `src/styles/global.css` (top of file) |

Commit and push to `main`, and the site rebuilds in about a minute.

**Add a photo or ceramic piece:** put the image (JPG/PNG) in `src/content/studio/`, then in its `.md` file set `image: ./your-file.jpg` and `alt: …`. Astro makes AVIF/WebP versions at 640, 1280 and 2400px and strips EXIF (including GPS) automatically. To add a piece, copy an existing `.md` file and change it. Set `teaser: true` on one piece per medium to feature it on the Home page.

**Add sound:** put an MP3 in `public/audio/` and set `audio: /audio/your-file.mp3`. Don't put WAVs in `public/`, because everything there is published as is. Keep masters in `audio-originals/`, which is never uploaded. To convert, use `ffmpeg -i master.wav -codec:a libmp3lame -q:a 0 public/audio/name.mp3`, or export MP3 (V0 or 320 kbps) from your DAW.

**Headshot:** put `headshot.jpg` in `src/content/` and uncomment the `headshot:` line in `profile.md`.

**Teaching:** add items under `teaching:` in `profile.md`. The section and nav link appear automatically.

## First-time setup

The site is configured for **james-m-han.com** (`public/CNAME` and `site` in `astro.config.mjs`).

1. Create a public GitHub repo with any name, e.g. `website`.
2. Push this folder:
   ```sh
   cd ~/Desktop/james-han-site
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/website.git
   git push -u origin main
   ```
3. In the repo, open **Settings → Pages** and set **Source** to **GitHub Actions**. Wait for the first run in the **Actions** tab to finish.
4. In **Settings → Pages → Custom domain**, enter `james-m-han.com` and save.
5. At your domain registrar, add these DNS records (delete any default "parking" A records first):

   | Type | Host | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | YOUR-USERNAME.github.io |

6. Once GitHub's DNS check passes (minutes to a few hours), tick **Enforce HTTPS** in Settings → Pages.

Optional but recommended: verify the domain under your GitHub account's **Settings → Pages** so no one else can claim it on GitHub.

## Previewing locally (optional)

Requires [Node.js](https://nodejs.org) 22 or newer.

```sh
npm install
npm run dev      # http://localhost:4321, live reload
npm run build    # production build into dist/
```
