# Pang Lihour — Content Creator Portfolio

A dark, blue-accented portfolio website with live animations (particle network,
floating glow blobs, orbiting platform icons, typing headline, scroll reveals,
3D tilt cards, animated marquee).

## Links on the site

| Platform | Link |
| --- | --- |
| TikTok | https://www.tiktok.com/@lihour_001 |
| TikTok (2nd) | https://www.tiktok.com/@lihour_002 |
| YouTube | https://youtube.com/@panglihour |
| Instagram | https://www.instagram.com/lihour_001 |
| Facebook Page (main) | https://www.facebook.com/profile.php?id=100091285929977 |
| Facebook | https://www.facebook.com/share/1ErUE1aBmX/?mibextid=wwXIfr |
| Telegram | https://t.me/lihuo_pang |
| Business email | panglihuo@gmail.com |

## Add your photo and videos

Open **`index.html`** in a text editor (Notepad, TextEdit, VS Code) and search for
**`SITE SETTINGS`** — that block near the end of the file holds both options.

**Your photos:** your profile photo (top of the page and About section) and the
four Gallery photos are built into `index.html`, so they always show — even when
the file is opened on its own. To swap the profile photo later, put a new photo
in `assets/` and write its name in `profileImage` in SITE SETTINGS, e.g.
`"assets/new-photo.jpg"`.

**Autoplay videos:** paste video links into the `videos` list, for example:

```js
videos: [
  "https://www.tiktok.com/@lihour_001/video/1234567890123456789",
  "https://youtube.com/shorts/VIDEO_ID",
  "https://www.facebook.com/reel/1234567890",
  "https://www.instagram.com/reel/ABC123xyz/",
  "assets/my-video.mp4",
],
```

A "Featured videos" section (and a "Videos" menu link) appears automatically.
Videos start muted when they scroll into view — browsers only allow muted
autoplay. Instagram embeds don't support autoplay, so those wait for a tap.
TikTok links must be the full link (open the video on a computer and copy the
address bar), not a short `vm.tiktok.com` link. Leave the list empty and the
section stays hidden. Set `autoplay: false` to turn autoplay off.

## Files

```
index.html   the whole website in one file (styles, animations and settings included)
assets/      optional: a replacement profile photo or your own .mp4 videos
downloads/pang-lihour-portfolio.zip  everything above, ready to download
```

## Use it

Open `index.html` in a browser — no build step. It works even on its own; the
`assets` folder is only needed if you add your own video files or a new photo. To publish, upload the folder to any
static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
