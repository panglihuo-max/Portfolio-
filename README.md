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
| Telegram (contact buttons) | https://t.me/lihuo_pang |
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

## Go live (one-time, 1 minute)

1. Open https://github.com/panglihuo-max/Portfolio-/settings/pages
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Pick the branch **claude/pang-lihour-portfolio-io9wgb**, folder **/ (root)**, then **Save**.
4. After about a minute the site is live at **https://panglihuo-max.github.io/Portfolio-/**

Every change pushed to that branch updates the live site automatically.

## Links

| For | Link |
| --- | --- |
| Visitors (share this) | https://panglihuo-max.github.io/Portfolio-/ |
| Owner: visitor statistics | https://analytics.google.com |
| Owner: edit the site | https://github.com/panglihuo-max/Portfolio-/edit/claude/pang-lihour-portfolio-io9wgb/index.html |
| Owner: hosting settings | https://github.com/panglihuo-max/Portfolio-/settings/pages |
| Owner: change history | https://github.com/panglihuo-max/Portfolio-/commits/claude/pang-lihour-portfolio-io9wgb |

## Visitor analytics (Google Analytics 4)

1. Sign in at https://analytics.google.com with your Google account and create a
   property for the website (Admin → Create → Property, then add a **Web** data
   stream with the URL `https://panglihuo-max.github.io/Portfolio-/`).
2. Copy the **Measurement ID** (looks like `G-AB12CD34EF`).
3. Paste it into `googleAnalyticsId` in SITE SETTINGS inside `index.html`.

You then see visitors, countries, devices and traffic sources in real time. The
site also reports which buttons people click: `social_click` (platform,
placement), `contact_click` (email, copy email, Telegram), `gallery_open` and
`video_view`. To break these down by platform in reports, register `platform`
and `method` as custom dimensions (Admin → Custom definitions).

## Use it

Open `index.html` in a browser — no build step. It works even on its own; the
`assets` folder is only needed if you add your own video files or a new photo.
