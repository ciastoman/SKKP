# SKKP Professional — zasady wydań, rozwoju i utrzymania

> **Dokument referencyjny projektu — stan na 18 listopada 2026 r.**  
> Ostatnia pełna wersja źródeł: **0.6.4.0 „Logistyka operacyjna”**. Następny etap zostanie uzgodniony po odbiorze na Windows.  
> Ten dokument utrwala ustalenia projektu między kolejnymi rozmowami ChatGPT. W przyszłych wydaniach aktualizuj go, gdy zmieni się któraś reguła. Ustalenia użytkownika z późniejszą datą mają pierwszeństwo.

## 1. Forma każdego wydania

1. Każda nowa wersja SKKP Professional to **pełna, samodzielna paczka źródłowa ZIP** — nigdy tylko pliki różnicowe. Hotfix wyłącznie na wyraźną prośbę.
2. Bazą jest **ostatnia pełna wersja**, nie starszy projekt ani nieaktualny eksport.
3. Pełna paczka ma zawierać wszystkie pliki potrzebne do odbudowania projektu: kod źródłowy, projekt WPF/.NET 10, bieżące dokumenty, aktualny katalog floty, fotografie, audio i zasoby OSM/mapy.
4. Każde wydanie ma nowy numer wersji. Numer i dane z paczki muszą być ze sobą spójne.
5. **Żadnych niezamierzonych regresji**: nie cofać wcześniejszych poprawek UI, danych, mechanik ani przypisań fotografii.
6. Po zbudowaniu sprawdzać strukturę archiwum ZIP i integralność zasobów; udostępniać pobieralny ZIP, a gdy możliwe również SHA-256.
7. Nie mylić testów statycznych z kompilacją. Gdy Windows/.NET 10 SDK albo uruchomienie WPF są niedostępne, jawnie napisać „nie skompilowano / nie przetestowano uruchomienia”. Nie deklarować gotowego EXE.
8. Przed zmianami w strukturze zapisu zalecać backup `game.db`; zachować kompatybilność wsteczną na ile to możliwe.

## 2. Obowiązkowe dokumenty w pełnej paczce

| Plik | Reguła |
| --- | --- |
| `README.md` | Aktualny opis źródeł, budowania i uruchomienia. Nie nadpisuje odrębnego README witryny GitHub. |
| `CHANGELOG.md` | **Tylko bieżące wydanie**, bez kopii wszystkich starych changelogów. |
| `CIEKAWOSTKI.md` | Ciekawostki techniczne i mechaniczne związane z bieżącą wersją. |
| `ROADMAP.md` | Bieżące wykonane i planowane etapy. |
| `TESTY-ODBIORCZE.md` | **Jeden** aktualny zestaw testów manualnych dla bieżącego builda. |
| `WYNIKI-TESTOW.md` | **Jeden** aktualny i uczciwy raport z wykonanych kontroli. |
| `ZASADY-WYDAN.md` | Ten dokument, zsynchronizowany z najnowszymi ustaleniami. |

- Można dodać bieżący audyt, gdy jest potrzebny (np. zdjęcia lub czyszczenie kodu), ale nie kopiować starych raportów.
- **Nie** dołączać `pliki-zmienione.md`, historycznych changelogów ani zbędnych duplikatów.

## 3. Testy, przeglądy i czystość źródeł

1. **Tylko testy aktualnej wersji** — w 0.6.3.11 obowiązuje `Tests/verify_06311.py`; dla 0.6.4.0 należy utworzyć nowy `Tests/verify_0640.py`, zastępując stary.
2. Nie przywracać historycznych testów 0.4.x–0.6.x, archiwalnego katalogu `Verification`, starych smoke testów i nieużywanych eksperymentów.
3. Bieżący zestaw powinien sprawdzać: kluczowe funkcje nowej wersji, zasoby, dane floty, powiązania zdjęć, brak martwych odwołań, spójność wersji, zachowanie starszych zapisów i integralność ZIP.
4. Test funkcjonalny WPF/.NET 10 na Windows ma być osobno oznaczony: **wykonany** lub **niewykonany**.
5. Usuwać potwierdzony martwy kod i nieużywane pliki, ale **zachować aktywne migracje** `game.db`, katalogu floty i magazynów do czasu jawnej decyzji o najstarszej wspieranej wersji.
6. Nie usuwać danych ani narzędzi tylko dlatego, że wyglądają na stare — najpierw sprawdzić odwołania i zgodność zapisu.

