// Miškova gramatika: words, the sentence engine, the textbook's units and lessons, and the exercises.
"use strict";

// ---------- Small helpers ----------
const $=(t,a={},...k)=>{const e=document.createElement(t);for(const x in a){if(x==="class")e.className=a[x];else if(x.startsWith("on"))e.addEventListener(x.slice(2),a[x]);else e.setAttribute(x,a[x]);}k.flat().forEach(c=>c!=null&&e.append(c));return e};
const html=(t,h)=>{const e=document.createElement(t);e.innerHTML=h;return e};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[Math.random()*a.length|0];
const coin=()=>Math.random()<.5;
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const low1=s=>s.charAt(0).toLowerCase()+s.slice(1);
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[\u2018\u2019`\u00b4]/g,"'").replace(/\s+/g," ").trim();
const art=w=>(/^[aeiou]/i.test(w)?"an ":"a ")+w;

// ---------- Words (Slovak from Miškove slovíčka) ----------
const U=(u,l)=>"Unit "+u+" · Lesson "+l, G2=u=>"2. ročník · Unit "+u;
// "english|slovak|slovak accusative (if different)|gender (m, ma = animate m, f, n, p = plural)".
// "a/an" before the English word = countable singular; otherwise plural or uncountable ("any" in negatives and questions).
const NN=(u,s)=>s.split(";").map(x=>{const[en,sk,acc,g]=x.split("|");return{en,sk,acc:acc||sk,g:g||"m",u}});
const bare=n=>n.en.replace(/^(an?|some) /,"");
const anyN=n=>/^(an?|some) /.test(n.en)||n.noAny?n.en:"any "+n.en;

// Unit 1
const SCHOOL=NN(U(1,1),"a dictionary|slovník;a folder|zakladač;a glue stick|lepidlo||n;a lunch box|krabička na desiatu|krabičku na desiatu|f;a pencil case|peračník;a pencil sharpener|strúhadlo||n;scissors|nožnice||p;a water bottle|fľaša na vodu|fľašu na vodu|f");
const SPORT=NN(U(1,3),"football boots|kopačky||p;a football shirt|futbalový dres;shorts|šortky||p;a sports bag|športová taška|športovú tašku|f;a tracksuit|tepláková súprava|teplákovú súpravu|f;trainers|tenisky||p");
const ART=NN(U(1,5),"crayons|pastelky||p;paintbrushes|štetce||p;paints|farby||p;paper|papier");
const BODY=NN(G2(5)+" · pre it","a tail|chvost;wings|krídla||p;a beak|zobák;big ears|veľké uši||p;long legs|dlhé nohy||p"); BODY.forEach(n=>n.noAny=1);
const ITTOYS=NN(G2(2)+" · pre it","a ball|lopta|loptu|f;a teddy|medvedík|medvedíka|ma");
// Unit 2
const FOOD=NN(U(2,1),"biscuits|keksy||p;cereal|cereálie||p;chicken|kuracina|kuracinu|f;chips|hranolky||p;meatballs|mäsové guľky||p;rice|ryža|ryžu|f;sandwiches|sendviče||p;yoghurt|jogurt");
const VEG=NN(U(2,3),"beans|fazuľky||p;carrots|mrkvy|mrkvu|f;cucumbers|uhorky||p;peas|hrášok;peppers|papriky||p;potatoes|zemiaky||p");
const FOOD5=NN(U(2,5),"cake|koláč;a drink|nápoj;pasta|cestoviny||p;vegetables|zelenina|zeleninu|f");
const MEALS=[{en:"breakfast",sk:"na raňajky",w:"raňajky"},{en:"lunch",sk:"na obed",w:"obed"},{en:"dinner",sk:"na večeru",w:"večera"}].map(m=>({...m,u:U(2,1)}));
// Unit 3: "english|plural|slovak|slovak plural|can (+ yes / - no)|lives (land / water / - not sure)|eats (+ / -)"
const AN=(u,s)=>s.split(";").map(x=>{const[en,pl,sk,skpl,can,live,eat]=x.split("|");const f=t=>{const o={};t.split(",").filter(Boolean).forEach(k=>o[k.slice(1)]=k[0]==="+");return o};return{en,pl,sk,skpl,can:f(can),live,eat:f(eat),u}});
const ANIM=AN(U(3,1),"dolphin|dolphins|delfín|delfíny|+swim,+jump,-fly,-run,-climb|water|-grass,-nuts;elephant|elephants|slon|slony|+swim,+run,-jump,-fly,-climb|land|+grass,+leaves,-meat,-insects;giraffe|giraffes|žirafa|žirafy|+run,-fly,-climb|land|+leaves,-meat,-insects;hippo|hippos|hroch|hrochy|+run,-jump,-fly,-climb|-|+grass,-meat,-nuts;monkey|monkeys|opica|opice|+climb,+run,+jump,-fly|land|+nuts,+leaves,+insects;penguin|penguins|tučniak|tučniaky|+swim,-fly,-climb|-|-grass,-leaves,-nuts;tiger|tigers|tiger|tigre|+run,+swim,+climb,+jump,-fly|land|+meat,-grass,-leaves,-nuts,-seeds;zebra|zebras|zebra|zebry|+run,-fly,-climb|land|+grass,-meat,-insects");
const ANIM5=AN(U(3,5),"crocodile|crocodiles|krokodíl|krokodíly|+swim,-fly,-climb|-|+meat,-grass,-leaves,-nuts;kangaroo|kangaroos|klokan|klokany|+jump,-fly,-climb|land|+grass,+leaves,-meat,-insects;koala|koalas|koala|koaly|+climb,-fly|land|+leaves,-meat,-insects,-nuts;shark|sharks|žralok|žraloky|+swim,-run,-fly,-climb|water|+meat,-grass,-leaves,-nuts,-seeds");
const AFOOD=NN(U(3,3),"grass|tráva|trávu|f;insects|hmyz;leaves|listy||p;meat|mäso||n;nuts|orechy||p;seeds|semená||p");
const MOVES=[["swim","swims","plávať"],["run","runs","behať"],["climb","climbs","liezť"],["jump","jumps","skákať"],["fly","flies","lietať"]].map(([en,en3,sk])=>({en,en3,sk,u:G2(3)}));
const HABITAT=[{en:"on land",sk:"na súši",k:"land",u:U(3,2)},{en:"in water",sk:"vo vode",k:"water",u:U(3,2)}];
// Unit 4
const POSS4=NN(U(4,1),"a bracelet|náramok;a guitar|gitara|gitaru|f;a helicopter|helikoptéra|helikoptéru|f;a poster|plagát;a puppet|bábka|bábku|f;a trophy|trofej||f;a video game|videohra|videohru|f;a watch|hodinky||p");
const CLOTHES=NN(U(4,3),"boots|čižmy||p;a coat|kabát;a hoodie|mikina s kapucňou|mikinu s kapucňou|f;jeans|džínsy||p;pyjamas|pyžamo||n;sandals|sandále||p");
const THINGS4=NN(U(4,5),"a doll|bábika|bábiku|f;some material|materiál;a ribbon|stužka|stužku|f;some strings|šnúrky||p");
const NAMES=[["Sam","Sam",1],["Tom","Tom",1],["Ben","Ben",1],["Eva","Ev",0],["Anna","Ann",0],["Ella","Ell",0]].map(([en,st,m])=>({en,st,m}));
// Unit 5: "english|plural|slovak|slovak plural|to the …"
const PLACES=`bus stop|bus stops|autobusová zastávka|autobusové zastávky|na autobusovú zastávku;hospital|hospitals|nemocnica|nemocnice|do nemocnice;hotel|hotels|hotel|hotely|do hotela;park|parks|park|parky|do parku;police station|police stations|policajná stanica|policajné stanice|na policajnú stanicu;school|schools|škola|školy|do školy;supermarket|supermarkets|supermarket|supermarkety|do supermarketu;toy shop|toy shops|hračkárstvo|hračkárstva|do hračkárstva`
  .split(";").map(x=>{const[en,pl,sk,skpl,to]=x.split("|");return{en,pl,sk,skpl,to,u:U(5,1)}});
const VEH=`bike|bicykel|bicykla|bicyklom;car|auto|auta|autom;lorry|nákladné auto|nákladného auta|nákladným autom;motorbike|motorka|motorky|motorkou;train|vlak|vlaku|vlakom;van|dodávka|dodávky|dodávkou`
  .split(";").map(x=>{const[en,sk,gen,ins]=x.split("|");return{en,sk,gen,ins,u:U(5,3)}});
const TR5=`chair lift|sedačková lanovka|lanovkou;metro|metro|metrom;taxi|taxík|taxíkom;tram|električka|električkou`.split(";").map(x=>{const[en,sk,ins]=x.split("|");return{en,sk,ins,u:U(5,5)}});
// Unit 6: games ("english|play in Slovak|reflexive|liked thing")
const HRAT="hrám,hráš,hrá,hráme,hrajú";
const GAMES=`badminton|bedminton||bedminton;chess|šach||šach;dominoes|domino||domino;Frisbee|frisbee||frisbee;hide and seek|na skrývačku|sa|skrývačku;ice hockey|hokej||hokej;table tennis|stolný tenis||stolný tenis;tag|na naháňačku|sa|naháňačku`
  .split(";").map(x=>{const[en,rest,refl,like]=x.split("|");return{en,w:"play "+en,sk:"hrať "+(refl?"sa ":"")+rest,ws:"hrať "+(refl?"sa ":"")+rest,conj:HRAT,refl,rest,like,u:U(6,1)}});
// Verb phrases: "english (base)|-ing word|3rd person word|slovak infinitive|slovak present (ja,ty,on,my,oni)|reflexive|slovak rest"
// {my} becomes my / your / his / her / our / their.
const VP=(u,s)=>s.split(";").map(x=>{const[v,ingW,v3W,sk,conj,refl,rest]=x.split("|");const tail=v.split(" ").slice(1).join(" ");
  return{v,en:v.replace(/\{my\}/g,"my"),v3:v3W+(tail?" "+tail:""),ing:ingW+(tail?" "+tail:""),ingW,base:v.split(" ")[0],v3W,sk,conj,refl,rest,u}});
const ACTS=VP(U(6,3),"do judo|doing|does|trénovať džudo|trénujem,trénuješ,trénuje,trénujeme,trénujú||džudo;fly a kite|flying|flies|púšťať šarkana|púšťam,púšťaš,púšťa,púšťame,púšťajú||šarkana;listen to music|listening|listens|počúvať hudbu|počúvam,počúvaš,počúva,počúvame,počúvajú||hudbu;play with friends|playing|plays|hrať sa s priateľmi|hrám,hráš,hrá,hráme,hrajú|sa|s priateľmi;read comics|reading|reads|čítať komiksy|čítam,čítaš,číta,čítame,čítajú||komiksy;watch TV|watching|watches|pozerať televíziu|pozerám,pozeráš,pozerá,pozeráme,pozerajú||televíziu");
const CHALK=NN(U(6,5),"chalk|krieda;lines|čiary;numbers|čísla;points|body");
const INSTR=VP(U(6,5),"draw lines with chalk|drawing|draws|kresliť kriedou čiary|kreslím,kreslíš,kreslí,kreslíme,kreslia||kriedou čiary;write numbers with chalk|writing|writes|písať kriedou čísla|píšem,píšeš,píše,píšeme,píšu||kriedou čísla;jump on the numbers|jumping|jumps|skákať po číslach|skáčem,skáčeš,skáče,skáčeme,skáču||po číslach;throw the ball|throwing|throws|hádzať loptu|hádžem,hádžeš,hádže,hádžeme,hádžu||loptu;get ten points|getting|gets|dostať desať bodov|dostanem,dostaneš,dostane,dostaneme,dostanú||desať bodov;count the points|counting|counts|počítať body|počítam,počítaš,počíta,počítame,počítajú||body");
// Unit 7
const ROUT=VP(U(7,1),"brush {my} hair|brushing|brushes|česať si vlasy|češem,češeš,češe,češeme,češú|si|vlasy;brush {my} teeth|brushing|brushes|umývať si zuby|umývam,umývaš,umýva,umývame,umývajú|si|zuby;do {my} homework|doing|does|robiť si domácu úlohu|robím,robíš,robí,robíme,robia|si|domácu úlohu;get dressed|getting|gets|obliecť sa|obliekam,obliekaš,oblieka,obliekame,obliekajú|sa|;get up|getting|gets|vstávať|vstávam,vstávaš,vstáva,vstávame,vstávajú||;go to bed|going|goes|ísť spať|chodím,chodíš,chodí,chodíme,chodia||spať;go to school|going|goes|ísť do školy|chodím,chodíš,chodí,chodíme,chodia||do školy;have a shower|having|has|sprchovať sa|sprchujem,sprchuješ,sprchuje,sprchujeme,sprchujú|sa|");
const PARTS=[["in the morning","ráno"],["in the afternoon","poobede"],["in the evening","večer"]].map(([en,sk])=>({en,sk,u:U(7,1)}));
const DAYS=[["Monday","v pondelok"],["Tuesday","v utorok"],["Wednesday","v stredu"],["Thursday","vo štvrtok"],["Friday","v piatok"],["Saturday","v sobotu"],["Sunday","v nedeľu"]].map(([d,sk],i)=>({d,en:"on "+d,sk,we:i>4,u:U(7,2)}));
const TIMES=[["six",6],["seven",7],["eight",8],["nine",9]].flatMap(([h,n])=>[["o'clock","00"],["fifteen","15"],["twenty","20"],["thirty","30"],["forty-five","45"],["fifty","50"]].map(([m,d])=>({en:`at ${h} ${m}`,sk:`o ${n}:${d}`,d:`${n}:${d}`})));
const TIMEW=NN(U(7,3),"one o'clock|jedna hodina;one fifteen|jedna pätnásť;one twenty|jedna dvadsať;one thirty|jedna tridsať;one forty-five|jedna štyridsaťpäť;one fifty|jedna päťdesiat");
const JOBW=NN(U(7,5),"dentist|zubár;farmer|farmár;police officer|policajt;taxi driver|taxikár");
const JOBV=VP(U(7,5),"drive a taxi|driving|drives|šoférovať taxík|šoférujem,šoféruješ,šoféruje,šoférujeme,šoférujú||taxík;work on a farm|working|works|pracovať na farme|pracujem,pracuješ,pracuje,pracujeme,pracujú||na farme;work at the police station|working|works|pracovať na policajnej stanici|pracujem,pracuješ,pracuje,pracujeme,pracujú||na policajnej stanici;help people with their teeth|helping|helps|pomáhať ľuďom so zubami|pomáham,pomáhaš,pomáha,pomáhame,pomáhajú||ľuďom so zubami");
// Unit 8: "english|3rd person|-ing|slovak infinitive|slovak noun (for like)"
const SK8=(u,s)=>s.split(";").map(x=>{const[v,v3,ing,sk,nn]=x.split("|");return{v,en:v,v3,ing,sk,nn,base:v.split(" ")[0],v3W:v3.split(" ")[0],ingW:ing.split(" ")[0],u}});
const SKILLS=SK8(U(8,1),"bounce a ball|bounces a ball|bouncing a ball|odrážať loptu|odrážanie lopty;hop|hops|hopping|poskakovať|poskakovanie;kick a ball|kicks a ball|kicking a ball|kopať do lopty|kopanie do lopty;ride a bike|rides a bike|riding a bike|jazdiť na bicykli|jazdu na bicykli;rollerblade|rollerblades|rollerblading|korčuľovať sa na kolieskových korčuliach|korčuľovanie;skateboard|skateboards|skateboarding|jazdiť na skejtborde|jazdu na skejtborde;skip|skips|skipping|skákať na švihadle|skákanie na švihadle;throw a ball|throws a ball|throwing a ball|hádzať loptu|hádzanie lopty");
const TALENTS=SK8(U(8,3),"act|acts|acting|hrať divadlo|hranie divadla;bake cupcakes|bakes cupcakes|baking cupcakes|piecť koláčiky|pečenie koláčikov;do gymnastics|does gymnastics|doing gymnastics|robiť gymnastiku|gymnastiku;juggle|juggles|juggling|žonglovať|žonglovanie;paint pictures|paints pictures|painting pictures|maľovať obrazy|maľovanie obrazov;play the keyboard|plays the keyboard|playing the keyboard|hrať na keyboarde|hranie na keyboarde");
const DANCE=NN(U(8,5),"celebration|oslava;children|deti;costumes|kostýmy;dancers|tanečníci");
// Unit 9
const FURN=NN(U(9,1),"an armchair|kreslo||n;a coffee table|konferenčný stolík;curtains|závesy||p;a fireplace|krb;a painting|obraz;a rug|koberček;a shelf|polička|poličku|f;a vase|váza|vázu|f");
const KITCH=NN(U(9,3),"a fork|vidlička|vidličku|f;a glass|pohár;a jug|džbán;a knife|nôž;a plate|tanier;a spoon|lyžica|lyžicu|f");
const HOME5=NN(U(9,5),"a chimney|komín;furniture|nábytok;a roof|strecha|strechu|f;stairs|schody||p");
const ROOMS=NN(G2(9),"bathroom|kúpeľňa|kúpeľňu|f;bedroom|spálňa|spálňu|f;kitchen|kuchyňa|kuchyňu|f;living room|obývačka|obývačku|f;dining room|jedáleň||f");
// Unit 10: "english|slovak|accusative|at the … (Slovak)"
const FUN=`adventure playground|ihrisko s preliezkami|ihrisko s preliezkami|na ihrisku s preliezkami;bowling alley|bowlingová dráha|bowlingovú dráhu|na bowlingu;café|kaviareň|kaviareň|v kaviarni;castle|hrad|hrad|na hrade;funfair|lunapark|lunapark|v lunaparku;skate park|skatepark|skatepark|v skateparku;swimming pool|bazén|bazén|na kúpalisku;wildlife park|zveropark|zveropark|v zveroparku`
  .split(";").map(x=>{const[en,sk,acc,loc]=x.split("|");return{en,sk,acc,loc,u:U(10,1)}});
const WEATHER=`cloudy|zamračené|☁️|bolo zamračené|nebolo zamračené|Bolo {x} zamračené;foggy|hmlisto|🌫️|bola hmla|nebola hmla|Bola {x} hmla;rainy|daždivo|🌧️|pršalo|nepršalo|Pršalo {x};snowy|snehovo|❄️|snežilo|nesnežilo|Snežilo {x};sunny|slnečno|☀️|bolo slnečno|nebolo slnečno|Bolo {x} slnečno;windy|veterno|💨|bolo veterno|nebolo veterno|Bolo {x} veterno`
  .split(";").map(x=>{const[en,sk,e,pos,neg,q]=x.split("|");return{en,sk,e,pos,neg,q,u:U(10,3)}});
const XDAY=[...DAYS.map(d=>({...d,u:U(10,2)})),{en:"yesterday",sk:"včera",u:U(10,2)}];
const WATER=NN(U(10,5),"dive|potápať sa;a slide|šmýkačka|šmýkačku|f;splash|špliechať;a water park|akvapark");

// ---------- Persons ----------
const PR={
  I:   {en:"I",   sk:"Ja",  ma:"mám",  would:"by som chcel",  can:"Môžem",  poss:"my",   s3:0},
  you: {en:"you", sk:"Ty",  ma:"máš",  would:"by si chcel",   can:"Môžeš",  poss:"your", s3:0},
  he:  {en:"he",  sk:"On",  ma:"má",   would:"by chcel",      can:"Môže",   poss:"his",  s3:1},
  she: {en:"she", sk:"Ona", ma:"má",   would:"by chcela",     can:"Môže",   poss:"her",  s3:1},
  it:  {en:"it",  sk:"Ono", ma:"má",   would:"by chcelo",     can:"Môže",   poss:"its",  s3:1},
  we:  {en:"we",  sk:"My",  ma:"máme", would:"by sme chceli", can:"Môžeme", poss:"our",  s3:0},
  they:{en:"they",sk:"Oni", ma:"majú", would:"by chceli",     can:"Môžu",   poss:"their",s3:0}};
const P7=Object.keys(PR), PQ=P7.filter(p=>p!=="I");
const NT={has:"hasn't",have:"haven't",does:"doesn't",do:"don't",is:"isn't",are:"aren't",am:"am not",can:"can't",was:"wasn't",were:"weren't"};
const s3=p=>PR[p].s3, sb=p=>PR[p].en, Sb=p=>cap(PR[p].en);
const hv=p=>s3(p)?"has":"have", dz=p=>s3(p)?"does":"do", ap=p=>s3(p)?"'s":"'ve";
const swapH=v=>v==="has"?"have":"has", swapD=v=>v==="does"?"do":"does";
const ansP=p=>p==="you"?"I":p==="I"?"you":p;   // "Have you…?" – "Yes, I have."
const short=(p,yes,aux,self)=>{const a=self?p:ansP(p),v=aux==="have"?hv(a):aux==="do"?dz(a):aux;return (yes?"Yes, ":"No, ")+sb(a)+" "+(yes?v:NT[v])+"."};
const skQ=(p,v,rest)=>cap(v)+(p==="you"?"":" "+PR[p].sk.toLowerCase())+" "+rest+"?";
const TVOJ={m:"tvoj",ma:"tvojho",f:"tvoju",n:"tvoje",p:"tvoje"}, SVOJ={m:"svoj",ma:"svojho",f:"svoju",n:"svoje",p:"svoje"};
const RAD={m:"rád",f:"rada",n:"rado",p:"radi"};
const MA="mám,máš,má,máme,majú", VIE="viem,vieš,vie,vieme,vedia";
// Subjects: a person (PS.he) or a noun ("elephants" agrees like "they"). ci = index in the Slovak present ja,ty,on,my,oni.
const CI={I:0,you:1,he:2,she:2,it:2,we:3,they:4}, GS={I:"m",you:"m",he:"m",she:"f",it:"n",we:"p",they:"p"};
const PS={}; P7.forEach(p=>PS[p]={p,en:PR[p].en,agr:p,sk:PR[p].sk,ci:CI[p],g:GS[p]});
const PSL=ks=>ks.map(k=>PS[k]);
const SP7=PSL(P7), SPQ=PSL(PQ), SNI=PSL(["I","you","he","she","we","they"]), SNIQ=PSL(["you","he","she","we","they"]);
const ALLAN=[...ANIM,...ANIM5];
const ASG=ALLAN.map(a=>({en:art(a.en),agr:"it",sk:a.sk,ci:2,g:"m",an:a})), APL=ALLAN.map(a=>({en:a.pl,agr:"they",sk:a.skpl,ci:4,g:"p",an:a}));
const sS=s=>cap(s.en), sM=s=>s.en, A3=s=>!!s3(s.agr), ansSub=s=>PS[ansP(s.agr)];
const beF=s=>s.agr==="I"?"am":A3(s)?"is":"are", wasF=s=>s.agr==="I"||A3(s)?"was":"were";
const beC=s=>s.p?{am:"'m",is:"'s",are:"'re"}[beF(s)]:" "+beF(s);
const cj=(t,s)=>t.split(",")[s.ci];
const skSub=s=>cap(s.sk), skSubL=s=>s.p?s.sk.toLowerCase():s.sk;
const skAsk=(s,verb,rest)=>cap(verb)+(s.p==="you"?"":" "+skSubL(s))+(rest?" "+rest:"")+"?";
const skV=(s,f,conj,rest,refl)=>f==="q"?skAsk(s,cj(conj,s)+(refl?" "+refl:""),rest):`${skSub(s)}${refl?" "+refl:""} ${f==="neg"?"ne":""}${cj(conj,s)}${rest?" "+rest:""}.`;
const skVP=(s,f,o,extra)=>skV(s,f,o.conj,[o.rest,extra].filter(Boolean).join(" "),o.refl);
const vv=(o,s)=>o.v.replace(/\{my\}/g,PR[s.agr].poss), vv3=(o,s)=>o.v3.replace(/\{my\}/g,PR[s.agr].poss);

// Gap item: the sentence with ___, the right answer and up to three wrong ones (the first three of `wr`)
const pick3=(a,wr)=>[...new Set(wr)].filter(w=>w!==a).slice(0,3);
const gp=(pre,a,post,wr)=>({txt:(pre?pre+" ":"")+"___"+(post?(/^[.?!,]/.test(post)?"":" ")+post:""),a,opts:shuffle([a,...pick3(a,wr)])});
const gpRaw=(pre,a,post,wr)=>({txt:pre+"___"+post,a,opts:shuffle([a,...pick3(a,wr)])});
const opts4=(a,wr)=>shuffle([a,...pick3(a,wr)]);

// ---------- The sentence engine ----------
// aux: do (like, eat, have for breakfast), can, be (am/is/are + -ing, good at), was (was/were), got (have got).
// P = predicate: v / v3 / vn (do, can), c / cn / wc (be, was, got).
function sent(aux,s,P,f){
  const S=sS(s),m=sM(s),t=A3(s);
  if(aux==="do") return f==="pos"?`${S} ${t?P.v3:P.v}.`:f==="neg"?`${S} ${t?"doesn't":"don't"} ${P.vn||P.v}.`:`${t?"Does":"Do"} ${m} ${P.vn||P.v}?`;
  if(aux==="can") return f==="pos"?`${S} can ${P.v}.`:f==="neg"?`${S} can't ${P.v}.`:`Can ${m} ${P.v}?`;
  if(aux==="be"){const b=beF(s);return f==="pos"?`${S}${beC(s)} ${P.c}.`:f==="neg"?(b==="am"?`I'm not ${P.c}.`:`${S} ${NT[b]} ${P.c}.`):`${cap(b)} ${m} ${P.c}?`}
  if(aux==="was"){const b=wasF(s);return f==="pos"?`${S} ${b} ${P.c}.`:f==="neg"?`${S} ${NT[b]} ${P.c}.`:`${cap(b)} ${m} ${P.c}?`}
  const h=t?"has":"have";
  return f==="pos"?`${S}${s.p?(t?"'s":"'ve"):" "+h} got ${P.c}.`:f==="neg"?`${S} ${NT[h]} got ${P.cn||P.c}.`:`${cap(h)} ${m} got ${P.cn||P.c}?`;
}
// Three wrong versions of a sentence (wrong verb form, wrong helper verb, missing word)
function bads(aux,s,P,f){
  const S=sS(s),m=sM(s),t=A3(s),b=beF(s),wb=b==="is"?"are":"is",nb=b==="am"?"am not":NT[b],first=(x,w)=>x.replace(/^\S+/,w);
  if(aux==="do"){const vn=P.vn||P.v,h3=P.v3.split(" ")[0],vn3=first(vn,h3);
    return f==="pos"?[`${S} ${t?P.v:P.v3}.`,`${S} ${b} ${P.v}.`,/^(do|have) /.test(P.v)?`${S} ${P.v.replace(/^(do|hav)e?/,"$1ing")}.`:`${S} ${t?"do":"does"} ${P.v}.`]
      :f==="neg"?[`${S} ${t?"don't":"doesn't"} ${vn}.`,`${S} ${t?"doesn't":"don't"} ${vn3}.`,`${S} ${nb} ${vn}.`]
      :[`${t?"Do":"Does"} ${m} ${vn}?`,`${t?"Does":"Do"} ${m} ${vn3}?`,`${cap(b)} ${m} ${vn}?`]}
  if(aux==="can"){const v3=P.v3||first(P.v,P.v.split(" ")[0]+"s");
    return f==="pos"?[`${S} can ${v3}.`,`${S} can to ${P.v}.`,`${S} cans ${P.v}.`]
      :f==="neg"?[`${S} ${t?"doesn't":"don't"} can ${P.v}.`,`${S} can't ${v3}.`,`${S} not can ${P.v}.`]
      :[`${t?"Does":"Do"} ${m} can ${P.v}?`,`Can ${m} ${v3}?`,`${cap(b)} ${m} can ${P.v}?`]}
  if(aux==="be") return f==="pos"?[`${S} ${P.c}.`,`${S} ${wb} ${P.c}.`,P.wc?`${S}${beC(s)} ${P.wc}.`:`${S} ${t?"do":"does"} ${P.c}.`]
      :f==="neg"?[`${S} ${t?"doesn't":"don't"} ${P.c}.`,`${S} ${NT[wb]} ${P.c}.`,`${S} not ${P.c}.`]
      :[`${t?"Does":"Do"} ${m} ${P.c}?`,`${cap(wb)} ${m} ${P.c}?`,`${S}${beC(s)} ${P.c}?`];
  if(aux==="was"){const w=wasF(s),ww=w==="was"?"were":"was";
    return f==="pos"?[`${S} ${ww} ${P.c}.`,`${S} ${b} ${P.c}.`,`${S} ${P.c}.`]
      :f==="neg"?[`${S} ${NT[ww]} ${P.c}.`,`${S} didn't ${P.c}.`,`${S} not ${P.c}.`]
      :[`${cap(ww)} ${m} ${P.c}?`,`Did ${m} ${P.c}?`,`${cap(b)} ${m} ${P.c}?`]}
  const wh=t?"have":"has",cn=P.cn||P.c;
  return f==="pos"?[`${S} ${wh} got ${P.c}.`,`${S} ${b} got ${P.c}.`,`${S} ${t?"does":"do"} got ${P.c}.`]
    :f==="neg"?[`${S} ${NT[wh]} got ${cn}.`,`${S} ${t?"doesn't":"don't"} got ${cn}.`,`${S} ${nb} got ${cn}.`]
    :[`${cap(wh)} ${m} got ${cn}?`,`${t?"Does":"Do"} ${m} got ${cn}?`,`${cap(b)} ${m} got ${cn}?`];
}
// The gap: the helper verb or the verb itself
function gapOf(aux,s,P,f){
  const S=sS(s),m=sM(s),t=A3(s),b=beF(s),nb=b==="am"?"am not":NT[b];
  if(aux==="do"){
    if(f==="pos"){const w=(t?P.v3:P.v).split(" "),h=P.v.split(" ")[0],h3=P.v3.split(" ")[0];return gp(S,w[0],w.slice(1).join(" ")+".",shuffle([t?h:h3,b+" "+h,/^(do|have)$/.test(h)?h.replace(/e?$/,"ing"):(t?"do ":"does ")+h]))}
    const vn=P.vn||P.v;
    return f==="neg"?gp(S,t?"doesn't":"don't",vn+".",shuffle(["doesn't","don't",nb,"hasn't"])):gp("",t?"Does":"Do",m+" "+vn+"?",shuffle(["Does","Do",cap(b),"Has"]));
  }
  if(aux==="can"){
    if(f==="pos"){if(coin())return gp(S,"can",P.v+".",shuffle(["cans","does",b]));const w=P.v.split(" "),v3=(P.v3||w[0]+"s").split(" ")[0];return gp(S+" can",w[0],w.slice(1).join(" ")+".",shuffle([v3,"to "+w[0],"is "+w[0]]))}
    return f==="neg"?gp(S,"can't",P.v+".",shuffle(["don't","doesn't",nb])):gp("","Can",m+" "+P.v+"?",shuffle(["Do","Does",cap(b)]));
  }
  if(aux==="be"){
    if(f==="pos"){if(P.gapW&&coin()){const[pre,a,post,wr]=P.gapW;return gp(`${S}${beC(s)}${pre?" "+pre:""}`,a,post,wr)}return gp(S,b,P.c+".",shuffle(["am","is","are","has","does"]))}
    return f==="neg"?(b==="am"?gp("I","am not",P.c+".",["isn't","aren't","don't"]):gp(S,nb,P.c+".",shuffle(["isn't","aren't","don't","doesn't"]))):gp("",cap(b),m+" "+P.c+"?",shuffle(["Is","Are","Am","Do","Does"]));
  }
  if(aux==="was"){const w=wasF(s);return f==="pos"?gp(S,w,P.c+".",shuffle(["was","were","is","are"])):f==="neg"?gp(S,NT[w],P.c+".",shuffle(["wasn't","weren't","didn't","isn't"])):gp("",cap(w),m+" "+P.c+"?",shuffle(["Was","Were","Did","Is"]))}
  const h=t?"has":"have",cn=P.cn||P.c;
  return f==="pos"?gp(S,h,"got "+P.c+".",shuffle(["has","have","does",b])):f==="neg"?gp(S,NT[h],"got "+cn+".",shuffle(["hasn't","haven't","doesn't","don't",nb])):gp("",cap(h),m+" got "+cn+"?",shuffle(["Has","Have","Does","Do",cap(b)]));
}
// Short answers: "Yes, I do." "No, she isn't." "Yes, they were."
function shortA(aux,s,yes,self){
  const a=self?PS[s.agr]:ansSub(s),w=a.en;
  if(aux==="be"){const f=beF(a);return yes?`Yes, ${w} ${f}.`:f==="am"?"No, I'm not.":`No, ${w} ${NT[f]}.`}
  const v=aux==="do"?(A3(a)?"does":"do"):aux==="can"?"can":aux==="was"?wasF(a):(A3(a)?"has":"have");
  return yes?`Yes, ${w} ${v}.`:`No, ${w} ${NT[v]}.`;
}
function badShort(aux,s,yes){
  const a=ansSub(s),w=a.en; let v;
  if(aux==="do")v=A3(a)?"do":"does"; else if(aux==="be")v=beF(a)==="is"?"are":"is"; else if(aux==="was")v=wasF(a)==="was"?"were":"was"; else if(aux==="got")v=A3(a)?"have":"has";
  else return yes?`Yes, ${w} cans.`:`No, ${w} don't can.`;
  return yes?`Yes, ${w} ${v}.`:`No, ${w} ${NT[v]}.`;
}
const OTH={do:["be","got"],be:["do","got"],can:["do","be"],was:["be","do"],got:["do","be"]};
const shortWr=(aux,s,yes,extra)=>[...(extra||[]),shortA(aux,s,!yes),...shuffle([shortA(OTH[aux][0],s,yes),shortA(OTH[aux][1],s,yes),badShort(aux,s,yes)])];
const T3D={short:["Odpovedz","Odpovedz krátko","Odpovedz krátko. Pri ✔ Áno / ✘ Nie odpovedz podľa značky, inak podľa toho, čo vieš."],
  flip:["Zmeň","Zmeň vetu","Zmeň kladnú vetu (+) na zápornú (−) alebo zápornú na kladnú."],
  wh:["Odpovedz","Odpovedz celou vetou","Prečítaj si otázku a vyber odpoveď celou vetou."],
  person:["Zmeň","Zmeň osobu","Povedz tú istú vetu o inej osobe. Pozor na tvar slovesa."],
  mix:["Odpovedz","Odpovedz na otázku","Odpovedz krátko alebo celou vetou."]};

