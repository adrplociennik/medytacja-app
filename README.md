# Still — prywatna aplikacja do medytacji

Mobilna aplikacja webowa/PWA zbudowana do prywatnego użycia: bez kont, reklam, śledzenia i backendu. Działa jak aplikacja na telefonie, może zostać dodana do ekranu głównego i po pierwszym użyciu działa również offline.

## Co już zawiera

- szybkie sesje: **3 min reset**, **7 min oczyszczająca**, **20 min głęboka**
- biblioteka: mindful breathing, body scan, loving-kindness, open monitoring, długa praktyka 30 min
- własny timer 1–60 min
- pełnoekranowy player z etapami, postępem, pauzą i przeskakiwaniem
- **soundscape mixer** — kilka prawdziwych nagrań jednocześnie, osobna głośność każdej warstwy
- prawdziwe audio: deszcz, ocean, las/ptaki, ogień, wiatr, dzwonki
- generator czystych tonów 432/528 Hz oraz binaural beats 10 Hz / 6 Hz
- historia sesji, łączny czas i streak przechowywane wyłącznie w `localStorage`
- Wake Lock podczas sesji, Media Session na wspieranych urządzeniach
- PWA + Service Worker + cache offline
- tutorial pierwszego uruchomienia
- zero zależności JS, zero procesu buildowania, zero Dockera

## Dlaczego taki zakres

Popularne aplikacje medytacyjne łączą dziś biblioteki praktyk, timer, soundscape'y, ćwiczenia oddechowe, treści do snu, pobieranie/offline i statystyki. Still bierze z tego tylko elementy przydatne w prywatnej aplikacji, bez abonamentu, społeczności i nadmiaru treści.

Praktyki są oparte na powszechnie używanych formatach mindfulness: koncentracji na oddechu, body scan, otwartej obserwacji oraz loving-kindness. Aplikacja jest narzędziem wellbeing, a nie leczeniem. Generator częstotliwości celowo **nie** obiecuje efektów medycznych ani „uzdrawiania” konkretnymi Hz.

## Audio — prawdziwe nagrania

Źródła zostały ręcznie dobrane z Wikimedia Commons. Wszystkie użyte pozycje są oznaczone jako public domain albo CC0. Pełna tabela: [AUDIO_LICENSES.md](./AUDIO_LICENSES.md).

Pobierz pliki:

```bash
chmod +x scripts/download-audio.sh
./scripts/download-audio.sh
```

Audio nie jest wrzucane do Git, żeby repo pozostało lekkie. Aplikacja najpierw próbuje plików lokalnych; jeśli ich nie ma, ma awaryjne publiczne URL-e Wikimedia Commons.

## Uruchomienie lokalne

Ponieważ to statyczna PWA, nie potrzebujesz Node.js:

```bash
python3 -m http.server 8080
```

Otwórz `http://localhost:8080`.

> Service Worker/PWA działa na HTTPS lub na localhost. Zwykłe HTTP pod adresem IP na telefonie nie daje pełnego trybu instalowalnego PWA.

## Ubuntu + Nginx, bez Dockera

Na serwerze:

```bash
git clone https://github.com/adrplociennik/medytacja-app.git
cd medytacja-app
git checkout feat/professional-meditation-pwa
chmod +x deploy/install-ubuntu.sh
./deploy/install-ubuntu.sh medytacja.twojadomena.pl
```

Skrypt:
1. instaluje Nginx i curl,
2. pobiera legalne pliki audio,
3. kopiuje aplikację do `/var/www/still`,
4. ustawia konfigurację Nginx,
5. włącza i przeładowuje Nginx.

Do instalacji PWA na telefonie dodaj HTTPS. Najprościej po ustawieniu DNS użyć certbota lub reverse proxy, którego już używasz.

## Aktualizacja

```bash
git pull
./scripts/download-audio.sh
./deploy/install-ubuntu.sh medytacja.twojadomena.pl
```

## Prywatność

Nie ma serwera aplikacyjnego ani bazy użytkowników. Historia praktyki i ustawienia głośności są w przeglądarce urządzenia. Wyczyścienie danych strony usuwa historię.

## Źródła koncepcyjne

Zakres funkcji był porównywany z oficjalnymi opisami Headspace, Calm i Insight Timer. Nie kopiujemy ich treści ani audio.

- Headspace: https://www.headspace.com/app
- Calm: https://support.calm.com/hc/en-us/articles/360044707294-What-Free-Content-is-Available-on-the-Calm-App
- Insight Timer — timer: https://help.insighttimer.com/support/solutions/articles/67000691279-how-can-i-find-the-timer-
- Insight Timer — sound mixer: https://help.insighttimer.com/support/solutions/articles/67000753813-how-do-i-find-the-sleep-mixer-

## Następne sensowne rozszerzenia

Kolejny etap może dodać nagrane polskie prowadzenie głosowe, własne presety miksera, harmonogram przypomnień, tryb snu z wygaszaniem audio oraz eksport/import historii bez konieczności budowania backendu.
