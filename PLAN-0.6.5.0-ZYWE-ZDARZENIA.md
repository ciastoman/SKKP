# SKKP Professional 0.6.5.0 — „Żywe zdarzenia”

> **STATUS: ZATWIERDZONY PLAN ROZWOJOWY — NIE WDROŻONO.**  
> Zapisano: 18 listopada 2026 r.  
> Podstawa: SKKP Professional 0.6.4.2 „KDR zgłasza, SKKP dowozi” (kolejne wydania 0.6.4.x mogą poprzedzić 0.6.5.0).  
> Dokument to plan oraz **projekt przyszłego changelogu**, nie opis już działających funkcji.

## Główny cel

Zdarzenia mają żyć od przyjęcia karty CPR do powrotu ostatniego zastępu. Dyżurny SKKP nie jest biernym dyspozytorem: odbiera i pozyskuje informacje, koordynuje dodatkowe siły i służby, organizuje logistykę i reaguje na zmiany. **KDR zachowuje dowodzenie działaniami na miejscu**, a gracz nie steruje bezpośrednio rotami, prądownicami ani pracą ratowników.

## 1. Aktywna komunikacja SKKP ↔ KDR

- Możliwość zadania KDR pytań radiowych o: stan i rozwój zdarzenia, poszkodowanych, wystarczalność sił i środków, potrzeby sprzętowe, przewidywany dalszy przebieg i czas działań.
- Odpowiedź wynika z aktualnego stanu symulacji, rozpoznania i dostępnych informacji — nie jest losowym oderwanym tekstem.
- Realistyczne opóźnienie odpowiedzi, z możliwością chwilowej niedostępności KDR podczas intensywnych działań.
- Rozróżnianie informacji pewnych od niepotwierdzonych; zapobieganie spamowi i powtarzaniu identycznych pytań bez zmiany sytuacji.
- Naturalne, krótkie formuły radiowe; numery operacyjne zamiast technicznych ID.

## 2. Dynamiczny rozwój zdarzeń

- W trakcie akcji pojawiają się nowe okoliczności pochodzące z rozpoznania, rozwoju pożaru lub innych zagrożeń.
- Zależnie od działań i zasobów sytuacja może się pogarszać, stabilizować lub poprawiać.
- Eskalacja może wywołać potrzebę dodatkowych zastępów, specjalistycznego sprzętu, służb współdziałających, zaopatrzenia wodnego albo dowozu wyposażenia.
- Zmiany powinny mieć związek przyczynowo-skutkowy z symulacją i wyborem gracza; unikamy sztucznego, nieprzewidywalnego karania.

## 3. Aktualizacje elektronicznych kart CPR

- Karta CPR może otrzymać nowe informacje po pierwszym zgłoszeniu: lokalizacja, liczba osób zagrożonych, nowy opis sytuacji, podejrzenie dodatkowych zagrożeń.
- Dyżurny wybiera przekazanie aktualizacji zastępom w drodze lub KDR; rejestrować etapy „nowa / przekazana / potwierdzona”.
- Informacja od CPR ma status zgłoszenia, nie zastępuje rozpoznania KDR i nie powinna automatycznie zmieniać stanu potwierdzonego.

## 4. Dynamiczne zapotrzebowanie na siły i środki

- KDR może zgłaszać nowe potrzeby w różnych fazach zdarzenia.
- Każda potrzeba ma uzasadnienie, priorytet, aktualny status oraz wskazanie rodzaju wsparcia.
- Dyżurny sprawdza dostępność, wyposażenie i ETA zastępów oraz powiadamia odpowiednie służby.
- Zapotrzebowania zbędne mogą być odwoływane bez usuwania historii; zapobieganie duplikatom.
- Integracja z istniejącą logistyką sprzętową 0.6.4.x; nie tworzymy drugiego równoległego rejestru sprzętowego.

## 5. Lista spraw do załatwienia przy zdarzeniu

- Sekcja **„Do załatwienia”** na istniejącej karcie zdarzenia (bez kolejnego dużego okna).
- Przykłady: przekazać informację CPR, odpowiedzieć KDR, zadysponować wsparcie, powiadomić energetykę, zorganizować dowóz sprzętu, uzyskać potwierdzenie służby.
- Statusy „oczekuje / w realizacji / wykonane / anulowane”.
- Zadanie kończy się po wykonaniu faktycznej operacji gry; nie wystarcza samo kliknięcie „wykonane” dla czynności, które mają potwierdzalny rezultat.
- Lista pozostaje czytelna przy wielu równoczesnych zdarzeniach i nie zalewa gracza powiadomieniami.

## 6. Meldunki sytuacyjne podczas działań

- Meldunki o zmianie zagrożenia, stanie poszkodowanych, opanowaniu pożaru, przejściu do dogaszania, nowych potrzebach i działaniach długotrwałych.
- Oddzielenie zwykłych meldunków od **pilnych wymagających potwierdzenia**.
- Zachować istniejącą regułę 0.6.4.2: pilny meldunek pauzuje czas; po przyjęciu wraca poprzednia szybkość, chyba że użytkownik sam zatrzymał grę.
- Chronologiczna historia komunikatów powiązana z konkretną kartą zdarzenia.

