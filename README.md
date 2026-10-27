# Pang Lihour — Content Creator Portfolio

A dark, blue-accented portfolio website with live animations (particle network,
floating glow blobs, orbiting platform icons, typing headline, scroll reveals,
3D tilt cards, animated marquee).

## Links on the site

| Platform | Link |
| --- | --- |
| TikTok | https://www.tiktok.com/@lihour_001 |
| YouTube | https://youtube.com/@panglihour |
| Instagram | https://www.instagram.com/lihour_001 |
| Facebook | https://www.facebook.com/share/1ErUE1aBmX/?mibextid=wwXIfr |
| Telegram | https://t.me/lihuo_pang |
| Business email | panglihuo@gmail.com |

## Add your photo and videos

Everything is set in **`js/config.js`** — open it in any text editor.

**Your photo:** save it as `assets/profile.jpg` (square, at least 600×600 px).
It appears in the glowing circle at the top and in the About section. Until it's
there, the site shows your "PL" initials. To use a different file name, change
`profileImage` in `js/config.js`.

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
index.html          page markup and content
css/style.css       dark theme, layout and animations
js/config.js        YOUR SETTINGS: photo and featured videos
js/main.js          particles, typing effect, reveal, tilt, menu, copy-email, videos
assets/             site icon — put profile.jpg and any .mp4 videos here
downloads/pang-lihour-portfolio.zip  everything above, ready to download
```

## Use it

Open `index.html` in a browser — no build step. To publish, upload the folder to any
static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages).