// Topic factory for sentences built by the engine.
// c: aux, subs(form) → subjects, objs(s) → things/verbs, xs (times, days, meals…), pred(o,x,s) → P, sk(s,form,o,x),
// fact(s,o,x) → true/false (known fact), null (does not fit) or undefined (free), t3 or t3s, wh(s,o,x), clue(s,o,x).
function F(c){
  const forms=c.forms||["pos","neg","q"], fact=(s,o,x)=>c.fact?c.fact(s,o,x):undefined;
  const d=T3D[c.t3s?"mix":c.t3];
  const T={t3n:d[0],t3title:d[1],t3hint:d[2],...c};
  T.valid=q=>!!q&&c.subs(q.form).includes(q.s)&&c.objs(q.s).includes(q.o)&&fact(q.s,q.o,q.x)!==null&&(!c.ok||c.ok(q));
  T.rnd=()=>{for(let g=0;g<500;g++){const form=pick(forms),s=pick(c.subs(form)),os=c.objs(s);if(!os.length)continue;
    const q={s,o:pick(os),x:c.xs?pick(c.xs):null,form,yes:coin(),t3:c.t3s?pick(c.t3s):c.t3};if(c.adjust)c.adjust(q);if(T.valid(q))return q}
    throw new Error("rnd failed: "+c.name)};
  T.fix=q=>{if(!c.subs(q.form).includes(q.s))return null;if(!c.objs(q.s).includes(q.o))q.o=pick(c.objs(q.s));if(c.adjust)c.adjust(q);return T.valid(q)?q:null};
  T.vary={s:q=>c.subs(q.form),o:q=>c.objs(q.s),x:c.xs?()=>c.xs:null,form:()=>forms};
  T.gen=par=>{
    const{s,o,x,form}=par, fv=fact(s,o,x), free=fv===undefined;
    const f2=form==="q"?"q":free?form:(fv?"pos":"neg");   // a known fact decides + or −
    const P=c.pred(o,x,s), en=sent(c.aux,s,P,f2), sk=c.sk(s,f2,o,x), yes=free?par.yes:fv;
    const qs=f2==="q"?s:(s.agr==="I"?PS.you:s), qEn=sent(c.aux,qs,c.pred(o,x,qs),"q"), qSk=c.sk(qs,"q",o,x);
    let t3, kind=par.t3||c.t3;
    if(kind==="flip"&&f2==="q") kind="short";
    // A wh-question needs a true answer: "What do dolphins eat?" has none in the word list, so ask a yes/no question
    if(kind==="wh"&&c.fact&&!c.objs(s).some(z=>fact(s,z,x)===true)) kind="short";
    if(kind==="wh"){
      const ws=s.agr==="I"?PS.you:s, as=ansSub(ws), okO=z=>{const v=fact(s,z,x);return v===true||(v===undefined&&z===o)};
      const good=c.objs(s).filter(okO), ao=okO(o)?o:pick(good.length?good:[o]);
      const ax=x, P2=c.pred(ao,ax,as), a=sent(c.aux,as,P2,"pos"), q=c.wh(ws,ao,ax);
      let mw;
      if(c.whVary==="x"){const ox=pick(c.xs.filter(z=>z!==ax));mw=sent(c.aux,as,c.pred(ao,ox,as),"pos")}
      else{const others=c.objs(s).filter(z=>z!==ao&&(c.fact?fact(s,z,x)===false:true));const mo=pick(others.length?others:c.objs(s).filter(z=>z!==ao));mw=sent(c.aux,as,c.pred(mo,ax,as),"pos")}
      t3={task:"Odpovedz celou vetou",q,hint:c.clue?c.clue(s,ao,ax):null,a,say:q+" "+a,opts:opts4(a,[mw,...shuffle(bads(c.aux,as,P2,"pos"))])};
    } else if(kind==="flip"){
      const tf=f2==="neg"?"pos":"neg", a=sent(c.aux,s,P,tf);
      t3={task:tf==="neg"?"Zmeň na zápornú vetu (−)":"Zmeň na kladnú vetu (+)",q:en,hint:sk,a,opts:opts4(a,shuffle(bads(c.aux,s,P,tf)))};
    } else if(kind==="person"){
      const src=c.src?c.src(s):(s.agr==="I"?PS.you:PS.I), tf=f2==="q"?"pos":f2, a=sent(c.aux,s,P,tf);
      t3={task:"Zmeň vetu pre: "+sS(s),q:sent(c.aux,src,c.pred(o,x,src),tf),hint:c.sk(s,tf,o,x),a,opts:opts4(a,shuffle(bads(c.aux,s,P,tf)))};
    } else {
      const a=shortA(c.aux,qs,yes), sc=c.scene?c.scene(par,yes):null;
      t3={task:"Odpovedz krátko",q:qEn,hint:qSk,clue:free&&!sc?yes:null,scene:sc,a,say:qEn+" "+a,opts:opts4(a,shortWr(c.aux,qs,yes,c.extraWr?c.extraWr(qs,yes):null))};
    }
    let gap=c.gap?c.gap(s,P,f2,o,x):null;
    if(!gap&&c.xGap&&x&&Math.random()<.3){const i=en.lastIndexOf(" "+x.en);gap=gp(en.slice(0,i),x.en,en.slice(-1),c.xs.map(z=>z.en))}
    if(!gap) gap=gapOf(c.aux,s,P,f2);
    return{en,sk,gap,t3,alts:c.alt?c.alt(s,P,f2,o,x):[],ya:shortA(c.aux,s,true,1),na:shortA(c.aux,s,false,1),ans:f2==="q"?shortA(c.aux,s,yes,1):null};
  };
  return T;
}
// Rule-table rows for a factory topic: one row per subject
const rows=(subs,mk)=>subs.map(s=>({l:s.p?s.en:cap(s.en),par:{s,form:"pos",yes:true,t3:"short",x:null,...mk(s)}}));
const COLS5=[["+",{form:"pos"}],["−",{form:"neg"}],["?",{form:"q"}],["Áno",{form:"q"},"ya"],["Nie",{form:"q"},"na"]];
const COLSF=[["Veta",{form:"pos"}],["? otázka",{form:"q"}],["Odpoveď",{form:"q"},"ans"]];

// Writing-focus topics: one sentence, a gap and wrong versions; typed answers are checked strictly (capitals and punctuation)
function WFT(c){
  const T={t3n:"Vyber",t3title:"Vyber správnu vetu",strict:true,...c};
  T.rnd=()=>({d:c.make()});
  T.gen=({d})=>({en:d.en,sk:d.sk,gap:d.gap,alts:d.alts||[],w:d.w,scene:d.scene,t3:{task:d.task||c.task,q:d.q||null,hint:d.sk,clue:d.clue,a:d.a||d.en,say:d.say,opts:opts4(d.a||d.en,shuffle(d.wr))}});
  T.rule={...c.rule,cols:[["Príklady",{}]],rows:Array.from({length:6},()=>({l:"•",par:{d:c.make()}}))};
  return T;
}
const dropEnd=s=>s.slice(0,-1);

