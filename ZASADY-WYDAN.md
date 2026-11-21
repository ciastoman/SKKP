# SKKP Professional 0.7.2.1 — zasady wydań, rozwoju i utrzymania

> **Dokument referencyjny projektu — stan na 19 listopada 2026 r.**  
> Ostatnia przygotowana pełna wersja źródeł: **0.7.9.5 „Wozy czytelne z bliska”**. Kontrole statyczne zaliczone; kompilacja WPF tej wersji na Windows pozostaje do odbioru.  
> Ten dokument utrwala ustalenia projektu między kolejnymi rozmowami ChatGPT. W przyszłych wydaniach aktualizuj go, gdy zmieni się któraś reguła. Ustalenia użytkownika z późniejszą datą mają pierwszeństwo.

## Wydanie SKKP 0.7.9.5 — „Wozy czytelne z bliska”

- **Najnowsza pełna baza źródłowa 0.7.9.5** na podstawie 0.7.9.4; naprawa „Micro Machines” na podglądzie 2D przy zoomie 10 m. Nie wracać do zbyt agresywnego limitu 25 DIP + 84% + transparentnego paddingu.
- **Wspólna geometria drogi i auta:** płynny cap wizualnej szerokości drogi 36 DIP przy 10 m, maleje do poprzednich 25 DIP przy 40 m. Sprite zajmuje do 92% tej szerokości, max 36 DIP, bez wymuszonego dużego minimum przy 300 m.
- **112 sprite PNG** w ByVehicle (65), Sprites (24), Fallback (23) przycięto wyłącznie do zawartości alfa (+2 px obramowania). Proporcje wynikają z faktycznego PNG po przycięciu, a nie ze stałego 2:1. W manifest.json są 112 kontrolnych SHA-256 oryginalnej zawartości alfa.
- Zachować indywidualne parkowanie każdego auta na lokalnej drodze OSM, stabilne pozycje, kolory PSP/OSP, popup i duży hitbox nawet przy drobnej ikonie. Nie zmieniać hydrauliki, KDR, Models.cs, Core/SimulationHost.cs, game.db i baz OSM.
- Pełna paczka: 420 plików, bieżące Tests/verify_0795.py i AUDYT-0.7.9.5.md, aktualny słownik, CHANGELOG, CIEKAWOSTKI, ROADMAP, TESTY-ODBIORCZE i WYNIKI-TESTOW. **475/475 statyczne PASS**, ponownie po niezależnym rozpakowaniu, CRC i SHA-256 PASS. **Nie wykonano kompilacji .NET/WPF** — Windows `build.ps1` i wizualny odbiór nadal konieczne.
- 0.8.0: rozwój pożarów na sąsiednie rzeczywiste budynki OSM pozostaje osobnym planem.

## Wydanie SKKP 0.7.9.4 — „Wozy na stanowiskach”

- Aktualną pełną bazą źródeł jest **0.7.9.4**, rozwijająca 0.7.9.3 i wszystkie poprzednie poprawki. **Nie przywracać gigantycznych sprite'ów na oddaleniu**.
- Sprite z góry musi mieć **krótszy wymiar maksymalnie 84% rysowanej szerokości jezdni OSM**, limit 22 DIP, bez narzuconego minimum 36 DIP. Proporcje PNG 2:1 zostają. Niewidoczny obszar kliku ma minimum 16 DIP niezależnie od grafiki; podpowiedź i kartoteka pozostają.
- Każdy pojazd **parkuje wzdłuż własnego lokalnego odcinka drogi**, z jego kierunkiem, nie z ogólnej wspólnej osi `roadDirection`. `TacticalParkingSpot0794` przechowuje geograficzny punkt i kąt w pamięci sceny przypisanej do zdarzenia; zmiana zoomu/panu nie może zmienić postoju.
- Wybierać punkty **wewnątrz** odcinków OSM, nie w samych wierzchołkach skrzyżowań; stosować odstęp ok. 14 m i niewielki offset na stronę namalowanej jezdni. Gdy nie ma danych o drodze, schematyczny fallback jest dopuszczony — bez wymyślania geometrii. Pompiarz po stronie własnego wozu.
- Skupiska wozów na dalekim zoomie mają być **kompaktowym kółkiem z liczbą**, nie kolejnym szerokim kaflem. Zachować 65/65 PNG, style PSP/OSP i hover bez mrugania.
- **Bez zmian**: `Models.cs`, `Core/SimulationHost.cs`, `build.ps1`, wszystkie 222 zasoby Assets, w tym 112 PNG, SQLite OSM, hydraulika, save/load `game.db`, zadania KDR i radio OSP.
- Pełne wydanie 0.7.9.4: 420 plików, tylko `Tests/verify_0794.py`, jeden `AUDYT-0.7.9.4.md`, uaktualniony słownik `Windows/FireGlossaryWindow.cs`, CHANGELOG, CIEKAWOSTKI, ROADMAP, wyniki/testy odbiorcze. **464/464 statyczne PASS** również po niezależnym rozpakowaniu, CRC i SHA-256 wszystkich plików PASS. **Nie wykonano kompilacji WPF/.NET** w środowisku Linux — Windows `build.ps1` i rzeczywista jakość obrazu do odbioru.
- Plan 0.8.0: realna deterministyczna mechanika rozprzestrzeniania pożaru na sąsiednie budynki OSM, z kompatybilnym zapisem — nie w 0.7.9.4.

## Wydanie SKKP 0.7.9.3 — „Wozy z lotu ptaka”

