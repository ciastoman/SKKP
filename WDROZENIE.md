# Wdrożenie SKKP Professional na GitHub Pages

1. Repozytorium serwujące `https://ciastoman.github.io/SKKP/` powinno mieć w katalogu publikacji plik `index.html` oraz katalog `assets/` z tej paczki.
2. Wgraj zawartość archiwum (a nie folder nadrzędny) do źródła publikacji. Jeśli repozytorium publikuje z katalogu `docs/`, wgraj zawartość do `docs/`.
3. Zachowaj inne pliki repozytorium, których nie ma w paczce. `README.md` w tej paczce to wierna kopia dostarczonego pliku, bez żadnych zmian.
4. GitHub → Settings → Pages: upewnij się, że branch/folder publikacji wskazuje miejsce, gdzie trafił `index.html`.
5. Po aktualizacji odwiedź `https://ciastoman.github.io/SKKP/` i odśwież stronę bez pamięci podręcznej (Ctrl+F5).

## Wykaz screenshotów

- `assets/screenshots/mapa-operacyjna.webp`
- `assets/screenshots/zastepy.webp`
- `assets/screenshots/bilans-dzialan.webp`
- `assets/screenshots/karta-pojazdu.webp`
- `assets/screenshots/meldunki-i-mapa.webp`

Skrypty mają ścieżki względne `assets/...`, więc nie pomylą `SKKP/` z domeną główną.

## Ustawianie wydania gry

`assets/config.js`: ustaw `downloadUrl` na prawdziwy adres pliku lub GitHub Release. Pusty link pozostawia komunikat „Pobieranie wkrótce”.