## 7. Telefon i radio

- Więcej zróżnicowanych wypowiedzi SKKP, KDR i służb współdziałających.
- Aktywne zapytania przez obecne kanały kontaktu, bez mnożenia okien.
- Bez technicznych ID pojazdów i surowych identyfikatorów zdarzeń w wypowiedziach.

## 8. Bilans i historia decyzji

- Oś czasu obejmuje: aktualizacje CPR, meldunki, zapytania i odpowiedzi, zapotrzebowania KDR, decyzje dyżurnego, wezwanie i realne przybycie wsparcia.
- Pokazywać czas od zgłoszenia potrzeby do jej realizacji i aktualny stan zadania.
- Rozdzielać wpływ działań ratowników/KDR, przygotowania wyposażenia i decyzji SKKP.
- Nie dopisywać do historycznych zamkniętych akcji zdarzeń, które nie zostały wówczas zarejestrowane.

## 9. GUI/UX

- Rozbudowywać dotychczasową kartę zdarzenia, a nie osobne nowe aplikacje.
- Wyróżnić nieprzeczytane meldunki i nową informację CPR.
- Oddzielić **informację** od **zadania wymagającego reakcji**.
- Zachować ciemną kolorystykę, spójne terminy, numery operacyjne i dobrze działające przewijanie.
- Nie pauzować gry dla każdego drobnego powiadomienia — tylko przy meldunkach zaklasyfikowanych jako pilne i wymagające przyjęcia.

## 10. Bezpieczeństwo i testy

- Zgodność z aktualnym katalogiem floty oraz fotografiami, magazynem, logistyką, telefonem, KDR i obsadami PSP/OSP.
- Bezpieczne wczytanie starych `game.db`; poprawne odtworzenie nowych meldunków, oczekujących odpowiedzi i zadań po zapisie.
- Brak powielania zapotrzebowań i komunikatów przy kolejnych tickach lub wczytaniu.
- Zachowanie wszystkich ustaleń z `ZASADY-WYDAN.md`: **pełne źródłowe ZIP**, wyłącznie bieżące testy, bieżące CHANGELOG/CIEKAWOSTKI/ROADMAP, aktualny słowniczek, uczciwe rozróżnienie testów statycznych od kompilacji WPF.

## Sugerowane etapy wewnątrz jednego pełnego wydania

1. **Żywy KDR** — pytania, odpowiedzi, meldunki i czas odpowiedzi.
2. **Żywa sytuacja** — aktualizacje CPR, zmiany zdarzenia, nowe potrzeby.
3. **Centrum decyzji** — lista spraw i integracja z telefonem, dysponowaniem i logistyką.
4. **Bilans i odbiór** — raport, GUI, regresje, zapis gry, słowniczek, dokumentacja.

## Poza zakresem 0.6.5.0

- Zabezpieczenie operacyjne całego powiatu, przesunięcia odwodów, rozbudowane kontakty ze SKKW, podwyższona gotowość PSP, powiadamianie władz i przełożonych.
- Pełna symulacja operatora numeru 112.
- Ręczne dowodzenie pojedynczymi rotami i ratownikami na miejscu.
- Wielkie przebudowy floty, magazynów i gospodarki paliwowej niezwiązane z celem wersji.

## Kryteria odbioru

- [ ] Gracz może aktywnie zapytać KDR o sytuację i otrzymuje kontekstową, opóźnioną odpowiedź.
- [ ] CPR aktualizuje kartę; gracz przekazuje informacje właściwym zastępom/KDR.
- [ ] Co najmniej kilka rodzin zdarzeń obsługuje kontrolowane zmiany sytuacji i wynikające z nich potrzeby.
- [ ] KDR zgłasza i odwołuje potrzeby w zgodzie z przebiegiem akcji; bez duplikatów.
- [ ] Lista „Do załatwienia” jest powiązana z rzeczywistymi czynnościami gry.
- [ ] Pilne meldunki zachowują pauzę i przywracanie tempa z 0.6.4.2.
- [ ] Historia, raport i zapis gry odtwarzają decyzje po ponownym wczytaniu.
- [ ] Wszystkie wcześniejsze mechaniki i aktualne zasoby pozostają dostępne.
- [ ] Słowniczek oraz obowiązkowa dokumentacja są aktualne.
- [ ] Testy wyłącznie 0.6.5.0; pełna paczka ZIP oraz jasna informacja o wyniku kompilacji WPF.

---

**Dokument planistyczny.** Wprowadzenie zmian do kodu wymaga odrębnego pełnego wydania źródłowego. Szczegóły balansu i zakres scenariuszy należy ustalić po audycie ostatniej wersji 0.6.4.x.
