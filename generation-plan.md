# OpenRouter generation plan

Completed first pass: one 8-second 1080p silent video and four 2K images (the key frame plus three section artworks), approximately US$0.872 total on 2026-11-12. The video is sliced into 160 desktop and 160 mobile WebP frames. Each repeat of the video generation adds about US$0.80.

Models:
- Video: `google/veo-3.1-fast`, 8 seconds, 1080p, 16:9, silent.
- Images: `bytedance-seed/seedream-5-0-flash`, 2K, 16:9 for the key frame; landscape section images for About, How I Work, and Contact.

## Key frame

Wide establishing shot of a bright, contemporary digital product design studio in warm off-white, one desktop display and one tablet placed across the central third, both showing abstract, non-readable interface blocks and clean information architecture. The screens feel real and tactile, with soft reflections and precise materials. Generous negative space at the left and lower edge for overlay copy. Palette #f5f5f7, #1d1d1f, accent #0071e3. STYLE: calm, precise, human, cinematic still, 50mm lens, soft daylight, restrained blue accent, subtle film grain, shallow depth of field, editorial product photography, no text, no letters, no logo, no watermark, no frame, no border.

## Video

Single continuous shot, no cuts. The camera makes a slow, steady dolly-in across the same bright product design studio. First third: a wide view of desktop and tablet screens with abstract product flows. Middle: camera passes a mobile prototype and a small set of neatly arranged interface components. Final third: settle on the desktop and mobile experiences together, clear negative space on the left for the final invitation. Keep screens abstract and unreadable, lighting constant, no objects appearing from nowhere, no camera shake, no text, no logos, no people looking at camera. STYLE: calm, precise, human, soft daylight, palette #f5f5f7 and #1d1d1f with a restrained #0071e3 accent.

## Supporting image prompts

- About: an editorial still of a quiet design studio, one open notebook with blank pages and a tablet displaying abstract, unreadable interface blocks, subject on the right, broad seamless warm off-white negative space to the left, soft daylight, no words, no logo, no border.
- How I Work: a carefully arranged set of paper wireframes, neutral sticky notes with no writing, and a mobile prototype on a bright studio table, view from above at a slight angle, subject on the left, empty off-white space around it, restrained blue details, no readable text or logos.
- Contact: a sculptural frosted-glass loop and a slim blue translucent form emerging from a seamless off-white field, subject on the right, broad quiet space on the left, soft daylight, no writing, no logo, no border.


## Galaxy storm revision (2026-11-12)

Generated an 8-second 1080p continuous purple, pink and electric-blue cosmic storm with Veo 3.1 Fast via OpenRouter, using the generated galaxy still as its first frame. The shot has luminous lightning-like filaments and a dark left side for white hero copy. Generation cost: US$0.80. The astronaut background was removed locally with an image segmentation model and saved as an alpha-transparent WebP cutout. The cutout travels down the full portfolio according to page scroll. The whole portfolio and all five case pages now use a dark palette.


## Astronaut falling pose revision (2026-11-12)

Generated a smaller full-body astronaut in a playful upside-down floating pose, with arms and bent legs raised. Background was removed locally and the transparent WebP replaces the previous upright cutout. OpenRouter image generation cost: US$0.018.


## Astronaut proportion correction (2026-11-12)

Re-generated the upside-down floating astronaut with a smaller helmet, longer torso and more natural adult limb proportions. Replaced the transparent site WebP after background removal. Generation cost: US$0.018.


## Restore first 3D astronaut (2026-11-12)

Restored the original full-body cute 3D astronaut render at the user's request and removed its black backdrop again. The smaller centered placement, full opacity, and reveal after scroll begins remain in effect.


## Photorealistic lunar footer (2026-11-12)

Generated a wide cinematic lunar landscape with a parked shuttle on the right, cratered moon surface, and violet-pink galaxy above. The optimized image is used as the footer background with a dark gradient to preserve link readability. OpenRouter generation cost: US$0.018.


## Unified contact and footer background (2026-11-12)

Generated a ship-free panoramic lunar surface and galaxy image. The image now spans the final contact section and footer continuously, with a dark overlay for readable copy. OpenRouter generation cost: US$0.018.
