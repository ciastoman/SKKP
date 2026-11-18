# SKKP Professional — zasady wydań, rozwoju i utrzymania

> **Dokument referencyjny projektu — stan na 18 listopada 2026 r.**  
> Ostatnia pełna wersja źródeł: **0.6.5.2 „Radiowa dyscyplina”**. Pełne źródła i testy statyczne gotowe; kompilacja WPF na Windows nadal do odbioru.  
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

1. **Tylko testy aktualnej wersji** — w każdym pełnym wydaniu zastępować poprzedni skrypt nowym; dla 0.6.5.2: `Tests/verify_0652.py`.
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
- Najnowszy zaakceptowany katalog: **`fleet-catalog(8).json`** — 29 remiz, 65 pojazdów i 63 przypisania zdjęć; zachowuje fotografie `VehiclePhotos(2).zip`. Brodła 429[K]49: motopompa 500 l/min. Grojec 429[K]68: typ GLBM 0,3/0,5, motopompa 500 l/min.
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

**Do wdrożenia przy następnym pełnym wydaniu — sekcja „O programie”:** dodać zwięzłą informację o znakach towarowych producentów pojazdów (np. MAN, Mercedes-Benz, Volvo, Scania, Jelcz). Proponowana treść:

> **Znaki towarowe producentów pojazdów**  
> Nazwy producentów, modele pojazdów oraz ich oznaczenia wykorzystano wyłącznie w celach informacyjnych i identyfikacyjnych. Wszystkie znaki towarowe należą do ich prawowitych właścicieli. SKKP Professional jest niezależnym, nieoficjalnym symulatorem i nie jest sponsorowany, zatwierdzony ani powiązany z producentami przedstawionych pojazdów.

Dopisek nie zastępuje wymaganych praw do fotografii, logotypów ani nagrań. Zachować dotychczasowe autorstwo i wykaz źródeł zdjęć; **na razie to zadanie do następnego wydania, bez zmiany kodu w aktualnym buildzie**.

## 11. Witryna i repozytorium GitHub

- Oficjalna strona: **https://ciastoman.github.io/SKKP/**
- Repozytorium witryny: **https://github.com/ciastoman/SKKP**
- Witryna i jej `README.md` są odrębnym obszarem: **nie nadpisywać ręcznie aktualizowanego README na GitHubie** starszą kopią ze źródeł gry.
- Niniejszy `ZASADY-WYDAN.md` w repozytorium jest trwałym dokumentem referencyjnym dla kolejnych rozmów i buildów. Aktualizować go po zmianie ustaleń, a wersję z niego dołączać także do kolejnych pełnych źródeł.
- **Zatwierdzony plan przyszłej 0.6.5.0 „Żywe zdarzenia”**: [PLAN-0.6.5.0-ZYWE-ZDARZENIA.md](./PLAN-0.6.5.0-ZYWE-ZDARZENIA.md). Plan obejmuje aktywne meldunki KDR, dynamiczne zdarzenia, aktualizacje CPR, zapotrzebowania, listę spraw i bilans; **nie został jeszcze wdrożony**. Obecna linia 0.6.4.x pozostaje etapem dopracowania istniejących systemów.

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

### 0.6.4.1 — poprawka po kompilacji na Windows (18.11.2026)

- Usunięto trzy błędy `CS7036` w `Windows/IncidentLogisticsPanel0640.cs`: drugi parametr `Result(string? error, string success="")` stał się opcjonalny, dzięki czemu trzy wywołania z jednym argumentem są poprawne.
- Pełna źródłowa paczka 0.6.4.1 oparta na 0.6.4.0; wszystkie 108 zasobów i 63 fotografie zachowane; aktualny test `Tests/verify_0641.py`, bez historycznego testu.
- Przegląd słowniczka: doprecyzowanie hasła „Zapotrzebowanie logistyczne” o zakres 1–12 sztuk.
- Testy statyczne 62/62 i test ZIP po samodzielnym rozpakowaniu zaliczone; **kompilacja .NET 10 / WPF nie została tu wykonana**.

### 0.6.4.2 — „KDR zgłasza, SKKP dowozi” (18.11.2026)