- **Nowa baza źródłowa: pełne SKKP Professional 0.7.9.3**, stworzone z 0.7.9.2 bez cofania poprawek Codexa. 0.7.6 pozostało oddzielnym niewdrożonym etapem.
- **Ikony 2D:** zamiast prostokątów dla znanej floty pokazywać oddzielne **ortograficzne PNG 256×128** z góry. Baza przypisań **65/65 pojazdów** z `Assets/fleet-catalog.json` do `Assets/TacticalVehicles/ByVehicle/{Id}.png`; 24 graficzne archetypy + 23 fallbacki po rodzinie typu + `manifest.json`. Marka/model wpływa na wybór stylizowanego archetypu; **nie twierdzić**, że grafika wiernie odtwarza wyposażenie dachu konkretnego wozu bez osobnej weryfikacji.
- **Zachować:** numer operacyjny i remiza w stabilnym popupie, klik w wóz otwiera kartotekę, zoom 10–300 m i grupowanie wozów. Nie drukować numerów na dachach. Obrys sylwetki **niebieski PSP** / **złoty OSP**. Dla obcego lub nieobsługiwanego pojazdu pozostawić wariant A jako awaryjną ikonę, nie jako podstawowe oznaczenie.
- `Windows/TacticalVehicleSprites0793.cs` buforuje `BitmapImage` (OnLoad, Freeze), rozwiązuje ID tylko z bezpiecznych nazw plików. `Windows/TacticalMapPanel070.cs` skaluje sprite i obraca według kierunku drogi. Bez dodatkowych zegarów i migracji game.db.
- **Publikacja:** `SKKP.Professional.csproj` musi jawnie kopiować wszystkie pliki PNG i manifest z `Assets/TacticalVehicles` do outputu/publish. **Jedyny skrypt build.ps1**, bez BUILD-WINDOWS.ps1.
- **Jakość:** pełny ZIP 0.7.9.3 zawiera 420 plików. **449/449 statycznych testów PASS** także po niezależnym rozpakowaniu, CRC i SHA-256 zgodne. **109/109 starych assetów niezmienionych**, bez zmian `Models.cs`, `Core/SimulationHost.cs` i `build.ps1`. Brak .NET SDK w środowisku autora — **Windows WPF i prędkość renderowania nadal wymagają testu**.
- Każde następne pełne wydanie: aktualizacja `Windows/FireGlossaryWindow.cs`, jeden najnowszy test, jeden audyt, WYNIKI-TESTOW, TESTY-ODBIORCZE, CHANGELOG, CIEKAWOSTKI, ROADMAP, ZASADY-WYDAN. Nie przenosić historycznych testów i kopii changelogów.
- **0.8.0 pozostaje planem**, nie wdrożeniem: rzeczywiste rozprzestrzenianie pożarów na sąsiednie obrysy OSM z deterministycznym modelem/save-load, warstwy mapy i optymalizacja renderera. Rozdzielacze tylko po dodaniu rzeczywistych danych.

## Wydanie SKKP 0.7.9.2 — „Zoom bez szarpania”

- **Najnowsza pełna baza: 0.7.9.2** na podstawie 0.7.9.1; zachowano poprawki Codexa, wariant A, OSP/PSP, węże, AODO, popupy i legendę. Bez zmiany mechaniki symulacji.
- **Naprawa płynności zoomu 2D:** rolka 10–300 m natychmiast uruchamia jedną macierz `MatrixTransform` dla podkładu OSM i warstwy akcji (`background` i `action`), z animacją `CompositionTarget.Rendering` w ok. 36 ms stałej czasowej.
- Macierz jest **zawsze liczona od ostatniego naprawdę narysowanego kadru** (`paintedRadius0792`, `paintedPan0792`), a nie mnożona od poprzedniego ruchu kółka; nie powoduje dryftu punktów.
- **Kotwica pod kursorem:** dokładnie zachowywać współrzędne geograficzne pod myszą. Po ostatnim ruchu rolki 190 ms debounce, jeden ponowny odczyt SQLite i odtworzenie sceny w identycznych współrzędnych; po drodze cykliczne `Refresh` z silnika nie wywołuje ciężkich przerysowań.
- Panel chowa popup wozu na czas przewijania, aby obszary interakcji nie odnosiły się do starej pozycji. Animacje `CompositionTarget.Rendering` i timery muszą być odpinane na Unloaded, przy ukryciu, zmianie karty/zdarzenia, resize i ręcznym przesuwaniu.
- Bez zmian `Models.cs`, `Core/SimulationHost.cs`, `Core/TacticalMap070.cs`, `Windows/TacticalMapActivity075.cs`, `build.ps1`, floty, geometrii offline i `game.db`. Brak nowego budowania `BUILD-WINDOWS.ps1`.
- **Pełna paczka 0.7.9.2**: 306 plików, 109/109 zasobów bajtowo identycznych z 0.7.9.1, jeden `Tests/verify_0792.py` oraz jeden `AUDYT-0.7.9.2.md`, aktualny słowniczek, README, CHANGELOG, CIEKAWOSTKI, ROADMAP, testy odbiorcze. **430/430 PASS** także po niezależnym rozpakowaniu, matematyka kamery przetestowana na 2400 losowych scenach, CRC i SHA-256 PASS.
- **Nie wykonano kompilacji WPF na Windowsie**; uruchom `build.ps1` i sprawdź płynność na docelowym PC. Końcowy jednorazowy render przy bardzo gęstym OSM może jeszcze obciążać WPF; rozważyć `DrawingVisual`/cache w kolejnym etapie.
- Planowana 0.8.0: rzeczywisty, deterministyczny model rozprzestrzeniania ognia na sąsiednie budynki OSM z save/load; sprite'y GBA dopiero po osobnym odbiorze.

## Wydanie SKKP 0.7.9.1 — „Taktyczne szlify” (wdrożone)

- **Najnowsza pełna baza: 0.7.9.1** na podstawie pełnego ZIP 0.7.9. Zachowuje poprawki Codexa, 0.7.7/0.7.8 i wariant A. Bez zmian w silniku pożarów.
- **Zoom 10–300 m bez presetów**: promień double, rolka ze współrzędną kursora jako kotwicą, przyciski +/−, debounce odczytu OSM.
- **Wąż zasilający:** WaterConnection istnieje niezależnie od możliwości pokazania węża. Jeśli bezpiecznej trasy brak, przy odbiorcy znak ? z opisem, nigdy rysunek przez znane ściany. Hydraulika bez zmian.
- **AODO/ewakuacja:** stanowiska wybierane lokalnie, do ok. 42 m od centrum zagrożenia, odrzucenie trasy >110 m; bez teleportów i nieprawdziwych przejść.
- **Numer pompy:** WaterSupplyNetwork.ExplainFlowLimit korzysta z VehicleLabels04841.Display(state,pump.Id), nie surowego ID.
- **Popup:** trwała nakładka nad mapą zamiast tworzonego na nowo WPF ToolTip; numer operacyjny, remiza, status i OSP/PSP.
- **Wariant A:** czerwony znacznik typu, złota ramka OSP / niebieska PSP na podstawie Vehicle.IsPsp; formacja słownie w popupie.
- **Legenda pod i:** wiersze i sekcje, przewijalna i dopasowywana do panelu. Rzeczywiste DPI/WPF do odbioru na Windows.
- **Bez zmian:** Models.cs, Core/SimulationHost.cs, build.ps1, Assets (109/109), OSM, game.db, hydraulika, KDR, radio i telefon. OSP komunikuje się radiowo.
- Pełny ZIP 0.7.9.1 ma **306 plików**, tylko bieżący Tests/verify_0791.py i AUDYT-0.7.9.1.md, aktualny FireGlossary, CHANGELOG, CIEKAWOSTKI i ROADMAP. **418/418 statycznych PASS** również po niezależnym rozpakowaniu; CRC/SHA PASS. **Brak kompilacji .NET/WPF**, należy uruchomić build.ps1 na Windows.
- **Plan 0.8.0:** rzeczywista mechanika rozprzestrzeniania pożarów na sąsiednie budynki OSM; ortograficzne sprite'y GBA po osobnym odbiorze. Nie są wdrożone w 0.7.9.1.

