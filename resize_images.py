"""
Avocadoria Image Optimizer
Run this from your project root: C:\avocadoria
Usage: python resize_images.py

Requires: pip install Pillow
"""

from PIL import Image
import numpy as np
import os

# ── Config ────────────────────────────────────────────────────────────────────
MAX_SIZE   = 1100     # max dimension in pixels
QUALITY    = 90       # WebP quality
PAD_PCT    = 0.04     # 4% padding around subject

FOLDERS = [
    'public/menu/Soft Serve Menu',
    'public/menu/Best Sellers',
    'public/menu/Avocado cakes',
    'public/menu/Avocado Shakes',
    'public/menu/Popsicles',
    'public/menu/Others',
]

DELETE_FILES = [
    'public/lover_nobg.png',
    'public/shake_nobg.png',
    'public/naked_nobg.png',
]

# ── Delete unused large PNGs ──────────────────────────────────────────────────
print("\n🗑  Deleting unused files...")
for f in DELETE_FILES:
    if os.path.exists(f):
        size = os.path.getsize(f) // 1024 // 1024
        os.remove(f)
        print(f"   ✅ Deleted {f} ({size}MB)")
    else:
        print(f"   ℹ  Already gone: {f}")

# ── Resize oversized WebP images ─────────────────────────────────────────────
print("\n🖼  Optimizing images...")
total_saved = 0

for folder in FOLDERS:
    if not os.path.exists(folder):
        continue
    for fname in os.listdir(folder):
        if not fname.lower().endswith('.webp'):
            continue
        path = os.path.join(folder, fname)
        orig_size = os.path.getsize(path)

        # Skip if already small enough
        if orig_size < 300 * 1024:
            print(f"   ✓  {folder}/{fname} ({orig_size//1024}KB) — OK")
            continue

        try:
            im = Image.open(path).convert('RGBA')

            # Trim transparent edges
            a = np.array(im)[:, :, 3]
            ys, xs = np.where(a >= 80)
            if len(ys):
                im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))

            # Add padding
            w, h = im.size
            pad = int(max(w, h) * PAD_PCT)
            canvas = Image.new('RGBA', (w + 2*pad, h + 2*pad), (0, 0, 0, 0))
            canvas.paste(im, (pad, pad), im)

            # Resize to max dimension
            s = MAX_SIZE / max(canvas.size)
            if s < 1:  # only downscale, never upscale
                canvas = canvas.resize(
                    (round(canvas.size[0] * s), round(canvas.size[1] * s)),
                    Image.LANCZOS
                )

            canvas.save(path, 'WEBP', quality=QUALITY, method=6)
            new_size = os.path.getsize(path)
            saved = orig_size - new_size
            total_saved += saved
            print(f"   ✅ {folder}/{fname}: {orig_size//1024}KB → {new_size//1024}KB (saved {saved//1024}KB)")

        except Exception as e:
            print(f"   ⚠  Error on {fname}: {e}")

print(f"\n✅ Done! Total saved: {total_saved//1024//1024}MB")
print("\nNow run:")
print("  git add .")
print("  git commit -m \"perf: optimize images, delete unused PNGs\"")
print("  git push origin main")