## 4. Słownik strażacki — obowiązkowo w każdym wydaniu

- Każde nowe pełne wydanie wymaga **przeglądu i aktualizacji wbudowanego słownika** w `Windows/FireGlossaryWindow.cs` / `FireGlossaryData.Entries`.
- Dopisywać nowe pojęcia techniczne, nazwy funkcji, elementy KDR, magazynu, ratownictwa i logistyki.
- Poprawiać definicje i usuwać nieaktualną terminologię po zmianach GUI.
- Sprawdzać spójność pojęć w słowniczku, interfejsie, opisach zdarzeń i dokumentacji.
- Nie powielać starej liczby haseł bez rzeczywistego sprawdzenia pliku.

## 5. Katalog floty i fotografie

- Stan odniesienia po 0.6.3.11: **29 remiz, 65 pojazdów, 63 zdjęcia**.
- Najnowszy zaakceptowany katalog: `fleet-catalog(7).json`, rozszerzony w 0.6.3.9 o **6 przypisań zdjęć**; najnowsze zdjęcia: `VehiclePhotos(2).zip`.
- Sześć dodatkowych fotografii: OSP Zagórze — 429[K]37, 429[K]56, 429[K]57, 429[K]69; OSP Żarki — 427[K]38, 427[K]39.
- W działającym projekcie katalog ma leżeć w `Assets/fleet-catalog.json`, a fotografie w `Assets/VehiclePhotos/`. Są to zasoby projektu, **nie AppData**.
- Katalog floty jest nadrzędnym źródłem parametrów, numerów operacyjnych, wyposażenia, marek/modeli i przypisań remiz. Zachowywać ręcznie skorygowane dane.
- Nie usuwać/nie podmieniać zdjęć bez audytu przypisań i plików. Przy kolejnej dostawie plików od użytkownika **nowsze dostarczone źródło wygrywa**.
- W obiegu i historii magazynu dla gracza wyświetlać **numer operacyjny**, nie wewnętrzne identyfikatory typu `OSP-HIST`.

## 6. Baza danych i konfiguracja

- Aktywny zapis gry: **jedna główna baza** `%LOCALAPPDATA%\SKKPProfessional\game.db`.
- `audio-settings.json` pozostaje obok EXE; zasoby floty i dźwięku pozostają w `Assets/`.
- Nie przywracać automatycznych kopii typu `game-before-*.db` i dawnych dodatkowych baz.
- Migracje powinny być jednorazowe, idempotentne oraz zachowywać historię wydań i zwrotów; **nie resetować magazynów po każdym uruchomieniu**.
- Świeża baza otrzymuje magazyny startowe, a starsza jest uzupełniana bez nadpisywania stanów gracza i duplikowania sprzętu.
- Dla zmian schematu bazy: zadbać o poprawną migrację starych rozgrywek.

## 7. Interfejs i nazewnictwo

- Obowiązuje **ciemna, spójna kolorystyka** pól wyszukiwania, edycji ilości, formularzy i list; żadnych przypadkowych białych kontrolek.
- Górny pasek: tylko **„SKKP Pro” + numer wersji**; nie wyświetlać nazwy wydania ani dopisku edukacyjnego.
- Historia i snapshoty są w **MENU w prawym górnym rogu**.
- W karcie pojazdu **„Edytuj dane” jako ostatnia zakładka/akcja**.
- **Szkolenia OSP** dostępne z przycisku po lewej, bez zakładki „Szkolenia OSP” na karcie pojazdu.
- Magazyn: przycisk **„Dodaj sprzęt do magazynu”** (nie „Przyjmij sprzęt (symulacja)”).
- W historii i zwrotach pokazywać numery operacyjne, nie techniczne ID.
- W ustawieniach remizy **bez wyszukiwania/geokodowania adresu w OSM** (usunięte z GUI i kodu); ręczna edycja współrzędnych/mapa zostają.
- Karta zdarzenia: zadysponowane zastępy w **dwóch kolumnach**, zdjęcia wozów po lewej (kwadratowe), meldunek w górnym pasku z potwierdzeniem **„Przyjąłem!”**, PPM na linii wężowej — odłączenie.
- KDR: grupowane, domyślnie rozwinięte i zwijane raporty zastępów; zakładka „Utrudnienia i braki” w „Raport i sprzęt”, między „Sprzęt” i „Raport”.
- Paski zapasu środków pokazywać tam, gdzie mają zastosowanie; nie przy pojazdach bez danych środków.
- Bilans działań: paski i wartości procentowe premii, wkład zastępów liczony na bieżąco, szczegóły po najechaniu.
- Usunięte nazwy/elementy nie powracają: „DYNAMIKA 2.0”, „premie umowne”, kafelek zbędnego zestawu technicznego, stare przyciski dysponowania z głównego panelu sił i środków.