// ================= UNIT 1 · Time for school =================
const WHO=["I","we","he","she","they"], OWN=["your","his","her","their"], OWN_BAD={your:"you",his:"he",her:"she",their:"they"};
const T_CAN={name:"Can I use your …?",t3n:"Vyber",t3title:"Otázka a odpoveď",t3hint:"Vyber správnu otázku alebo správnu odpoveď.",
  ok:q=>q.w!==q.o&&!((q.w==="he"&&q.o==="his")||(q.w==="she"&&q.o==="her")||(q.w==="they"&&q.o==="their")),
  vary:{w:()=>WHO,o:()=>OWN,n:()=>SCHOOL}, fix:q=>T_CAN.ok(q)?q:null,
  rnd(){let q;do q={w:Math.random()<.5?"I":pick(WHO),o:Math.random()<.5?"your":pick(OWN),n:pick(SCHOOL),k:Math.random(),k2:coin()};while(!T_CAN.ok(q));return q},
  gen({w,o,n,k,k2}){
    const b=bare(n), en=`Can ${sb(w)} use ${o} ${b}?`, po=o==="your"?TVOJ[n.g]:{his:"jeho",her:"jej",their:"ich"}[o], ans="Sure! Here you are.";
    const sk=`${PR[w].can}${w==="I"||w==="we"?"":" "+PR[w].sk.toLowerCase()} použiť ${po} ${n.acc}?`;
    const gap=k<.3?gp(`Can ${sb(w)}`,"use",`${o} ${b}?`,shuffle(["uses","using","to use"]))
      :k<.5?gp("","Can",`${sb(w)} use ${o} ${b}?`,shuffle(["Am","Have","Is","Are"]))
      :k<.8?gp(`Can ${sb(w)} use`,o,`${b}?`,shuffle([...OWN.filter(x=>x!==o),OWN_BAD[o]]))
      :{...gp(`${en} – Sure! Here you`,"are",".",["is","am","go"]),full:en+" – "+ans};
    const t3=k2?{task:"Vyber správnu odpoveď",q:en,hint:sk,a:ans,say:en+" "+ans,opts:opts4(ans,shuffle(["Yes, I have.","Sure! Here you is.","Yes, I use.","Sure! Here are you."]))}
      :{task:"Vyber správnu otázku",q:null,hint:sk,a:en,opts:opts4(en,shuffle([`Can ${sb(w)} uses ${o} ${b}?`,`${Sb(w)} can use ${o} ${b}?`,`Can ${sb(w)} use ${OWN_BAD[o]} ${b}?`,`Do ${sb(w)} can use ${o} ${b}?`]))};
    return{en,sk,gap,t3,ya:ans};
  },
  rule:{text:["Keď si chceš niečo požičať, opýtaš sa: <b>Can I use your …?</b> = Môžem použiť tvoj …?",
    "Odpoveď: <b>Sure! Here you are.</b> = Jasné! Nech sa páči.",
    "Pýtať sa môžeš aj za iných (Can <b>we</b> / <b>he</b> / <b>she</b> / <b>they</b> …?) a aj na vec niekoho iného: <b>his</b> (jeho), <b>her</b> (jej), <b>their</b> (ich)."],
    tips:["Po <b>can</b> je sloveso bez -s a bez to: Can she <s>uses</s> <b>use</b> your ruler?","<b>your</b> = tvoj. <s>Can I use you folder?</s> je zle."],
    cols:[["? otázka",{}]],
    rows:[["I","your"],["I","his"],["I","her"],["I","their"],["we","your"],["he","your"],["she","your"],["they","your"]].map(([w,o])=>({l:sb(w),par:{w,o,n:SCHOOL[4],k:0,k2:true}}))},
  voc:SCHOOL};

const gotObjs=s=>s.agr==="it"?BODY:SCHOOL;
const gotSk=(s,f,o)=>skV(s,f,MA,o.acc);
const T_GOTQ=F({name:"Have you got a …?",aux:"got",forms:["q"],t3:"short",subs:()=>SPQ,objs:gotObjs,
  pred:o=>({c:o.en,cn:anyN(o)}),sk:gotSk,alt:(s,P)=>[`${A3(s)?"Does":"Do"} ${sM(s)} have ${P.cn}?`],
  rule:{text:["Otázka s have got: <b>Have</b> you got a …? <b>Has</b> he / she / it got a …?",
    "Krátka odpoveď: Yes, I <b>have</b>. / No, I <b>haven't</b>. Yes, she <b>has</b>. / No, she <b>hasn't</b>."],
    tips:["V krátkej odpovedi už got nie je: <s>Yes, I have got.</s> → <b>Yes, I have.</b>","Pri množnom čísle: Have you got <b>any</b> scissors?","Na otázku <b>Have you …?</b> odpovedáš o sebe: Yes, <b>I</b> have."],
    cols:[["? otázka",{form:"q"}],["Áno",{form:"q"},"ya"],["Nie",{form:"q"},"na"]],rows:rows(SPQ,s=>({o:gotObjs(s)[0]}))},
  voc:[...SCHOOL,...BODY]});
const T_GOT=F({name:"I've got / He's got",aux:"got",forms:["pos","neg"],t3:"flip",subs:()=>SP7,objs:gotObjs,
  pred:o=>({c:o.en,cn:anyN(o)}),sk:gotSk,alt:(s,P,f)=>[f==="neg"?`${sS(s)} ${A3(s)?"doesn't":"don't"} have ${P.cn}.`:`${sS(s)} ${A3(s)?"has":"have"} ${P.c}.`],
  rule:{text:["<b>have got</b> znamená <b>mať</b> (niečo vlastniť). Pri <b>he, she, it</b> sa mení na <b>has got</b>.",
    "Skrátene: <b>I've got, you've got, he's got, she's got, it's got, we've got, they've got</b>.",
    "Zápor: <b>haven't got</b> (I, you, we, they) a <b>hasn't got</b> (he, she, it)."],
    tips:["<b>he's got</b> = he <b>has</b> got (nie he is).","V zápore pri množnom čísle pridávame <b>any</b>: I haven't got <b>any</b> scissors."],
    cols:[["+ kladná veta",{form:"pos"}],["− záporná veta",{form:"neg"}]],rows:rows(SP7,s=>({o:gotObjs(s)[0]}))},
  voc:[...SCHOOL,...BODY]});

const oursPool=p=>p==="it"?ITTOYS:SPORT;
const T_OURS={name:"We've got our …",t3n:"Zmeň",t3title:"Zmeň osobu",
  t3hint:"Povedz tú istú vetu o inej osobe. Pozor na 's / 've a na my, your, his, her, its, our, their.",
  vary:{p:()=>P7,n:q=>oursPool(q.p)}, fix:q=>{if(!oursPool(q.p).includes(q.n))q.n=pick(oursPool(q.p));return q},
  rnd(){const p=pick(P7);return{p,n:pick(oursPool(p)),s0:pick(P7.filter(x=>x!==p&&x!=="it"))}},
  gen({p,n,s0}){
    const b=bare(n), en=`${Sb(p)}${ap(p)} got ${PR[p].poss} ${b}.`, sk=`${PR[p].sk} ${PR[p].ma} ${SVOJ[n.g]} ${n.acc}.`;
    if(!s0||s0===p) s0=P7.find(x=>x!==p&&x!=="it");
    const gap=gp(`${Sb(p)}${ap(p)} got`,PR[p].poss,`${b}.`,shuffle(P7.map(x=>PR[x].poss).filter(x=>x!==PR[p].poss)));
    const src=`${Sb(s0)}${ap(s0)} got ${PR[s0].poss} ${b}.`, x3=pick(P7.filter(x=>x!==p&&x!==s0));
    return{en,sk,gap,t3:{task:"Zmeň vetu pre: "+Sb(p),q:src,hint:sk,a:en,
      opts:opts4(en,shuffle([`${Sb(p)}${ap(p)} got ${PR[s0].poss} ${b}.`,`${Sb(p)}${ap(p)==="'s"?"'ve":"'s"} got ${PR[p].poss} ${b}.`,`${Sb(p)}${ap(p)} got ${PR[x3].poss} ${b}.`]))}};
  },
  rule:{text:["Komu niečo patrí: I – <b>my</b>, you – <b>your</b>, he – <b>his</b>, she – <b>her</b>, it – <b>its</b>, we – <b>our</b>, they – <b>their</b>.",
    "We've got <b>our</b> football boots. They've got <b>their</b> trainers."],
    tips:["<b>its</b> (bez apostrofu) = jeho / jej (zvieratka alebo veci). <b>it's</b> = it is alebo it has.","Po slovensky často hovoríme <b>svoj</b>: Mám svoje tenisky. = I've got <b>my</b> trainers."],
    cols:[["+ kladná veta",{}]],rows:P7.map(p=>({l:sb(p),par:{p,n:oursPool(p)===SPORT?SPORT[3]:ITTOYS[0],s0:"I"}}))},
  voc:[...SPORT,...ITTOYS]};

const COUNTRIES=[["France","z Francúzska"],["Morocco","z Maroka"]];
const WF_CAPS=WFT({name:"Capital letters and full stops",task:"Vyber správne napísanú vetu",t3hint:"Vyber vetu, ktorá má veľké písmená a bodku na správnom mieste.",
  make(){
    const N=pick(NAMES),a=pick(ART),b=pick(ART.filter(x=>x!==a)),D=pick(DAYS.slice(0,5)),C=pick(COUNTRIES);
    const[en,sk,caps]=pick([[`${N.en} has got ${a.en}.`,`${N.en} má ${a.acc}.`,[N.en]],[`I've got ${a.en} and ${b.en}.`,`Ja mám ${a.acc} a ${b.acc}.`,["I've"]],
      [`On ${D.d} we have art.`,`${cap(D.sk)} máme výtvarnú výchovu.`,["On",D.d]],[`${N.en} is from ${C[0]}.`,`${N.en} je ${C[1]}.`,[N.en,C[0]]],
      [`${N.en} and I have got ${a.en}.`,`${N.en} a ja máme ${a.acc}.`,[N.en,"I"]]]);
    const lowW=w=>en.replace(new RegExp("\\b"+w+"(?![\\w])"),low1(w));
    const wr=shuffle([low1(en),dropEnd(en),...caps.map(lowW),low1(dropEnd(en))]);
    let gap;
    if(coin())gap=gpRaw(dropEnd(en),".","",["?",",",":"]);
    else{const w=pick(caps),i=en.indexOf(w);gap=gpRaw(en.slice(0,i),w,en.slice(i+w.length),[low1(w),w.toUpperCase()])}
    return{en,sk,gap,wr};
  },
  rule:{text:["Veta sa začína <b>veľkým písmenom</b> a končí sa <b>bodkou</b> (.).",
    "Veľkým písmenom píšeme aj <b>I</b> (ja), <b>mená</b> (Sam, Eva), <b>dni</b> (Monday) a <b>krajiny</b> (France, Morocco)."],
    tips:["<b>I</b> je vždy veľké, aj v strede vety: Sam and <b>I</b> have got paints.","Pri písaní (krok 6) sa kontrolujú aj veľké písmená a bodka."]},
  voc:ART});

// ================= UNIT 2 · Mealtime =================
const T_WOULD={name:"I'd like some …",t3n:"Odpovedz",t3title:"Odpovedz celou vetou",
  t3hint:"Prečítaj si otázku a vyber správnu odpoveď. Pod otázkou je jedlo, ktoré si dotyčný želá.",
  vary:{p:()=>P7,f:()=>FOOD,m:()=>MEALS},
  rnd(){return{p:pick(P7),f:pick(FOOD),m:pick(MEALS),r:Math.random()}},
  gen({p,f,m,r}){
    const en=`${Sb(p)}'d like some ${f.en} for ${m.en}.`, sk=`${PR[p].sk} ${PR[p].would} ${m.sk} ${f.acc}.`;
    const gap=r<.4?gp(Sb(p),"would like",`some ${f.en} for ${m.en}.`,shuffle(["would likes","likes","is like"]))
      :r<.7?gp(`${Sb(p)}'d like some ${f.en} for`,m.en,".",MEALS.map(x=>x.en))
      :gp(`${Sb(p)}'d like`,"some",`${f.en} for ${m.en}.`,["a","any","an"]);
    const p2=p==="I"?"you":p, a2=ansP(p2), mo=MEALS.find(x=>x!==m), op=p2!==a2?p2:P7.find(x=>x!==a2&&x!=="it");
    const a=`${Sb(a2)}'d like some ${f.en} for ${m.en}.`, q=`What would ${sb(p2)} like for ${m.en}?`;
    return{en,sk,gap,t3:{task:"Odpovedz celou vetou",q,hint:"jedlo: "+f.sk,a,say:q+" "+a,
      opts:opts4(a,shuffle([`${Sb(a2)}'d like some ${f.en} for ${mo.en}.`,`${Sb(a2)}'d likes some ${f.en} for ${m.en}.`,`${Sb(op)}'d like some ${f.en} for ${m.en}.`,`${Sb(a2)} like some ${f.en} for ${m.en}.`]))}};
  },
  rule:{text:["<b>I'd like</b> = <b>I would like</b> = chcel by som. Je to zdvorilé, keď si niečo pýtaš.",
    "<b>some</b> = trochu, nejaké: I'd like <b>some</b> rice for lunch.",
    "<b>for breakfast</b> = na raňajky, <b>for lunch</b> = na obed, <b>for dinner</b> = na večeru.",
    "Pre všetky osoby je tvar rovnaký: I'd, you'd, he'd, she'd, it'd, we'd, they'd <b>like</b>."],
    tips:["Po would je like vždy bez -s: She'd <s>likes</s> <b>like</b> some chicken.","Otázka: <b>What would you like</b> for breakfast? – <b>I'd like</b> some cereal."],
    cols:[["+ kladná veta",{}]],rows:P7.map(p=>({l:sb(p),par:{p,f:FOOD[5],m:MEALS[1],r:0}}))},
  voc:[...FOOD,...MEALS.map(m=>({en:m.en,sk:m.w,u:m.u}))]};

const T_MEAL=F({name:"I have … for breakfast",aux:"do",t3:"short",xGap:true,subs:f=>f==="q"?SPQ:SP7,objs:()=>FOOD,xs:MEALS,
  pred:(o,x)=>({v:`have ${o.en} for ${x.en}`,v3:`has ${o.en} for ${x.en}`}),sk:(s,f,o,x)=>skV(s,f,MA,`${x.sk} ${o.acc}`),
  rule:{text:["<b>have</b> pri jedle znamená <b>jesť, mať na jedlo</b>: I have cereal for breakfast. = Na raňajky mám cereálie.",
    "Otázka: <b>Do</b> you have …? <b>Does</b> he / she / it have …? Odpoveď: Yes, I <b>do</b>. / No, I <b>don't</b>. Yes, she <b>does</b>. / No, she <b>doesn't</b>."],
    tips:["<b>She has</b> rice. ale <b>Does she have</b> rice? a <b>She doesn't have</b> rice. (po does / doesn't je vždy have)","Pri jedle nepoužívame got: <s>I've got cereal for breakfast.</s>"],
    cols:COLS5,rows:rows(SP7,()=>({o:FOOD[1],x:MEALS[0]}))},
  voc:[...FOOD,...MEALS.map(m=>({en:m.en,sk:m.w,u:m.u}))]});
const T_HAVE=F({name:"I have / He has",aux:"do",forms:["pos","neg"],t3:"flip",subs:()=>SP7,objs:()=>FOOD,
  pred:o=>({v:`have ${o.en}`,v3:`has ${o.en}`,vn:`have ${anyN(o)}`}),sk:(s,f,o)=>skV(s,f,MA,o.acc),
  alt:(s,P,f,o)=>[f==="neg"?`${sS(s)} ${A3(s)?"hasn't":"haven't"} got ${anyN(o)}.`:`${sS(s)} ${A3(s)?"has":"have"} got ${o.en}.`],
  rule:{text:["Samotné <b>have</b> znamená <b>mať</b>. Pri <b>he, she, it</b> je <b>has</b>: She has sandwiches.",
    "Zápor sa robí pomocou <b>don't</b> (I, you, we, they) a <b>doesn't</b> (he, she, it): I <b>don't have</b> any biscuits. She <b>doesn't have</b> any rice."],
    tips:["Po <b>doesn't</b> je vždy <b>have</b>, nikdy has: She doesn't <s>has</s> <b>have</b> any chips.",
      "Nehovoríme <s>I haven't any rice.</s> Správne je <b>I don't have any rice.</b> alebo <b>I haven't got any rice.</b>"],
    cols:[["+ kladná veta",{form:"pos"}],["− záporná veta",{form:"neg"}]],rows:rows(SP7,()=>({o:FOOD[6]}))},
  voc:FOOD});

const diffThings=p=>p==="it"?BODY:SCHOOL;
const T_DIFF={name:"have got alebo have?",t3n:"Odpovedz",t3title:"Odpovedz krátko",
  t3hint:"Pozri sa, či je otázka s got alebo s do/does, a vyber krátku odpoveď podľa ✔ Áno / ✘ Nie.",
  vary:{p:q=>q.k[0]==="q"?PQ:P7,n:q=>diffThings(q.p),f:()=>FOOD,m:()=>MEALS},
  fix:q=>{if(q.n&&!diffThings(q.p).includes(q.n))q.n=pick(diffThings(q.p));return q},
  rnd(){const k=pick(["qg","qd","ng","nd","meal"]), p=k[0]==="q"?pick(PQ):pick(P7);
    return k==="meal"?{k,p,f:pick(FOOD),m:pick(MEALS),yes:coin()}:{k,p,n:pick(diffThings(p)),yes:coin()}},
  gen({k,p,n,f,m,yes}){
    const p2=p==="I"?"you":p, qa=(q,sk,aux,wr)=>{const a=short(p2,yes,aux);return{task:"Odpovedz krátko",q,hint:sk,clue:yes,a,opts:opts4(a,wr),say:q+" "+a}};
    if(k==="meal"){
      const h=hv(p), en=`${Sb(p)} ${h} ${f.en} for ${m.en}.`, sk=`${PR[p].sk} ${PR[p].ma} ${m.sk} ${f.acc}.`, q2=`${cap(dz(p2))} ${sb(p2)} have ${f.en} for ${m.en}?`;
      return{en,sk,gap:gp(Sb(p),h,`${f.en} for ${m.en}.`,[h+" got",swapH(h),swapH(h)+" got"]),
        t3:qa(q2,skQ(p2,PR[p2].ma,`${m.sk} ${f.acc}`),"do",[short(p2,!yes,"do"),short(p2,yes,"have"),short(p2,!yes,"have")])};
    }
    const got=k==="qg"||k==="ng", q=k[0]==="q";
    const Fm={qg:`${cap(hv(p))} ${sb(p)} got ${anyN(n)}?`,qd:`${cap(dz(p))} ${sb(p)} have ${anyN(n)}?`,ng:`${Sb(p)} ${NT[hv(p)]} got ${anyN(n)}.`,nd:`${Sb(p)} ${NT[dz(p)]} have ${anyN(n)}.`};
    const en=Fm[k], sk=q?skQ(p,PR[p].ma,n.acc):`${PR[p].sk} ne${PR[p].ma} ${n.acc}.`;
    const gap=q?gp("",cap(got?hv(p):dz(p)),`${sb(p)} ${got?"got":"have"} ${anyN(n)}?`,shuffle(["Has","Have","Does","Do"]))
               :gp(Sb(p),got?NT[hv(p)]:NT[dz(p)],`${got?"got":"have"} ${anyN(n)}.`,shuffle(["hasn't","haven't","doesn't","don't"]));
    const aux=got?"have":"do", oth=got?"do":"have";
    const qq=q?en:got?`${cap(hv(p2))} ${sb(p2)} got ${anyN(n)}?`:`${cap(dz(p2))} ${sb(p2)} have ${anyN(n)}?`;
    return{en,sk,alts:[Fm[{qg:"qd",qd:"qg",ng:"nd",nd:"ng"}[k]]],gap,t3:qa(qq,skQ(p2,PR[p2].ma,n.acc),aux,[short(p2,!yes,aux),short(p2,yes,oth),short(p2,!yes,oth)])};
  },
  rule:{text:["<b>have got</b> aj <b>have</b> znamenajú <b>mať</b>. Líšia sa v zápore, v otázke a v krátkej odpovedi.",
    "<b>have got</b> si vystačí samo: <b>Has</b> she got a folder? – Yes, she <b>has</b>.",
    "<b>have</b> potrebuje pomocníka <b>do / does</b>: <b>Does</b> she have a folder? – Yes, she <b>does</b>."],
    tips:["Pri jedle (raňajky, obed, večera) používame iba <b>have</b>: I have cereal for breakfast. <s>I've got cereal for breakfast.</s>",
      "Na otázku s <b>got</b> odpovedáš s <b>have / has</b>, na otázku s <b>do / does</b> odpovedáš s <b>do / does</b>."],
    custom(){
      const wrap=$("div",{class:"fs"}), chips=$("div",{class:"chips"}), tb=$("div",{class:"tw"}); let cp="she";
      const draw=()=>{
        chips.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",x.dataset.p===cp));
        const p=cp, n=p==="it"?BODY[0]:SCHOOL[1], f=p==="it"?FOOD[0]:FOOD[5], h=hv(p), d=dz(p);
        const rs=[["+",`${Sb(p)}${ap(p)} got ${n.en}.`,`${Sb(p)} ${h} ${n.en}.`],["−",`${Sb(p)} ${NT[h]} got ${n.en}.`,`${Sb(p)} ${NT[d]} have ${n.en}.`],
          ["?",`${cap(h)} ${sb(p)} got ${n.en}?`,`${cap(d)} ${sb(p)} have ${n.en}?`],["Áno",short(p,1,"have",1),short(p,1,"do",1)],["Nie",short(p,0,"have",1),short(p,0,"do",1)],
          ["jedlo",null,`${Sb(p)} ${h} ${f.en} for lunch.`]];
        tb.innerHTML="";
        tb.append($("table",{class:"cmp"},$("thead",{},$("tr",{},$("th",{},""),$("th",{},"have got"),$("th",{},"have"))),
          $("tbody",{},rs.map(r=>$("tr",{},$("th",{},r[0]),r.slice(1).map(x=>$("td",{},x?$("button",{class:"say",onclick:()=>speak(x)},x):$("span",{class:"no"},"nepoužíva sa"))))))));
      };
      P7.forEach(p=>chips.append($("button",{class:"chip","data-p":p,onclick:()=>{cp=p;draw()}},sb(p))));
      draw(); wrap.append($("p",{class:"hint"},"Vyber osobu a ťukni na vetu, vypočuješ si ju."),chips,tb); return wrap;
    }},
  voc:[...SCHOOL,...BODY,...FOOD]};