## Plan poprawek 2D i symulacji po 0.7.9 — zgłoszenia 21.11.2026

**Priorytet: naprawa regresji 0.7.9 przed efektami graficznymi 0.8.0.** To wymagania i plan, NIE twierdzenie, że zostały wdrożone.

1. **Czasem niewidoczna linia węża zasilającego:** w `Windows/TacticalMapActivity075.cs::DrawWaterLines` linie są obecnie filtrowane po `incident.ReconCompleted`, aktywności zdarzenia, `positions.ContainsKey(c.TargetVehicleId)`, a `SupplyPath075` może oddać tylko `[target]`, więc bez odcinka do narysowania. Dodatkowo rzut poza kadrem i brak ścieżki planera może wygasić wizualizację. Oddzielić istnienie połączenia w `WaterConnections` od wyświetlania, zdiagnozować i stabilnie wizualizować statusy rozwijana/aktywna/przerwana/zwijana, także dla źródła poza kadrem. Brak legalnej trasy nie usprawiedliwia graficznego przejścia przez budynek; pokazać informację o niewyznaczonej geometrii, a nie wymyślony wąż. **Hydraulika bez zmian.**
2. **Rota ewakuacyjna i AODO pracuje blisko zagrożenia:** `TacticalMapActivity075.cs::PrepareRota` obecnie daje `spread=23` oraz cel zależny od `SceneDestination073`, ale A* potrafi prowadzić długimi objazdami wokół wsi. Rozpoznać miejsce zdarzenia jako kotwicę, wyznaczyć najbliższe dostępne bezpieczne stanowisko w rozsądnym, ograniczonym promieniu (zależnym od strefy bezpieczeństwa); nie wyświetlać nieuzasadnionych dalekich marszów ani teleportów. Zachować logikę AODO, ewakuacji i ochrony załogi w silniku.
3. **Płynny, bezstopniowy zoom rolką 10–300 m:** obecnie `TacticalMapPanel070.cs` ma `ZoomLevels={40,80,160,300}`, `int radius`, `Array.IndexOf` i skokowe przybliżenia. Zastąpić promieniem `double`, zmianą multiplikatywną według `e.Delta`, ograniczeniem 10–300 m, zoomowaniem względem pozycji kursora (ta sama współrzędna geograficzna zostaje pod myszą), krótkim debounce/przeładowaniem geometrii, kontrolą obciążenia przy 10 m i stabilnością tras/markerów. Nie naruszać dotychczasowej dokładności OSM i możliwość przewijania kółkiem. Zamienić przyciski poziomów na +/− lub sterowanie opcjonalne bez narzucania stopni.
4. **Numer operacyjny zamiast ID w ograniczeniu przepływu:** w `Core/WaterSupplyNetwork.cs::ExplainFlowLimit` występuje `pompa {pump.Id}`, zamienić na `VehicleLabels04841.Display(state,pump.Id)` / `pump.DisplayNumber`; zrobić audyt innych widocznych dla gracza komunikatów linii, np. `SimulationHost` i potwierdzenie rozłączenia w `WaterSupplyDiagramPanel`. Techniczne ID pozostają wewnętrznym kluczem zapisów.
5. **Migający popup wozu:** `TacticalMapPanel070.cs::DrawAction` robi `action.Children.Clear()` przy aktualizacji, a `AddVehicleMarker0732` za każdym razem tworzy nowy `Border` i `ToolTip`; tym samym pod kursorem tooltip zaczyna cykl od nowa. Utrzymać markery/tooltipy w stabilnym keyed overlay lub aktualizować in-place, aktualizując pozycję/treść bez niszczenia obiektu; zamknąć przy usunięciu pojazdu/wyjściu poza mapę.
6. **Kolorystyka OSP vs PSP:** zachować czerwony korpus wozów (wariant A), rozróżnić straże nierzucającym się w oczy, odpornym na daltonizm kodem: obwódka **złota dla OSP**, **granatowo/niebieska dla PSP** oraz alternatywnie mały znak O/P na wyższym zoomie i opis słowny w popupie. Zidentyfikować formację na podstawie rzeczywistego rekordu jednostki/remizy, nie zgadywać z typu samochodu; inny kolor nie może oznaczać stanu lub poziomu alarmu.
7. **Legenda 2D:** zastąpić jednolitym `TextBlock` z długimi zdaniami (aktualnie `legendPanel079`) układ sekcji/własnych wierszy z piktogramem i opisem: pojazdy, roty, linie wodne, zagrożenia i służby. Panel pod `i` zostaje, przewijany przy małym oknie, 125–150% DPI, zamykany kliknięciem/Esc/poza.
8. **Sprite GBA z rzeczywistego rzutu pionowo z góry:** prototyp do przeglądu; mała ikona bez frontalnej perspektywy, bez drobnego numeru operacyjnego w grafice (numer z popupu), przezroczyste tło; tworzyć LOD/wielkości 32–128 px i skalować wraz z mapą, obracać wg kierunku drogi. NIE zastępować w ciemno wszystkich znaczników wariantu A — zachować fallback i pozwolić ocenić czytelność.
9. **0.8.0 — rozprzestrzenianie pożaru na sąsiednie budynki:** zaplanować jako nową **mechanikę symulacji, nie tylko efekt graficzny**. Wybrać realne obrysy budynków OSM i mierzyć odległość/sąsiedztwo; stan budynku (zagrożony/objęty ogniem/opanowany) oraz przenoszenie oddziaływania z kontrolą czasu i strat, z uwzględnieniem dostępnych danych i pracy ratowników. Nie wymyślać materiałów budynków ani wiatru, jeśli brak ich w danych; nie rozszerzać samoczynnie na cały teren; limity liczby obiektów, deterministyczność seed/save/load, odpowiednie radio/KDR i wpływ na bilans, testy scen miejskich i wiejskich. Wdrożenie etapowe: audyt danych i model ryzyka -> mechanika -> wizualizacja. Może wymagać zmiany modeli/zapisów, więc zaplanować kompatybilną migrację.
10. **Zasady wydania:** dopiero po implementacji pełny build z aktualnym słowniczkiem, tylko testem i wynikami tej wersji, CHANGELOG, CIEKAWOSTKI, ROADMAP i audytem; podstawowy `build.ps1`. WPF/.NET trzeba naprawdę skompilować na Windowsie przed deklaracją buildu działającego.

