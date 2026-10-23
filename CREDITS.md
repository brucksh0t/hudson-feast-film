# Feast & Floret: film edition (concept) · credits and sources
Unofficial concept preview. Not affiliated with or endorsed by Feast & Floret, 13 South 3rd Street, Hudson, NY 12534.

## Photos: all Feast & Floret's own
Every photo was downloaded from feastandfloret.com (gallery, flowers and home pages, BentoBox CDN) on Sept 26, 2026. Photographers named in the file names include Volora and Laurel Jollie. No stock, nothing generated.
| File | Shows | Use |
|---|---|---|
| img/hero-* (hero.jpg, 1200x1800) | Bar with dried-flower ceiling | Hero scroll film |
| img/room-* (interior.jpg, 1200x1800) | Bar and greenery doorway | Impact film "The room" |
| img/plate-* (hero-room.jpg, 1235x1600) | Chicken Milanese | Impact film "From the kitchen" |
| img/exterior-* (exterior.jpg, 1200x1800) | Brick building, South 3rd St | Impact film "Find us" |
| img/street, bouquet4 | Building, bouquet | Stills |
| media/pasta (pasta_making.jpg), flowers (bouquet2.jpg), farm (field.jpg), hearth (fire.jpg), table (longtable.jpg), courtyard (courtyard.jpg) | | Slow camera-move loops, H.264 + WebM, poster = first frame |

## How the motion is made (no generation, no upscaling)
- The scroll films are drawn on a canvas straight from the 1200x1600 masters (a 3:4 window of each unaltered photo). The camera pushes from the full frame to a 960px window. The stage is capped at 960x1280 device px, so the image is never shown above 1.0x. Posters are 960x1280.
- Loops are rendered from the photos with crop windows that are always at least as large as the output, so they are downscaled only.
- Labels read "Photo: Feast & Floret · camera move on the unaltered photo". Nothing is AI-generated, so no AI label is used.

## Facts (from feastandfloret.com and the Sept 2026 concept, retrieved Sept 26, 2026)
- Hours: dinner every night 5–10 pm, lunch Fri–Sun 12–3 pm. Phone (518) 822-1500. Address 13 South 3rd Street.
- Menu items and prices: feastandfloret.com/menu/lunchanddinner, /menu/drinks, /menu/dessert-menu-copy (subset shown).
- Flowers, classes, weddings, group prix fixe for 8+: /flowers-link, /private-dining. Sourcing partners: /sourcing.
- Quotes: Jason Denton in The Daily Gazette ("like having a party here every night"; "If someone from Italy was dropped in town…").
- Reservations: Resy venue page (not the 2021-dated link on the current site). Flower shop: fandflowers.myshopify.com.

## Code and fonts
GSAP 3.12.5 + ScrollTrigger (self-hosted, GreenSock standard license). Cormorant Garamond + Jost (Google Fonts, SIL OFL 1.1).