const likeWr=(s,yes)=>{const a=ansSub(s);return[yes?`Yes, ${a.en} ${A3(a)?"likes":"like"}.`:`No, ${a.en} ${A3(a)?"doesn't":"don't"} like.`]};
const skLike=(s,f,acc)=>skV(s,f,MA,RAD[s.g]+" "+acc);
const T_LIKE=F({name:"Do you like …?",aux:"do",t3:"short",subs:f=>f==="q"?SPQ:SP7,objs:()=>VEG,extraWr:likeWr,
  pred:o=>({v:`like ${o.en}`,v3:`likes ${o.en}`}),sk:(s,f,o)=>skLike(s,f,o.acc),
  rule:{text:["<b>like</b> = mať rád. Pri <b>he, she, it</b> pridáme <b>-s</b>: she <b>likes</b> carrots.",
    "Zápor: I <b>don't like</b>, she <b>doesn't like</b>. Otázka: <b>Do</b> you like …? <b>Does</b> he like …?",
    "Krátka odpoveď: Yes, I <b>do</b>. / No, I <b>don't</b>. Yes, he <b>does</b>. / No, he <b>doesn't</b>."],
    tips:["Po <b>doesn't</b> a <b>does</b> je like bez -s: She doesn't <s>likes</s> <b>like</b> peas.","V krátkej odpovedi už like nie je: <s>Yes, I like.</s> → <b>Yes, I do.</b>"],
    cols:COLS5,rows:rows(SP7,()=>({o:VEG[1]}))},
  voc:VEG});

const WF_AND=WFT({name:"Joining sentences with and",task:"Spoj dve vety pomocou and",t3hint:"Spoj dve vety do jednej pomocou and.",
  make(){
    const p=pick(P7.filter(x=>x!=="it")), like=coin(), pool=[...FOOD5,...FOOD].filter(n=>!like||!/^an? /.test(n.en)), a=pick(pool), b=pick(pool.filter(x=>x!==a));
    const v=like?(s3(p)?"likes":"like"):hv(p), S=Sb(p), A=`${S} ${v} ${a.en}`;
    const en=`${A} and ${b.en}.`, q=`${A}. ${S} ${v} ${b.en}.`;
    const sk=like?`${PR[p].sk} ${PR[p].ma} ${RAD[GS[p]]} ${a.acc} a ${b.acc}.`:`${PR[p].sk} ${PR[p].ma} ${a.acc} a ${b.acc}.`;
    return{en,sk,q,gap:gp(A,"and",`${b.en}.`,["but","so","because"]),wr:[`${A} ${b.en}.`,`${A}. And ${b.en}.`,`${S} ${v} and ${a.en} ${b.en}.`,`${A}, and ${b.en}.`]};
  },
  rule:{text:["Dve vety, ktoré majú rovnaký začiatok, spojíš slovom <b>and</b> (a).",
    "I like pasta. I like cake. → I like pasta <b>and</b> cake."],
    tips:["Pred <b>and</b> nepíšeme čiarku a začiatok vety už neopakujeme.","Pri písaní (krok 6) sa kontrolujú aj veľké písmená a bodka."]},
  voc:[...FOOD5,...FOOD]});

// ================= UNIT 3 · Wild animals =================
const CANIT_ALL=[...SNI,...ASG,...APL], CANIT_Q=[...SNIQ,...ASG,...APL];
const F_CANIT=F({name:"Can it …?",aux:"can",t3:"short",subs:f=>f==="q"?CANIT_Q:CANIT_ALL,
  objs:s=>s.an?MOVES.filter(v=>v.en in s.an.can):MOVES,
  fact:(s,o)=>s.an?(o.en in s.an.can?s.an.can[o.en]:null):undefined,
  pred:o=>({v:o.en,v3:o.en3}),sk:(s,f,o)=>skV(s,f,VIE,o.sk),
  rule:{text:["<b>can</b> = vedieť, dokázať. Je rovnaké pre všetky osoby: I can, he can, it can, they can.",
    "Otázka: <b>Can it</b> swim? Odpoveď: Yes, it <b>can</b>. / No, it <b>can't</b>.",
    "Pri zvieratkách odpovedáš podľa toho, čo vieš: Can a penguin fly? – No, it can't."],
    tips:["Po can je sloveso bez -s a bez to: It can <s>swims</s> <b>swim</b>.","<b>can't</b> = cannot (nevie)."],
    cols:COLSF,rows:rows([ASG[0],ASG[5],APL[6],APL[4],PS.you,PS.she],s=>({o:s.an?MOVES.find(v=>v.en in s.an.can):MOVES[0]}))},
  voc:[...ANIM,...MOVES]});

const LIVE_ALL=[...SNI,...ASG.filter(s=>s.an.live!=="-"),...APL.filter(s=>s.an.live!=="-")], LIVE_Q=LIVE_ALL.filter(s=>s.agr!=="I");
const F_LIVE=F({name:"Do they live on land?",aux:"do",t3:"short",subs:f=>f==="q"?LIVE_Q:LIVE_ALL,objs:()=>HABITAT,
  fact:(s,o)=>s.an?s.an.live===o.k:o.k==="land",
  pred:o=>({v:`live ${o.en}`,v3:`lives ${o.en}`}),sk:(s,f,o)=>skV(s,f,"žijem,žiješ,žije,žijeme,žijú",o.sk),
  rule:{text:["<b>live</b> = žiť. Dolphins <b>live</b> in water. They <b>don't live</b> on land.",
    "Otázka: <b>Do</b> zebras live on land? – Yes, they <b>do</b>. / No, they <b>don't</b>.",
    "Pri jednom zvieratku (it) pridáme -s: A shark <b>lives</b> in water. <b>Does</b> it live on land? – No, it <b>doesn't</b>."],
    tips:["<b>on land</b> = na súši, <b>in water</b> = vo vode."],
    cols:COLSF,rows:rows([APL[0],APL[1],APL[11],ASG[7],PS.we],()=>({o:HABITAT[0]}))},
  voc:[...ANIM,...HABITAT]});

const EAT_SG=ASG.filter(s=>Object.keys(s.an.eat).length), EAT_PL=APL.filter(s=>Object.keys(s.an.eat).length), EAT_ALL=[...EAT_PL,...EAT_PL,...EAT_SG];
const F_EAT=F({name:"What do … eat?",aux:"do",t3s:["wh","short"],subs:()=>EAT_ALL,objs:s=>AFOOD.filter(o=>o.en in s.an.eat),
  fact:(s,o)=>o.en in s.an.eat?s.an.eat[o.en]:null,
  pred:o=>({v:`eat ${o.en}`,v3:`eats ${o.en}`}),sk:(s,f,o)=>skV(s,f,"jem,ješ,je,jeme,jedia",o.acc),
  wh:s=>`What ${A3(s)?"does":"do"} ${sM(s)} eat?`,
  rule:{text:["<b>What do</b> elephants <b>eat</b>? – They <b>eat</b> grass. They <b>don't eat</b> meat.",
    "Pri jednom zvieratku: What <b>does</b> a koala eat? – It <b>eats</b> leaves."],
    tips:["Odpovedáš s <b>they</b> (viac zvieratiek) alebo <b>it</b> (jedno zvieratko).","Zvieratká odpovede nemajú nápovedu: odpovedz podľa toho, čo vieš."],
    cols:COLSF,rows:rows([APL[1],APL[6],APL[4],ASG[10],APL[7]],s=>({o:AFOOD.find(z=>s.an.eat[z.en]===true)}))},
  voc:[...AFOOD,...ANIM,...ANIM5]});

const WF_BUT=WFT({name:"Commas and but",task:"Spoj vety čiarkou a but",t3hint:"Spoj kladnú a zápornú vetu čiarkou a slovom but.",
  make(){
    for(;;){
      const a=pick(Math.random()<.7?ANIM5:ANIM), can=coin(), facts=can?a.can:a.eat, ys=Object.keys(facts).filter(k=>facts[k]), ns=Object.keys(facts).filter(k=>!facts[k]);
      if(!ys.length||!ns.length) continue;
      const y=pick(ys), n=pick(ns), pl=coin(), S=pl?cap(a.pl):cap(art(a.en)), pr=pl?"they":"it", Sk=cap(pl?a.skpl:a.sk), sing=!pl;
      let p1,p2,sk,bad;
      if(can){const vy=MOVES.find(v=>v.en===y), vn=MOVES.find(v=>v.en===n);
        p1=`${S} can ${y}`; p2=`${pr} can't ${n}`; bad=`${pr} can ${n}`;
        sk=`${Sk} ${sing?"vie":"vedia"} ${vy.sk}, ale ${sing?"nevie":"nevedia"} ${vn.sk}.`}
      else{const fy=AFOOD.find(f=>f.en===y), fn=AFOOD.find(f=>f.en===n);
        p1=`${S} ${sing?"eats":"eat"} ${y}`; p2=`${pr} ${sing?"doesn't":"don't"} eat ${n}`; bad=`${pr} ${sing?"eats":"eat"} ${n}`;
        sk=`${Sk} ${sing?"je":"jedia"} ${fy.acc}, ale ${sing?"neje":"nejedia"} ${fn.acc}.`}
      const en=`${p1}, but ${p2}.`, q=`${p1}. ${cap(p2)}.`;
      const gap=coin()?gp(p1+",","but",p2+".",["and","so","because"]):gpRaw(p1,","," but "+p2+".",[".",";","?"]);
      return{en,sk,q,gap,wr:[`${p1} but ${p2}.`,`${p1}, and ${p2}.`,`${p1}. but ${p2}.`,`${p1}, but ${bad}.`]};
    }
  },
  rule:{text:["Kladnú a zápornú vetu spojíš slovom <b>but</b> (ale). Pred but píšeme <b>čiarku</b>.",
    "Kangaroos eat grass<b>, but</b> they don't eat meat. A koala can climb<b>, but</b> it can't fly."],
    tips:["Za but pokračuje veta malým písmenom: <s>, But</s> → <b>, but</b>.","Pri písaní (krok 6) sa kontroluje aj čiarka."]},
  voc:[...ANIM5,...MOVES,...AFOOD]});

// ================= UNIT 4 · My favourite things =================
const ownSk=(x,g)=>x.st+(x.m?{m:"ov",f:"ova",n:"ovo",p:"ove"}:{m:"in",f:"ina",n:"ino",p:"ine"})[g==="ma"?"m":g];
const C_SAMS={name:"Is this Sam's …?",t3n:"Odpovedz",t3title:"Odpovedz",t3hint:"Pod otázkou je napísané, komu vec patrí. Vyber správnu odpoveď.",
  vary:{n:()=>POSS4,a:()=>NAMES,b:()=>NAMES}, fix:q=>q.a===q.b?null:q,
  rnd(){const a=pick(NAMES);return{n:pick(POSS4),a,b:pick(NAMES.filter(x=>x!==a)),yes:coin(),k:Math.random()}},
  gen({n,a,b,yes,k}){
    const w=bare(n), q=`Is this ${a.en}'s ${w}?`, ans=yes?"Yes, it is.":`No, it isn't. It's ${b.en}'s ${w}.`, pl=n.g==="p";
    const sq=`${pl?"Sú":"Je"} to ${ownSk(a,n.g)} ${n.sk}?`, sa=yes?`Áno, ${pl?"sú":"je"}.`:`Nie, ${pl?"nie sú":"nie je"}. ${pl?"Sú":"Je"} to ${ownSk(b,n.g)} ${n.sk}.`;
    const en=q+" "+ans, sk=sq+" "+sa;
    const gap=k<.35?gp("Is this",a.en+"'s",`${w}? ${ans}`,[a.en,a.en+"s",a.en+"s'"])
      :k<.55?gp("","Is",`this ${a.en}'s ${w}? ${ans}`,["Are","Does","Has"])
      :yes?gp(q+" Yes, it","is",".",["are","does","has"]):gp(q+" No, it","isn't",`. It's ${b.en}'s ${w}.`,["aren't","doesn't","hasn't"]);
    const wr=yes?["No, it isn't.","Yes, it's.","Yes, it does."]:[`No, it isn't. It's ${b.en} ${w}.`,`No, it isn't. It's ${b.en}s ${w}.`,`Yes, it is. It's ${b.en}'s ${w}.`,`No, it isn't. It's ${a.en}'s ${w}.`];
    return{en,sk,gap,t3:{task:"Odpovedz",q,hint:"Patrí to: "+(yes?a.en:b.en),a:ans,say:en,opts:opts4(ans,shuffle(wr))}};
  },
  rule:{text:["<b>Sam's</b> = Samov / Samova (patrí Samovi). K menu pridáme <b>'s</b>.",
    "Is this Sam's guitar? – Yes, it <b>is</b>. / No, it <b>isn't</b>. It's <b>Eva's</b> guitar."],
    tips:["Nezabudni na apostrof: <s>Evas</s> → <b>Eva's</b>."],
    cols:[["Otázka a odpoveď",{}]],rows:[0,1,2,3].map(i=>({l:"•",par:{n:POSS4[i*2],a:NAMES[i],b:NAMES[(i+3)%6],yes:i%2===0,k:.9}}))},
  voc:POSS4};

const PPRON={I:"mine",you:"yours",he:"his",she:"hers",we:"ours",they:"theirs"}, WRP={I:["my","me","mines"],you:["your","you","your's"],he:["him","he's","hims"],she:["her","she's","her's"],we:["our","us","our's"],they:["their","them","their's"]};
const SKPOS={I:{m:"môj",f:"moja",n:"moje",p:"moje"},you:{m:"tvoj",f:"tvoja",n:"tvoje",p:"tvoje"},he:"jeho",she:"jej",we:{m:"náš",f:"naša",n:"naše",p:"naše"},they:"ich"};
const C_WHOSE={name:"Whose … is it?",t3n:"Zmeň",t3title:"Povedz kratšie",t3hint:"Namiesto my guitar povedz mine, namiesto her guitar povedz hers…",
  vary:{n:()=>POSS4,p:()=>Object.keys(PPRON)},
  rnd(){return{n:pick(POSS4),p:pick(Object.keys(PPRON)),k:Math.random()}},
  gen({n,p,k}){
    const w=bare(n), g=n.g==="ma"?"m":n.g, pl=g==="p", sp=typeof SKPOS[p]==="string"?SKPOS[p]:SKPOS[p][g], whose={m:"Čí",f:"Čia",n:"Čie",p:"Čie"}[g];
    const en=`Whose ${w} is it? It's ${PPRON[p]}.`, sk=`${whose} ${pl?"sú":"je"} to ${n.sk}? ${pl?"Sú":"Je"} ${sp}.`;
    const gap=k<.65?gp(`Whose ${w} is it? It's`,PPRON[p],".",WRP[p]):gp("","Whose",`${w} is it? It's ${PPRON[p]}.`,["Who","Who's","What"]);
    const a=`It's ${PPRON[p]}.`;
    return{en,sk,gap,t3:{task:"Povedz kratšie",q:`It's ${PR[p].poss} ${w}.`,hint:`${pl?"Sú":"Je"} ${sp}.`,a,opts:opts4(a,shuffle(WRP[p].map(x=>`It's ${x}.`)))}};
  },
  rule:{text:["<b>Whose</b> … is it? = Čí / čia / čie je to …?",
    "Odpoveď: It's <b>mine</b> (môj), <b>yours</b> (tvoj), <b>his</b> (jeho), <b>hers</b> (jej), <b>ours</b> (náš), <b>theirs</b> (ich)."],
    tips:["It's my guitar. = It's <b>mine</b>. Za mine už nie je podstatné meno.","<s>It's her's.</s> → <b>It's hers.</b> (bez apostrofu)"],
    cols:[["Otázka a odpoveď",{}]],rows:Object.keys(PPRON).map((p,i)=>({l:sb(p),par:{n:POSS4[i+1],p,k:0}}))},
  voc:POSS4};

const F_WEAR=F({name:"What are you wearing?",aux:"be",t3s:["wh","short"],subs:f=>f==="q"?SPQ:SP7,objs:()=>CLOTHES,
  pred:o=>({c:`wearing ${o.en}`,wc:`wear ${o.en}`,gapW:["","wearing",o.en+".",["wear","wears","to wear"]]}),
  sk:(s,f,o)=>skV(s,f,MA,"na sebe "+o.acc),
  wh:s=>beF(s)==="is"?`What's ${sM(s)} wearing?`:`What ${beF(s)} ${sM(s)} wearing?`,clue:(s,o)=>"oblečenie: "+o.sk,
  rule:{text:["<b>What are you wearing?</b> = Čo máš na sebe? – I'm <b>wearing</b> a coat.",
    "Tvar: <b>am / is / are</b> + wear<b>ing</b>: She's wearing boots. They're wearing jeans.",
    "Zápor: I'm not wearing… She isn't wearing… Otázka: <b>Is</b> she wearing…? – Yes, she <b>is</b>."],
    tips:["Pri jednej veci <b>a</b>: a coat, a hoodie. Pri pároch bez a: boots, jeans, pyjamas, sandals."],
    cols:COLS5,rows:rows(SP7,()=>({o:CLOTHES[0]}))},
  voc:CLOTHES});

const WF_LIST=WFT({name:"Lists with commas and and",task:"Napíš ako zoznam",t3hint:"Spoj tri vety do jedného zoznamu s čiarkou a and.",
  make(){
    const p=pick(P7.filter(x=>x!=="it")), [a,b,c]=shuffle([...THINGS4,...THINGS4,...POSS4]).filter((x,i,arr)=>arr.indexOf(x)===i).slice(0,3);
    const pre=`${Sb(p)}${ap(p)} got`, en=`${pre} ${a.en}, ${b.en} and ${c.en}.`;
    const sk=`${PR[p].sk} ${PR[p].ma} ${a.acc}, ${b.acc} a ${c.acc}.`, q=`${pre} ${a.en}. ${pre} ${b.en}. ${pre} ${c.en}.`;
    const gap=coin()?gp(`${pre} ${a.en}, ${b.en}`,"and",`${c.en}.`,["but",",","or"]):gpRaw(`${pre} ${a.en}`,","," "+b.en+" and "+c.en+".",[".",";","!"]);
    return{en,sk,q,gap,wr:[`${pre} ${a.en} ${b.en} and ${c.en}.`,`${pre} ${a.en}, ${b.en}, ${c.en}.`,`${pre} ${a.en} and, ${b.en} and ${c.en}.`,`${pre} ${a.en}, ${b.en} and, ${c.en}.`]};
  },
  rule:{text:["Keď vymenúvaš viac vecí, oddelíš ich <b>čiarkou</b> a pred poslednú dáš <b>and</b>.",
    "I've got a doll<b>,</b> a ribbon <b>and</b> some strings."],
    tips:["Pred <b>and</b> čiarku nepíšeme.","Pri písaní (krok 6) sa kontrolujú aj čiarky."]},
  voc:[...THINGS4,...POSS4]});

// ================= UNIT 5 · Around town =================
const C_SHALL={name:"Shall we go to the …?",t3n:"Odpovedz",t3title:"Odpovedz",t3hint:"Pri ✔ súhlasíš (OK. Let's go!), pri ✘ navrhneš iné miesto.",
  vary:{pl:()=>PLACES,o:()=>PLACES}, fix:q=>q.pl===q.o?null:q,
  rnd(){const pl=pick(PLACES);return{pl,o:pick(PLACES.filter(x=>x!==pl)),yes:coin(),k:Math.random()}},
  gen({pl,o,yes,k}){
    const q=`Shall we go to the ${pl.en}?`, ans=yes?"OK. Let's go!":`No, let's go to the ${o.en}.`, en=q+" "+ans;
    const sk=`Pôjdeme ${pl.to}? ${yes?"Dobre. Poďme!":`Nie, poďme radšej ${o.to}.`}`;
    const gap=k<.25?gp("","Shall",`we go to the ${pl.en}? ${ans}`,["Do","Are","Let's"]):k<.5?gp("Shall we","go",`to the ${pl.en}? ${ans}`,["goes","going","to go"])
      :k<.7?gp("Shall we go","to",`the ${pl.en}? ${ans}`,["at","in","on"])
      :yes?gp(q+" OK.","Let's","go!",["Lets","Let","Shall"]):gp(q+" No,","let's",`go to the ${o.en}.`,["lets","let","shall"]);
    const wr=yes?["OK. Lets go!","OK. Let's going!","Yes, we shall go to."]:[`No, lets go to the ${o.en}.`,`No, let's going to the ${o.en}.`,`No, let's go the ${o.en}.`];
    return{en,sk,gap,t3:{task:"Odpovedz",q,hint:yes?"Súhlasíš.":"Chceš ísť radšej "+o.to+".",clue:yes,a:ans,say:en,opts:opts4(ans,shuffle(wr))}};
  },
  rule:{text:["<b>Shall we go to the …?</b> = Pôjdeme do …? (návrh)","Odpoveď: <b>OK. Let's go!</b> = Dobre. Poďme! alebo <b>No, let's go to the …</b> = Nie, poďme radšej do …"],
    tips:["<b>Let's</b> = let us, píše sa s apostrofom."],
    cols:[["Otázka a odpoveď",{}]],rows:[0,3,5,7].map((i,j)=>({l:"•",par:{pl:PLACES[i],o:PLACES[(i+2)%8],yes:j%2===0,k:.6}}))},
  voc:PLACES};

