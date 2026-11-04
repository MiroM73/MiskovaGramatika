# Miškova gramatika

Malá aplikácia na precvičovanie anglickej gramatiky pre žiaka 3. ročníka. Obsahuje **9 tém** z **Unit 1 a 2** učebnice a vety tvorí zo slovíčok, ktoré už pozná z aplikácie [Miškove slovíčka](https://github.com/MiroM73/MiskoveSlovicka).

Je to webová aplikácia (PWA): beží v prehliadači, dá sa nainštalovať na plochu telefónu ako bežná aplikácia a po prvom otvorení funguje aj bez internetu. Nemá účty, reklamy ani sledovanie.

## Témy

| # | Téma | Učebnica |
|---|---|---|
| 1 | **I've got / He's got** – I haven't got, she hasn't got | Unit 1 · Lesson 2 |
| 2 | **I have / He has** – I don't have, she doesn't have | Unit 2 · Lesson 2 |
| 3 | **have got alebo have?** – rozdiely v zápore, otázke a krátkej odpovedi | Unit 1 a 2 · Lesson 2 |
| 4 | **I have … for breakfast** – Do you have … for lunch? Yes, I do. / No, I don't. | Unit 2 · Lesson 2 |
| 5 | **Do you like …?** – Yes, I do. / No, I don't. Does he like …? | Unit 2 · Lesson 3 |
| 6 | **I'd like some … for breakfast / lunch / dinner** | Unit 2 · Lesson 1 |
| 7 | **Have you got a …?** – Yes, I have. / No, I haven't. | Unit 1 · Lesson 2 |
| 8 | **Can I use your …?** – Sure! Here you are. | Unit 1 · Lesson 1 |
| 9 | **We've got our … / They've got their …** | Unit 1 · Lesson 3 |

Každá téma sa precvičuje pre všetky osoby: **I, you, he, she, it, we, they**. Vety sa tvoria náhodne zo slovíčok z lekcií (školské veci, športové veci, jedlo, zelenina; pri *it* zvieratká a ich jedlo), takže sa neopakujú stále tie isté.

## Ako ju používať

### Témy

Hore vyber tému a prejdi šesť krokov po poradí. Očíslované tlačidlá ukazujú, kde si, a na ktorýkoľvek krok sa dá preskočiť.

| Krok | Čo robíš |
|---|---|
| 1. **Pravidlo** | Krátke vysvetlenie po slovensky, tabuľka viet pre všetky osoby (ťukni na vetu a vypočuješ si ju), upozornenia na časté chyby a slovíčka témy. |
| 2. **Doplň** | Vyber slovo, ktoré chýba vo vete. Pod vetou je slovenský preklad. |
| 3. **Zmeň / Odpovedz / Vyber** | Podľa témy: zmeň kladnú vetu na zápornú, odpovedz krátko podľa ✔ Áno / ✘ Nie, alebo vyber správnu otázku či odpoveď. |
| 4. **Počúvaj** | Vypočuj si anglickú vetu a vyber, čo znamená po slovensky. |
| 5. **Poskladaj** | Poskladaj anglickú vetu zo slov. |
| 6. **Napíš** | Napíš vetu po anglicky. Skrátené (I've, doesn't) aj celé tvary (I have, does not) sú správne. **Pomôcka** ukáže ďalšie slovo. |

V každom kroku je 10 viet. Zle zodpovedaná veta sa v tom istom kole vráti neskôr, najviac trikrát. Na konci vidíš, koľko viet bolo správne na prvý pokus a ktoré si treba zopakovať. **Ešte raz** vytvorí nové vety, **Len chyby** zopakuje iba chybné.

### Opakovanie

Vyber **témy**, **spôsob** (všetko premiešané alebo jeden druh cvičenia) a **počet** viet (10, 15 alebo 25) a ťukni na **Začať opakovanie**.

### Dobré vedieť

- **Postup sa neukladá.** Po zatvorení aplikácia začína znova.
- **Vety číta anglický hlas telefónu.** Ak nič nepočuť, skontroluj hlasitosť médií a či má telefón nainštalovaný anglický hlas (Nastavenia → Prevod textu na reč).
- **Aktualizácie.** Aktuálna verzia je pod nadpisom. Keď aplikáciu otvoríš online a je zverejnená novšia verzia, objaví sa žltá lišta **Je dostupná nová verzia …** so zoznamom **Čo je nové**. **Aktualizovať** stiahne novú verziu a aplikáciu reštartuje, **Neskôr** lištu skryje do ďalšieho otvorenia.

## Inštalácia

### Android (Chrome)

1. Otvor adresu aplikácie v **Chrome**.
2. Ťukni na ponuku **⋮**, potom na **Pridať na plochu** a **Inštalovať**.
3. Na ploche sa objaví fialová ikona **Gramatika**. Aplikáciu raz otvor s internetom, potom už funguje aj bez neho.

### iPhone / iPad (Safari)

1. Otvor odkaz v **Safari**.
2. Ťukni na **Zdieľať** (štvorček so šípkou), potom na **Pridať na plochu** a **Pridať**.

### Počítač (Chrome alebo Edge)

Otvor odkaz a klikni na ikonu **Inštalovať** na pravom konci panela s adresou.

## Štruktúra projektu

| Súbor | Na čo slúži |
|---|---|
| `index.html` | Celá aplikácia: rozloženie, slovíčka, generátory viet pre jednotlivé témy a cvičenia |
| `manifest.webmanifest` | Názov, ikony a farby aplikácie pri inštalácii |
| `version.js` | Verzia aplikácie a zoznam zmien (`CHANGELOG`). Nainštalované aplikácie ho porovnávajú s online verziou, aby ponúkli aktualizáciu |
| `sw.js` | Service worker, ktorý drží kópiu aplikácie v zariadení na použitie bez internetu |
| `fonts.css`, `fonts/` | Písma Baloo 2 a Nunito uložené lokálne |
| `icons/` | Ikony aplikácie |
| `CLAUDE.md` | Poznámky k projektu pre Claude Code (po anglicky) |

### Úprava aplikácie

1. Uprav `index.html`.
2. V `version.js` zvýš verziu (napr. `1.0.0` → `1.0.1`) a na začiatok `CHANGELOG` pridaj nový záznam po slovensky.
3. Urob commit, tag (`v1.0.1`) a push (`git push origin main --follow-tags`) a vytvor GitHub release s rovnakými novinkami.

Ak **pridáš alebo premenuješ súbor**, ktorý aplikácia potrebuje, doplň ho aj do zoznamu `FILES` v `sw.js`.
