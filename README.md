# SKKP Professional — landing page na GitHub Pages

Gotowa, responsywna witryna informacyjna przygotowana dla adresu **https://ciastoman.github.io/**.

## Publikacja (bez kompilacji)

1. Wejdź do repozytorium: https://github.com/ciastoman/ciastoman.github.io
2. Wybierz **Add file → Upload files**. Prześlij **zawartość** tego folderu (czyli `index.html`, folder `assets/`, `.nojekyll`, itd.). `index.html` musi znaleźć się w **głównym katalogu repozytorium**, a nie w dodatkowym folderze.
3. Uwaga: repozytorium miało wcześniej `README.md` oraz `_config.yml` z domyślnym motywem GitHub Pages. Można nadpisać README tym plikiem, a `_config.yml` usunąć. `.nojekyll` pozwala publikować stronę bez Jekylla.
4. Zatwierdź zmiany przyciskiem **Commit changes**.
5. W **Settings → Pages** ustaw **Build and deployment → Deploy from a branch → main → /(root)** (jeśli już tak jest, nic nie zmieniaj).
6. Otwórz https://ciastoman.github.io/ (publikacja może chwilę potrwać).

Możesz też sklonować repozytorium lokalnie i skopiować pliki do jego korzenia.

## Gdzie zmieniać tekst i dane?

- `index.html` — wszystkie nagłówki, opisy mechanik, FAQ i roadmapa.
- `assets/config.js` — numer wersji, status rozwoju, link do pobrania, link do GitHub.
- `assets/styles.css` — wygląd i kolory.
- `assets/app.js` — menu mobilne, przełączanie zakładek, automatyczna aktualizacja danych na stronie.
- `assets/favicon.svg` — ikonka strony.
- `assets/og-cover.png` — obraz przy udostępnianiu linku w mediach społecznościowych.

## Jak uruchomić pobieranie gry?

Edytuj `assets/config.js`, np.:

```js
window.SKKP_CONFIG = {
  version: '0.6.3',
  releaseStatus: 'Dostępna',
  downloadUrl: 'https://github.com/TWOJA-NAZWA/TWOJE-REPO/releases/latest',
  githubUrl: 'https://github.com/ciastoman'
};
```

Użyj **prawdziwego**, publicznego linku do release'u gry. Nie wpisuj linku do repozytorium strony, jeśli nie ma tam wydań programu. Przy pustym `downloadUrl` witryna celowo pokazuje nieaktywny przycisk „Pobieranie wkrótce” — niczego nie obiecuje i nie prowadzi do błędnego pobierania.

## Co z galerią?

Obecne widoki w hero i sekcji „Podgląd” są **poglądowymi makietami HTML/CSS**, a nie screenshotami z prawdziwej gry. Strona wyraźnie to zaznacza. Kiedy będziesz mieć zrzuty ekranu z gry, można je wstawić w sekcji `#podglad` zamiast makiet.

Przykładowo, obrazy umieszczaj w `assets/screenshots/` i odwołuj się do nich relatywnie (`assets/screenshots/mapa.webp`), żeby działały na GitHub Pages.

## Test lokalny

Otwórz `index.html` w przeglądarce. Do pełnego sprawdzenia serwuj katalog lokalnie, np.:

```bash
python -m http.server 8000
```

Następnie otwórz http://localhost:8000/.

## Informacje techniczne

- HTML + CSS + mały, własny JavaScript; bez frameworków, bundlerów i płatnych API.
- Działa na telefonach, tabletach i komputerach.
- Nawigacja klawiaturą, opisy dla czytników ekranu, obsługa `prefers-reduced-motion`.
- Czcionki z Google Fonts (nieobowiązkowe; w razie braku połączenia używane są systemowe zamienniki).
- Brak cookies, formularzy zbierających dane i zewnętrznych trackerów.
- Mapa w makietach jest schematyczna — nie przedstawia dokładnej geografii ani faktycznych zdarzeń.

**Licencje i prawa:** przed wstawieniem autentycznych zdjęć pojazdów, nagrań audio, znaków jednostek i screenshotów upewnij się, że masz odpowiednie prawa do publikacji.