## Ustalenia SKKP 0.7.9 — „Taktyka bez przeszkód”

- **Najbliższa aktualna baza**: pełna paczka 0.7.9, oparta bezpośrednio na 0.7.8; zachowano zmiany z 0.7.5.1/0.7.7/0.7.8 i wariant A pojazdów. 0.7.6 wciąż niewdrożone jako osobny etap.
- **Węże natarcia i zasilania omijają znane obrysy budynków i zamknięte ogrodzenia** z lokalnego OSM przez istniejący `TacticalWalkingGrid077` (A*). Widoczna część linii może zaczynać się na krawędzi kadru, gdy źródło jest poza widokiem. Brak bezpiecznej trasy = nie rysować odcinka przez ścianę; nie zmieniać fizycznej hydrauliki, modeli i liczników gry.
- **Drogi połączone na skrzyżowaniach**: najpierw wszystkie obwódki odcinków OSM, następnie wszystkie powierzchnie. Bez fikcyjnych połączeń.
- **Znacznik wozu wariant A** bez numeru operacyjnego; po najechaniu tooltip z numerem operacyjnym, remizą i statusem; kliknięcie otwiera dotychczasową kartotekę.
- **Pompiarz**: tylko istniejący członek obsady, graficznie obok wozu przy aktywnej pracy pompy (offset zależny od znaku, kierunku drogi i zoomu), nie osobna fikcyjna rota.
- **Legenda taktyczna** domyślnie schowana pod przyciskiem `i` w prawym górnym rogu, jak w `Assets/map.html`; ponowne kliknięcie/Esc/kliknięcie poza zamyka ją.
- **Telefon**: krótsze wypowiedzi zależne od partnera (Policja, ZRM, energetyka, zewnętrzne zasoby typu rotator), bez dublowania prośby i bez fałszywego wyjazdu. **OSP i KDR łączność radiowa, NIE telefon**. Przykłady w `DIALOGI-TELEFONICZNE-0.7.9.md` do dalszego przeglądu.
- **Żywe zdarzenia**: tylko subtelne efekty pożaru, dymu i zalania zależne od faktycznego rozpoznania i stanu symulacji, bez nowego silnika.
- **Jedynym skryptem publikującym pozostaje `build.ps1`**. Nie dodawać `BUILD-WINDOWS.ps1`. Skrypt w 0.7.9 bajtowo taki sam jak w 0.7.8.
- Pełny ZIP **306 plików**, **109/109 Assets bez zmian**, `Models.cs` i `Core/SimulationHost.cs` bez zmian. Jeden najnowszy `Tests/verify_079.py`, jeden `AUDYT-0.7.9.md`, aktualny FireGlossary, README, CHANGELOG, CIEKAWOSTKI, ROADMAP, testy odbiorcze. **392/392 testów statycznych PASS** po niezależnym rozpakowaniu, CRC i SHA-256 PASS; **nie wykonano kompilacji .NET/WPF** (brak SDK w środowisku). Windows build i odbiór runtime pozostają konieczne.
- Następny duży etap **0.8.0 „Taktyczny obraz akcji”**: warstwy mapy, śledzenie rot, mini-plan, wydajność/DPI. Rozdzielacze tylko po dodaniu prawdziwych danych sprzętu.

## Wymagania na najbliższe wydanie po 0.7.8 — 2D i rozmowy telefoniczne

### Korekta: OSP komunikuje się przez radio (21.11.2026)

- **Jednostki OSP komunikują się z SKKP przez RADIO**, a nie przez telefon służbowy. Dotyczy to m.in. braku możliwości wyjazdu, potwierdzenia wyjazdu, dojazdu, meldunków z miejsca działań i powrotów. Meldunki muszą być zwięzłe, naturalne i osadzone w istniejącej logice radiowej.
- Z planowanej biblioteki **dialogów telefonicznych 0.7.9** usunąć scenariusz „OSP — brak możliwości wyjazdu” i wszelkie automatyczne telefoniczne powiadomienia OSP; przenieść odpowiednie wypowiedzi do **katalogu kwestii radiowych OSP**.
- Telefon służbowy pozostaje do kontaktów z CPR i służbami/partnerami zewnętrznymi (np. dyspozytornia ZRM, Policja, pogotowie energetyczne, wsparcie spoza powiatu) zależnie od faktycznego workflow w grze. Nie podwajać tą drogą meldunków OSP.
- Przykładowy meldunek radiowy: **„998 Chrzanów, OSP [nazwa]. Nie zbierzemy obsady, nie wyjedziemy.”** Odpowiedź dyżurnego: **„Przyjąłem, OSP [nazwa].”** Uwaga: kwestie są propozycją do korekty przed implementacją; status braku wyjazdu musi być zgodny z silnikiem.



Ustalenia użytkownika z 21.11.2026 — **do wdrożenia w najbliższym pełnym wydaniu** (roboczo 0.7.9), niezależnie od szerszego planu „Żywe zdarzenia”:

1. **Pompiarz na 2D stoi przy swoim wozie**, nie wyraźnie odsunięty od samochodu. W 0.7.8 `Windows/TacticalMapPanel070.cs` rysuje istniejącego operatora jako `driver:` z offsetem `vp.X-WorldPixels074(35), vp.Y+WorldPixels074(4)`; zmniejszyć go, dopasować do aktualnego znaku pojazdu i skali 40/80/160/300 m, unikać nakładania. Operator pozostaje **tym samym członkiem obsady**, bez tworzenia fikcyjnego człowieka. Pompiarz tylko przy istniejącej aktywnej pracy pompy, nie przy dowolnym GBA.
2. **Skrypty:** podstawowym i jedynym skryptem wydania ma być istniejący **`build.ps1`**; usunąć dodatkowy **`BUILD-WINDOWS.ps1`** w następnej pełnej paczce, nie dodawać zastępczego. Sprawdzono zawartość w 0.7.8: `build.ps1` wywołuje `dotnet publish SKKP.Professional.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true -o publish`, kontroluje kod wyjścia. Skrypt jest zgodny na poziomie przeglądu źródeł; **rzeczywistego uruchomienia na Windows/.NET nie potwierdzono**, więc konieczny odbiór.
3. **Legenda 2D domyślnie ukryta pod przyciskiem „i”**, wygląd, położenie i zachowanie jak przycisk legendy na głównej mapie `Assets/map.html` (`#legendToggle`, prawy górny róg, ikona `i`, rozwijany panel). Obecnie legenda 2D jest tooltipem na całej ramce mapy w `Windows/TacticalMapPanel070.cs`; zastąpić obsługą kliknięcia i zamykania (ponowne kliknięcie, Esc/kliknięcie poza), przy poprawnej obsłudze klawiatury oraz układu na 125–150% DPI.
4. **Telefon bardziej ludzki, zwięzły, zależny od sytuacji.** W 0.7.8 `Core/PhoneDialogue0627.cs` generuje ogólne `Outbound`, `Response`, `Openers`, `Confirmations`; `Core/PhoneQuickReplies0629HF1.cs` oferuje sztywne opcje. Przygotować i zatwierdzić z użytkownikiem scenariusze, a potem wdrożyć **małe, sytuacyjne zestawy wypowiedzi**: CPR i dopytanie, brak wyjazdu OSP, skierowanie ZRM/Policji/pogotowia, zewnętrzny sprzęt specjalistyczny (np. faktyczny `DAB_ROTATOR` w `Core/ExternalSupport0622.cs`), brak dostępności/oddzwonienie, potwierdzenie wyjazdu/dojazdu. Skracać naturalnie, bez `#ID`, bez „potrzebujemy wsparcia rotator, proszę o dysponowanie rotator”. **Nie tworzyć faktów ani statusów:** powiadomienie ≠ przyjęcie ≠ wyjazd ≠ dojazd. Teksty do zatwierdzenia to propozycje, nie gotowy kodeks produkcyjny.
5. Przy następnym wydaniu: **pełny ZIP**, aktualizacja `Windows/FireGlossaryWindow.cs`, tylko najnowsze testy i audyt, CHANGELOG, CIEKAWOSTKI, ROADMAP; regresja OSM, obsady, radia i hydrauliki.

## Ustalenia SKKP 0.7.8 — „Rozwinięcie bojowe”

- **Aktualna baza źródeł: pełna paczka 0.7.8**, zbudowana na 0.7.7 „Strażacy w terenie” (wcześniej 0.7.5.1 od Codexa). Nie mieszać kodu ze starszym 0.7.4.1 i nie uznawać 0.7.6 za wdrożone.
- **Pełnopanelowy 2D**: w `TacticalMapPanel070` nie używać sztywnego `Viewbox` 960×600. Wymiary sceny są równe faktycznemu obszarowi tab, zmiana rozmiaru powoduje ponowne wyliczenie współrzędnych po debounce 170 ms. Nigdy nie rozciągać geometrii OSM. Skala lokalnych odległości musi uwzględniać zarówno promień 40/80/160/300 m, jak i wysokość panelu.
- **Zapytania OSM**: lokalny indeks `TacticalMap070.Load(...,aspectRatio)` ma wczytać obszar według aktualnej proporcji W/H. Pieszy planer `TacticalWalkingGrid077.Build(features,Project,W,H)` skaluje siatkę z limitem około 240×160 pól; nadal unika budynków i zamkniętych ogrodzeń oraz respektuje bramy. Bez fikcyjnego przejścia.
- **Kartografia**: delikatne wektorowe deseniowanie lasów i terenu zielonego, gradient wody, cienie budynków i podwójne obrysy jezdni dla zbliżeń 40/80/160 m. Nie fabrykować budynków, drzew i wejść.
- **Hydraulika na 2D**: wizualna długość linii zasilającej rośnie w statusie `Rozwijanie` według `SetupRemainingMinutes`, maleje w `Zwijanie linii` według `MinutesRemaining`; zachować różnicę między celowym zwijaniem a awarią. Krótka, subtelna struga natarcia tylko dla istniejącej roty z rzeczywistym przepływem. Nie zmieniać żadnego czasu ani przepływu w silniku.
- **Nie tworzyć fikcyjnych rozdzielaczy**: obecny model nie przechowuje rzeczywistej armatury i położenia, dlatego rozdzielacze i osobne odcinki W75/W52 są odłożone do momentu powiązania z danymi i rozkazami.
- **Zachować** wariant A pojazdów, radio zwięzłe z pilnymi meldunkami, wszystkie zmiany Codexa, 29 remiz / 65 pojazdów / 63 zdjęcia, offline SQLite 111 749 obiektów; w 0.7.8 **109/109 Assets bajtowo identycznych** z 0.7.7 i bez modyfikacji `Models.cs`, `Core/SimulationHost.cs`, `game.db`.
- Wydanie 0.7.8 jest pełnym ZIP z **jednym** audytem `AUDYT-0.7.8.md`, **jednym** testem `Tests/verify_078.py`, README, CHANGELOG, CIEKAWOSTKI, ROADMAP, zasadami i testami odbiorczymi. Słownik `Windows/FireGlossaryWindow.cs` obowiązkowo aktualizowany w każdym wydaniu. **366/366 statycznych kontroli PASS**, CRC i SHA-256 plików po niezależnym rozpakowaniu PASS; **Windows/.NET/WPF niekompilowane**, trzeba odpalić `BUILD-WINDOWS.ps1`.
- Dalej: 0.7.8.x armatura po rozbudowie modeli, 0.7.9 „Żywe zdarzenia”, 0.8.0 „Taktyczny obraz akcji”, osobno 0.7.6 „Dyżurka pod obciążeniem”.

## Ustalenia SKKP 0.7.7 — „Strażacy w terenie”

