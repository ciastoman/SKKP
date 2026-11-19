# SKKP Professional 0.7.x — „Widok taktyczny 2D”

> **STATUS: ZATWIERDZONA KONCEPCJA GAMEPLAYOWA — NIE WDROŻONO.**  
> Ustalenie: 19 listopada 2026 r.  
> Okno rozwojowe: **linia 0.7.x**, bez przydzielania sztywnej podwersji. Nie rozszerza automatycznie zakresu 0.7.0.  
> Inspiracja wizualna: klasyczny dwuwymiarowy podgląd meczu w Football Managerze — lekkie, płynnie poruszające się znaczniki.

## 1. Cel funkcji

W istniejącej karcie zdarzenia pojawi się zakładka **„Widok taktyczny 2D”**: lokalny, czytelny schemat miejsca działań, na którym widać pojazdy, strefy zagrożenia, linie wężowe, punkty zadaniowe i poruszające się znaczniki rot / zespołów. Widok pomaga dyżurnemu SKKP zrozumieć rozwój zdarzenia i rozmieszczenie sił, nie zamienia gry w RTS.

**Zasada nadrzędna: gracz jest dyżurnym SKKP; KDR dowodzi na miejscu.** Nie ma bezpośredniego przesuwania ratowników myszą ani wydawania im taktycznych rozkazów. Gracz może reagować poprzez dotychczasowe mechanizmy: radio, zapytanie do KDR, dysponowanie, zaopatrzenie wodne, służby współdziałające i logistykę.

## 2. Zasady wiarygodności informacji

- Widok jest **prezentacją istniejącego stanu symulacji oraz informacji przekazanych dyżurnemu**, nie dodatkowym silnikiem pożaru, ruchu czy pracy ludzi.
- Nie pokazywać niepoznanych faktów jako pewnych. Rozróżniać **potwierdzone rozpoznaniem KDR**, **zgłoszone przez CPR / niepotwierdzone** i **brak aktualnych informacji**.
- Przy danych wyłącznie orientacyjnych stosować odpowiednie oznaczenie (np. „układ poglądowy”, „pozycja przybliżona”, „ostatni meldunek 14:32”). Bez sugerowania realnego śledzenia GPS pojedynczych strażaków.
- Żadnych fikcyjnych ratowników: znaczniki wynikają z faktycznej obsady dostępnej na zdarzeniu, z przydziału zastępów i zadań KDR; jedna osoba nie może być policzona w dwóch rotach.
- Animacja nie może wyprzedzać postępu zadania w logice zdarzenia ani udawać dojazdu służb, których jeszcze nie ma na miejscu.

## 3. Plansza i skala

- **Wycinek lokalny** przypisany do konkretnego zdarzenia, a nie dodatkowe kropki na głównej mapie powiatu.
- Wariant preferowany: wykorzystać dostępne obrysy budynków, drogi i obiekty OSM w okolicy zdarzenia, jeśli jakość danych pozwala. **Fallback:** generowany, wyraźnie oznaczony jako schemat poglądowy układ obiektu, dojazdu i miejsc pracy.
- Elementy: obiekt/obszar zdarzenia; wjazd i postoje wozów; strefy i przeszkody; hydrant/źródło wody; linie wężowe; wejścia/punkty dostępu; roty i zespoły; wybrane służby współdziałające.
- Znaczniki przede wszystkim **zespołowe** (rota, obsługa zaopatrzenia wodnego, zespół techniczny), opcjonalnie pojedyncze postacie w spokojnych scenariuszach. Automatyczne grupowanie w dużych akcjach.
- Kolory i kształty identyfikują przynależność, rolę i status; nie polegać wyłącznie na kolorze. Etykiety operacyjne, bez wewnętrznych identyfikatorów systemowych.

## 4. Pętla gameplayowa — przykładowy pożar budynku gospodarczego

1. **Karta CPR:** dyżurny zna adres i wstępny opis; schemat pokazuje lokalizację, a nie wymyślone pozycje strażaków.
2. **Pierwsze GBA na miejscu:** pojazd staje w punkcie dojazdu. Obsada pojawia się dopiero po rzeczywistym przyjeździe; KDR podejmuje rozpoznanie.
3. **Rozpoznanie KDR:** potwierdzone informacje aktualizują strefy zagrożenia i punkty działań; brakujące informacje pozostają oznaczone jako niepewne.
4. **Przydział zadań przez KDR:** powstają znaczniki istniejących rot. Rota natarcia przemieszcza się od pojazdu ku strefie pracy, obsługa wodna do źródła wody, inne zespoły do swoich stanowisk.
5. **Działania:** znaczniki wykonują czytelną, oszczędną animację pracy. Rozwój pożaru, wody i postępu nadal liczy dotychczasowy silnik; widok tylko go odzwierciedla.
6. **Nowy meldunek:** KDR zgłasza potrzebę dodatkowych sił lub sprzętu. Dyżurny może otworzyć właściwą funkcję dysponowania / logistyki; nowy pojazd pojawia się dopiero po dojeździe.
7. **Opanowanie i zwijanie:** strefa zagrożenia maleje zgodnie ze stanem akcji; zespoły wracają do wozów. Po zakończeniu widok można odtworzyć jako uproszczony stan końcowy, bez dopisywania nieistniejącej historii.

## 5. Interakcje użytkownika

