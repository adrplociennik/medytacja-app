# Still — prywatna aplikacja medytacyjna PWA

Still to pełnoprawna, prywatna aplikacja webowa do medytacji, oddechu, snu, koncentracji i soundscape'ów. Jest projektowana **mobile-first**, ale od V2 ma również pełny układ desktopowy z boczną nawigacją i szerokim dashboardem.

Nie wymaga konta, backendu, Dockera ani frameworka JS. Dane użytkownika pozostają w `localStorage`.

## Still V2

### Personalizacja
- check-in: samopoczucie + cel + dostępny czas,
- lokalny silnik rekomendacji dobierający praktykę,
- check-in po sesji 1–5 i prywatny trend samopoczucia,
- ulubione praktyki,
- eksport/import prywatnych danych.

### Medytacje
- SOS 2 min,
- szybki reset 3 min,
- 5 minut ciszej,
- oczyszczająca 7 min,
- spokojny start 8 min,
- zejście do snu 10 min,
- focus 10 min,
- loving-kindness 10 min,
- body scan 12 min,
- po intensywnym dniu 15 min,
- open monitoring 15 min,
- głęboka medytacja 20 min,
- Deep Focus 25 min,
- pełna praktyka 30 min,
- własny timer 1–90 min.

### Gongi i player
- gong na początku,
- gong między etapami,
- trzy uderzenia na zakończenie,
- przełącznik gongu bez wychodzenia z playera,
- 3 charakterystyki: **ciepła misa**, **głęboki gong**, **jasny dzwonek**,
- regulacja głośności,
- generowanie gongu przez Web Audio — działa offline i nie wymaga sampla,
- Wake Lock i Media Session.

### Breath Lab
- spokojny 4–6,
- równy 5–5,
- box breathing 4–4–4–4,
- 4–7–8,
- animowany orb,
- odliczanie faz,
- opcjonalna haptyka,
- zmiana długości ćwiczenia.

### Sleep Mode
- szybki wybór deszczu, oceanu albo kominka,
- timer 20/30/45/60/90 min,
- automatyczny pięciominutowy fade-out,
- osobna medytacja do snu.

### Soundscape mixer
- niezależna głośność każdej warstwy,
- master volume,
- gotowe sceny,
- zapis i odtworzenie własnego miksu,
- lokalne audio + awaryjne URL-e źródłowe,
- PWA cache audio.

### Audio HD
Aktualny bank zawiera deszcz, wielominutową burzę, ocean HD, las, ogień, wiatr i dzwonki. Ocean został podmieniony na public-domain field recording **4:47 / 485 kbps**, a dodatkowa warstwa deszczu/burzy ma **2:14 / 240 kbps**. Szczegóły: [AUDIO_LICENSES.md](./AUDIO_LICENSES.md).

### Tony i binaural
- czyste tony: 174, 285, 396, 432, 528, 639, 741, 852, 963 Hz,
- binaural: Delta 2 Hz, Theta 6 Hz, Alpha 10 Hz,
- brak pseudomedycznych obietnic dotyczących konkretnych częstotliwości.

### Programy
- 7 dni wyciszenia,
- 14 dni koncentracji,
- 21 dni głębszej praktyki,
- lokalny postęp programu.

### Statystyki
- liczba sesji,
- łączny czas,
- streak,
- średnia długość sesji,
- wykres ostatnich 7 dni,
- tygodniowy rytm na ekranie głównym,
- historia praktyk,
- subiektywna zmiana check-in przed/po.

## Pobranie audio

```bash
chmod +x scripts/download-audio.sh
./scripts/download-audio.sh
```

Pliki audio nie są wersjonowane w Git, dzięki czemu repo pozostaje lekkie.

## Lokalnie

```bash
python3 -m http.server 8080
```

Otwórz `http://localhost:8080`.

## Ubuntu + Nginx bez Dockera

```bash
git clone https://github.com/adrplociennik/medytacja-app.git
cd medytacja-app
git checkout feat/professional-meditation-pwa
chmod +x deploy/install-ubuntu.sh
./deploy/install-ubuntu.sh medytacja.twojadomena.pl
```

Instalator pobiera audio, kopiuje aplikację do `/var/www/still` i konfiguruje Nginx. Dla instalowalnej PWA na telefonie użyj HTTPS.

## Aktualizacja

```bash
git pull
./scripts/download-audio.sh
./deploy/install-ubuntu.sh medytacja.twojadomena.pl
```

## Walidacja

Repo ma workflow GitHub Actions sprawdzający składnię JavaScript i podstawową integralność HTML:

```bash
node --check app.js
python3 scripts/validate.py
```

## Prywatność

Historia, ustawienia, ulubione, check-in, programy i własny preset dźwięków są lokalne. Eksport danych tworzy plik JSON, który możesz zachować jako kopię.

## Kierunek dalszego rozwoju

Największy następny skok jakości to przygotowane wcześniej **polskie prowadzenie głosowe**, większy bank długich field recordings, prawdziwe wielowarstwowe sceny z losowymi zdarzeniami oraz bardziej zaawansowany silnik crossfade dla nagrań tła.