const C_THERE={name:"Is there a … in your street?",t3n:"Odpovedz",t3title:"Odpovedz krátko",t3hint:"Odpovedz krátko podľa ✔ Áno / ✘ Nie: Yes, there is. / No, there aren't.",
  vary:{pl:()=>PLACES,n:()=>["sg","pl"],form:()=>["pos","neg","q"]},
  rnd(){return{pl:pick(PLACES),n:pick(["sg","pl"]),form:pick(["pos","neg","q"]),yes:coin(),k:coin()}},
  gen({pl,n,form,yes,k}){
    const sg=n==="sg", w=sg?pl.en:pl.pl;
    const qEn=sg?`Is there a ${w} in your street?`:`Are there any ${w} in your town?`, qSk=sg?`Je na tvojej ulici ${pl.sk}?`:`Sú v tvojom meste ${pl.skpl}?`;
    const en=form==="q"?qEn:form==="pos"?(sg?`There's a ${w} in my street.`:`There are some ${w} in my town.`):(sg?`There isn't a ${w} in my street.`:`There aren't any ${w} in my town.`);
    const sk=form==="q"?qSk:form==="pos"?(sg?`Na mojej ulici je ${pl.sk}.`:`V mojom meste sú ${pl.skpl}.`):(sg?`Na mojej ulici nie je ${pl.sk}.`:`V mojom meste nie sú žiadne ${pl.skpl}.`);
    const sh=y=>sg?(y?"Yes, there is.":"No, there isn't."):(y?"Yes, there are.":"No, there aren't.");
    const gap=form==="q"?(sg?gp("","Is",`there a ${w} in your street?`,["Are","Has","Does"]):k?gp("","Are",`there any ${w} in your town?`,["Is","Have","Do"]):gp("Are there","any",`${w} in your town?`,["a","much","an"]))
      :form==="pos"?(sg?gp("There","is",`a ${w} in my street.`,["are","has","have"]):gp("There","are",`some ${w} in my town.`,["is","has","have"]))
      :(sg?gp("There","isn't",`a ${w} in my street.`,["aren't","hasn't","don't"]):gp("There","aren't",`any ${w} in my town.`,["isn't","haven't","don't"]));
    const a=sh(yes);
    return{en,sk,gap,ya:sh(1),na:sh(0),t3:{task:"Odpovedz krátko",q:qEn,hint:qSk,clue:yes,a,say:qEn+" "+a,
      opts:opts4(a,[sh(!yes),sg?(yes?"Yes, there are.":"No, there aren't."):(yes?"Yes, there is.":"No, there isn't."),yes?"Yes, it is.":"No, it isn't."])}};
  },
  rule:{text:["<b>There's</b> (there is) a park in my street. = Na mojej ulici je park.","<b>There are</b> some parks in my town. = V mojom meste sú parky.",
    "Otázka: <b>Is there</b> a …? – Yes, there <b>is</b>. / No, there <b>isn't</b>. <b>Are there any</b> …? – Yes, there <b>are</b>. / No, there <b>aren't</b>."],
    tips:["V otázke a v zápore pri množnom čísle: <b>any</b>."],
    cols:[["+",{form:"pos"}],["−",{form:"neg"}],["?",{form:"q"}],["Áno",{form:"q"},"ya"],["Nie",{form:"q"},"na"]],
    rows:[["jedna vec","sg"],["viac vecí","pl"]].map(([l,n])=>({l,par:{pl:PLACES[3],n,form:"pos",yes:true,k:1}}))},
  voc:PLACES};

const REL=[{en:"in front of",sk:"pred",cs:"ins"},{en:"next to",sk:"vedľa",cs:"gen"},{en:"behind",sk:"za",cs:"ins"},{en:"between",sk:"medzi",cs:"ins"}];
const C_WHERE={name:"Where's the …?",t3n:"Vyber",t3title:"Pozri sa na obrázok",t3hint:"Pozri sa, v akom poradí stoja dopravné prostriedky, a vyber vetu, ktorá platí.",
  vary:{a:()=>VEH,rel:()=>REL,b:()=>VEH}, fix:q=>new Set([q.a,q.b,q.c]).size===3?q:null,
  rnd(){const[a,b,c,w]=shuffle(VEH),sc=shuffle(VEH).slice(0,4);return{a,b,c,rel:pick(REL),sc:sc.slice(0,3),out:sc[3],ti:Math.random()*3|0,k:Math.random()}},
  gen({a,b,c,rel,sc,out,ti,k}){
    const btw=rel.en==="between", ans=btw?`It's between the ${b.en} and the ${c.en}.`:`It's ${rel.en} the ${b.en}.`, q=`Where's the ${a.en}?`;
    const en=q+" "+ans, sk=`Kde je ${a.sk}? Je ${rel.sk} ${b[rel.cs]}${btw?" a "+c.ins:""}.`;
    const gap=k<.5?gp(`${q} It's`,rel.en,btw?`the ${b.en} and the ${c.en}.`:`the ${b.en}.`,REL.map(r=>r.en))
      :btw&&k<.8?gp(`${q} It's between the ${b.en}`,"and",`the ${c.en}.`,["or","with","to"]):gp("","Where's",`the ${a.en}? ${ans}`,["What's","Who's","When's"]);
    // Scene: three vehicles in a row; ask about one of them
    const[x,y,z]=sc, t=sc[ti], tq=`Where's the ${t.en}?`;
    let ta,wr;
    if(ti===1){ta=`It's between the ${x.en} and the ${z.en}.`;wr=[`It's next to the ${out.en}.`,`It's between the ${x.en} and the ${out.en}.`,`It's between the ${x.en} or the ${z.en}.`]}
    else{const nb=y, far=ti===0?z:x;ta=`It's next to the ${nb.en}.`;wr=[`It's next to the ${far.en}.`,`It's between the ${nb.en} and the ${far.en}.`,`It's next the ${nb.en}.`]}
    return{en,sk,gap,t3:{task:"Pozri sa na obrázok a odpovedz",q:tq,scene:sc.map(v=>v.en).join("   ·   "),a:ta,say:tq+" "+ta,opts:opts4(ta,shuffle(wr))}};
  },
  rule:{text:["<b>Where's the …?</b> = Kde je …?",
    "It's <b>in front of</b> the car (pred autom). It's <b>next to</b> the car (vedľa auta). It's <b>behind</b> the car (za autom).",
    "It's <b>between</b> the car <b>and</b> the train (medzi autom a vlakom)."],
    tips:["Pred dopravným prostriedkom je <b>the</b>: next to <b>the</b> car."],
    cols:[["Otázka a odpoveď",{}]],rows:REL.map((r,i)=>({l:"•",par:{a:VEH[i],b:VEH[(i+1)%6],c:VEH[(i+2)%6],rel:r,sc:VEH.slice(0,3),out:VEH[3],ti:1,k:.9}}))},
  voc:VEH};

const BY=[["tram","električkou"],["metro","metrom"],["taxi","taxíkom"],["train","vlakom"],["car","autom"],["bike","bicyklom"]];
const WF_SHORT={name:"Short answers",t3n:"Odpovedz",t3title:"Odpovedz krátko",t3hint:"Na otázku odpovedz krátko podľa ✔ Áno / ✘ Nie.",
  rnd(){return{k:pick(["there","by","can","got"]),p:pick(["you","he","she","they"]),yes:coin(),i:Math.random()}},
  gen({k,p,yes,i}){
    const s=PS[p], idx=a=>a[Math.floor(i*a.length)];
    let q,qsk,a,aux;
    if(k==="there"){const t=idx(TR5);q=`Is there a ${t.en} in your town?`;qsk=`Je v tvojom meste ${t.sk}?`;a=yes?"Yes, there is.":"No, there isn't."}
    else if(k==="by"){const[t,ins]=idx(BY);aux="do";q=`${A3(s)?"Does":"Do"} ${sM(s)} go to school by ${t}?`;qsk=skAsk(s,cj("chodím,chodíš,chodí,chodíme,chodia",s),`do školy ${ins}`)}
    else if(k==="can"){const[v,vs]=idx([["ride a bike","jazdiť na bicykli"],["ride a motorbike","jazdiť na motorke"],["drive a car","šoférovať auto"],["ride a scooter","jazdiť na kolobežke"]]);aux="can";q=`Can ${sM(s)} ${v}?`;qsk=skAsk(s,cj(VIE,s),vs)}
    else{const n=idx(NN(U(5,3),"a bike|bicykel;a car|auto||n;a motorbike|motorka|motorku|f"));aux="got";q=`${A3(s)?"Has":"Have"} ${sM(s)} got ${n.en}?`;qsk=skAsk(s,cj(MA,s),n.acc)}
    if(aux) a=shortA(aux,s,yes);
    const lw=a.split(" ").pop().slice(0,-1), pre=a.slice(0,a.lastIndexOf(" "));
    const pool=yes?["do","does","is","are","can","have","has","am"]:["don't","doesn't","isn't","aren't","can't","haven't","hasn't"];
    const wrA=aux?[shortA(aux,s,!yes),shortA(OTH[aux][0],s,yes),shortA(OTH[aux][1],s,yes)]:[yes?"No, there isn't.":"Yes, there is.",yes?"Yes, there are.":"No, there aren't.",yes?"Yes, it is.":"No, it isn't."];
    return{en:q+" "+a,sk:qsk+" "+(yes?"Áno.":"Nie."),gap:gp(q+" "+pre,lw,".",shuffle(pool)),w:{q,clue:yes,en:a},
      t3:{task:"Odpovedz krátko",q,hint:qsk,clue:yes,a,say:q+" "+a,opts:opts4(a,wrA)}};
  },
  rule:{text:["Na otázku odpovedáme <b>krátko</b> tým istým slovesom, ktorým sa otázka začína:",
    "<b>Is</b> there…? – Yes, there <b>is</b>. · <b>Do</b> you…? – Yes, I <b>do</b>. · <b>Can</b> you…? – No, I <b>can't</b>. · <b>Have</b> you got…? – Yes, I <b>have</b>."],
    tips:["Na otázku s <b>you</b> odpovedáš s <b>I</b>.","by tram = električkou, by metro = metrom, by taxi = taxíkom"],
    cols:[["Otázka a odpoveď",{}]],rows:[["there","you"],["by","you"],["by","she"],["can","he"],["got","they"]].map(([k,p],j)=>({l:"•",par:{k,p,yes:j%2===0,i:.1}}))},
  voc:[...TR5,...VEH]};

// ================= UNIT 6 · At the weekend =================
const PAIRS=GAMES.flatMap(a=>GAMES.filter(b=>b!==a).map(b=>({a,b})));
const C_GAMES=F({name:"What games do you like?",aux:"do",forms:["pos"],t3:"wh",subs:()=>SP7,objs:()=>PAIRS,
  pred:o=>({v:`like ${o.a.en} and ${o.b.en}`,v3:`likes ${o.a.en} and ${o.b.en}`}),sk:(s,f,o)=>skLike(s,f,`${o.a.like} a ${o.b.like}`),
  wh:s=>`What games ${A3(s)?"does":"do"} ${sM(s)} like?`,clue:(s,o)=>`hry: ${o.a.like}, ${o.b.like}`,
  rule:{text:["<b>What games do you like?</b> = Aké hry máš rád? – I like badminton <b>and</b> chess.","Pri he, she, it: What games <b>does</b> he like? – He <b>likes</b> tag and Frisbee."],
    tips:["Pri hrách nepíšeme the: I like <s>the chess</s> <b>chess</b>."],
    cols:[["+ kladná veta",{form:"pos"}]],rows:rows(SP7,()=>({o:PAIRS[1]}))},
  voc:GAMES});
const F_PLAYING=F({name:"What's he doing?",aux:"be",t3s:["wh","short"],subs:f=>f==="q"?SPQ:SP7,objs:()=>GAMES,
  pred:o=>({c:`playing ${o.en}`,wc:`play ${o.en}`,gapW:["","playing",o.en+".",["play","plays","to play"]]}),sk:(s,f,o)=>skVP(s,f,o),
  wh:s=>beF(s)==="is"?`What's ${sM(s)} doing?`:`What ${beF(s)} ${sM(s)} doing?`,clue:(s,o)=>"hra: "+o.sk,
  rule:{text:["<b>What's he doing?</b> = Čo robí? – He's <b>playing</b> chess.","<b>What are they doing?</b> – They're <b>playing</b> tag.","Tvar: <b>am / is / are</b> + sloveso s <b>-ing</b>."],
    tips:["I'm, you're, he's, she's, it's, we're, they're + play<b>ing</b>"],
    cols:COLS5,rows:rows(SP7,()=>({o:GAMES[1]}))},
  voc:GAMES});
const F_ING=F({name:"Is he …ing?",aux:"be",t3:"short",subs:f=>f==="q"?SPQ:SP7,objs:()=>ACTS,
  pred:o=>({c:o.ing,wc:o.v,gapW:["",o.ingW,o.ing.split(" ").slice(1).join(" ")+".",[o.base,o.v3W,"to "+o.base]]}),sk:(s,f,o)=>skVP(s,f,o),
  rule:{text:["<b>Is she watching TV?</b> – Yes, she <b>is</b>. / No, she <b>isn't</b>.","<b>Are you</b> reading comics? – Yes, I <b>am</b>. / No, I'm <b>not</b>."],
    tips:["Pri -ing: read → read<b>ing</b>, fly → fly<b>ing</b>, do → do<b>ing</b>."],
    cols:COLS5,rows:rows(SP7,()=>({o:ACTS[5]}))},
  voc:ACTS});
const PLAYERS={en:"the players",agr:"they",sk:"hráči",ci:4,g:"p"}, EACH={en:"each player",agr:"he",sk:"každý hráč",ci:2,g:"m"};
const INSTR_S=[PS.you,PS.we,PLAYERS,EACH];
const WF_INSTR=F({name:"Instructions for a game",aux:"do",forms:["pos","pos","neg"],t3:"person",subs:()=>INSTR_S,objs:()=>INSTR,src:s=>s===PS.you?PS.we:PS.you,
  pred:o=>({v:o.v,v3:o.v3}),sk:(s,f,o)=>skVP(s,f,o),
  rule:{text:["Návod na hru píšeme v <b>prítomnom čase</b>: You <b>draw</b> lines with chalk. You <b>jump</b> on the numbers.",
    "Pri <b>each player</b> (každý hráč) pridáme -s: Each player <b>gets</b> ten points."],
    tips:["Zápor: You <b>don't</b> jump on the lines. Each player <b>doesn't</b> …"],
    cols:[["+ kladná veta",{form:"pos"}]],rows:rows(INSTR_S,s=>({o:INSTR[INSTR_S.indexOf(s)]}))},
  voc:[...CHALK,...INSTR]});

// ================= UNIT 7 · My day =================
const routP=(o,x,s)=>({v:vv(o,s)+(x?" "+x.en:""),v3:vv3(o,s)+(x?" "+x.en:"")});
const F_PARTS=F({name:"In the morning / afternoon / evening",aux:"do",forms:["pos","pos","neg"],t3:"wh",subs:()=>SNI,objs:()=>ROUT,xs:PARTS,
  ok:q=>!(q.o.v==="get up"&&q.x!==PARTS[0])&&!(q.o.v==="go to bed"&&q.x!==PARTS[2])&&!(q.o.v==="go to school"&&q.x!==PARTS[0]),
  pred:routP,sk:(s,f,o,x)=>skVP(s,f,o,x.sk),wh:(s,o)=>`When ${A3(s)?"does":"do"} ${sM(s)} ${vv(o,s)}?`,clue:(s,o,x)=>"kedy: "+x.sk,
  rule:{text:["I do my homework <b>in the morning</b> (ráno) / <b>in the afternoon</b> (poobede) / <b>in the evening</b> (večer).","<b>What about you?</b> = A ty? – I do my homework in the afternoon."],
    tips:["my sa mení podľa osoby: I brush <b>my</b> teeth, he brushes <b>his</b> teeth.","Pri he, she: brush<b>es</b>, do<b>es</b>, get<b>s</b>, go<b>es</b>, ha<b>s</b>."],
    cols:[["+",{form:"pos"}],["−",{form:"neg"}]],rows:rows(SNI,()=>({o:ROUT[2],x:PARTS[1]}))},
  voc:[...ROUT,...PARTS]});
const DROUT=[...ROUT.filter(o=>/homework|school|shower/.test(o.v)),...ACTS];
const F_DAYS=F({name:"I … on Monday",aux:"do",t3s:["wh","short"],subs:f=>f==="q"?SNIQ:SNI,objs:()=>DROUT,xs:DAYS.map(d=>({...d,en:"on "+d.d})),
  adjust:q=>{if(q.o.v==="go to school"){if(q.x.we&&q.form==="pos")q.form="neg";if(!q.x.we&&q.form==="neg")q.form="pos";if(q.form==="q")q.yes=!q.x.we;if(q.t3==="wh"&&q.x.we)q.t3="short"}},
  ok:q=>!(q.o.v==="go to school"&&q.x.we&&q.form==="pos"),
  pred:routP,sk:(s,f,o,x)=>skVP(s,f,o,x.sk),wh:(s,o,x)=>`What ${A3(s)?"does":"do"} ${sM(s)} do ${x.en}?`,clue:(s,o)=>"čo: "+o.sk,
  rule:{text:["I go to school <b>on Monday</b>. I <b>don't</b> go to school <b>on Saturday</b>.","<b>What do you do</b> on Sunday? – I get up and brush my teeth."],
    tips:["Dni v týždni píšeme s veľkým písmenom: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.","<b>on</b> Monday = v pondelok"],
    cols:COLS5,rows:rows(SNI,()=>({o:ROUT[6],x:{...DAYS[0],en:"on Monday"}}))},
  voc:[...DROUT,...DAYS.map(d=>({en:d.d,sk:d.sk,u:d.u}))]});
const TROUT=ROUT.filter(o=>/get up|go to|have a shower|homework|teeth/.test(o.v));
const F_TIME=F({name:"When does he get up?",aux:"do",t3s:["wh","short"],whVary:"x",subs:f=>f==="q"?SNIQ:SNI,objs:()=>TROUT,xs:TIMES,
  pred:routP,sk:(s,f,o,x)=>skVP(s,f,o,x.sk),wh:(s,o)=>`When ${A3(s)?"does":"do"} ${sM(s)} ${vv(o,s)}?`,clue:(s,o,x)=>"🕒 "+x.d,
  rule:{text:["<b>When does he get up?</b> = Kedy vstáva? – He <b>gets</b> up <b>at</b> seven o'clock.","Zápor: He <b>doesn't</b> get up at six o'clock.",
    "Čas: seven o'clock (7:00), seven fifteen (7:15), seven twenty (7:20), seven thirty (7:30), seven forty-five (7:45), seven fifty (7:50)."],
    tips:["Pred časom je <b>at</b>: at seven o'clock.","Pri he, she: get<b>s</b>, go<b>es</b>, do<b>es</b>, ha<b>s</b>, brush<b>es</b>."],
    cols:COLS5,rows:rows(SNI,()=>({o:TROUT[0],x:TIMES[7]}))},
  voc:[...TIMEW,...TROUT]});
const JOBS=[["the dentist","zubár",3],["the farmer","farmár",1],["the police officer","policajt",2],["the taxi driver","taxikár",0]].map(([en,sk,j])=>({en,agr:"he",sk,ci:2,g:"m",job:JOBV[j]}));
const JOB_S=[...JOBS,PS.he,PS.she], JROUT=ROUT.filter(o=>!/homework|school/.test(o.v));
const F_JOBS=F({name:"Third person: -s, -es, -ies",aux:"do",forms:["pos","pos","neg"],t3:"person",subs:()=>JOB_S,xs:PARTS,
  objs:s=>s.job?[s.job,...JROUT,ACTS[1],ACTS[5]]:[...JROUT,ACTS[1],ACTS[5]],
  pred:routP,sk:(s,f,o,x)=>skVP(s,f,o,x.sk),
  rule:{text:["Pri <b>he, she, it</b> a pri jednej osobe (the farmer) pridávame k slovesu koncovku:",
    "<b>-s</b>: gets, drives, works · <b>-es</b>: goes, does, brushes, watches · <b>-ies</b>: flies · výnimka: <b>has</b>"],
    tips:["Zápor a otázka sú s <b>doesn't / does</b> a sloveso je bez -s: The farmer <b>doesn't get</b> up at nine."],
    cols:[["+ kladná veta",{form:"pos"}]],rows:rows(JOB_S,s=>({o:s.job||ROUT[7],x:PARTS[0]}))},
  voc:[...JOBW,...JOBV]});

