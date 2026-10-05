#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/audio"
mkdir -p "$DEST"

download() {
  local name="$1"
  local url="$2"
  local out="$DEST/$name"
  local tmp="$out.part"

  if [[ -s "$out" ]]; then
    printf '✓ %s już istnieje\n' "$name"
    return
  fi

  printf '↓ Pobieram %s\n' "$name"
  curl -fL --retry 4 --retry-delay 2 --connect-timeout 15 "$url" -o "$tmp"
  test -s "$tmp"
  mv "$tmp" "$out"
}

# Public domain / CC0 — szczegóły i źródła: ../AUDIO_LICENSES.md
download "rain.ogg"   "https://upload.wikimedia.org/wikipedia/commons/0/0e/Rain_%281%29.ogg"
download "ocean.ogg"  "https://upload.wikimedia.org/wikipedia/commons/6/64/Ocean_Waves_on_a_Tropical_Beach.ogg"
download "forest.ogg" "https://upload.wikimedia.org/wikipedia/commons/3/38/Birds_forest.ogg"
download "fire.ogg"   "https://upload.wikimedia.org/wikipedia/commons/d/d8/Dry_grass_burning_in_open_fireplace.ogg"
download "wind.ogg"   "https://upload.wikimedia.org/wikipedia/commons/2/2d/Howling_wind.ogg"
download "chimes.ogg" "https://upload.wikimedia.org/wikipedia/commons/2/28/Windchime.ogg"

printf '\nGotowe. Pobrane pliki:\n'
du -h "$DEST"/*.ogg
printf '\nAplikacja odtwarza je w pętli. Długie nagrania ograniczają słyszalność granicy loopa.\n'
