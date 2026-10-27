/* ==========================================================
   SITE SETTINGS — edit this file to customise the website.
   ========================================================== */
window.SITE_CONFIG = {

  /* ---------- 1. Your photo ----------
     Put your photo inside the "assets" folder and write its file name below.
     A square photo works best (at least 600 x 600 pixels).
     It appears in the glowing circle at the top of the page and in the About section.
     If the file is missing, or this is "", the site shows your "PL" initials instead. */
  profileImage: "assets/profile.jpg",


  /* ---------- 2. Featured videos (autoplay) ----------
     Paste links to your videos between the quotes, one per line, each ending with a comma.
     Supported links:
       TikTok     https://www.tiktok.com/@lihour_001/video/1234567890123456789
                  (use the full link from a computer, not a short vm.tiktok.com link)
       YouTube    https://youtube.com/shorts/VIDEO_ID
                  https://www.youtube.com/watch?v=VIDEO_ID
                  https://youtu.be/VIDEO_ID
                  https://www.youtube.com/playlist?list=PLAYLIST_ID
       Facebook   https://www.facebook.com/reel/1234567890
                  https://www.facebook.com/watch/?v=1234567890
       Instagram  https://www.instagram.com/reel/ABC123xyz/
                  (Instagram doesn't allow autoplay — visitors tap play)
       Own file   assets/my-video.mp4   (an .mp4 or .webm file inside the assets folder)

     Videos start playing muted when they scroll into view (browsers only allow
     autoplay when muted). Visitors can unmute them.
     Leave the list empty to hide the "Featured videos" section completely. */
  videos: [
    // "https://www.tiktok.com/@lihour_001/video/1234567890123456789",
    // "https://youtube.com/shorts/VIDEO_ID",
  ],

  /* Set to false if you'd rather visitors press play themselves. */
  autoplay: true
};