// ================= UNIT 8 · My talents =================
const F_CANDO=F({name:"What can you do?",aux:"can",t3s:["wh","short"],subs:f=>f==="q"?SPQ:SP7,objs:()=>SKILLS,
  pred:o=>({v:o.v,v3:o.v3}),sk:(s,f,o)=>skV(s,f,VIE,o.sk),wh:s=>`What can ${sM(s)} do?`,clue:(s,o)=>"vie: "+o.sk,
  rule:{text:["<b>What can you do?</b> = Čo vieš robiť? – I <b>can</b> hop. I <b>can't</b> skateboard.","Pre všetky osoby je can rovnaké: he can, she can, they can."],
    tips:["Po can je sloveso bez -s: She can <s>skips</s> <b>skip</b>."],
    cols:COLS5,rows:rows(SP7,()=>({o:SKILLS[1]}))},
  voc:SKILLS});
const F_LIKEING=F({name:"I like …ing",aux:"do",t3:"short",subs:f=>f==="q"?SPQ:SP7,objs:()=>SKILLS,extraWr:likeWr,
  pred:o=>({v:`like ${o.ing}`,v3:`likes ${o.ing}`}),sk:(s,f,o)=>skLike(s,f,o.nn),
  rule:{text:["<b>I like / don't like</b> + sloveso s <b>-ing</b>: I like riding a bike. I don't like skipping.","He <b>likes</b> hopping. She <b>doesn't like</b> rollerblading. <b>Does</b> he like…? – Yes, he <b>does</b>."],
    tips:["Po like dávame -ing: I like <s>ride</s> <b>riding</b> a bike.","V krátkej odpovedi už like nie je: <s>Yes, I like.</s> → <b>Yes, I do.</b>"],
    cols:COLS5,rows:rows(SP7,()=>({o:SKILLS[3]}))},
  voc:SKILLS});
const F_GOOD=F({name:"I'm good at …ing",aux:"be",t3:"short",subs:f=>f==="q"?SPQ:SP7,objs:()=>TALENTS,
  pred:o=>({c:`good at ${o.ing}`,wc:`good at ${o.v}`,gapW:coin()?["good","at",o.ing+".",["in","on","for"]]:["good at",o.ingW,o.ing.split(" ").slice(1).join(" ")+".",[o.base,"to "+o.base,o.v3W]]}),
  sk:(s,f,o)=>skV(s,f,VIE,"dobre "+o.sk),
  rule:{text:["<b>I'm good at</b> juggling. = Viem dobre žonglovať.","Otázka: <b>Are you good at</b> acting? – Yes, I <b>am</b>. / No, I'm <b>not</b>.","Po <b>at</b> je sloveso s <b>-ing</b>."],
    tips:["good <b>at</b>, nie good <s>in</s>."],
    cols:COLS5,rows:rows(SP7,()=>({o:TALENTS[3]}))},
  voc:TALENTS});
const ADJ_PL=[["colourful","farebné"],["beautiful","krásne"],["new","nové"],["old","staré"],["long","dlhé"],["short","krátke"]];
const ADJ_F=[["big","veľká"],["small","malá"],["noisy","hlučná"],["beautiful","krásna"],["colourful","farebná"],["quiet","tichá"]];
const ADJ_CH=[["happy","šťastné","šťastní"],["noisy","hlučné","hluční"],["quiet","tiché","tichí"],["hungry","hladné","hladní"]];
const WF_ADJ=WFT({name:"Adjectives",task:"Vyber správnu vetu",t3hint:"Prídavné meno stojí pred podstatným menom a nemení sa.",strict:false,
  make(){
    const k=Math.random();
    if(k<.45){const p=pick(P7.filter(x=>x!=="it")),[a,as]=pick(ADJ_PL),[o]=pick(ADJ_PL.filter(x=>x[0]!==a)),pre=`${Sb(p)}${ap(p)} got`;
      return{en:`${pre} ${a} costumes.`,sk:`${PR[p].sk} ${PR[p].ma} ${as} kostýmy.`,gap:gp(pre,a,"costumes.",[a+"s",o,"a "+a]),
        wr:[`${pre} costumes ${a}.`,`${pre} ${a}s costumes.`,`${pre} a ${a} costumes.`]}}
    if(k<.75){const[a,as]=pick(ADJ_F),[o]=pick(ADJ_F.filter(x=>x[0]!==a)),ar=art(a);
      return{en:`It's ${ar} celebration.`,sk:`Je to ${as} oslava.`,gap:gp("It's "+ar.split(" ")[0],a,"celebration.",[o,a+"s",a+"er"]),
        wr:[`It's a celebration ${a}.`,`It's ${a} a celebration.`,`It's ${ar.startsWith("an")?"a":"an"} ${a} celebration.`]}}
    const who=coin(),[a,n,m]=pick(ADJ_CH),[o]=pick(ADJ_CH.filter(x=>x[0]!==a)),S=who?"The children":"The dancers";
    return{en:`${S} are ${a}.`,sk:`${who?"Deti":"Tanečníci"} sú ${who?n:m}.`,gap:gp(S+" are",a,".",[a+"s",o,"a "+a]),
      wr:[`${S} are ${a}s.`,`${S} is ${a}.`,`The ${a} ${who?"children":"dancers"} are.`]};
  },
  rule:{text:["Prídavné meno (colourful, big, happy) stojí <b>pred</b> podstatným menom: colourful <b>costumes</b>, a big <b>celebration</b>.",
    "Prídavné meno sa nemení, nepridávame -s: <s>colourfuls</s> costumes."],
    tips:["Pred samohláskou je <b>an</b>: <b>an</b> old costume, ale <b>a</b> big celebration."]},
  voc:DANCE});

// ================= UNIT 9 · My home =================
const PUT_SK={"on shelf":"na poličku","on coffee table":"na konferenčný stolík","on wall":"na stenu","on floor":"na dlážku","under coffee table":"pod konferenčný stolík","on armchair":"na kreslo","on sofa":"na gauč","in bookcase":"do knižnice"};
const PUTS=[["vase","vázu",[["on","shelf"],["on","coffee table"]]],["painting","obraz",[["on","wall"]]],["rug","koberček",[["on","floor"],["under","coffee table"]]],["cushions","vankúše",[["on","armchair"],["on","sofa"]]],["books","knihy",[["on","shelf"],["in","bookcase"]]]]
  .flatMap(([en,acc,to])=>to.map(([pr,pl])=>({en,acc,pr,pl,sk:PUT_SK[pr+" "+pl]})));
const C_PUT={name:"Where shall I put the …?",t3n:"Odpovedz",t3title:"Odpovedz",t3hint:"Pod otázkou je po slovensky, kam vec patrí. Vyber správnu odpoveď.",
  vary:{t:()=>PUTS,w:()=>["I","we"]},
  rnd(){return{t:pick(PUTS),w:Math.random()<.7?"I":"we",k:Math.random()}},
  gen({t,w,k}){
    const q=`Where shall ${w} put the ${t.en}?`, ans=`${cap(t.pr)} the ${t.pl}.`, en=q+" "+ans, sk=`Kam ${w==="I"?"mám":"máme"} dať ${t.acc}? ${cap(t.sk)}.`;
    const gap=k<.5?gp(q,cap(t.pr),`the ${t.pl}.`,["On","In","Under","At"]):k<.75?gp("Where","shall",`${w} put the ${t.en}? ${ans}`,["am","is","does"]):gp(`Where shall ${w}`,"put",`the ${t.en}? ${ans}`,["puts","putting","to put"]);
    const other=["On","In","Under"].filter(x=>x!==cap(t.pr));
    return{en,sk,gap,t3:{task:"Odpovedz",q,hint:"kam: "+t.sk,a:ans,say:en,opts:opts4(ans,[...other.map(x=>`${x} the ${t.pl}.`),`${cap(t.pr)} ${t.pl}.`])}};
  },
  rule:{text:["<b>Where shall I put the vase?</b> = Kam mám dať vázu?","<b>On</b> the shelf. (na) · <b>In</b> the bookcase. (do) · <b>Under</b> the coffee table. (pod)"],
    tips:["Nezabudni na <b>the</b>: On <b>the</b> shelf."],
    cols:[["Otázka a odpoveď",{}]],rows:PUTS.slice(0,6).map(t=>({l:"•",par:{t,w:"I",k:.6}}))},
  voc:[...FURN,...NN(G2(9),"a wall|stena;a floor|dlážka;a sofa|gauč;cushions|vankúše||p;a bookcase|knižnica")]};

const ITEMS9=[["vase","vases","váza","vázy","f",["shelf","coffee table"]],["book","books","kniha","knihy","f",["shelf","coffee table","floor","sofa"]],["cushion","cushions","vankúš","vankúše","m",["armchair","sofa","floor","rug"]],["painting","paintings","obraz","obrazy","m",["wall"]],["teddy","teddies","medvedík","medvedíky","m",["armchair","shelf","rug","floor"]]]
  .map(([en,pl,sk,skpl,g,on])=>({en,pl,sk,skpl,g,on}));
const LOC9={shelf:"na poličke","coffee table":"na konferenčnom stolíku",armchair:"na kresle",sofa:"na gauči",floor:"na dlážke",rug:"na koberčeku",wall:"na stene"};
const NUM9=[["two",{m:"dva",f:"dve"}],["three",{m:"tri",f:"tri"}],["four",{m:"štyri",f:"štyri"}],["some",{m:"nejaké",f:"nejaké"}]];
const C_THEREON={name:"There's a … on the …",t3n:"Odpovedz",t3title:"Odpovedz krátko",t3hint:"Odpovedz krátko podľa ✔ Áno / ✘ Nie: Yes, there is. / No, there aren't.",
  vary:{it:()=>ITEMS9,n:()=>["sg","pl"],form:()=>["pos","neg","q"]}, fix:q=>{if(!q.it.on.includes(q.pl))q.pl=pick(q.it.on);return q},
  rnd(){const it=pick(ITEMS9);return{it,pl:pick(it.on),n:pick(["sg","pl"]),num:pick(NUM9),form:pick(["pos","neg","q"]),yes:coin(),k:coin()}},
  gen({it,pl,n,num,form,yes,k}){
    const sg=n==="sg", loc=LOC9[pl], ns=num[1][it.g];
    const qEn=sg?`Is there a ${it.en} on the ${pl}?`:`Are there any ${it.pl} on the ${pl}?`, qSk=sg?`Je ${loc} ${it.sk}?`:`Sú ${loc} nejaké ${it.skpl}?`;
    const en=form==="q"?qEn:form==="pos"?(sg?`There's a ${it.en} on the ${pl}.`:`There are ${num[0]} ${it.pl} on the ${pl}.`):(sg?`There isn't a ${it.en} on the ${pl}.`:`There aren't any ${it.pl} on the ${pl}.`);
    const sk=form==="q"?qSk:form==="pos"?(sg?`${cap(loc)} je ${it.sk}.`:`${cap(loc)} sú ${ns} ${it.skpl}.`):(sg?`${cap(loc)} nie je ${it.sk}.`:`${cap(loc)} nie sú žiadne ${it.skpl}.`);
    const sh=y=>sg?(y?"Yes, there is.":"No, there isn't."):(y?"Yes, there are.":"No, there aren't.");
    const gap=form==="q"?(sg?gp("","Is",`there a ${it.en} on the ${pl}?`,["Are","Has","Does"]):gp("","Are",`there any ${it.pl} on the ${pl}?`,["Is","Have","Do"]))
      :form==="pos"?(sg?gp("There","is",`a ${it.en} on the ${pl}.`,["are","has","have"]):k?gp("There","are",`${num[0]} ${it.pl} on the ${pl}.`,["is","has","have"]):gp("There are",num[0],`${it.pl} on the ${pl}.`,shuffle(NUM9.map(x=>x[0]).concat(["a"]))))
      :(sg?gp("There","isn't",`a ${it.en} on the ${pl}.`,["aren't","hasn't","doesn't"]):k?gp("There","aren't",`any ${it.pl} on the ${pl}.`,["isn't","haven't","don't"]):gp("There aren't","any",`${it.pl} on the ${pl}.`,["some","a","three"]));
    const a=sh(yes);
    return{en,sk,gap,ya:sh(1),na:sh(0),t3:{task:"Odpovedz krátko",q:qEn,hint:qSk,clue:yes,a,say:qEn+" "+a,opts:opts4(a,[sh(!yes),sg?(yes?"Yes, there are.":"No, there aren't."):(yes?"Yes, there is.":"No, there isn't."),yes?"Yes, it is.":"No, it isn't."])}};
  },
  rule:{text:["<b>There's</b> a vase on the shelf. (jedna vec) · <b>There are</b> three cushions on the armchair. (viac vecí)",
    "Zápor: <b>There isn't</b> a vase on the shelf. · <b>There aren't any</b> books on the floor."],
    tips:["Pri viacerých veciach: <b>some</b> (nejaké) alebo číslo: two, three, four.","V zápore a v otázke: <b>any</b>."],
    cols:[["+",{form:"pos"}],["−",{form:"neg"}],["?",{form:"q"}],["Áno",{form:"q"},"ya"],["Nie",{form:"q"},"na"]],
    rows:[["jedna vec","sg"],["viac vecí","pl"]].map(([l,n])=>({l,par:{it:ITEMS9[0],pl:"shelf",n,num:NUM9[1],form:"pos",yes:true,k:1}}))},
  voc:[...FURN,...NN(G2(9),"a book|kniha;a cushion|vankúš;a wall|stena;a floor|dlážka;a sofa|gauč")]};

const CMP={long:["longer","shorter","dlhší","dlhšia","kratší","kratšia"],big:["bigger","smaller","väčší","väčšia","menší","menšia"]};
const KLEN=KITCH.filter(n=>/fork|knife|spoon/.test(n.en)), KBIG=KITCH.filter(n=>/glass|jug|plate/.test(n.en));
const C_COMPARE={name:"The … is longer than the …",t3n:"Vyber",t3title:"Pozri sa na obrázok",t3hint:"Pozri sa, ktorá vec je dlhšia alebo väčšia, a vyber vetu, ktorá platí.",
  rnd(){const big=coin(),[A,B]=shuffle(big?KBIG:KLEN),la=2+(Math.random()*7|0);let lb;do lb=2+(Math.random()*7|0);while(lb===la);return{big,A,B,la,lb,up:coin(),k:Math.random()}},
  gen({big,A,B,la,lb,up,k}){
    const c=CMP[big?"big":"long"], aBig=la>lb, S=up?A:B, O=up?B:A, sBig=up?aBig:!aBig;   // subject S, other O
    const adj=sBig?c[0]:c[1], opp=sBig?c[1]:c[0], base=big?(sBig?"big":"small"):(sBig?"long":"short");
    const f=S.g==="f", skA=sBig?(f?c[3]:c[2]):(f?c[5]:c[4]);
    const en=`The ${bare(S)} is ${adj} than the ${bare(O)}.`, sk=`${cap(S.sk)} je ${skA} ako ${O.sk}.`;
    const scene=`${bare(A)}  ${"▬".repeat(la)}\n${bare(B)}  ${"▬".repeat(lb)}`;
    const gap=k<.7?gp(`The ${bare(S)} is`,adj,`than the ${bare(O)}.`,[opp,base,"more "+base]):gp(`The ${bare(S)} is ${adj}`,"than",`the ${bare(O)}.`,["that","then","as"]);
    return{en,sk,gap,scene,t3:{task:"Ktorá veta platí podľa obrázka?",q:null,scene,a:en,opts:opts4(en,shuffle([`The ${bare(S)} is ${opp} than the ${bare(O)}.`,`The ${bare(S)} is ${adj} that the ${bare(O)}.`,`The ${bare(S)} is more ${base} than the ${bare(O)}.`]))}};
  },
  rule:{text:["Porovnávanie: long → <b>longer</b>, short → <b>shorter</b>, big → <b>bigger</b>, small → <b>smaller</b>.",
    "The knife is longer <b>than</b> the spoon. = Nôž je dlhší <b>ako</b> lyžica."],
    tips:["<b>than</b> = ako. Nie <s>that</s>, nie <s>then</s>.","V cvičeniach sa pozri na obrázok s čiarami: dlhšia čiara = dlhšia alebo väčšia vec."],
    cols:[["Príklady",{}]],rows:[[false,0,1,6,3],[false,2,0,4,7],[true,0,2,5,8],[true,1,0,8,3]].map(([big,a,b,la,lb])=>({l:"•",par:{big,A:(big?KBIG:KLEN)[a],B:(big?KBIG:KLEN)[b],la,lb,up:true,k:0}}))},
  voc:KITCH};

const R_ADJ=[["big","veľká"],["small","malá"],["quiet","tichá"],["clean","čistá"],["colourful","farebná"],["beautiful","krásna"]];
const R_THINGS=[["a fireplace","krb"],["a big armchair","veľké kreslo"],["a sofa","gauč"],["a big window","veľké okno"]];
const H_THINGS=[["a red roof","červenú strechu"],["a big chimney","veľký komín"],["nice furniture","pekný nábytok"],["big stairs","veľké schody"]];
const WF_BECAUSE=WFT({name:"Sentences with because",task:"Spoj vety pomocou because",t3hint:"Spoj dve vety pomocou because (lebo).",
  make(){
    const p=pick(P7.filter(x=>x!=="it")), S=Sb(p), lk=s3(p)?"likes":"like", sl=`${PR[p].sk} ${PR[p].ma} ${RAD[GS[p]]}`, k=Math.random();
    let A,B,sk;
    if(k<.4){const r=pick(ROOMS),[a,as]=pick(R_ADJ);A=`${S} ${lk} the ${r.en}`;B=`it's ${a}`;sk=`${sl} ${r.acc}, lebo je ${as}.`}
    else if(k<.7){const r=ROOMS[3],[t,ts]=pick(R_THINGS);A=`${S} ${lk} the ${r.en}`;B=`it's got ${t}`;sk=`${sl} ${r.acc}, lebo má ${ts}.`}
    else{const[t,ts]=pick(H_THINGS);A=`${S} ${lk} ${PR[p].poss} house`;B=`it's got ${t}`;sk=`${sl} svoj dom, lebo má ${ts}.`}
    const en=`${A} because ${B}.`, q=`${A}. ${cap(B)}.`;
    return{en,sk,q,gap:gp(A,"because",B+".",["but","and","so"]),wr:[`${A} because ${B.replace("it's ","is ")}.`,`${A}. Because ${B}.`,`${A} and because ${B}.`,`${A}, because ${B}.`]};
  },
  rule:{text:["<b>because</b> = pretože, lebo. Spojí dve vety: I like the kitchen <b>because</b> it's big.",
    "I like my house <b>because</b> it's got a red roof."],
    tips:["Pred because v angličtine čiarku nepíšeme (po slovensky pred lebo áno).","Pri písaní (krok 6) sa kontrolujú aj veľké písmená a interpunkcia."]},
  voc:[...HOME5,...ROOMS]});

// ================= UNIT 10 · Days out =================
const C_SODOI={name:"So do I. / But I prefer …",t3n:"Odpovedz",t3title:"Odpovedz",t3hint:"Pri ✔ súhlasíš (So do I.), pri ✘ máš radšej iné miesto (But I prefer …).",
  vary:{a:()=>FUN,b:()=>FUN}, fix:q=>q.a===q.b?null:q,
  rnd(){const a=pick(FUN);return{a,b:pick(FUN.filter(x=>x!==a)),yes:coin(),k:Math.random()}},
  gen({a,b,yes,k}){
    const q=`I like the ${a.en}.`, ans=yes?"So do I.":`But I prefer the ${b.en}.`, en=q+" "+ans, sk=`Mám rád ${a.acc}. ${yes?"Ja tiež.":`Ale ja mám radšej ${b.acc}.`}`;
    const gap=k<.4?gp("I","like",`the ${a.en}. ${ans}`,["likes","am like","liking"]):yes?gp(q+" So","do","I.",["am","have","does"]):gp(q+" But I","prefer",`the ${b.en}.`,["prefers","preferring","to prefer"]);
    const wr=yes?["So am I.","So I do.","So do me."]:[`But I prefers the ${b.en}.`,`But I prefer ${b.en} the.`,`So do I prefer the ${b.en}.`];
    return{en,sk,gap,t3:{task:"Odpovedz",q,hint:yes?"Aj ty to máš rád.":"Ty máš radšej: "+b.sk,clue:yes,a:ans,say:en,opts:opts4(ans,shuffle(wr))}};
  },
  rule:{text:["<b>I like the castle.</b> = Mám rád hrad.","<b>So do I.</b> = Ja tiež. (súhlasíš)","<b>But I prefer the funfair.</b> = Ale ja mám radšej lunapark. (nesúhlasíš)"],
    tips:["<s>So am I.</s> → <b>So do I.</b> (lebo like je s do)"],
    cols:[["Príklady",{}]],rows:[0,3,4,7].map((i,j)=>({l:"•",par:{a:FUN[i],b:FUN[(i+2)%8],yes:j%2===0,k:.9}}))},
  voc:FUN};
