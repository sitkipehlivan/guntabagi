#!/bin/sh
# SVG illüstrasyonlardan sosyal paylaşım PNG'leri üretir
cd "$(dirname "$0")/.."
rsvg-convert -w 1200 -h 630 src/og.svg -o dist/og.png
for f in dist/img/tarifler/*.svg; do rsvg-convert -w 1200 -h 900 "$f" -o "${f%.svg}.png"; done