- **Nową bazą źródłową jest 0.7.7**, zbudowana bezpośrednio z dostarczonych przez użytkownika pełnych źródeł **0.7.5.1 od Codexa**. Wersja **0.7.6 „Dyżurka pod obciążeniem” nie została tym krokiem wdrożona**; użytkownik celowo wybrał numer 0.7.7 dla rozwoju podglądu 2D.
- Dodać **pieszy planer na lokalnych obrysach OSM** `Windows/TacticalWalkingGrid077.cs`: bounded grid 120×75, A*, omijanie budynków i zamkniętych barier, możliwość przejścia przez oznaczone bramy, ochrona narożników i wygładzanie. Przy braku ścieżki nie wizualizować przejścia przez znaną ścianę; tylko bez faktycznej geometrii obowiązuje dotychczasowy schematyczny fallback.
- **Animacja rot** na współrzędnych geograficznych i wielopunktowych trasach; tempo proporcjonalne do długości trasy. Zmiana zadania lub kadru przeplanowuje marsz z bieżącego położenia, pauza zatrzymuje przejście, linia natarcia nadal kończy się na właściwej rocie. Nie wpływać na czasy pracy w silniku.
- **Stanowiska pojazdów** `Windows/TacticalParking077.cs` wyznaczać na istniejących przejezdnych odcinkach dróg OSM, z zachowaniem odstępu i zapamiętaniem współrzędnych w pamięci sceny; gdy brak drogi, korzystać ze schematycznego fallbacku. Nie dopisywać pozycji do `game.db`.
- Zostają bez zmian: **wariant A**, skale 40/80/160/300 m, 29 remiz, 65 wozów, 63 zdjęcia, 111 749 geometrii, hydraulika, KDR, zwięzłe radio i telefon, pilne alerty wody/AODO, płynność ×10/×15. Potwierdzone **109/109 zasobów bez zmian** względem 0.7.5.1.
- **Pełny ZIP 0.7.7** zawiera bieżące `Tests/verify_077.py`, aktualny słownik i pojedynczy audyt 0.7.7, CHANGELOG, CIEKAWOSTKI, ROADMAP, wyniki i testy odbiorcze. **324/324 statyczne kontrole PASS**, również po niezależnym rozpakowaniu 302 plików, CRC PASS; kompilacja WPF i gra na Windows pozostają do odbioru.
- Plan: **0.7.8 „Rozwinięcie bojowe”**, **0.7.9 „Żywe zdarzenia”**, **0.8.0 „Taktyczny obraz akcji”**; oddzielnie nieukończona dyżurka 0.7.6.

## Ustalenia SKKP 0.7.4.1 — „Radiowa dyscyplina”

- Rutynowe meldunki radiowe tylko dla zdarzeń operacyjnych: wyjazd zastępu, przyjazd na miejsce, jednorazowe rozpoczęcie rozpoznania, jednorazowy meldunek KDR o faktycznie zbliżającym się końcu prac oraz wyjazd z miejsca akcji. **Usunąć automatyczne raporty co 5/15/30 minut** i meldunki postępu 50/85% w radiu; postęp nadal zapisany w historii.
- Pilne alerty o poszkodowanych, wodzie, AODO, problemie sprzętowym, braku obsady, eskalacji zagrożenia i nieudanym dowozie pozostają w radiu i mogą wymagać potwierdzenia; ręczne pytania KDR/odpowiedzi pozostają niezależne.
- Rutynowa obsługa magazynu, zwijanie węży, statusy służb, zakończone zadania rot i powroty do remiz trafiają do historii, nie generują dodatkowego głosu.
- Opcjonalne flagi `Incident.ReconStartedRadio0741` i `Incident.NearFinishRadio0741` w istniejącym JSON zdarzenia zapobiegają ponownej transmisji po save/load lub zmianie KDR. **Brak migracji tabel SQL**.
- Przyśpieszyć wyłącznie **wizualizację** ruchu rot na mapie 2D (marsz 0,90 min zamiast 2,0; interpolacja 330 ms zamiast 750), zachowując rzeczywisty czas rozpoznania, prac, obsad, wody i AODO.
- Zachować **wariant A** znaczników, zoom 40/80/160/300 m, skupiska, faktyczne służby i odcinki KDR z 0.7.4.
- Pełna paczka źródeł 0.7.4.1 z tylko bieżącym `Tests/verify_0741.py`, zaktualizowanym słownikiem, README, CHANGELOG, CIEKAWOSTKI, ROADMAP, audytem i testami odbiorczymi. Kontrole statyczne **277/277 PASS** także po niezależnym rozpakowaniu; Windows/WPF nadal wymaga kompilacji.

## Ustalenia SKKP 0.7.4 — „Duża akcja”

- Pełny build **0.7.4** na bazie 0.7.3.3; zachować hotfix **wariantu A** pojazdów na mapie (czerwony zaokrąglony prostokąt z kodem typu, bez dolnego paska), łączność i zoom 40 m.
- **Naprawa zoomu:** geometria OSM, pozycje wozów, rot, KDR, operatorów i stref muszą korzystać ze wspólnej projekcji. Odległości taktyczne mnożyć przez `WorldScale074=160/radius` dla 40/80/160/300 m. Rozmiary znaczników również maleją przy oddalaniu, z ograniczeniem czytelności. Po zmianie zoomu i panie zerować wyłącznie `previousPositions` animacji, bez zmiany stanu gry. Geograficzną kotwicę postoju zachować dla danego zdarzenia między zmianami kadru — bez wybierania nowej drogi na każdym zoomie.
- **Duża akcja:** grupować bliskie pojazdy na skali 160/300 m, pozostawiając menu wskazujące faktyczne wozy. Roty natarcia z podłączonym prądem mają zachować własny symbol. Grupowanie nie tworzy nowych jednostek.
- **Służby współdziałające na 2D:** znacznik dopiero przy `ArrivedAt`, statusie `Arrived`/`Working`, fizycznym typie służby i braku rozpoczętego powrotu. Brak ikon dla powiadomionych, będących w drodze, SKKW/PKP PLK działających zdalnie.
- **Odcinki KDR:** pokazywać tylko istniejące niezamknięte odcinki z obecnymi, przypisanymi wozami. Obwiednia nie stanowi geodezyjnej granicy ani nowego rozkazu.
- **Bez zmian**: `Models.cs`, `Core/SimulationHost.cs`, hydraulika, `game.db`, 29 remiz, 65 pojazdów, 63 zdjęcia i cały indeks OSM. Testy statyczne **270/270 PASS** również po niezależnym rozpakowaniu ZIP, CRC PASS; kompilacja WPF na Windows pozostaje do odbioru.
- Pełne wydania zawierają tylko bieżący test `Tests/verify_074.py`, aktualny słowniczek, README, CHANGELOG, CIEKAWOSTKI, ROADMAP, audyt i testy odbiorcze. **Plan 0.7.5 „Taktyczna czytelność”**: UX grup, etykiety sektorów, duże DPI i x10/x15, ewentualna warstwa miejscowości `place=*` po dostarczeniu danych.

