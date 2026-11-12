# Pamella Vintura — Product Designer portfolio

The working website is in `site/`. It uses the supplied portfolio as the source for case study text and images.

Each portfolio project now has a local case study page under `site/cases/`. The pages use original project visuals downloaded from the corresponding Framer case studies and link back to the portfolio.

Portfolio cards and case galleries display the source artwork with `object-fit: contain` so complete screens remain visible. The first mockup on each case page sits directly on the dark page background; gallery images keep their white viewing surface. Unified Redesign, Ulife, and Aldeias SOS Brasil cards use original project visuals from their case galleries.

The site uses a dark theme throughout the portfolio and all case studies. The opening is a cinematic OpenRouter generated purple galaxy storm video, with a star field, subtle UX-inspired orbits, and a smaller photorealistic lavender-and-pink astronaut in the original cute 3D floating pose, with a transparent cutout that falls across the home page as the visitor scrolls. The hero messages change with the scroll; case imagery remains in the work section. Case galleries use the largest original Framer image variants available; stat counters animate into view, and each case has centered closing copy, a home button, and a back-to-top control.

## Local preview

```sh
cd ~/Sites/pamella-vintura/site
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser.

## Generated media

The portfolio footer ends in one continuous photorealistic lunar landscape across the final contact section and footer, generated through OpenRouter, with no spacecraft. The original studio video and frame assets remain archived in the project. The active hero uses an 8-second, 1080p OpenRouter galaxy-storm video with a still poster, plus CSS stars and orbits. The five case study images come from the supplied portfolio reference.

OpenRouter generation used `google/veo-3.1-fast` for the video and `bytedance-seed/seedream-5-0-flash` for four images. The latest galaxy video cost US$0.80; the astronaut cutout was made locally from the previously generated image. Two astronaut iterations cost US$0.036; the final ship-free lunar landscape generation cost US$0.018. Recorded total across generations: approximately US$1.816. The API key is stored outside this project at `~/.config/labrego/openrouter.key` with owner-only permissions. The optimized hero video is `site/assets/video/hero-galaxy-storm.mp4`; its full-quality source is archived at `fonte/hero-galaxy-storm.mp4`.

The bundled Python FFmpeg build does not include `ffprobe`; `tools/ffprobe` supplies the metadata queries needed by the frame-slicing script. When slicing, prepend `~/Sites/pamella-vintura/tools` and `~/.local/bin` to `PATH`.

## Security

The static pages include a restrictive Content Security Policy fallback. `site/_headers` adds the CSP and standard browser security headers on hosts that support the Netlify `_headers` format. If deploying elsewhere, configure equivalent response headers in that hosting provider; the CSP should permit the existing Google Fonts styles and font endpoints only. The contact section links directly to LinkedIn and email; it does not collect form data.


The About section introduces Pamella as a Product Design Leader and animates the experience figures when they enter view. Portfolio and case copy uses plain, flowing phrasing without hyphens or dash punctuation.
