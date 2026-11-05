// The app version and what changed in each version, newest first. The only place to change it:
// the page shows the version, sw.js names its cache after it, and installed apps read the online
// copy of this file to offer an update and list the changes made since their own version.
self.APP_VERSION = "1.1.0";
self.CHANGELOG = [
  { version: "1.1.0", date: "2026-11-05", changes: [
    "Aplikácia si pamätá, ktoré témy a cvičenia už vieš (✔), ktoré sa učíš (•) a v ktorých robíš chyby (!). Pokrok ostane uložený aj po zatvorení aplikácie.",
    "Značky vidíš pri unitoch, lekciách, témach aj pri krokoch 2 až 6.",
    "Opakovanie, Story a Review dávajú častejšie vety z tém a cvičení, v ktorých robíš chyby.",
    "V Opakovaní je prehľad pokroku a tlačidlo Vynulovať pokrok."
  ]},
  { version: "1.0.2", date: "2026-11-05", changes: [
    "Pri precvičovaní sa chybne zodpovedaná úloha vráti o pár úloh neskôr a opakuje sa, kým ju nezodpovieš správne."
  ]},
  { version: "1.0.1", date: "2026-11-04", changes: [
    "Menšie tlačidlo s lupou vpravo dole, ktoré ukazuje zväčšenie a vráti ho na 100 %."
  ]},
  { version: "1.0.0", date: "2026-11-04", changes: [
    "Prvá verzia: gramatika z učebnice pre 3. ročník, Unit 1–10, rozdelená podľa lekcií (Lesson 1–5, Project and Review).",
    "Každá téma má 6 krokov: pravidlo, doplň, odpovedz, počúvaj, poskladaj vetu a napíš.",
    "Vety sa tvoria zo slovíčok z príslušného unitu a lekcie.",
    "Lesson 4 a Project ponúkajú opakovanie celého unitu, karta Opakovanie mieša vybrané unity.",
    "Rozloženie pre telefón, tablet aj počítač: na širokej obrazovke je výber unitu a lekcie v stĺpci vedľa cvičenia.",
    "Dá sa nainštalovať na telefón, tablet aj počítač a po prvom otvorení funguje aj bez internetu.",
    "Zväčšenie a zmenšenie: na počítači Ctrl + koliesko myši (alebo Ctrl + a Ctrl −), na telefóne a tablete dvoma prstami. Tlačidlo vpravo dole vráti 100 %."
  ]}
];