- **Kliknięcie/hover roty:** nazwa i numer operacyjny zastępu, liczba ludzi, zadanie, status, sektor, informacja o źródle/aktualności danych.
- **Kliknięcie wozu:** przejście do istniejącej karty pojazdu, bez jej duplikowania.
- **Kliknięcie zadania / problemu:** kontekst w dotychczasowej karcie KDR lub „Łączność i decyzje”, bez bezpośredniego kierowania ratownikami.
- Przełączniki warstw: roty, pojazdy, linie wodne, zagrożenia, służby, etykiety.
- Wstrzymanie/przewijanie widoku planszy nie może niejawnie zmieniać tempa całej gry. Symulacja nadal korzysta z istniejącej pauzy i kompresji czasu.
- Gdy informacja jest nieaktualna, wyraźnie pokazywać moment ostatniego potwierdzenia; gracz może skorzystać z istniejącego zapytania radiowego do KDR.

## 6. Zachowanie znaczników i stany

Minimalne stany wizualne: **oczekuje, w drodze do stanowiska, sprawianie, prowadzi działania, wycofuje się / wraca, niedostępny**. Pozycje przeliczać z punktów zadaniowych i etapów prac, a nie niezależnego „AI kropki”. Proste odcinki/waypointy wystarczą w MVP; zaawansowane omijanie przeszkód można rozważyć dopiero po potwierdzeniu wartości.

Poziomy szczegółowości: blisko — roty i małe zespoły; daleko / przy wielu zastępach — zagregowane znaczniki z liczbą ratowników. Obecność służb współdziałających dopiero po potwierdzonym przybyciu. Obsada kierowcy/pompiarza/KDR nie powinna magicznie jednocześnie występować jako rota wewnętrzna.

## 7. Integracja ze stanem gry i technologia

- **Źródło prawdy:** aktualne obiekty `Incident`, statusy pojazdów, obsady, przydziały i postęp KDR, linie wodne, zagrożenia, działania służb; bez drugiego silnika postępu.
- **WPF:** osobny komponent rysowania 2D w karcie zdarzenia; tło statyczne i ruchome znaczniki oddzielone warstwami. Canvas/rysowanie `DrawingVisual` lub odpowiednik dobrany po pomiarach.
- Animacja płynna wizualnie, docelowo ~10–15 odświeżeń/s w otwartej zakładce, z interpolacją pozycji. Parametr do weryfikacji, nie obietnica wydajności.
- Kompresja ×1/×2/×5/×10/×15: animacja nadąża za **czasem symulacji**, a nie za stałą prędkością realną; pauza zatrzymuje postęp. Nie dodawać kolejnego niezależnego zegara logiki.
- Rozmieszczenie elementów deterministyczne dla danego zdarzenia, aby po ponownym otwarciu lub wczytaniu zapisu scena nie losowała się od nowa.
- Zapis: preferować odtwarzanie prezentacji z utrwalonego stanu gry, bez konieczności zapisu klatka-po-klatce; weryfikować kompatybilność starszych `game.db`.
- Renderowanie tylko gdy zakładka jest widoczna; ograniczać liczbę znaczników i przeliczenia, by nie pogarszać płynności pełnej mapy.

## 8. Podział na wydania w ramach 0.7.x (numery do ustalenia)

**Faza A — MVP:** schemat poglądowy i wariant wykorzystujący dostępne dane OSM; 2–3 rodziny zdarzeń; rzeczywiste pojazdy, grupowe znaczniki ratowników, proste ruchy, strefa zagrożenia, istniejące linie wężowe; brak nowego systemu dowodzenia.

**Faza B — taktyczny kontekst:** zadania KDR i sektory, dokładniejsze stany, tooltipy i nawigacja do istniejących paneli, służby współdziałające, aktualność informacji.

**Faza C — dopracowanie:** grupowanie dużych akcji, płynność przy kompresji czasu, różne typy zdarzeń (pożar, wypadek, zagrożenie gazowe / wodne), dostępność, regresje i zapisy.

## 9. Poza zakresem

- Sterowanie myszą pojedynczymi strażakami i wydawanie taktycznych rozkazów w stylu RTS.
- Model 3D, realistyczna fizyka człowieka, odwzorowanie wnętrz budynków i kondygnacji.
- Zastępowanie rozpoznania KDR „wszechwiedzącym” widokiem sytuacji.
- Generowanie dodatkowych osób, sprzętu, sił lub czasu działań tylko po to, by animacja lepiej wyglądała.
- Przenoszenie i czasowe stacjonowanie jednostek w innych remizach; pozostaje niezależnie odrzucone dla planów 0.7.0.

## 10. Kryteria odbioru

- [ ] Widok otwiera się wewnątrz istniejącej karty zdarzenia, z zachowaniem ciemnego GUI.
- [ ] Bez zadysponowanych/obecnych załóg **nie ma** animowanych ratowników.
- [ ] Liczba pokazanych osób / zespołów zgadza się z obsadą i przydziałami w symulacji.
- [ ] Zdarzenia i pozycje nie są prezentowane jako zweryfikowane, jeśli KDR ich nie potwierdził.
- [ ] Pojazd, służba lub sprzęt pojawiają się wyłącznie we właściwym momencie istniejącej logiki.
- [ ] Kropki tylko wizualizują przebieg pracy; nie zwiększają jej tempa i nie tworzą dodatkowych premii.
- [ ] Pauza, przyspieszenia czasu i ponowne wczytanie nie rozjeżdżają animacji ze stanem zdarzenia.
- [ ] Test dużej akcji nie obniża odczuwalnie płynności głównej mapy; renderowanie wyłączone poza widokiem.
- [ ] Każde przyszłe pełne wydanie zachowuje `ZASADY-WYDAN.md`, aktualizuje słowniczek, bieżący ROADMAP oraz wyłącznie bieżące testy i dokumentację.

---

**Dokument planistyczny.** Nie potwierdza wdrożenia, kompilacji, ani istnienia gotowej funkcji w obecnej wersji 0.6.5.x.
