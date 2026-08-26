"""
optimize_images.py — shrink the oversized images PageSpeed flagged.

Writes results to public_optimized/ so you can compare before overwriting
anything. Filenames and paths are preserved exactly, so no code changes are
needed once you copy them across.

    pip install pillow
    python optimize_images.py            # dry run — reports only
    python optimize_images.py --write    # produce public_optimized/

Then eyeball the files, and if they look right:
    python optimize_images.py --apply    # copy over the originals
"""

import shutil
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip install pillow")

PUBLIC = Path("public")
OUT = Path("public_optimized")

# max_width is roughly 2x the largest size each image is actually displayed at,
# which keeps it crisp on retina screens without shipping print resolution.
TARGETS = [
    # path relative to public/                      max_width  quality
    ("gallery/grand-opening-zamboanga.webp",             1600,   80),
    ("gallery/grand-opening-upad-hotel.webp",            1600,   80),
    ("gallery/grand-opening-robinsons-galleria.webp",    1600,   80),
    ("lover_nobg.webp",                                   900,   82),
    ("products/Avocado_Biscoff.webp",                    1200,   82),
    ("products/Naked___Inipit.webp",                     1200,   82),
    ("products/Shakes.webp",                             1200,   82),
    ("products/Keto_Series.webp",                        1200,   82),
    ("products/Knafeh_Pistachio_and_Biscoff.webp",       1200,   82),
    ("products/Dark_choco_Shake.webp",                   1200,   82),
    ("products/Avo_Lover.webp",                          1200,   82),
    ("products/Avocado_Senyorita.webp",                  1200,   82),
    ("Shakes.webp",                                      1200,   82),
    ("Naked___Inipit.webp",                              1200,   82),
    ("Avo_Lover.webp",                                   1200,   82),
    ("shake_nobg.webp",                                   900,   82),
    ("hero-bg.png",                                      1920,   82),
    ("party-cart-hero.png",                              1200,   85),
    ("downloads/avocadoria-expo-flyer-2026.webp",        1400,   82),
]


def kb(n):
    return f"{round(n / 1024):,} KB"


def process(rel, max_width, quality, write):
    src = PUBLIC / rel
    if not src.exists():
        print(f"  SKIP (missing)  {rel}")
        return 0, 0

    before = src.stat().st_size
    with Image.open(src) as im:
        w, h = im.size
        if w <= max_width:
            print(f"  ok              {rel}  ({w}x{h}, already within {max_width}px)")
            return before, before

        ratio = max_width / w
        new_size = (max_width, round(h * ratio))
        # Preserve transparency. Flattening a "_nobg" product cutout to RGB
        # would put it on a black rectangle — convert to RGBA whenever the
        # source has an alpha channel, regardless of file extension.
        has_alpha = im.mode in ("RGBA", "LA", "P") and "transparency" in im.info \
            or im.mode in ("RGBA", "LA")
        im = im.convert("RGBA" if has_alpha else "RGB")
        im = im.resize(new_size, Image.LANCZOS)

        dest = OUT / rel
        if write:
            dest.parent.mkdir(parents=True, exist_ok=True)
            if src.suffix.lower() == ".png":
                im.save(dest, "PNG", optimize=True)
            else:
                # lossless keeps cutout edges clean; lossy fringes them
                im.save(dest, "WEBP", quality=quality, method=6,
                        lossless=has_alpha)
            after = dest.stat().st_size
        else:
            # estimate only, so the dry run stays fast
            after = int(before * (ratio ** 2))

        pct = round((1 - after / before) * 100)
        print(f"  {w}x{h} -> {new_size[0]}x{new_size[1]}  {rel}")
        print(f"      {kb(before)} -> {kb(after)}  ({pct}% smaller)")
        return before, after


def main():
    write = "--write" in sys.argv
    apply_ = "--apply" in sys.argv

    if apply_:
        if not OUT.exists():
            sys.exit("Nothing to apply — run with --write first.")
        n = 0
        for f in OUT.rglob("*"):
            if f.is_file():
                target = PUBLIC / f.relative_to(OUT)
                shutil.copy2(f, target)
                n += 1
        print(f"Copied {n} optimized files over the originals in public/.")
        print("Run your build and check the site before committing.")
        return

    if not write:
        print("DRY RUN — no files written. Add --write to produce public_optimized/\n")

    total_before = total_after = 0
    for rel, mw, q in TARGETS:
        b, a = process(rel, mw, q, write)
        total_before += b
        total_after += a

    print()
    print(f"Total: {kb(total_before)} -> {kb(total_after)}"
          f"  (saving {kb(total_before - total_after)})")
    if write:
        print(f"\nWritten to {OUT}/ — open a few and compare against public/ before")
        print("running:  python optimize_images.py --apply")


if __name__ == "__main__":
    main()