- Usunięto zbędny przycisk „Wznów tankowanie w remizie”. Przyjazd do remizy nadal automatycznie uruchamia uzupełnianie zbiorników.
- To **KDR po rozpoznaniu** zgłasza w rejestrze brak konkretnych przyborów i narzędzi; dyżurny SKKP widzi listę zgłoszeń jako pierwszą kontrolkę, a następnie wybiera magazyn i przewoźnika.
- Niezarezerwowane automatyczne prośby KDR są odwoływane, gdy brak ustaje; stare ręcznie utworzone potrzeby z wcześniejszego game.db nie są w ten sposób usuwane.
- Po faktycznym dojeździe transportu **przekazanie sprzętu jest automatyczne** i zachowuje wymagania obsady, zgodności, czasu i ewidencji jednego kwitu. Usunięto z GUI grupę ręcznego przekazywania.
- Pilny meldunek wymagający potwierdzenia oraz otwarty raport KDR pauzują symulację; przyjęcie wiadomości przywraca wcześniejsze tempo, chyba że użytkownik sam wcześniej pauzował.
- Nowe obowiązki dyżurnego na podstawie oficjalnych zadań SKKP są na razie **tylko propozycjami**, nie wdrożono ich w 0.6.4.2.
- Testy statyczne **78/78 PASS** na kompletnym rozpakowanym ZIP; **brak kompilacji WPF** w tym środowisku. Wyłącznie bieżący `Tests/verify_0642.py`, słowniczek zaktualizowany.
- Flota zachowana: 29 remiz, 65 pojazdów, 63 zdjęcia i 108 plików Assets; starsze zapisy i migracje należy sprawdzić na Windows.

### 0.6.4.3 — „Logistyka pod kontrolą” (18.11.2026)

- Zapotrzebowania KDR mają priorytety „Pilne” i „Zwykłe”; podpowiadane są magazyny posiadające sprzęt i obsadzony transport, według odległości geograficznej. Preferowane są wolne pojazdy logistyczne; ostatecznie dyżurny decyduje.
- ETA przed wyjazdem jest orientacyjna, a po wyznaczeniu trasy korzysta z czasu pozostałego pojazdu. Nie przedstawiać dystansu geograficznego jako dokładnej trasy OSRM.
- Brak zgodnego odbiorcy wywołuje jednorazowe ostrzeżenie, bez teleportacji i duplikacji sprzętu. Zbędne automatyczne, niezarezerwowane potrzeby KDR są anulowane po opanowaniu działań; historycznych ręcznych zgłoszeń nie dotykamy.
- Po rozpoznaniu premie dowodzenia i współpracy PSP/OSP trwają tak długo, jak wymagane obsadzone zastępy są na miejscu. Nie zależą od chwilowego wykonywania natarcia. Limit koordynacji +15% oraz warunki stanowiska dowodzenia pozostają.
- Telefon otwiera się jako zmaksymalizowany; godzina meldunku radiowego jest w jednej linii z danymi zastępu.
- Nowym katalogiem floty jest `fleet-catalog(8).json`; Brodła 429[K]49 i Grojec 429[K]68 otrzymały opisane powyżej korekty. Wszystkie 63 fotografie zachowane.
- Balansu AODO nie zmieniano. Praca w ODO daje modelowy wyższy wkład roty, rota asekuracyjna zajmuje ratowników i nie prowadzi natarcia, a brak osłony powoduje karę. To parametry gry, nie procedura do rzeczywistych działań.
- Pełna paczka źródłowa: tylko `Tests/verify_0643.py`, aktualny słowniczek oraz obowiązkowa dokumentacja. Kontrole statyczne po samodzielnym rozpakowaniu ZIP: 111/111 PASS. Kompilacja Windows/.NET 10/WPF niewykonana.
- Plan wersji 0.6.5.0 „Żywe zdarzenia” pozostaje osobny i niewdrożony: [PLAN-0.6.5.0-ZYWE-ZDARZENIA.md](./PLAN-0.6.5.0-ZYWE-ZDARZENIA.md).

### 0.6.5.0 — „Żywe zdarzenia” (18.11.2026; pełne źródła do odbioru)

- Zrealizowano źródłowo plan z [PLAN-0.6.5.0-ZYWE-ZDARZENIA.md](./PLAN-0.6.5.0-ZYWE-ZDARZENIA.md): aktywne pytania SKKP do KDR, opóźnione odpowiedzi oparte na stanie symulacji, dodatkowe meldunki rozwoju zagrożenia i postępu.
- Elektroniczne karty CPR otrzymują późniejsze **niepotwierdzone** informacje, które dyżurny przekazuje zastępom, a KDR potwierdza odbiór. Nie są to automatycznie potwierdzone fakty ze zdarzenia.
- Nowa zakładka **„Łączność i decyzje”** w istniejącej karcie zdarzenia obejmuje zapytania, aktualizacje CPR, listę spraw obserwującą istniejące rejestry logistyki i służb oraz chronologię decyzji. Bez osobnego okna; wspólny ciemny GUI.
- Nowe listy i znaczniki zapisywane przy `Incident` w `game.db`; historyczne aktywne zdarzenia bez sztucznego generowania dawnych zgłoszeń i rozmów.
- Flota nadal pochodzi z `fleet-catalog(8).json`: 29 remiz, 65 pojazdów, 63 zdjęcia; pozostają zasady 0.6.4.3, dotychczasowe premie, radio, telefon i logistyka.
- Pełne źródła 0.6.5.0: 286 plików, jedyny bieżący skrypt `Tests/verify_0650.py`. Test statyczny po niezależnym rozpakowaniu ZIP: **118/118 PASS**. Kontrola CRC ZIP: poprawna.
- **Nie potwierdzono kompilacji .NET 10/WPF ani uruchomienia GUI**: wymagany odbiór na Windows i test starszych `game.db`.
### 0.6.5.1 — „Polerka operacyjna” (18.11.2026)