## 8. Podstawowe zasady symulacji

- Gra to **realistyczny tryb pracy dyżurnego SKKP**. Zgłoszenia trafiają jako elektroniczne karty CPR; **nie** implementować roli operatora 112 ani rozmów przyjmujących alarm.
- OSP ma zmienną dostępność ludzi dzień/wieczór/noc, PSP pracuje na zmianach A/B/C i **wspólnej puli ratowników** (bez osobnej „wirtualnej” załogi każdego samochodu).
- Tylko dostępne obsady mogą wykonać zadanie; sprzęt nie zastępuje ludzi.
- Telefon służbowy: jedno okno, dzwonek, kolejka/dziennik kontaktów, naturalne krótkie dialogi; czerwony „Zakończ rozmowę”, przycisk **„Powiadom służby”**, oddzielne **„Wsparcie zewn.”**.
- Powiadomienie służby nie oznacza przyjazdu; współdziałanie policji/ZRM/energetyki/gazu/PKP PLK zależne od potrzeb zdarzenia. Unikać dublowania już wezwanych/obecnych.
- Zewnętrzne wsparcie ma czas przygotowania (dotychczas 2 min) i dojazd oparty o odległość; nie teleportować pojazdów.
- Woda/koncentrat/proszek w remizach: **nielimitowany magazyn środków**; uzupełnianie pojazdu w tempie 250 l/min wody, 50 l/min koncentratu, 50 kg/min proszku.
- Hydranty docelowo **600 l/min**; zachowane źródła wody są zatwierdzone, warstwy wodne OSM domyślnie wyłączone, **bez rowów i drenów**.
- Zaopatrzenie w wodę ograniczane dostępnością źródła/pompy/armatury/obsady, nie samym sztucznym bonusem.
- Magazyn narzędzi: wydania na pojazd, zwroty, uszkodzenia, serwis, raport użycia; sprzęt musi realnie znajdować się na wozie i być sprawny.
- Premie wyposażenia są kontekstowe, zależne od zadania i obsady; obowiązuje wspólny limit premii techniczno-sprzętowej **+20%** dla zastępu.
- Mechaniki z 0.6.3.8–0.6.3.9: pilarki, motopompy, hydraulika, stabilizacja, oświetlenie, kamera termowizyjna, kominówka i sprzęt medyczny.
- Scenariusze obejmują między innymi gaz, chemię, energię elektryczną, akweny, PV, wysokość, baterie EV i zdarzenia kolejowe. Katalog historycznie audytowany jako 95 wariantów w 14 rodzinach; ponownie weryfikować po zmianach.

## 9. Radio i audio

- Syrena remizy: pełny plik ok. 124,63 s, odtwarzanie przestrzenne, płynne ściszanie.
- Syreny pojazdów: losowane z dostępnych WAV i zapętlone do dojazdu; telefon ma nowy dzwonek, PTT dźwięk końca transmisji, `OSP.WAV` dla dysponowania.
- Nagrania aktorskie są etapem oddzielnym; obecnie obowiązuje tekstowy scenariusz radiowy **v3 — 29 remiz, 65 pojazdów, 130 kwestii**.
- Meldunki urozmaicone: pełne wywołanie na początku łączności, dopuszczalne skróty po jej nawiązaniu; identyfikacja numerem operacyjnym lub typem wozu przy jednostkach z jednym samochodem.
- Nie ujawniać technicznych ID ani numerów zdarzeń w zwykłych dialogach radiowych/telefonicznych.