const PAST={m:"bol",f:"bola",n:"bolo",p:"boli"}, AUXP=["som","si","","sme",""];
const F_WAS=F({name:"Where were you yesterday?",aux:"was",t3s:["wh","short"],subs:f=>f==="q"?SPQ:SP7,objs:()=>FUN,xs:XDAY,
  pred:(o,x)=>({c:`at the ${o.en} ${x.en}`}),
  sk:(s,f,o,x)=>{const b=PAST[s.g],a=AUXP[s.ci];return f==="q"?skAsk(s,b+(a?" "+a:""),`${x.sk} ${o.loc}`):`${skSub(s)}${a?" "+a:""} ${f==="neg"?"ne":""}${b} ${x.sk} ${o.loc}.`},
  wh:(s,o,x)=>`Where ${wasF(s)} ${sM(s)} ${x.en}?`,clue:(s,o)=>"miesto: "+o.sk,
  rule:{text:["Minulý čas slovesa byť: I <b>was</b>, you <b>were</b>, he / she / it <b>was</b>, we <b>were</b>, they <b>were</b>.",
    "<b>Where were you yesterday?</b> – I <b>was</b> at the castle.","Zápor: <b>wasn't</b>, <b>weren't</b>. Otázka: <b>Were</b> you…? – Yes, I <b>was</b>. / No, I <b>wasn't</b>."],
    tips:["yesterday = včera, on Monday = v pondelok"],
    cols:COLS5,rows:rows(SP7,()=>({o:FUN[3],x:XDAY[7]}))},
  voc:[...FUN,...XDAY.map(d=>({en:d.d||d.en,sk:d.sk,u:d.u}))]});
const F_WEATHER=F({name:"What was the weather like?",aux:"was",t3s:["wh","short"],subs:()=>[PS.it],objs:()=>WEATHER,xs:XDAY,
  adjust:q=>{q.alt=pick(WEATHER.filter(w=>w!==q.o))},
  pred:(o,x)=>({c:`${o.en} ${x.en}`}),
  sk:(s,f,o,x)=>f==="q"?o.q.replace("{x}",x.sk)+"?":`${cap(x.sk)} ${f==="neg"?o.neg:o.pos}.`,
  wh:(s,o,x)=>`What was the weather like ${x.en}?`,clue:(s,o)=>o.e+" "+o.sk,
  scene:(par,yes)=>(yes?par.o.e:(par.alt||WEATHER.find(w=>w!==par.o)).e)+"  "+cap(par.x.sk),
  rule:{text:["<b>What was the weather like?</b> = Aké bolo počasie? – <b>It was</b> sunny.","☀️ sunny · ☁️ cloudy · 🌧️ rainy · ❄️ snowy · 💨 windy · 🌫️ foggy",
    "Otázka: <b>Was it</b> rainy yesterday? – Yes, it <b>was</b>. / No, it <b>wasn't</b>."],
    tips:["Pri počasí je vždy <b>it</b>: <b>It</b> was windy."],
    cols:COLS5,rows:WEATHER.map(o=>({l:o.e,par:{s:PS.it,o,x:XDAY[7],form:"pos",yes:true,t3:"short"}}))},
  voc:WEATHER});
const EXCL=[["I was at the water park on Saturday.","V sobotu som bol v akvaparku."],["There's a big slide.","Je tam veľká šmýkačka."],["We can dive in the pool.","V bazéne sa môžeme potápať."],
  ["My sister likes the slide.","Moja sestra má rada šmýkačku."],["We were at the water park yesterday.","Včera sme boli v akvaparku."],["The water park is next to the hotel.","Akvapark je vedľa hotela."],
  ["What a big slide!","Aká veľká šmýkačka!"],["Splash! The water is cold!","Čľup! Voda je studená!"],["It was fantastic!","Bolo to fantastické!"],["I love the water park!","Akvapark zbožňujem!"],
  ["Wow, I can dive!","Páni, viem sa potápať!"],["What a great day!","Aký skvelý deň!"],["Look at me!","Pozri sa na mňa!"],["Can you dive?","Vieš sa potápať?"],["Where's the slide?","Kde je šmýkačka?"]];
const WF_EXCL=WFT({name:"Full stops and exclamation marks",task:"Vyber správne napísanú vetu",t3hint:"Bežná veta má bodku, zvolanie výkričník, otázka otáznik.",
  make(){
    const[en,sk]=pick(EXCL), end=en.slice(-1), body=dropEnd(en), others=[".","!","?"].filter(x=>x!==end);
    return{en,sk,gap:gpRaw(body,end,"",[...others,","]),wr:[...others.map(x=>body+x),low1(en),body]};
  },
  rule:{text:["Bežná veta končí <b>bodkou</b> (.): I was at the water park.","Keď niečo zvolávaš, tešíš sa alebo si prekvapený, píš <b>výkričník</b> (!): What a big slide!","Otázka končí <b>otáznikom</b> (?): Can you dive?"],
    tips:["Pri písaní (krok 6) sa kontrolujú aj veľké písmená a interpunkcia."]},
  voc:WATER});

// ---------- Units and lessons (from the textbook's table of contents) ----------
const LNAMES=["Lesson 1 · Words","Lesson 2 · Grammar","Lesson 3 · Words and Grammar","Lesson 4 · Story","Lesson 5 · Skills and Culture","Project and Review"];
const LSHORT=["Lesson 1","Lesson 2","Lesson 3","Lesson 4","Lesson 5","Project"];
const UN=(en,sk,l1,l2,l3,story,l5,proj)=>({en,sk,L:[l1,l2,l3,story,l5,proj]});
const UNITS=[
  UN("Time for school","Čas do školy",{t:"School things",fl:"Can I use your …? Sure! Here you are.",topics:[T_CAN],words:SCHOOL},{topics:[T_GOTQ,T_GOT]},{t:"Sports equipment",topics:[T_OURS],words:SPORT},
    {story:"The big game",wb:"Taking part is more important than winning",wbSk:"Zúčastniť sa je dôležitejšie ako vyhrať."},
    {t:"Art lessons in France and Morocco",type:"An email",wf:"Capital letters and full stops",topics:[WF_CAPS],words:ART},
    {en:"Make a dream school bag poster",sk:"Nakresli plagát svojej vysnívanej školskej tašky a napíš k nemu po anglicky, čo v nej máš.",ex:[T_GOT,T_OURS]}),
  UN("Mealtime","Čas jedla",{t:"Food",fl:"I'd like some … for breakfast / lunch / dinner.",topics:[T_WOULD],words:FOOD},{topics:[T_MEAL,T_HAVE,T_DIFF]},{t:"Vegetables",topics:[T_LIKE],words:VEG},
    {story:"The wolf's breakfast",wb:"Dealing with difficult situations",wbSk:"Ako zvládať ťažké situácie."},
    {t:"School lunches in the UK and South Korea",type:"A blog",wf:"Joining two sentences with and",topics:[WF_AND],words:FOOD5},
    {en:"Make a favourite foods collage",sk:"Vystrihni z letákov obrázky jedál, ktoré máš rád, nalep ich a napíš k nim vety.",ex:[T_LIKE,T_MEAL]}),
  UN("Wild animals","Divé zvieratá",{t:"Wild animals",fl:"Can it …? Yes, it can. / No, it can't.",topics:[F_CANIT],words:ANIM},{topics:[F_LIVE]},{t:"Animal foods",topics:[F_EAT],words:AFOOD},
    {story:"The tiger and the tortoise",wb:"Being determined",wbSk:"Byť odhodlaný a nevzdávať sa."},
    {t:"Wild animals in Australia and India",type:"A leaflet",wf:"Joining positive and negative sentences with commas and but",topics:[WF_BUT],words:ANIM5},
    {en:"Make an animal quiz",sk:"Priprav kvíz o zvieratkách: napíš otázky a nechaj kamarátov odpovedať.",ex:[F_CANIT,F_LIVE,F_EAT]}),
  UN("My favourite things","Moje obľúbené veci",{t:"Possessions",fl:"Is this Sam's …? No, it isn't. It's Eva's ….",topics:[C_SAMS],words:POSS4},{topics:[C_WHOSE]},{t:"Clothes",topics:[F_WEAR],words:CLOTHES},
    {story:"The prince's toys",wb:"Learning what makes you happy",wbSk:"Zistiť, čo ťa naozaj robí šťastným."},
    {t:"Favourite things in Italy and the UK",type:"A personal account",wf:"Writing lists using commas and and",topics:[WF_LIST],words:THINGS4},
    {en:"Make a time capsule",sk:"Vyber svoje obľúbené veci do časovej kapsuly a napíš o nich po anglicky.",ex:[F_WEAR,C_WHOSE]}),
  UN("Around town","Po meste",{t:"Places in town",fl:"Shall we go to the …? OK. Let's go!",topics:[C_SHALL],words:PLACES},{topics:[C_THERE]},{t:"Transport",topics:[C_WHERE],words:VEH},
    {story:"The red kite",wb:"Dealing with frustration",wbSk:"Ako zvládať, keď sa niečo nedarí."},
    {t:"Transport in Hungary and Brazil",type:"A questionnaire",wf:"Short answers",topics:[WF_SHORT],words:TR5},
    {en:"Make a town map",sk:"Nakresli mapu svojho mesta a napíš, čo v ňom je.",ex:[C_THERE,C_WHERE]}),
  UN("At the weekend","Cez víkend",{t:"Sports and games",fl:"What games do you like? I like … and ….",topics:[C_GAMES],words:GAMES},{topics:[F_PLAYING]},{t:"Free time activities",topics:[F_ING],words:ACTS},
    {story:"Walter wants to play",wb:"Being kind to others",wbSk:"Byť milý k ostatným."},
    {t:"Favourite games in Poland and South Africa",type:"A chat group message",wf:"Using the present simple for instructions",topics:[WF_INSTR],words:CHALK},
    {en:"Make a free time poster",sk:"Urob plagát o tom, čo robíš vo voľnom čase.",ex:[C_GAMES,F_PLAYING]}),
  UN("My day","Môj deň",{t:"Daily routines",fl:"I do my homework in the morning / afternoon / evening. What about you?",topics:[F_PARTS],words:ROUT},{topics:[F_DAYS]},{t:"Telling the time",topics:[F_TIME],words:TIMEW},
    {story:"Billy's day",wb:"Being on time",wbSk:"Byť načas."},
    {t:"Family routines in the USA and Thailand",type:"A school magazine interview",wf:"Third person verb endings",topics:[F_JOBS],words:JOBW},
    {en:"Make a zig-zag book",sk:"Vyrob skladaciu knižku o svojom dni: na každú stranu jeden obrázok a jedna veta.",ex:[F_PARTS,F_TIME]}),
  UN("My talents","Moje talenty",{t:"Skills",fl:"What can you do? I can ….",topics:[F_CANDO],words:SKILLS},{topics:[F_LIKEING]},{t:"Talents",topics:[F_GOOD],words:TALENTS},
    {story:"Meg's talent",wb:"Having confidence in your own ability",wbSk:"Veriť vo vlastné schopnosti."},
    {t:"Dances in Romania and China",type:"A blog",wf:"Adjectives",topics:[WF_ADJ],words:DANCE},
    {en:"Make a poster for a talent show",sk:"Urob plagát na súťaž talentov: kto vystúpi a čo vie dobre robiť.",ex:[F_CANDO,F_GOOD]}),
  UN("My home","Môj domov",{t:"Living room furniture",fl:"Where shall I put the …? In / On / Under the ….",topics:[C_PUT],words:FURN},{topics:[C_THEREON]},{t:"Kitchen things",topics:[C_COMPARE],words:KITCH},
    {story:"The big armchair",wb:"Being sorry",wbSk:"Vedieť sa ospravedlniť."},
    {t:"Interesting homes in Finland and Tunisia",type:"An email",wf:"Sentences with because",topics:[WF_BECAUSE],words:HOME5},
    {en:"Design your dream house",sk:"Navrhni svoj vysnívaný dom a napíš, čo v ktorej izbe je.",ex:[C_THEREON,WF_BECAUSE]}),
  UN("Days out","Výlety",{t:"Fun places",fl:"I like the …. So do I. But I prefer the ….",topics:[C_SODOI],words:FUN},{topics:[F_WAS]},{t:"Weather",topics:[F_WEATHER],words:WEATHER},
    {story:"Anton's days out",wb:"Being understanding",wbSk:"Byť chápavý."},
    {t:"Fun places in the UAE and Canada",type:"A diary entry",wf:"Full stops and exclamation marks",topics:[WF_EXCL],words:WATER},
    {en:"Make a holiday poster",sk:"Urob plagát o výlete: kde si bol a aké bolo počasie.",ex:[F_WAS,F_WEATHER]})];
UNITS.forEach((u,i)=>{u.n=i+1;u.L.forEach((l,j)=>(l.topics||[]).forEach(T=>{T.unit=i+1;T.src=`Unit ${i+1} · ${LNAMES[j]}`+(l.wf?" · Writing focus":"")}))});
const TOPICS=UNITS.flatMap(u=>[0,1,2,4].flatMap(j=>u.L[j].topics));
const unitTopics=(u,ls=[0,1,2,4])=>ls.flatMap(j=>UNITS[u].L[j].topics);

// ---------- Progress kept on this device ----------
// localStorage "gramatika-pokrok": per topic and exercise kind [right, wrong, score 0–1, time of the last answer].
// The score moves 30 % towards each new answer (1 right, 0 wrong). Only an item's first try in a round counts.
const PK="gramatika-pokrok";
const PROG=(()=>{try{const p=JSON.parse(localStorage.getItem(PK));if(p&&p.v===1&&p.items)return p}catch(e){}return {v:1,items:{}}})();
const saveProg=()=>{try{localStorage.setItem(PK,JSON.stringify(PROG))}catch(e){}};
const pkey=(T,k)=>T.unit+"|"+T.name+"|"+k;
function record(T,k,ok){const key=pkey(T,k), r=PROG.items[key]||[0,0,0,0];ok?r[0]++:r[1]++;r[2]=Math.round((r[2]*.7+(ok?.3:0))*1000)/1000;r[3]=Date.now();PROG.items[key]=r;saveProg()}
// Status: 0 new, 1 to repeat (score under 0.6 after a mistake), 2 learning, 3 known (5+ answers, score at least 0.85, 90 % right)
const kstat=r=>!r?0:r[1]&&r[2]<.6?1:r[0]+r[1]>=5&&r[2]>=.85&&r[0]>=9*r[1]?3:2;
const agg=st=>st.every(x=>x===0)?0:st.includes(1)?1:st.every(x=>x===3)?3:2;
const tstat=T=>agg(KINDS.map(k=>kstat(PROG.items[pkey(T,k)])));
const PMARK=["","! ","• ","✔ "], PNAME=["nové","zopakovať","učíš sa","vieš"];
// Weighted pick of a [topic, kind] pair for mixed rounds: what to repeat comes most often, known things rarely
// (a bit more often when not practised for a week).
const WT=[3,6,2,1];
function wpick(pairs){const now=Date.now();let sum=0;
  const ws=pairs.map(([T,k])=>{const r=PROG.items[pkey(T,k)], st=kstat(r), w=st===3&&now-r[3]>7*864e5?2:WT[st];sum+=w;return w});
  let x=Math.random()*sum;for(let i=0;i<pairs.length;i++){x-=ws[i];if(x<0)return pairs[i]}return pairs[pairs.length-1]}