## Ustalenia SKKP 0.7.3.3 — „Konkret na łączności”

- Bazą każdego kolejnego wydania jest **0.7.3.3**, z wariantem A z hotfixa 0.7.3.2. **Nie przywracać wariantu B** bez decyzji użytkownika. Wariant A: kompaktowy czerwony prostokąt z zaokrąglonymi rogami, biały kod typu GBA/GBARt/GCBA, numer operacyjny tylko w tooltipie i kartotece.
- **Radio KDR**: krótko i na temat. Pytania i odpowiedzi bez sformułowań typu „w odpowiedzi na pytanie o poszkodowanych”. Rozróżniać poszkodowanych, osoby zagrożone i ewakuowane, nie dopisywać obrażeń.
- **Telefon służbowy**: zwięzła, naturalna rozmowa, bez powtarzania „potrzebujemy wsparcia rotator / proszę o dysponowanie rotator”. Jedna prośba o konkretny zasób i rzeczowy powód. Sam telefon nie oznacza potwierdzenia wyjazdu ani przyjazdu.
- **Karta zdarzenia**: usunięty przycisk „Status i historia służb”. Informacje i historia pozostają w wewnętrznej podzakładce „Służby współdziałające” w „Łączność i decyzje”; przycisk „Powiadom służby” zachować.
- **Mapa taktyczna 2D**: zoom **40/80/160/300 m**, rolka i przeciąganie; na 40 m większa czytelność adresów, przy zachowaniu kolizji etykiet.
- **0.7.3.3**: pełna paczka źródłowa ze zaktualizowanym słownikiem oraz tylko bieżącym testem `Tests/verify_0733.py`. Kontrole **224/224 PASS**, ponownie po rozpakowaniu ZIP; kompilacja i rzeczywisty odbiór WPF na Windows jeszcze niewykonane.
- **Plan 0.7.4 „Duża akcja”**: grupowanie wozów, rzeczywista obecność współdziałających służb, odcinki KDR, płynność przy ×10/×15 i wysokim DPI. Nie dodawać automatycznego dowodzenia ani fikcyjnych zasobów.

## Ustalenia SKKP 0.7.3.1 — „Wariant B”

- Użytkownik wybrał **wariant B** pojazdów na planszy taktycznej: niewielki czerwony prostokąt z zaokrąglonymi rogami, kodem typu u góry i prawdziwym numerem operacyjnym na ciemniejszym dolnym pasku.
- Rozmiary znacznika 50–78 × 29 DIP. Należy zachować kliknięcie otwierające kartotekę, możliwość przeciągania podkładu, zoom i odrębne znaczniki rot.
- Zakres wersji 0.7.3.1 jest wyłącznie prezentacyjny. Bez zmian `game.db`, floty, logiki zdarzeń/KDR/CPR, hydrauliki i OSM.
- Pełny ZIP, aktualny słownik i tylko `Tests/verify_0731.py`. Kontrole statyczne **197/197 PASS** także po rozpakowaniu; kompilacja Windows/WPF do odbioru użytkownika.

## Ustalenia SKKP 0.7.3 — „Taktyka wielu scenariuszy”

- Pełne źródło bazuje na **0.7.2.2**, które użytkownik potwierdził jako działające. W 0.7.3 renderer 2D dostaje profile dla wypadków drogowych, pożarów lasu/traw, zalania, drzewa na drodze i potwierdzonych zagrożeń gazowych/elektrycznych.
- **Odrębne rozmieszczenie rot** zależy od profilu, rzeczywistej obsady i przydziału KDR. Rota zabezpieczenia działa na obwodzie. Istniejące linie wężowe, zoom, pan i etykiety adresów pozostają.
- Wypadek: stan stabilizacji i zabezpieczenie wyłącznie z aktualnego silnika; nie pokazywać niepotwierdzonej liczby pojazdów ani osób.
- Las i trawy: symboliczne obrysy na podstawie intensywności i etapu ekspozycji; obrona tylko dla rzeczywistych zastępów KDR.
- Zalanie: odróżnić **rzeczywistą wydajność odpompowania** (`FloodActualRate054`) od **wydajności dostępnych pomp** (`AvailableFloodRate`). Nie mylić zalanej wody z wodą w zbiornikach GBA.
- GAZ/ENERGIA: potwierdzony `SafetyHazard0624` po rozpoznaniu, usunięcie strefy alarmowej dopiero po faktycznym zakończeniu zadania służby.
- Profil akwenów jest **przygotowany na przyszłość**, ale nie dodano scenariuszy wodnych, łodzi, nurków ani nowych poszkodowanych.
- **Nie zmieniono** `Models.cs`, `Core/SimulationHost.cs`, silnika KDR ani `game.db`. Nie tworzono nowych timerów, wyjazdów, ludzi ani obiektów ratowniczych.
- Pełna paczka ZIP zawiera aktualny słowniczek, CHANGELOG, CIEKAWOSTKI, ROADMAP, audyt i **wyłącznie test bieżącej wersji**. Kontrole statyczne **187/187 PASS** (również po rozpakowaniu). Kompilacja Windows/WPF wymaga testu użytkownika.
- **Plan 0.7.4**: „Duża akcja” — grupowanie wielu jednostek, prawdziwa obecność służb współdziałających, odcinki KDR i wydajność dużych scen.

## Ustalenia SKKP 0.7.2.2 — „Czytelna mapa”

- Czerwone elipsy wozów na mapie 2D są kompaktowe (**42–64 × 23 DIP**, zależnie od typu), z nadal widocznym mniejszym numerem operacyjnym i kliknięciem w kartotekę.
- Podkład zachowuje 111 749 obiektów OSM, a baza offline zawiera teraz tabelę `map_label` z **23 393** realnymi numerami domów oraz **4 933** nazwanymi odcinkami dróg po filtrze funkcji jezdni. Etykiety nie są pobierane przez Internet.
- Skala **80 m**: do 34 numerów domów; **160 m**: do 14; **300 m**: bez numerów. Nazwy ulic wyświetlać selektywnie bez duplikatów, z ograniczeniem nakładania napisów.
- Miejscowość w rogu sceny wyznaczać z najbliższego `addr:city`, tylko gdy istnieje w danych adresowych. Pełne dokładne punkty `place=*` wymagają osobnego eksportu dla całego powiatu. Nie wymyślać nazw ani adresów.
- Zachować wszystkie mechaniki KDR, CPR, łączności, hydrauliki oraz floty z 0.7.2.1; nie modyfikować `game.db`. Pełny ZIP z bieżącym testem `Tests/verify_0722.py`, słownikiem i dokumentacją; **159/159 statycznych kontroli PASS**, kompilacja WPF na Windows nadal do odbioru.