- Radio po zakończeniu tankowania: bez nienaturalnej frazy „Pełna gotowość w modelu gry”; podawać zapasy i tylko rzeczywiście pozostałe ograniczenia.
- Służby: status i historia kontaktu z Policją, ZRM, energetyką, gazownikami i PKP PLK znajdują się w tej samej grupie co odpowiednie zadanie operacyjne KDR (np. „Zabezpieczenie ruchu”). Inne wezwania zachowują własną jedną kartę. W GUI wszystkie wpisy historii są widoczne pod właściwą służbą.
- Karta „Raport i sprzęt”: usunąć podpis „Dane pochodzą z symulacji…”, ale zachować ostrzeżenie o niepełnym raporcie.
- Karta pojazdu: usunięta zakładka „Wyposażenie wg typu” i metoda jej widoku. **Nie usuwać `Core/EquipmentProposals.cs` ani zależności używanych w migracjach.** „Edytuj dane” pozostaje na końcu.
- Motopompa: pokazywać wydajność w l/min, tak jak dla autopompy; przy nieznanej wartości używać „Brak danych”, a nie „na wyposażeniu”.
- Zweryfikowano nieograniczone zapasy **wody, koncentratu pianotwórczego i proszku w remizach**; skończone pojemności i automatyczne uzupełnianie na pojazdach: 250 l/min, 50 l/min i 50 kg/min. Nie przenosić limitów dawnego `StationFoamReserves` do rzeczywistego tankowania.
- Środki gaśnicze dobierane kontekstowo: bez uniwersalnej premii za pianę/proszek. Piana jest właściwa przy określonych pożarach cieczy, proszek szybko tłumi płomień, ale słabo chłodzi. Nie zmieniano obecnych mnożników silnika.
- Zachowane `fleet-catalog(8).json`, 29 remiz, 65 wozów i 63 fotografie; komplet 108 plików Assets niezmieniony względem 0.6.5.0.
- Pełny ZIP 0.6.5.1, 286 plików, wyłącznie `Tests/verify_0651.py`; **152/152 kontrole statyczne PASS po niezależnym rozpakowaniu ZIP**, poprawne CRC. Nie skompilowano ani nie uruchomiono Windows/.NET 10/WPF.

### 0.6.5.2 — „Radiowa dyscyplina” (18.11.2026)

- Usunięto przedwczesne meldunki o nieskuteczności zastępu **w czasie rozpoznania i sprawiania**; komunikaty okresowe/na żądanie zgłaszają przygotowanie, a braki dopiero po upływie rzeczywistego czasu przygotowania.
- Pierwszy zastęp na miejscu **nie mówi, że przejmuje dowodzenie** od nieistniejącego poprzednika; meldunek o przejęciu wyłącznie przy faktycznej zmianie KDR.
- Uzupełnienia CPR są rzadsze: pierwsze 6–8 min, drugie 12–15 min po poprzednim; maks. dwa i tylko **jedno otwarte uzupełnienie** na zdarzenie.
- Dyżurny przekazuje **jedną aktualizację do jednego adresata radiowego**: KDR na miejscu albo zastępu w dojeździe. Status przekazania i potwierdzenie odbioru w drodze zachowane w `game.db`, weryfikacja informacji dopiero podczas rozpoznania. Blokada następnej aktualizacji nie blokuje pozostałych zadań.
- W służbowych dialogach telefonicznych SKKP mówi **SKKP Chrzanów**, nie „Stanowisko”. Również stare kwestie sanitowane przy wyświetlaniu, bez nadpisywania zapisów.
- Usunięto **tylko górny przycisk „Wycofaj”** na karcie zdarzenia, pozostawiono wycofanie konkretnego wozu z listy i menu PPM.
- Zachowane wszystkie 108 plików Assets, 29 remiz, 65 pojazdów i 63 fotografie; nadal `fleet-catalog(8).json`.
- Pełny ZIP **286 plików**, jedyny `Tests/verify_0652.py`; **182/182 PASS** na kompletnym źródle i po niezależnym rozpakowaniu ZIP, CRC poprawne. **Bez kompilacji .NET 10/WPF**.
- Remiza.pl podaje historyczny procent „Gotowość” dla OSP KSRG za 2025, ale **nie jest to bieżąca dostępność dzienna/nocna**. Danych tych nie przenoszono automatycznie do symulacji.

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