// ---------- Speech (the phone's English voice) ----------
let VO=null;
const canSpeak=typeof speechSynthesis!=="undefined";
function pickVoice(){try{const v=speechSynthesis.getVoices();VO=v.find(x=>/^en[-_]GB/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null}catch(e){}}
if(canSpeak){pickVoice();try{speechSynthesis.addEventListener("voiceschanged",pickVoice)}catch(e){}}
function speak(t){try{if(!canSpeak)return;const u=new SpeechSynthesisUtterance(t.replace(/ – /g,". "));u.lang="en-GB";if(VO)u.voice=VO;u.rate=.85;speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
const spkIcon=()=>{const d=document.createElement("span");d.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';return d.firstChild};

// ---------- Checking typed sentences ----------
// canon expands contractions so "I've got" = "I have got"; plain also drops apostrophes; strict adds capitals, end mark and commas
const canon=s=>norm(s).replace(/[.,!?;:–—]/g," ").replace(/\bcan't\b/g,"can not").replace(/\bcannot\b/g,"can not").replace(/n't\b/g," not")
  .replace(/'ve\b/g," have").replace(/'d\b/g," would").replace(/'m\b/g," am").replace(/'re\b/g," are").replace(/'s got\b/g," has got").replace(/\b(he|she|it|there|what|where|that)'s\b/g,"$1 is").replace(/\s+/g," ").trim();
const plain=s=>norm(s).replace(/'/g,"").replace(/[.,!?;:–—]/g," ").replace(/\s+/g," ").trim();
const capsOf=s=>(s.replace(/[’]/g,"'").match(/[A-Za-z']+/g)||[]).filter(w=>/^[A-Z]/.test(w)).map(w=>w.split("'")[0].toLowerCase()).join(",");
const strictOk=(a,b)=>canon(a)===canon(b)&&capsOf(a)===capsOf(b)&&a.trim().slice(-1)===b.trim().slice(-1)&&(a.match(/,/g)||[]).length===(b.match(/,/g)||[]).length;
function targets(it){const t=[it.w?it.w.en:it.en,...(it.alts||[])];return [...t,...t.filter(x=>/\bany /.test(x)).map(x=>x.replace(/\bany /,""))]}

// ---------- Exercise items ----------
const KINDS=["gap","t3","listen","order","write"], N_STEP=10;
function makeItems(T,n,kind){const out=[],seen=new Set();for(let g=0;out.length<n&&g<300;g++){const par=T.rnd(),it=T.gen(par);if(seen.has(it.en))continue;seen.add(it.en);out.push({T,par,it,kind})}return out}
// Sentences that differ from the right one in one thing (person, + / − / ?, word, time), for the listening step
function variants(T,par){
  const G=[];
  for(const k in (T.vary||{})){const fn=T.vary[k];if(!fn||!(k in par))continue;const g=[];
    fn(par).filter(v=>v!==par[k]).forEach(v=>{let q={...par,[k]:v};if(T.fix)q=T.fix(q);if(q&&(!T.valid||T.valid(q)))g.push(q)});G.push(shuffle(g))}
  const out=[];for(let i=0;G.some(g=>g.length>i);i++)shuffle(G).forEach(g=>g[i]&&out.push(g[i]));
  return out;
}
function listenOpts(e){
  const seen=new Set([e.it.sk]), out=[];
  for(const q of variants(e.T,e.par).slice(0,40)){if(out.length===3)break;try{const s=e.T.gen(q).sk;if(!seen.has(s)){seen.add(s);out.push(s)}}catch(x){}}
  for(let g=0;out.length<3&&g<60;g++){const s=e.T.gen(e.T.rnd()).sk;if(!seen.has(s)){seen.add(s);out.push(s)}}
  return shuffle([e.it.sk,...out]);
}

// ---------- App state and layout ----------
const app=document.getElementById("app"), rail=document.getElementById("rail"), pickEl=document.getElementById("pick");
let tab="learn", cu=0, cl=0, ct=0, step=0, done=new Set();
const curLesson=()=>UNITS[cu].L[cl], curTopic=()=>(curLesson().topics||[])[ct];
const stepNames=T=>["Pravidlo","Doplň",T.t3n,"Počúvaj","Poskladaj","Napíš"];
const TITLES={gap:"Doplň slovo",listen:"Počúvaj a vyber",order:"Poskladaj vetu",write:"Napíš po anglicky"};
const HINTS={gap:"Vyber slovo, ktoré patrí na prázdne miesto. Pod vetou je preklad.",
  listen:"Vypočuj si anglickú vetu a vyber, čo znamená po slovensky.",
  order:"Poskladaj anglickú vetu zo slov. Ťuknutím na slovo vo vete ho vrátiš späť.",
  write:"Napíš vetu po anglicky. Skrátené tvary (I've, doesn't) aj celé tvary (I have, does not) sú správne. Pomôcka ukáže ďalšie slovo."};
const kindTitle=(T,k)=>k==="t3"?T.t3title:TITLES[k];
const kindHint=(T,k)=>k==="t3"?T.t3hint:k==="write"&&T.strict?"Napíš vetu po anglicky. Pozor na veľké písmená, čiarky a znamienko na konci vety. Pomôcka ukáže ďalšie slovo.":HINTS[k];
const go=(u,l,t)=>{cu=u;cl=l;ct=t||0;step=0;done.clear();tab="learn";render();window.scrollTo({top:0})};

function drawPick(){
  pickEl.hidden=tab!=="learn"; pickEl.innerHTML="";
  if(tab!=="learn") return;
  const uc=$("div",{class:"chips"});
  UNITS.forEach((u,i)=>uc.append($("button",{class:"chip p"+agg(unitTopics(i).map(tstat)),"aria-pressed":i===cu,title:u.sk,onclick:()=>go(i,cl===5?5:Math.min(cl,5),0)},`${i+1} · ${u.en}`)));
  const lc=$("div",{class:"chips"});
  LSHORT.forEach((n,j)=>lc.append($("button",{class:"chip p"+agg((UNITS[cu].L[j].topics||[]).map(tstat)),"aria-pressed":j===cl,onclick:()=>go(cu,j,0)},n)));
  const L=curLesson(), cap1=[LNAMES[cl],L.t,L.story,L.wf?"Writing focus: "+L.wf:null].filter(Boolean).join(" · ");
  pickEl.append($("h3",{},`Unit ${cu+1}: ${UNITS[cu].en} (${UNITS[cu].sk})`),uc,$("h3",{},cap1),lc);
  if(L.fl) pickEl.append($("p",{class:"src",style:"margin:0"},"Functional language: "+L.fl));
  if(L.topics&&L.topics.length>1){const tc=$("div",{class:"chips"});L.topics.forEach((T,k)=>tc.append($("button",{class:"chip p"+tstat(T),title:PNAME[tstat(T)],"aria-pressed":k===ct,onclick:()=>go(cu,cl,k)},T.name)));pickEl.append($("h3",{},"Témy tejto lekcie"),tc)}
}
function drawRail(){
  const T=curTopic(); rail.hidden=tab!=="learn"||!T; rail.innerHTML="";
  if(rail.hidden) return;
  stepNames(T).forEach((s,i)=>rail.append($("button",{class:"st"+(i===step?" on":"")+(done.has(i)?" done":"")+(i?" p"+kstat(PROG.items[pkey(T,KINDS[i-1])]):""),onclick:()=>{step=i;render()}},$("b",{},String(i+1)),s)));
}
function render(){
  [["t-learn","learn"],["t-rev","rev"]].forEach(([id,t])=>document.getElementById(id).setAttribute("aria-selected",tab===t));
  drawPick(); drawRail(); app.innerHTML="";
  if(canSpeak)try{speechSynthesis.cancel()}catch(e){}
  if(tab==="rev") return reviewSetup();
  const L=curLesson();
  if(L.story) return storyCard(L);
  if(L.ex) return projectCard(L);
  const T=curTopic(), next=()=>{done.add(step);if(step<5){step++;render();window.scrollTo({top:0})}else finale()};
  if(step===0) return rule(T,next);
  const kind=KINDS[step-1];
  drill(()=>makeItems(T,N_STEP,kind),next,kindTitle(T,kind),kindHint(T,kind),false);
}
document.getElementById("t-learn").onclick=()=>{tab="learn";render()};
document.getElementById("t-rev").onclick=()=>{tab="rev";render()};

// Words of a list, grouped by unit and lesson
function wordBox(list,title){
  const d=$("details",{},$("summary",{},title||"Slovíčka")), groups={};
  list.forEach(n=>(groups[n.u||""]=groups[n.u||""]||[]).push(n));
  for(const u in groups) d.append($("div",{class:"fs"},$("h3",{},u),$("div",{class:"words"},groups[u].map(n=>$("div",{},$("b",{},n.w||bare(n)),$("span",{},n.ws||n.sk))))));
  return d;
}
// Step 1: the rule, a table of sentences and the words
function rule(T,next){
  const c=$("section",{class:"card"});app.append(c);
  c.append($("h2",{},T.name),$("p",{class:"src"},T.src));
  T.rule.text.forEach(h=>c.append(html("p",h)));
  if(T.rule.custom) c.append(T.rule.custom());
  else if(T.rule.cols){
    let col=0; const chips=$("div",{class:"chips"}), box=$("div",{class:"rt"});
    const draw=()=>{
      chips.querySelectorAll(".chip").forEach((x,i)=>x.setAttribute("aria-pressed",i===col));
      box.innerHTML=""; const[,ov,f]=T.rule.cols[col];
      T.rule.rows.forEach(r=>{const it=T.gen({...r.par,...ov}), en=it[f||"en"], sk=f?"":it.sk;if(!en)return;
        box.append($("button",{class:"rr",onclick:()=>speak(en)},$("b",{},r.l),$("span",{},$("span",{class:"e"},en),sk?$("span",{class:"s"},sk):null)))});
    };
    if(T.rule.cols.length>1) T.rule.cols.forEach(([h],i)=>chips.append($("button",{class:"chip",onclick:()=>{col=i;draw()}},h)));
    draw(); c.append($("p",{class:"hint"},"Ťukni na vetu a vypočuješ si ju."),chips,box);
    if(T.rule.cols.some(x=>/ya|na|ans/.test(x[2]||""))&&T.rule.rows.some(r=>r.par.s&&/^(I|you)$/.test(r.par.s.agr)))
      c.append(html("p","Stĺpce Áno / Nie ukazujú krátku odpoveď pre osobu v riadku. Pozor: na otázku s <b>you</b> odpovedáš s <b>I</b>: Do <b>you</b> like carrots? – Yes, <b>I</b> do. A na otázku s <b>I</b> s <b>you</b>: Do <b>I</b> …? – Yes, <b>you</b> do."));
  }
  if(T.rule.tips) c.append($("div",{class:"tip"},$("b",{},"Pozor!"),T.rule.tips.map(h=>html("p",h))));
  c.append(wordBox(T.voc,"Slovíčka v tejto téme"));
  c.append($("div",{class:"row"},$("button",{class:"btn sun",onclick:next},"Rozumiem, ideme cvičiť ▶")));
}
// A mixed round from several topics (story, project and review)
const mixMake=(ts,n,mode)=>()=>{const out=[],seen=new Set(), pairs=ts.flatMap(T=>(mode&&mode!=="mix"?[mode]:KINDS).map(k=>[T,k]));
  for(let g=0;out.length<n&&g<600;g++){const [T,kind]=wpick(pairs),par=T.rnd(),it=T.gen(par);
  if(seen.has(it.en))continue;seen.add(it.en);out.push({T,par,it,kind})}return out};
function mixRound(ts,n,back){app.innerHTML="";window.scrollTo({top:0});drill(mixMake(ts,n),back,"","",true)}
function storyCard(L){
  const c=$("section",{class:"card"});app.append(c);
  const back=()=>{app.innerHTML="";storyCard(L);window.scrollTo({top:0})};
  c.append($("h2",{},"Story: "+L.story),$("p",{class:"src"},`Unit ${cu+1} · Lesson 4`),
    html("p",`<b>Emotional wellbeing:</b> ${L.wb}`),$("p",{class:"hint"},L.wbSk),
    $("p",{},"Príbeh si prečítaj v učebnici. Tu si zopakuj gramatiku z Lesson 1 až 3 tohto unitu: vety sú premiešané a cvičenia sa striedajú."),
    $("div",{class:"row"},$("button",{class:"btn sun",onclick:()=>mixRound(unitTopics(cu,[0,1,2]),12,back)},"Opakovať Lesson 1–3 ▶")),
    wordBox([...(UNITS[cu].L[0].words||[]),...(UNITS[cu].L[2].words||[])],"Slovíčka z Lesson 1 a 3"));
}
function projectCard(L){
  const c=$("section",{class:"card"});app.append(c);
  const back=()=>{app.innerHTML="";projectCard(L);window.scrollTo({top:0})};
  const ex=[];L.ex.forEach(T=>makeItems(T,8,"gap").filter(e=>/\.$/.test(e.it.en)).slice(0,3).forEach(e=>ex.push(e.it)));
  c.append($("h2",{},"Project: "+L.en),$("p",{class:"src"},`Unit ${cu+1} · Project and Review`),$("p",{},L.sk),
    $("div",{class:"fs"},$("h3",{},"Vety, ktoré sa ti môžu hodiť (ťukni a vypočuj si ich)"),$("div",{class:"rt"},ex.map(it=>$("button",{class:"rr",onclick:()=>speak(it.en)},$("b",{},"•"),$("span",{},$("span",{class:"e"},it.en),$("span",{class:"s"},it.sk)))))),
    $("p",{class:"hint"},"Review: zopakuj si celý unit. Vety sú zo všetkých lekcií, aj z Lesson 5."),
    $("div",{class:"row"},$("button",{class:"btn sun",onclick:()=>mixRound(unitTopics(cu),15,back)},"Opakovanie celého Unitu "+(cu+1)+" ▶")),
    wordBox([0,2,4].flatMap(j=>UNITS[cu].L[j].words||[]),"Slovíčka celého unitu"));
}

// Steps 2–6 and the mixed rounds: one sentence at a time; a wrong one comes back 2–3 sentences later until it is right
function drill(make,onDone,title,hint,review,list){
  const L=list||make();
  let queue=shuffle(L).map(e=>({e,tries:0})), total=queue.length, firstOk=0, doneN=0, wrong=[];
  const c=$("section",{class:"card"});app.append(c);
  const show=()=>{
    if(!queue.length) return result();
    const q=queue[0], e=q.e, it=e.it, T=e.T; c.innerHTML="";
    c.append($("h2",{},review?kindTitle(T,e.kind):title),$("p",{class:"hint"},review?kindHint(T,e.kind):hint),
      $("div",{class:"meta"},$("span",{},"Správne na prvý pokus: "+firstOk),$("span",{},doneN+" / "+total)),
      $("div",{class:"bar"},$("i",{style:"width:"+(doneN/total*100)+"%"})));
    if(review) c.append($("p",{class:"src",style:"margin:0"},T.src+" · "+T.name));
    const box=$("div",{class:"fs"});c.append(box);
    const add=(...xs)=>box.append(...xs.filter(x=>x!=null));
    const scene=sc=>sc?$("p",{class:"scene"},sc):null;
    const answered=(ok,full,sk,note)=>{
      q.tries++; if(q.tries===1)record(T,e.kind,ok);
      if(ok){ if(q.tries===1)firstOk++; doneN++; queue.shift(); }
      else { if(!wrong.includes(e))wrong.push(e); queue.shift(); queue.splice(Math.min(queue.length,2+Math.floor(Math.random()*2)),0,q); }
      speak(full);
      const fb=ok?$("div",{class:"fb ok"},"Výborne! ",$("span",{},full),sk?$("small",{},sk):null)
                 :$("div",{class:"fb bad"},"Ešte nie. Správne: ",$("span",{},full),sk?$("small",{},sk):null);
      const nb=$("button",{class:"btn",onclick:show},"Ďalej ▶");
      c.append(fb); if(note) c.append($("div",{class:"fb note"},note)); c.append($("div",{class:"row"},nb)); nb.focus();
    };
    const choices=(opts,a,cls,onPick)=>{const o=$("div",{class:"opts"+(cls?" "+cls:"")});
      opts.forEach(x=>{const b=$("button",{class:"opt",onclick:()=>{o.querySelectorAll("button").forEach(y=>{y.disabled=true;if(y.textContent===a)y.classList.add("ok")});if(x!==a)b.classList.add("bad");onPick(x)}},x);o.append(b)});return o};
    const clue=y=>y==null?null:$("span",{class:"clue "+(y?"y":"n")},y?"✔ Áno":"✘ Nie");
    if(e.kind==="gap"){
      const g=it.gap, [pre,post]=g.txt.split("___"), slot=$("span",{class:"gap"}," ");
      add($("span",{class:"lbl"},"Doplň"),scene(it.scene),$("p",{class:"sent"},pre,slot,post),$("p",{class:"skl"},g.sk||it.sk),
        choices(g.opts,g.a,"",x=>{slot.textContent=g.a;slot.classList.add(x===g.a?"ok":"bad");answered(x===g.a,g.full||it.en,g.sk||it.sk)}));
    }
    if(e.kind==="t3"){
      const t=it.t3;
      add($("span",{class:"lbl"},t.task),scene(t.scene));
      if(t.q){add($("p",{class:"sent"},t.q));if(t.hint)add($("p",{class:"skl"},t.hint))}
      else if(t.hint) add($("p",{class:"sent sk"},t.hint));
      add(clue(t.clue),choices(t.opts,t.a,"one",x=>answered(x===t.a,t.q?t.q+" – "+t.a:t.a,null)));
    }
    if(e.kind==="listen"){
      if(canSpeak){add($("span",{class:"lbl"},"Stlač a vypočuj si vetu"),$("button",{class:"speak",onclick:()=>speak(it.en)},spkIcon(),"Prehrať vetu"));setTimeout(()=>speak(it.en),250)}
      else add($("span",{class:"lbl"},"po anglicky"),$("p",{class:"sent"},it.en),$("p",{class:"hint",style:"text-align:center"},"Tento prehliadač nevie čítať nahlas, preto je veta napísaná."));
      add(choices(listenOpts(e),it.sk,"one",x=>answered(x===it.sk,it.en,it.sk)));
    }
    if(e.kind==="order"){
      const end=/[.?!]$/.test(it.en)?it.en.slice(-1):"", words=(end?dropEnd(it.en):it.en).split(" ");
      const line=$("div",{class:"line"}), pool=$("div",{class:"pool"}); let picked=[];
      const drawLine=()=>{line.innerHTML="";picked.forEach((p,i)=>line.append($("button",{class:"wt",onclick:()=>{if(line.dataset.done)return;picked.splice(i,1);p.b.disabled=false;drawLine()}},p.w)));if(picked.length)line.append($("span",{class:"end"},end))};
      let tiles=shuffle(words.map((w,i)=>({w,i}))); if(words.length>1)for(let g=0;g<5&&tiles.every((t,i)=>t.i===i);g++)tiles=shuffle(tiles);
      tiles.forEach(t=>{const b=$("button",{class:"wt",onclick:()=>{picked.push({w:t.w,b});b.disabled=true;drawLine();
        if(picked.length===words.length){line.dataset.done=1;undo.disabled=true;answered(picked.map(p=>p.w).join(" ")===words.join(" "),it.en,it.sk)}}},t.w);pool.append(b)});
      const undo=$("button",{class:"btn ghost",onclick:()=>{const p=picked.pop();if(p){p.b.disabled=false;drawLine()}}},"⌫ Späť");
      drawLine(); add($("span",{class:"lbl"},"po slovensky"),scene(it.scene),$("p",{class:"sent sk"},it.sk),line,pool,$("div",{class:"row"},undo));
    }
    if(e.kind==="write"){
      const W=it.w, target=W?W.en:it.en;
      if(W) add($("span",{class:"lbl"},"Napíš krátku odpoveď"),$("p",{class:"sent"},W.q),clue(W.clue));
      else add($("span",{class:"lbl"},"po slovensky"),scene(it.scene),$("p",{class:"sent sk"},it.sk));
      const inp=$("input",{type:"text",autocomplete:"off",autocapitalize:"sentences",spellcheck:"false","aria-label":"Napíš po anglicky"});
      let hinted=0; const ws=target.split(" ");
      const check=()=>{if(!inp.value.trim())return;inp.disabled=true;okb.disabled=true;hb.disabled=true;
        const ts=targets(it), v=inp.value;
        if(T.strict){const ok=ts.some(t=>strictOk(v,t)), near=!ok&&ts.some(t=>canon(t)===canon(v));
          return answered(ok,target,it.sk,near?"Slová máš správne, ale pozri sa na veľké písmená, čiarky a znamienko na konci.":!ok?"Tvoja odpoveď: "+v:null)}
        const exact=ts.some(t=>canon(t)===canon(v)), almost=!exact&&ts.some(t=>plain(t)===plain(v));
        answered(exact||almost,target,it.sk,almost?"Skoro presne! Nezabudni na apostrof ('): "+target:(!exact?"Tvoja odpoveď: "+v:null))};
      inp.addEventListener("keydown",ev=>{if(ev.key==="Enter")check()});
      const okb=$("button",{class:"btn",onclick:check},"Skontrolovať");
      const hb=$("button",{class:"btn ghost",onclick:()=>{hinted=Math.min(ws.length,hinted+1);inp.placeholder=ws.slice(0,hinted).join(" ")+(hinted<ws.length?" …":"");inp.focus()}},"Pomôcka");
      add(inp,$("div",{class:"row"},hb,okb)); setTimeout(()=>inp.focus(),50);
    }
  };
  const result=()=>{
    c.innerHTML="";
    const pct=Math.round(firstOk/total*100);
    c.append($("h2",{},"Hotovo!"),$("div",{class:"big"},firstOk+" / "+total),
      $("p",{class:"hint",style:"text-align:center"},pct>=90?"Super, toto už vieš!":pct>=60?"Dobre! Chybné vety si ešte zopakuj.":"Skús to ešte raz, pôjde to lepšie."));
    if(wrong.length) c.append($("div",{class:"fs"},$("h3",{},"Tieto vety si zopakuj"),$("div",{class:"list"},wrong.map(e=>$("span",{},e.kind==="t3"&&e.it.t3.q?e.it.t3.q+" – "+e.it.t3.a:e.kind==="t3"?e.it.t3.a:e.it.en)))));
    c.append($("div",{class:"row"},
      $("button",{class:"btn ghost",onclick:()=>{app.innerHTML="";drill(make,onDone,title,hint,review)}},"Ešte raz"),
      wrong.length?$("button",{class:"btn ghost",onclick:()=>{app.innerHTML="";drill(make,onDone,title,hint,review,wrong)}},"Len chyby"):null,
      $("button",{class:"btn sun",onclick:onDone},review?"Späť":"Ďalší krok ▶")));
  };
  show();
}

function finale(){
  app.innerHTML=""; drawRail();
  const L=curLesson(), nt=ct<L.topics.length-1?[cu,cl,ct+1]:cl<5?[cu,cl+1,0]:cu<9?[cu+1,0,0]:null;
  const label=nt?(nt[2]>0?"Ďalšia téma ▶":nt[0]!==cu?`Unit ${nt[0]+1} ▶`:LSHORT[nt[1]]+" ▶"):null;
  app.append($("section",{class:"card"},$("h2",{},"Prešiel si všetkých 6 krokov!"),
    $("p",{class:"hint"},"Túto tému už poznáš. Zajtra skús hneď krok 6 Napíš, či si ju ešte pamätáš."),
    $("div",{class:"row"},$("button",{class:"btn ghost",onclick:()=>{step=0;done.clear();render()}},"Začať odznova"),
      nt?$("button",{class:"btn sun",onclick:()=>go(...nt)},label):null)));
}

// Review tab: mixed sentences from the picked units
const REV={units:new Set([0]),mode:"mix",count:15};
function reviewSetup(){
  const c=$("section",{class:"card"});app.append(c);
  const all=UNITS.map((_,i)=>i), uc=$("div",{class:"chips"}), redraw=()=>{app.innerHTML="";reviewSetup()};
  uc.append($("button",{class:"chip","aria-pressed":REV.units.size===all.length,onclick:()=>{const on=REV.units.size===all.length;REV.units.clear();if(!on)all.forEach(i=>REV.units.add(i));redraw()}},"Všetky"));
  UNITS.forEach((u,i)=>uc.append($("button",{class:"chip","aria-pressed":REV.units.has(i),title:u.sk,onclick:()=>{REV.units.has(i)?REV.units.delete(i):REV.units.add(i);redraw()}},`Unit ${i+1}`)));
  const modes=[["mix","Všetko premiešané"],["gap","Doplň slovo"],["t3","Odpovedz / zmeň"],["listen","Počúvaj a vyber"],["order","Poskladaj vetu"],["write","Napíš po anglicky"]];
  const mc=$("div",{class:"chips"});
  modes.forEach(([k,t])=>mc.append($("button",{class:"chip","aria-pressed":REV.mode===k,onclick:ev=>{REV.mode=k;mc.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",x===ev.currentTarget))}},t)));
  const cc=$("div",{class:"chips"});
  [10,15,25].forEach(n=>cc.append($("button",{class:"chip","aria-pressed":REV.count===n,onclick:ev=>{REV.count=n;cc.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",x===ev.currentTarget))}},n+" viet")));
  const err=$("p",{class:"fb bad",hidden:""},"Vyber aspoň jeden unit.");
  c.append($("h2",{},"Opakovanie"),$("p",{class:"hint"},"Vyber unity a spôsob opakovania. Vety sa vytvoria náhodne zo slovíčok z učebnice, najčastejšie z tém, v ktorých robíš chyby."),
    $("div",{class:"fs"},$("h3",{},"Unity"),uc),$("div",{class:"fs"},$("h3",{},"Spôsob"),mc),$("div",{class:"fs"},$("h3",{},"Počet"),cc),err,
    $("div",{class:"row"},$("button",{class:"btn sun",onclick:()=>{
      if(!REV.units.size){err.hidden=false;return}
      const ts=[...REV.units].flatMap(u=>unitTopics(u));
      app.innerHTML="";
      drill(mixMake(ts,REV.count,REV.mode),()=>{app.innerHTML="";reviewSetup();window.scrollTo({top:0})},"","",true);
    }},"Začať opakovanie ▶")));
  const n=[0,0,0,0];TOPICS.forEach(T=>n[tstat(T)]++);
  const ov=$("section",{class:"card"},$("h2",{},"Prehľad učebnice"),
    $("p",{class:"prog"},[3,2,1,0].filter(i=>n[i]).map(i=>$("span",{class:"p"+i},PMARK[i]+PNAME[i]+": "+n[i]+(i===3?" tém":"")))),
    $("p",{class:"hint"},"✔\u00a0vieš · •\u00a0učíš\u00a0sa · !\u00a0zopakovať (v téme alebo cvičení robíš chyby). Téma je zvládnutá, keď vieš všetkých 5 cvičení. Pokrok sa ukladá v tomto zariadení."),
    $("div",{class:"row"},$("button",{class:"btn ghost",onclick:()=>{if(confirm("Naozaj vymazať celý pokrok v gramatike v tomto zariadení?")){for(const k in PROG.items)delete PROG.items[k];saveProg();render()}}},"Vynulovať pokrok")));
  UNITS.forEach((u,i)=>{const box=$("div",{class:"chips"});
    u.L.forEach((l,j)=>(l.topics||[{name:l.story?"Story: "+l.story:"Project: "+l.en}]).forEach((T,k)=>box.append($("button",{class:"chip"+(l.topics?" p"+tstat(T):""),onclick:()=>go(i,j,l.topics?k:0)},LSHORT[j]+": "+T.name))));
    ov.append($("div",{class:"fs"},$("h3",{},`Unit ${i+1} · ${u.en} · ${u.sk}`),box))});
  app.append(ov);
}

render();