## Ustalenia SKKP 0.7.2.1 — „Cicha łączność, ruchoma mapa”

- Przesuwanie mapy 2D lewym przyciskiem myszy działa wyłącznie na obrazie, nie na pozycji zdarzenia ani pojazdów. Dane OSM są odczytywane dla nowego środka po puszczeniu myszy; zoom 80/160/300 m zachowuje wybrany środek.
- Wóz na mapie: **czerwona elipsa z typem z centralnego katalogu** (GBA, GBARt itd.), numer operacyjny i kartoteka dostępne jak dotychczas.
- Natarcie jest równie cienkie jak zasilanie wodne: **2,8 DIP aktywne, 2,0 DIP w sprawianiu**. Biegnie do rzeczywiście przydzielonej i zdolnej roty; linie nie sterują przepływem ani zadaniami.
- Rutynowy meldunek KDR na progach 5/15/30 minut nie powtarza się bez istotnej zmiany sytuacji. Stan ostatniego meldunku w opcjonalnym `Vehicle.LastPeriodicState0721` jest zapisywany w `game.db` i zerowany na nową dyspozycję, nową grę, nową zmianę lub po powrocie. **Pilne meldunki oraz radio na żądanie nie są filtrowane**.
- Pełna paczka 0.7.2.1 zgodna z zasadami: aktualny słownik, jeden bieżący test `Tests/verify_0721.py`, nowy audyt/raport i wszystkie zasoby. Testy statyczne 141/141 PASS; kompilacja i gra WPF na Windows jeszcze niepotwierdzone.
- **Plan 0.7.3**: osobne reprezentacje wypadków drogowych, pożarów leśnych, zalania/wody i zdarzeń technicznych na podstawie faktycznego stanu KDR/OSM. Bez fikcyjnych ofiar i dodatkowych jednostek.

## Ustalenia SKKP 0.7.2 — „Żywsze roty” (19.11.2026)

- Bazą 0.7.2 jest pełna wersja 0.7.1, potwierdzona przez użytkownika jako działająca na Windows. Rozbudowa dotyczy wyłącznie wizualizacji taktycznej i aktualnych dokumentów; nie zmieniono silnika działań, bilansu, floty, OSM ani `game.db`.
- **Widok taktyczny**: aktywne zasilanie wodne rysować cieńszą turkusową linią (2,8 DIP); w czasie rozwijania 2,0 DIP i kreska przerywana.
- **Linia natarcia** musi kończyć się na znaczniku rzeczywistej roty kwalifikującej się do obsługi prądu, a nie na środku miejsca zdarzenia. Wykluczać roty zajęte sprawianiem, odpoczynkiem i zmianą zadania. Liczba aktywnych narysowanych linii nie może przekroczyć rzeczywistych prądów zapisanych w symulacji.
- Ruch znaczników pokazuje fazy przygotowania, wyjścia, dojścia, pracy, sprawiania, odpoczynku i powrotu, na podstawie istniejącej obsady i czasu sceny; bez nowego timera rozgrywki i bez tworzenia dodatkowych osób. Symbol D/P to istniejący kierowca/operator pompy spoza dwuosobowych rot.
- Usunąć z interfejsu **powtarzane dopiski** o poglądowym/orientacyjnym położeniu mapy, ale zachować rzetelne informacje w dokumentacji, atrybucję OSM i ODbL.
- Każde wydanie: pełny ZIP, jeden bieżący test, aktualny CHANGELOG/CIEKAWOSTKI/ROADMAP, testy, wyniki, słownik i audyt. Dla 0.7.2 testy statyczne **119/119 PASS** także po rozpakowaniu ZIP; brak potwierdzonej kompilacji WPF.

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
- **Decyzja planistyczna przed 0.7.0 i dla 0.7.0 (19.11.2026): nie wprowadzać przenoszenia ani czasowego stacjonowania zastępów w innych remizach/posterunkach.** Powiat chrzanowski jest na tyle mały, że taka mechanika nie wnosi wartości. Zastępy dysponuje się bezpośrednio z macierzystych jednostek do zdarzeń. Można rozwijać podgląd wolnych sił, czasów dojazdu, gotowości OSP/PSP i wsparcia spoza powiatu — **bez przesuwania wozów między remizami**.
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

## 13. Plan 0.7.x — „Widok taktyczny 2D” (koncepcja zatwierdzona 19.11.2026; bez wdrożenia)

- W ramach **gałęzi 0.7.x** planuje się zakładkę **„Widok taktyczny 2D”** w istniejącej karcie zdarzenia, inspirowaną dwuwymiarowym widokiem Football Managera.
- Lokalny wycinek mapy / schemat miejsca zdarzenia pokazuje rzeczywiste w grze pojazdy, roty/zespoły jako animowane znaczniki, linie wężowe, strefy zagrożenia i stanowiska pracy.
- Widok jest **prezentacją pracy KDR i sił z istniejącej symulacji**. Nie wprowadza dowodzenia pojedynczymi strażakami ani niezależnego silnika akcji; gracz nadal pełni rolę dyżurnego SKKP.
- Stosować potwierdzenia KDR i oznaczenia niepewności; nie udawać GPS ratowników, nie pokazywać CPR jako potwierdzonego rozpoznania, nie tworzyć „wirtualnych” osób poza obsadą.
- Start od lekkiego MVP, potem integracja z zadaniami KDR, służbami i różnymi scenariuszami; zachować wydajność przy kompresji czasu i zgodność `game.db`.
- **Szczegółowa zatwierdzona koncepcja i kryteria odbioru:** [PLAN-0.7.X-WIDOK-TAKTYCZNY-2D.md](./PLAN-0.7.X-WIDOK-TAKTYCZNY-2D.md).
- **Brak przypisania do konkretnej podwersji 0.7.x.** Wpis nie oznacza, że funkcja jest już zaimplementowana, ani nie zmienia zakresu 0.7.0.

## 14. Kontrola końcowa każdego wydania

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