## 10. Autorstwo i źródła zdjęć

W oknie „O programie” utrzymywać:
- **Autor:** ChatGPT
- **Koordynacja:** ciastoman
- **Źródła fotografii:** profile OSP (w tym Facebook), Czerwone Samochody, Grzegorz Fortuna, „W obiektywie - Fire and Rescue”, GrzegorzP-straz.pl.

Nie przywracać usuniętych etykiet „Kod / Scenariusze / Ikony i dźwięki” w sekcji autorów.

## 11. Witryna i repozytorium GitHub

- Oficjalna strona: **https://ciastoman.github.io/SKKP/**
- Repozytorium witryny: **https://github.com/ciastoman/SKKP**
- Witryna i jej `README.md` są odrębnym obszarem: **nie nadpisywać ręcznie aktualizowanego README na GitHubie** starszą kopią ze źródeł gry.
- Niniejszy `ZASADY-WYDAN.md` w repozytorium jest trwałym dokumentem referencyjnym dla kolejnych rozmów i buildów. Aktualizować go po zmianie ustaleń, a wersję z niego dołączać także do kolejnych pełnych źródeł.

## 12. Wydanie 0.6.4.0 „Logistyka operacyjna” (pełne źródła przygotowane 18.11.2026; testy WPF na Windows wciąż do wykonania)

**Zrealizowany zakres źródłowy:** uzupełnianie wyposażenia na akcjach bez teleportowania i duplikacji sztuk. Stan funkcjonalny wymaga jeszcze potwierdzenia kompilacją oraz testami WPF na Windows.

1. **Zapotrzebowanie KDR** na konkretny brakujący sprzęt; sprawdzenie wyposażenia obecnych zastępów oraz magazynów remiz.
2. **Rezerwacja sprzętu** w magazynie, aby jedna sztuka nie została równocześnie wydana dwa razy.
3. **Transport na zdarzenie** dostępnym pojazdem, z rzeczywistą obsadą, ograniczeniem pojemności, czasem załadunku i przejazdem po istniejącej siatce dróg/mapie.
4. **Przekazanie sprzętu** między zastępami fizycznie obecnymi na miejscu, z czasem obsługi i przeniesieniem zdolności; zabrany sprzęt przestaje wspierać zastęp oddający.
5. **Rozliczenie** wypożyczeń, zwrotów i uszkodzeń, ślad w bilansie i raporcie zdarzenia.
6. Panel **„Logistyka”** w karcie zdarzenia: potrzeby, źródła, transporty, statusy i historia.
7. Krótkie **meldunki telefoniczne/radiowe** dla transportów i dostaw; aktualizacja słownika.
8. Weryfikacja kompatybilności ze wspólną pulą PSP, magazynami, flotą, dotychczasowym KDR i starymi `game.db`.

**Poza zakresem** na ten etap: gospodarka paliwowa, ograniczanie zapasów wody/środków gaśniczych w remizach, międzyregionalna zaawansowana logistyka.

## 13. Kontrola końcowa każdego wydania

- [ ] Nowy build oparty na najnowszym pełnym ZIP; brak regresji
- [ ] Spójna wersja w kodzie, GUI i dokumentach
- [ ] Zachowane 29 remiz, 65 pojazdów i obecny zestaw 63 zdjęć lub świadomie przyjęte nowsze dane
- [ ] Sprawdzony katalog floty, zdjęcia i audio/OSM
- [ ] Przejrzany i aktualny **słowniczek**
- [ ] Dopracowany ciemny GUI, poprawne nazwy i numery operacyjne
- [ ] Zweryfikowane mechaniki i migracje `game.db`
- [ ] Wyłącznie **bieżące** testy oraz `TESTY-ODBIORCZE.md` i `WYNIKI-TESTOW.md`
- [ ] Aktualne `README.md`, `CHANGELOG.md`, `CIEKAWOSTKI.md`, `ROADMAP.md`, `ZASADY-WYDAN.md`
- [ ] Usunięte zbędne archiwalia, bez wycinania aktywnych migracji
- [ ] Przetestowana integralność pełnego ZIP; opcjonalnie SHA-256
- [ ] Rzetelna informacja, co skompilowano/uruchomiono, a co tylko sprawdzono statycznie
