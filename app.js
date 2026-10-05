const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

const STORE={
  history:"still.history.v2",
  tutorial:"still.tutorial.v2",
  volumes:"still.volumes.v2",
  master:"still.master.v2",
  settings:"still.settings.v2",
  favorites:"still.favorites.v2",
  programs:"still.programs.v2",
  preset:"still.preset.v2"
};

const DEFAULT_SETTINGS={
  gongEnabled:true,
  gongType:"warm",
  gongVolume:.55,
  gongStart:true,
  gongEnd:true,
  haptics:true
};

const sessions=[
  {id:"sos-2",title:"SOS — wróć do ciała",method:"Grounding + oddech",minutes:2,icon:"!",tags:["calm","clear"],desc:"Natychmiastowa krótka praktyka, kiedy potrzebujesz zwolnić.",phases:[
    {seconds:25,title:"Zatrzymaj się",instruction:"Oprzyj stopy o podłoże. Zauważ trzy punkty kontaktu ciała z otoczeniem."},
    {seconds:45,title:"Dłuższy wydech",instruction:"Oddychaj naturalnie, pozwalając wydechowi być trochę dłuższym od wdechu. Niczego nie forsuj."},
    {seconds:35,title:"Rozejrzyj się",instruction:"Nazwij w myślach trzy rzeczy, które widzisz i dwa dźwięki, które słyszysz."},
    {seconds:15,title:"Powrót",instruction:"Poczuj całe ciało. Zrób jeden spokojny wydech i wróć do tego, co było przed Tobą."}
  ]},
  {id:"reset-3",title:"Szybki reset",method:"Mindful breathing",minutes:3,icon:"○",tags:["calm","clear"],desc:"Krótki powrót do oddechu i ciała.",phases:[
    {seconds:30,title:"Ustaw pozycję",instruction:"Usiądź stabilnie. Rozluźnij szczękę, barki i dłonie."},
    {seconds:60,title:"Poczuj oddech",instruction:"Nie poprawiaj oddechu. Zauważ, gdzie czujesz go najwyraźniej."},
    {seconds:60,title:"Wróć do kotwicy",instruction:"Kiedy pojawi się myśl, zauważ ją i łagodnie wróć do kolejnego oddechu."},
    {seconds:30,title:"Zamknij praktykę",instruction:"Poczuj całe ciało i otoczenie. Zrób jeden spokojny, pełny wydech."}
  ]},
  {id:"calm-5",title:"Pięć minut ciszej",method:"Oddech + rozluźnienie",minutes:5,icon:"◌",tags:["calm","clear"],desc:"Prosta praktyka na napięcie i szybki powrót do równowagi.",phases:[
    {seconds:45,title:"Osadzenie",instruction:"Usiądź wygodnie i poczuj ciężar ciała."},
    {seconds:90,title:"Oddech",instruction:"Zauważ każdy wydech. Nie kontroluj tempa bardziej niż potrzebujesz."},
    {seconds:105,title:"Rozluźnienie",instruction:"Przenieś uwagę przez twarz, szyję, barki i brzuch. Pozwól napięciu być i mięknąć."},
    {seconds:60,title:"Cisza",instruction:"Przez minutę po prostu zauważaj oddech, ciało i dźwięki."}
  ]},
  {id:"cleanse-7",title:"Oczyszczająca",method:"Oddech + body scan",minutes:7,icon:"◇",tags:["calm","clear"],desc:"Oddech, napięcie i świadome puszczanie.",phases:[
    {seconds:60,title:"Zwolnij",instruction:"Wydłuż wydech bez forsowania. Daj ciału sygnał, że niczego nie musi teraz robić."},
    {seconds:90,title:"Zauważ napięcie",instruction:"Przejdź uwagą przez twarz, szyję, barki i brzuch. Niczego nie zmieniaj na siłę."},
    {seconds:150,title:"Skan ciała",instruction:"Powoli przesuwaj uwagę od głowy do stóp. Przy wydechu pozwól kolejnej części ciała odpuścić."},
    {seconds:90,title:"Nazwij i puść",instruction:"Jeśli coś wraca w myślach, nazwij to jednym słowem: plan, wspomnienie, napięcie. Potem wróć do ciała."},
    {seconds:30,title:"Koniec",instruction:"Zauważ trzy dźwięki wokół siebie i otwórz oczy w swoim tempie."}
  ]},
  {id:"morning-8",title:"Spokojny start",method:"Uważność poranna",minutes:8,icon:"☼",tags:["focus","clear"],desc:"Obecność i intencja przed wejściem w dzień.",phases:[
    {seconds:60,title:"Obudź ciało",instruction:"Poczuj postawę, kontakt stóp i naturalny rytm oddechu."},
    {seconds:120,title:"Zbierz uwagę",instruction:"Zostań przy oddechu. Za każdym razem, gdy odpłyniesz, wróć bez komentarza."},
    {seconds:180,title:"Kierunek",instruction:"Zadaj sobie pytanie: co dzisiaj naprawdę wymaga mojej uwagi? Nie szukaj długiej odpowiedzi."},
    {seconds:90,title:"Przestrzeń",instruction:"Pozostań przez chwilę z otwartą świadomością ciała i otoczenia."},
    {seconds:30,title:"Start",instruction:"Wybierz jedną prostą intencję na najbliższe godziny."}
  ]},
  {id:"sleep-10",title:"Zejście do snu",method:"Body scan do snu",minutes:10,icon:"☾",tags:["sleep","calm"],desc:"Powolne odpuszczanie napięcia bez wymuszania zaśnięcia.",phases:[
    {seconds:60,title:"Nic już nie musisz",instruction:"Ułóż się wygodnie. Pozwól oczom odpocząć i zauważ ciężar ciała."},
    {seconds:120,title:"Wydech",instruction:"Poczuj spokojny wydech. Nie próbuj zasnąć — po prostu pozwól ciału odpoczywać."},
    {seconds:270,title:"Skan",instruction:"Przesuwaj uwagę od twarzy przez barki, brzuch, biodra, nogi aż do stóp."},
    {seconds:120,title:"Całe ciało",instruction:"Poczuj ciało jako całość. Pozwól myślom odpływać bez kończenia ich."},
    {seconds:30,title:"Puść praktykę",instruction:"Nie musisz już śledzić instrukcji. Pozostań w bezruchu tak długo, jak chcesz."}
  ]},
  {id:"focus-10",title:"Wejście w skupienie",method:"Focused attention",minutes:10,icon:"◎",tags:["focus"],desc:"Dziesięć minut stabilizacji przed pracą lub nauką.",phases:[
    {seconds:60,title:"Odłącz szum",instruction:"Odłóż na chwilę listę zadań. Poczuj trzy spokojne oddechy."},
    {seconds:180,title:"Jedna kotwica",instruction:"Wybierz jedno miejsce oddechu i utrzymuj tam uwagę. Zauważ rozproszenie, wróć."},
    {seconds:240,title:"Trening koncentracji",instruction:"Licz wydechy od 1 do 10. Po zgubieniu liczenia wróć do 1 bez oceniania."},
    {seconds:90,title:"Intencja",instruction:"Wybierz jedno zadanie, którym zajmiesz się po sesji. Tylko jedno."},
    {seconds:30,title:"Przejście",instruction:"Otwórz oczy i zacznij od wybranego zadania."}
  ]},
  {id:"body-12",title:"Skan ciała",method:"Body scan",minutes:12,icon:"⌁",tags:["calm","deep"],desc:"Systematyczne kierowanie uwagi przez ciało.",phases:[
    {seconds:60,title:"Kontakt z podłożem",instruction:"Poczuj punkty podparcia. Pozwól ciężarowi ciała opaść."},
    {seconds:120,title:"Oddech",instruction:"Zauważ ruch brzucha i klatki piersiowej bez sterowania."},
    {seconds:420,title:"Pełny skan",instruction:"Idź powoli: twarz, szyja, barki, ramiona, dłonie, klatka, brzuch, miednica, nogi i stopy."},
    {seconds:120,title:"Całe ciało",instruction:"Porzuć skanowanie punkt po punkcie. Poczuj całe ciało jako jedną przestrzeń doznań."}
  ]},
  {id:"kindness-10",title:"Życzliwość",method:"Loving-kindness",minutes:10,icon:"♡",tags:["calm","deep"],desc:"Praktyka życzliwości wobec siebie i innych.",phases:[
    {seconds:60,title:"Uspokój rytm",instruction:"Poczuj oddech i ciężar ciała. Nie próbuj wywoływać konkretnego nastroju."},
    {seconds:150,title:"Dla siebie",instruction:"W myślach powtarzaj: niech będę bezpieczny, spokojny i życzliwy dla siebie."},
    {seconds:240,title:"Dla innych",instruction:"Pomyśl o bliskiej osobie, później o kimś neutralnym. Skieruj do nich tę samą intencję życzliwości."},
    {seconds:120,title:"Szerzej",instruction:"Rozszerz intencję na ludzi, których dziś spotkasz — bez potrzeby czucia czegokolwiek szczególnego."},
    {seconds:30,title:"Powrót",instruction:"Wróć do oddechu i zakończ bez oceniania, czy praktyka była udana."}
  ]},
  {id:"release-15",title:"Po intensywnym dniu",method:"Rozluźnienie + obserwacja",minutes:15,icon:"≈",tags:["calm","sleep","clear"],desc:"Dłuższe zejście z napięcia po pracy albo przeciążeniu.",phases:[
    {seconds:90,title:"Zmień tempo",instruction:"Usiądź lub połóż się. Pozwól, żeby przez chwilę nic nie wymagało reakcji."},
    {seconds:180,title:"Ciało",instruction:"Zauważ miejsca największego napięcia. Nie próbuj ich natychmiast naprawiać."},
    {seconds:240,title:"Oddech i wydech",instruction:"Zostań z naturalnym wdechem i trochę miększym, dłuższym wydechem."},
    {seconds:300,title:"Otwarta obserwacja",instruction:"Pozwól myślom, dźwiękom i odczuciom pojawiać się i odchodzić."},
    {seconds:90,title:"Domknięcie",instruction:"Zauważ, czy ciało potrzebuje teraz ruchu, wody, ciszy czy po prostu odpoczynku."}
  ]},
  {id:"open-15",title:"Otwarta obserwacja",method:"Open monitoring",minutes:15,icon:"◉",tags:["deep"],desc:"Mniej sterowania, więcej zauważania.",phases:[
    {seconds:90,title:"Kotwica",instruction:"Przez chwilę zostań przy oddechu, żeby ustabilizować uwagę."},
    {seconds:180,title:"Otwórz pole",instruction:"Pozwól uwadze obejmować dźwięki, ciało, oddech i myśli bez wybierania jednego obiektu."},
    {seconds:480,title:"Obserwuj zmianę",instruction:"Zauważaj, jak wrażenia pojawiają się i znikają. Nie zatrzymuj żadnego z nich."},
    {seconds:150,title:"Domknięcie",instruction:"Zawęź uwagę ponownie do oddechu i całego ciała."}
  ]},
  {id:"deep-20",title:"Głęboka medytacja",method:"Oddech + body scan + cisza",minutes:20,icon:"●",tags:["deep","calm"],desc:"Dłuższa sesja z etapem cichej obserwacji.",phases:[
    {seconds:90,title:"Wejście",instruction:"Ustaw ciało wygodnie i stabilnie. Zauważ naturalny rytm oddechu."},
    {seconds:180,title:"Stabilizacja",instruction:"Zostań przy jednym miejscu oddechu: nos, klatka albo brzuch."},
    {seconds:300,title:"Ciało",instruction:"Skanuj ciało spokojnie. Zauważ napięcie, temperaturę, pulsowanie i kontakt z podłożem."},
    {seconds:480,title:"Cisza",instruction:"Pozostań z otwartą świadomością. Gdy odpłyniesz, wróć na kilka oddechów do kotwicy."},
    {seconds:150,title:"Powrót",instruction:"Poszerz uwagę na całe ciało i pokój. Nie wstawaj natychmiast."}
  ]},
  {id:"focus-25",title:"Deep Focus 25",method:"Koncentracja + cisza",minutes:25,icon:"⊙",tags:["focus","deep"],desc:"Przygotowanie uwagi i długi blok stabilnej koncentracji.",phases:[
    {seconds:90,title:"Odłącz wejścia",instruction:"Wycisz powiadomienia. Poczuj oddech i stabilną pozycję."},
    {seconds:210,title:"Zbierz uwagę",instruction:"Licz wydechy od 1 do 10. Wracaj do początku bez irytacji."},
    {seconds:960,title:"Cicha koncentracja",instruction:"Pozostań przy oddechu lub jednym neutralnym dźwięku. Każde rozproszenie jest kolejnym powtórzeniem treningu."},
    {seconds:180,title:"Przejście do działania",instruction:"Wybierz dokładnie jedno zadanie. Zauważ pierwszy fizyczny krok potrzebny, żeby je rozpocząć."},
    {seconds:60,title:"Start",instruction:"Otwórz oczy. Nie sprawdzaj niczego po drodze — przejdź od razu do zadania."}
  ]},
  {id:"long-30",title:"Długa praktyka",method:"Pełna sesja",minutes:30,icon:"◍",tags:["deep"],desc:"Pełny cykl: oddech, ciało, obserwacja i domknięcie.",phases:[
    {seconds:120,title:"Osadzenie",instruction:"Znajdź stabilną pozycję i pozwól oddechowi zwolnić samodzielnie."},
    {seconds:300,title:"Koncentracja",instruction:"Pracuj z oddechem jako kotwicą. Licz wydechy od 1 do 10, potem zacznij od nowa."},
    {seconds:360,title:"Skan",instruction:"Przenieś uwagę przez całe ciało, bez poprawiania wrażeń."},
    {seconds:720,title:"Otwarta świadomość",instruction:"Puść liczenie. Pozwól, by dźwięki, oddech, ciało i myśli pojawiały się w jednym polu uwagi."},
    {seconds:300,title:"Integracja",instruction:"Wróć do ciała. Zauważ nastrój i energię bez oceniania. Zakończ powoli."}
  ]}
];

const sounds=[
  {id:"rain",name:"Deszcz",note:"prawdziwy deszcz",file:"audio/rain.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/0/0e/Rain_%281%29.ogg"},
  {id:"ocean",name:"Ocean HD",note:"4:47 · 485 kbps · shotgun mic",file:"audio/ocean.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Waves.ogg"},
  {id:"forest",name:"Las",note:"ptaki i naturalne tło",file:"audio/forest.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/3/38/Birds_forest.ogg"},
  {id:"fire",name:"Ogień",note:"palenisko",file:"audio/fire.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/d/d8/Dry_grass_burning_in_open_fireplace.ogg"},
  {id:"wind",name:"Wiatr",note:"naturalny podmuch",file:"audio/wind.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/2/2d/Howling_wind.ogg"},
  {id:"chimes",name:"Dzwonki",note:"metalowe wind chimes",file:"audio/chimes.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/2/28/Windchime.ogg"},\n  {id:"storm",name:"Deszcz + burza",note:"2:14 · 240 kbps · field recording",file:"audio/storm.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/c/cb/Rainthunderandbirds.ogg"}
];

const scenes=[
  {id:"rain-room",name:"Deszcz",note:"warstwowy deszcz",mix:{rain:.48,storm:.28,wind:.05}},
  {id:"night-fire",name:"Wieczór",note:"ogień + wiatr",mix:{fire:.58,wind:.12,chimes:.05}},
  {id:"forest-air",name:"Las",note:"ptaki + powietrze",mix:{forest:.62,wind:.10}},
  {id:"deep-ocean",name:"Ocean",note:"fale + wiatr",mix:{ocean:.65,wind:.08}},
  {id:"temple",name:"Świątynia",note:"wiatr + dzwonki",mix:{wind:.10,chimes:.30}}
];

const frequencies=[
  {id:"174",label:"174 Hz",sub:"czysty ton",hz:174},
  {id:"285",label:"285 Hz",sub:"czysty ton",hz:285},
  {id:"396",label:"396 Hz",sub:"czysty ton",hz:396},
  {id:"432",label:"432 Hz",sub:"czysty ton",hz:432},
  {id:"528",label:"528 Hz",sub:"czysty ton",hz:528},
  {id:"639",label:"639 Hz",sub:"czysty ton",hz:639},
  {id:"741",label:"741 Hz",sub:"czysty ton",hz:741},
  {id:"852",label:"852 Hz",sub:"czysty ton",hz:852},
  {id:"963",label:"963 Hz",sub:"czysty ton",hz:963},
  {id:"delta",label:"Delta 2 Hz",sub:"binaural · baza 160 Hz",base:160,beat:2},
  {id:"theta",label:"Theta 6 Hz",sub:"binaural · baza 180 Hz",base:180,beat:6},
  {id:"alpha",label:"Alpha 10 Hz",sub:"binaural · baza 200 Hz",base:200,beat:10}
];

const breathPatterns=[
  {id:"calm",title:"Spokojny 4–6",desc:"Łagodny rytm: 4 sekundy wdechu, 6 wydechu.",minutes:5,phases:[["Wdech",4,"inhale"],["Wydech",6,"exhale"]]},
  {id:"coherent",title:"Równy 5–5",desc:"Symetryczny, spokojny oddech bez zatrzymania.",minutes:5,phases:[["Wdech",5,"inhale"],["Wydech",5,"exhale"]]},
  {id:"box",title:"Box breathing",desc:"4 wdech • 4 zatrzymanie • 4 wydech • 4 pauza.",minutes:5,phases:[["Wdech",4,"inhale"],["Zatrzymaj",4,"hold"],["Wydech",4,"exhale"],["Pauza",4,"rest"]]},
  {id:"478",title:"4–7–8",desc:"Wolny rytm z dłuższym zatrzymaniem i wydechem.",minutes:4,phases:[["Wdech",4,"inhale"],["Zatrzymaj",7,"hold"],["Wydech",8,"exhale"]]}
];

const programs=[
  {id:"calm7",days:7,title:"7 dni wyciszenia",desc:"Od oddechu i ciała do spokojnej otwartej obserwacji.",sequence:["reset-3","calm-5","cleanse-7","body-12","kindness-10","release-15","open-15"]},
  {id:"focus14",days:14,title:"14 dni koncentracji",desc:"Stopniowo wydłużaj stabilną uwagę przed pracą i nauką.",sequence:["morning-8","focus-10","reset-3","focus-10","morning-8","focus-25","calm-5"]},
  {id:"deep21",days:21,title:"21 dni głębszej praktyki",desc:"Od stabilizacji do dłuższej ciszy i open monitoring.",sequence:["calm-5","body-12","open-15","deep-20","kindness-10","deep-20","long-30"]}
];

let timerMinutes=10;
let player=null;
let playerTick=null;
let breathPlayer=null;
let breathTick=null;
let wakeLock=null;
let deferredInstall=null;
let audioContext=null;
let activeFreq=null;
let sleepState={scene:"rain",timers:[]};

const audios=new Map();
const activeSounds=new Set();
const volumes=loadJSON(STORE.volumes,{});
let masterVolume=Number(localStorage.getItem(STORE.master)||.8);
let settings={...DEFAULT_SETTINGS,...loadJSON(STORE.settings,{})};
let favorites=new Set(loadJSON(STORE.favorites,[]));
let programProgress=loadJSON(STORE.programs,{});
let checkin={mood:null,goal:null,time:null,recommendation:null,preScore:null};
let activeSessionFilter="all";

function loadJSON(key,fallback){
  try{return JSON.parse(localStorage.getItem(key)||"null")??fallback}catch(e){return fallback}
}
function saveJSON(key,value){localStorage.setItem(key,JSON.stringify(value))}
function totalSeconds(session){return session.phases.reduce((sum,p)=>sum+p.seconds,0)}
function formatTime(sec){
  sec=Math.max(0,Math.ceil(sec));
  return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0");
}
function showToast(message){
  const toast=$("#toast");
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer=setTimeout(()=>toast.classList.remove("show"),2300);
}
function ensureAudioContext(){
  audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();
  if(audioContext.state==="suspended")audioContext.resume().catch(()=>{});
  return audioContext;
}
function vibrate(pattern){
  if(settings.haptics&&navigator.vibrate)navigator.vibrate(pattern);
}
function currentHour(){return new Date().getHours()}
function setupHeader(){
  const h=currentHour();
  $("#greetingText").textContent=h<11?"Dzień dobry":h<18?"Dobrego popołudnia":"Dobry wieczór";
  $("#todayDate").textContent=new Date().toLocaleDateString("pl-PL",{weekday:"long",day:"numeric",month:"long"});
}
function customSession(minutes){
  const sec=minutes*60;
  if(sec<=90){
    return {id:"custom",title:"Własny timer",method:"Cicha praktyka",minutes,icon:"○",tags:["deep"],desc:"",phases:[
      {seconds:sec,title:"Zostań przy kotwicy",instruction:"Wybierz oddech, ciało albo dźwięk i wracaj do niego bez pośpiechu."}
    ]};
  }
  return {id:"custom",title:"Własny timer",method:"Cicha praktyka",minutes,icon:"○",tags:["deep"],desc:"",phases:[
    {seconds:30,title:"Wejście",instruction:"Ustaw ciało i znajdź naturalny oddech."},
    {seconds:sec-60,title:"Cisza",instruction:"Pozostań przy wybranej kotwicy. Rozproszenie zauważ i wróć bez oceniania."},
    {seconds:30,title:"Domknięcie",instruction:"Poczuj całe ciało i otoczenie. Zakończ powoli."}
  ]};
}

function renderSessions(){
  const filtered=sessions.filter(session=>{
    if(session.id==="sos-2")return activeSessionFilter==="all"||session.tags.includes(activeSessionFilter);
    if(activeSessionFilter==="all")return true;
    if(activeSessionFilter==="favorite")return favorites.has(session.id);
    return session.tags.includes(activeSessionFilter);
  });
  $("#sessionList").innerHTML=filtered.length?filtered.map(session=>{
    const fav=favorites.has(session.id)?"<span class='favorite-star'>★</span>":"";
    return "<button class='session-card' data-session='"+session.id+"' type='button'>"+
      "<span class='session-icon'>"+session.icon+"</span>"+
      "<span class='session-copy'><strong>"+session.title+fav+"</strong><small>"+session.desc+"</small></span>"+
      "<span class='session-meta'><strong>"+session.minutes+" min</strong><span>"+session.method+"</span></span>"+
      "</button>";
  }).join(""):"<div class='empty-state'>Nie masz jeszcze ulubionych praktyk. Dodaj je gwiazdką w playerze.</div>";
  $$("[data-session]").forEach(button=>button.addEventListener("click",()=>startSession(button.dataset.session)));
}

function chooseRecommendation(){
  if(!checkin.mood||!checkin.goal||!checkin.time){
    $("#recommendationCard").classList.add("hidden");
    $("#recommendationStatus").textContent=(3-[checkin.mood,checkin.goal,checkin.time].filter(Boolean).length)+" kroki";
    return;
  }
  const target=Number(checkin.time);
  const candidates=sessions.filter(s=>s.id!=="sos-2");
  let best=null;
  let bestScore=-999;
  candidates.forEach(session=>{
    let score=0;
    if(session.tags.includes(checkin.goal))score+=12;
    score-=Math.abs(session.minutes-target)*1.2;
    if(checkin.mood==="tense"&&session.tags.includes("calm"))score+=5;
    if(checkin.mood==="busy"&&session.tags.includes("clear"))score+=5;
    if(checkin.mood==="tired"&&session.tags.includes("sleep"))score+=4;
    if(checkin.mood==="good"&&session.tags.includes("deep"))score+=2;
    if(score>bestScore){bestScore=score;best=session}
  });
  checkin.recommendation=best;
  const moodScores={tense:1,busy:2,tired:2,neutral:3,good:4};
  checkin.preScore=moodScores[checkin.mood];
  $("#recommendationTitle").textContent=best.title+" · "+best.minutes+" min";
  $("#recommendationDescription").textContent=best.desc;
  $("#recommendationCard").classList.remove("hidden");
  $("#recommendationStatus").textContent="gotowe";
}
function setupCheckin(){
  $$("#moodChoices [data-mood]").forEach(button=>button.addEventListener("click",()=>{
    $$("#moodChoices .choice-chip").forEach(x=>x.classList.remove("active"));
    button.classList.add("active");
    checkin.mood=button.dataset.mood;
    chooseRecommendation();
  }));
  $$("#goalChoices [data-goal]").forEach(button=>button.addEventListener("click",()=>{
    $$("#goalChoices .choice-chip").forEach(x=>x.classList.remove("active"));
    button.classList.add("active");
    checkin.goal=button.dataset.goal;
    chooseRecommendation();
  }));
  $$("#timeChoices [data-time]").forEach(button=>button.addEventListener("click",()=>{
    $$("#timeChoices .choice-chip").forEach(x=>x.classList.remove("active"));
    button.classList.add("active");
    checkin.time=Number(button.dataset.time);
    chooseRecommendation();
  }));
  $("#startRecommendation").addEventListener("click",()=>{
    if(checkin.recommendation)startSession(checkin.recommendation,{preMood:checkin.preScore});
  });
}

function playGong(count=1,type=settings.gongType){
  if(!settings.gongEnabled)return;
  const ctx=ensureAudioContext();
  const profiles={
    warm:{freq:[196,294,392,588],decay:4.8,level:.105},
    deep:{freq:[110,164.8,220,329.6],decay:6.2,level:.115},
    bright:{freq:[523.25,784.9,1046.5,1567.9],decay:3.2,level:.075}
  };
  const profile=profiles[type]||profiles.warm;
  const master=ctx.createGain();
  master.gain.value=Math.max(.01,settings.gongVolume)*.58;
  master.connect(ctx.destination);
  for(let hit=0;hit<count;hit++){
    const start=ctx.currentTime+hit*.72;
    profile.freq.forEach((freq,index)=>{
      const oscillator=ctx.createOscillator();
      const gain=ctx.createGain();
      oscillator.type=index===0?"sine":"triangle";
      oscillator.frequency.setValueAtTime(freq,start);
      oscillator.detune.setValueAtTime((index-1.5)*2.5,start);
      const peak=profile.level/(1+index*.7);
      gain.gain.setValueAtTime(.0001,start);
      gain.gain.exponentialRampToValueAtTime(peak,start+.025);
      gain.gain.exponentialRampToValueAtTime(.0001,start+profile.decay+index*.22);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(start);
      oscillator.stop(start+profile.decay+1);
    });
  }
  setTimeout(()=>{try{master.disconnect()}catch(e){}},(profile.decay+count)*1000);
}
function syncSettingsUI(){
  $("#gongEnabled").checked=settings.gongEnabled;
  $("#gongType").value=settings.gongType;
  $("#gongVolume").value=settings.gongVolume;
  $("#gongVolumeLabel").textContent=Math.round(settings.gongVolume*100)+"%";
  $("#gongStart").checked=settings.gongStart;
  $("#gongEnd").checked=settings.gongEnd;
  $("#hapticsEnabled").checked=settings.haptics;
  $("#playerGongToggle").classList.toggle("active",settings.gongEnabled);
  $("#playerGongToggle").textContent=settings.gongEnabled?"◉ Gong":"○ Gong";
}
function saveSettings(){
  saveJSON(STORE.settings,settings);
  syncSettingsUI();
}

async function startSession(idOrSession,options={}){
  const session=typeof idOrSession==="string"?sessions.find(s=>s.id===idOrSession):idOrSession;
  if(!session)return;
  ensureAudioContext();
  player={
    session,
    elapsed:0,
    running:true,
    startedAt:Date.now(),
    lastTick:Date.now(),
    lastPhaseIndex:0,
    preMood:options.preMood??checkin.preScore??null,
    programId:options.programId||null
  };
  $("#playerMethod").textContent=session.method;
  $("#playerTitle").textContent=session.title;
  $("#playerDialog").showModal();
  updateFavoriteCurrent();
  updatePlayer();
  if(settings.gongStart)playGong(1);
  clearInterval(playerTick);
  playerTick=setInterval(()=>{
    if(!player)return;
    const now=Date.now();
    if(!player.running){player.lastTick=now;return}
    player.elapsed+=(now-player.lastTick)/1000;
    player.lastTick=now;
    if(player.elapsed>=totalSeconds(player.session)){completeSession();return}
    updatePlayer();
  },200);
  requestWakeLock();
  if("mediaSession" in navigator){
    navigator.mediaSession.metadata=new MediaMetadata({title:session.title,artist:"Still",album:session.method});
    try{
      navigator.mediaSession.setActionHandler("play",()=>togglePlayer(true));
      navigator.mediaSession.setActionHandler("pause",()=>togglePlayer(false));
    }catch(e){}
  }
}
function currentPhaseInfo(){
  let acc=0;
  for(let i=0;i<player.session.phases.length;i++){
    const phase=player.session.phases[i];
    if(player.elapsed<acc+phase.seconds)return {phase,index:i,start:acc,end:acc+phase.seconds};
    acc+=phase.seconds;
  }
  const index=player.session.phases.length-1;
  return {phase:player.session.phases[index],index,start:acc-player.session.phases[index].seconds,end:acc};
}
function updatePlayer(){
  if(!player)return;
  const total=totalSeconds(player.session);
  const left=total-player.elapsed;
  const info=currentPhaseInfo();
  if(info.index!==player.lastPhaseIndex){
    if(player.running&&settings.gongEnabled)playGong(1);
    vibrate(35);
    player.lastPhaseIndex=info.index;
  }
  $("#playerTime").textContent=formatTime(left);
  $("#phaseIndex").textContent="Etap "+(info.index+1)+" z "+player.session.phases.length;
  $("#phaseTitle").textContent=info.phase.title;
  $("#phaseInstruction").textContent=info.phase.instruction;
  $("#phaseRemaining").textContent="etap: "+formatTime(info.end-player.elapsed);
  $("#togglePlayer").textContent=player.running?"Pauza":"Wznów";
  const circumference=2*Math.PI*78;
  $("#ringProgress").style.strokeDasharray=circumference;
  $("#ringProgress").style.strokeDashoffset=circumference*(player.elapsed/total);
}
function togglePlayer(force){
  if(!player)return;
  player.running=typeof force==="boolean"?force:!player.running;
  player.lastTick=Date.now();
  updatePlayer();
}
function jumpPhase(direction){
  if(!player)return;
  const info=currentPhaseInfo();
  if(direction>0){
    player.elapsed=Math.min(totalSeconds(player.session)-.25,info.end+.01);
  }else{
    player.elapsed=info.index>0?info.start-player.session.phases[info.index-1].seconds:0;
  }
  player.lastTick=Date.now();
  updatePlayer();
}
function finishSession(save=false,completed=false){
  if(!player)return;
  clearInterval(playerTick);
  const snapshot=player;
  if(save)addHistory(snapshot.session,{preMood:snapshot.preMood,programId:snapshot.programId});
  player=null;
  releaseWakeLock();
  if($("#playerDialog").open)$("#playerDialog").close();
  if(completed)setTimeout(()=>$("#postSessionDialog").showModal(),850);
}
function completeSession(){
  if(!player)return;
  const programId=player.programId;
  if(settings.gongEnd)playGong(3);
  vibrate([80,70,80]);
  showToast("Sesja ukończona");
  if(programId){
    programProgress[programId]=Math.min((programProgress[programId]||0)+1,programs.find(p=>p.id===programId).days);
    saveJSON(STORE.programs,programProgress);
  }
  finishSession(true,true);
  renderPrograms();
}
function updateFavoriteCurrent(){
  if(!player)return;
  const active=favorites.has(player.session.id);
  $("#favoriteCurrent").textContent=active?"★":"☆";
  $("#favoriteCurrent").setAttribute("aria-label",active?"Usuń z ulubionych":"Dodaj do ulubionych");
}
function toggleFavoriteCurrent(){
  if(!player||player.session.id==="custom")return;
  if(favorites.has(player.session.id))favorites.delete(player.session.id);else favorites.add(player.session.id);
  saveJSON(STORE.favorites,[...favorites]);
  updateFavoriteCurrent();
  renderSessions();
  showToast(favorites.has(player.session.id)?"Dodano do ulubionych":"Usunięto z ulubionych");
}

function addHistory(session,extra={}){
  const history=getHistory();
  history.unshift({
    id:session.id,
    title:session.title,
    minutes:session.minutes||Math.round(totalSeconds(session)/60),
    date:new Date().toISOString(),
    preMood:extra.preMood??null,
    postMood:null,
    programId:extra.programId||null
  });
  saveJSON(STORE.history,history.slice(0,250));
  renderProgress();
}
function getHistory(){return loadJSON(STORE.history,[])}
function calcStreak(history){
  const days=[...new Set(history.map(h=>h.date.slice(0,10)))].sort().reverse();
  if(!days.length)return 0;
  const today=new Date();today.setHours(0,0,0,0);
  const latest=new Date(days[0]+"T00:00:00");
  const gap=Math.round((today-latest)/86400000);
  if(gap>1)return 0;
  let streak=1;
  for(let i=1;i<days.length;i++){
    const a=new Date(days[i-1]+"T00:00:00");
    const b=new Date(days[i]+"T00:00:00");
    if(Math.round((a-b)/86400000)===1)streak++;else break;
  }
  return streak;
}
function localDayKey(date){return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0")}
function lastSevenDays(){
  const arr=[];
  for(let i=6;i>=0;i--){
    const d=new Date();
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()-i);
    arr.push(d);
  }
  return arr;
}
function renderProgress(){
  const history=getHistory();
  const total=history.reduce((sum,h)=>sum+(h.minutes||0),0);
  $("#statSessions").textContent=history.length;
  $("#statMinutes").textContent=total;
  $("#statStreak").textContent=calcStreak(history);
  $("#statAverage").textContent=history.length?Math.round(total/history.length):0;

  const week=lastSevenDays();
  const totals=week.map(day=>history.filter(h=>h.date.slice(0,10)===localDayKey(day)).reduce((s,h)=>s+(h.minutes||0),0));
  const max=Math.max(...totals,1);
  $("#weekMinutes").textContent=totals.reduce((a,b)=>a+b,0)+" min";
  $("#weeklyBars").innerHTML=week.map((day,index)=>
    "<div class='week-bar'><div class='week-bar-track'><span class='week-bar-fill' style='height:"+Math.max(2,(totals[index]/max)*100)+"%'></span></div><small>"+
    day.toLocaleDateString("pl-PL",{weekday:"narrow"})+"</small></div>"
  ).join("");

  $("#weekStrip").innerHTML=week.map((day,index)=>
    "<div class='week-day "+(totals[index]>0?"done":"")+"'><span>"+(totals[index]>0?"✓":day.getDate())+"</span><small>"+day.toLocaleDateString("pl-PL",{weekday:"narrow"})+"</small></div>"
  ).join("");

  const moodEntries=history.filter(h=>Number.isFinite(Number(h.postMood))).slice(0,7).reverse();
  const deltas=history.filter(h=>h.preMood&&h.postMood).map(h=>Number(h.postMood)-Number(h.preMood));
  if(deltas.length){
    const avg=deltas.reduce((a,b)=>a+b,0)/deltas.length;
    $("#moodTrend").textContent=(avg>0?"+":"")+avg.toFixed(1)+" pkt";
  }else $("#moodTrend").textContent="brak danych";
  $("#moodHistory").innerHTML=moodEntries.length?moodEntries.map(h=>
    "<div class='mood-point'><span class='mood-dot'>"+h.postMood+"/5</span><small>"+new Date(h.date).toLocaleDateString("pl-PL",{day:"2-digit",month:"2-digit"})+"</small></div>"
  ).join(""):"<div class='empty-state'>Po zakończeniu sesji możesz dodać ocenę 1–5.</div>";

  $("#historyList").innerHTML=history.length?history.slice(0,10).map(h=>
    "<div class='history-item'><div><strong>"+h.title+"</strong><span> · "+h.minutes+" min</span></div><span>"+
    new Date(h.date).toLocaleDateString("pl-PL",{day:"2-digit",month:"short"})+"</span></div>"
  ).join(""):"<div class='empty-state'>Po ukończeniu pierwszej sesji zobaczysz ją tutaj.</div>";

  if(history.length){
    $("#todayPracticeTitle").textContent=history[0].title;
    $("#todayPracticeCopy").textContent="Ostatnia praktyka: "+history[0].minutes+" min. Łącznie masz już "+total+" minut.";
  }
}
function savePostMood(score){
  const history=getHistory();
  if(!history.length)return;
  history[0].postMood=Number(score);
  saveJSON(STORE.history,history);
  renderProgress();
  showToast("Check-in zapisany lokalnie");
}

function getAudio(sound){
  if(audios.has(sound.id))return audios.get(sound.id);
  const audio=new Audio();
  audio.loop=true;
  audio.preload="none";
  audio.volume=(Number(volumes[sound.id]??.45))*masterVolume;
  let fallback=false;
  audio.src=sound.file;
  audio.addEventListener("error",()=>{
    if(fallback)return;
    fallback=true;
    audio.src=sound.remote;
    if(activeSounds.has(sound.id))audio.play().catch(()=>showToast("Dotknij ponownie, aby uruchomić audio"));
  });
  audios.set(sound.id,audio);
  return audio;
}
function syncAudioVolumes(){
  sounds.forEach(sound=>{
    const audio=audios.get(sound.id);
    if(audio)audio.volume=Math.max(0,Math.min(1,Number(volumes[sound.id]??.45)*masterVolume));
  });
}
function renderSounds(){
  $("#masterVolume").value=masterVolume;
  $("#soundList").innerHTML=sounds.map(sound=>
    "<div class='sound-card "+(activeSounds.has(sound.id)?"active":"")+"' data-sound-card='"+sound.id+"'>"+
    "<div class='sound-card-top'><div><strong>"+sound.name+"</strong><small>"+sound.note+"</small></div>"+
    "<button class='sound-toggle' data-sound-toggle='"+sound.id+"' aria-label='Włącz "+sound.name+"'>"+(activeSounds.has(sound.id)?"Ⅱ":"▶")+"</button></div>"+
    "<label class='volume-row'><span>głoś.</span><input data-volume='"+sound.id+"' type='range' min='0' max='1' step='0.01' value='"+(volumes[sound.id]??.45)+"'></label></div>"
  ).join("");
  $$("[data-sound-toggle]").forEach(button=>button.addEventListener("click",()=>toggleSound(button.dataset.soundToggle)));
  $$("[data-volume]").forEach(range=>range.addEventListener("input",()=>{
    const id=range.dataset.volume;
    volumes[id]=Number(range.value);
    saveJSON(STORE.volumes,volumes);
    syncAudioVolumes();
  }));
}
async function toggleSound(id){
  const sound=sounds.find(s=>s.id===id);
  const audio=getAudio(sound);
  if(activeSounds.has(id)){
    activeSounds.delete(id);
    audio.pause();
  }else{
    activeSounds.add(id);
    try{await audio.play()}catch(e){showToast("Audio uruchomi się po ponownym dotknięciu")}
  }
  renderSounds();
}
function stopAllSounds(){
  activeSounds.forEach(id=>{const audio=audios.get(id);if(audio)audio.pause()});
  activeSounds.clear();
  renderSounds();
  $$(".scene-button").forEach(x=>x.classList.remove("active"));
}
async function applyScene(sceneId){
  const scene=scenes.find(s=>s.id===sceneId);
  if(!scene)return;
  stopAllSounds();
  Object.entries(scene.mix).forEach(([id,value])=>{volumes[id]=value});
  saveJSON(STORE.volumes,volumes);
  for(const id of Object.keys(scene.mix)){
    const sound=sounds.find(s=>s.id===id);
    const audio=getAudio(sound);
    activeSounds.add(id);
    try{await audio.play()}catch(e){}
  }
  renderSounds();
  $$(".scene-button").forEach(x=>x.classList.toggle("active",x.dataset.scene===sceneId));
  showToast("Scena: "+scene.name);
}
function renderScenes(){
  $("#scenePresets").innerHTML=scenes.map(scene=>
    "<button class='scene-button' data-scene='"+scene.id+"' type='button'><strong>"+scene.name+"</strong><small>"+scene.note+"</small></button>"
  ).join("");
  $$("[data-scene]").forEach(button=>button.addEventListener("click",()=>applyScene(button.dataset.scene)));
}
function saveUserPreset(){
  const mix={};
  activeSounds.forEach(id=>mix[id]=Number(volumes[id]??.45));
  if(!Object.keys(mix).length){showToast("Najpierw uruchom przynajmniej jeden dźwięk");return}
  saveJSON(STORE.preset,{mix,master:masterVolume});
  showToast("Twój miks zapisany");
}
async function loadUserPreset(){
  const preset=loadJSON(STORE.preset,null);
  if(!preset){showToast("Nie masz jeszcze zapisanego miksu");return}
  stopAllSounds();
  masterVolume=Number(preset.master??.8);
  localStorage.setItem(STORE.master,String(masterVolume));
  for(const [id,value] of Object.entries(preset.mix||{})){
    volumes[id]=Number(value);
    const sound=sounds.find(s=>s.id===id);
    if(!sound)continue;
    activeSounds.add(id);
    const audio=getAudio(sound);
    try{await audio.play()}catch(e){}
  }
  saveJSON(STORE.volumes,volumes);
  renderSounds();
  showToast("Wczytano Twój miks");
}

function renderFrequencies(){
  $("#frequencyList").innerHTML=frequencies.map(f=>
    "<button class='freq-card "+(activeFreq&&activeFreq.id===f.id?"active":"")+"' data-freq='"+f.id+"' type='button'><strong>"+f.label+"</strong><small>"+f.sub+"</small></button>"
  ).join("");
  $$("[data-freq]").forEach(button=>button.addEventListener("click",()=>toggleFrequency(button.dataset.freq)));
}
function stopFrequency(){
  if(activeFreq){
    activeFreq.nodes.forEach(node=>{
      try{node.stop&&node.stop()}catch(e){}
      try{node.disconnect&&node.disconnect()}catch(e){}
    });
    activeFreq=null;
  }
  renderFrequencies();
}
async function toggleFrequency(id){
  if(activeFreq&&activeFreq.id===id){stopFrequency();return}
  stopFrequency();
  const f=frequencies.find(x=>x.id===id);
  const ctx=ensureAudioContext();
  await ctx.resume();
  const master=ctx.createGain();
  master.gain.value=.028;
  master.connect(ctx.destination);
  const nodes=[master];
  if(f.hz){
    const oscillator=ctx.createOscillator();
    oscillator.type="sine";
    oscillator.frequency.value=f.hz;
    oscillator.connect(master);
    oscillator.start();
    nodes.push(oscillator);
  }else{
    const merger=ctx.createChannelMerger(2);
    merger.connect(master);
    nodes.push(merger);
    [f.base-f.beat/2,f.base+f.beat/2].forEach((hz,index)=>{
      const oscillator=ctx.createOscillator();
      const gain=ctx.createGain();
      oscillator.type="sine";
      oscillator.frequency.value=hz;
      gain.gain.value=.68;
      oscillator.connect(gain);
      gain.connect(merger,0,index);
      oscillator.start();
      nodes.push(oscillator,gain);
    });
  }
  activeFreq={id,nodes};
  renderFrequencies();
}

function renderBreaths(){
  $("#breathList").innerHTML=breathPatterns.map(pattern=>
    "<button class='breath-card' data-breath='"+pattern.id+"' type='button'><span class='breath-card-icon'>◌</span><strong>"+
    pattern.title+"</strong><small>"+pattern.desc+"</small></button>"
  ).join("");
  $$("[data-breath]").forEach(button=>button.addEventListener("click",()=>startBreath(button.dataset.breath)));
}
function startBreath(id){
  const pattern=breathPatterns.find(p=>p.id===id);
  if(!pattern)return;
  ensureAudioContext();
  breathPlayer={pattern,total:pattern.minutes*60,elapsed:0,running:true,lastTick:Date.now(),lastPhaseKey:""};
  $("#breathTitle").textContent=pattern.title;
  $("#breathDescription").textContent=pattern.desc;
  $("#breathDialog").showModal();
  updateBreath();
  clearInterval(breathTick);
  breathTick=setInterval(()=>{
    if(!breathPlayer)return;
    const now=Date.now();
    if(!breathPlayer.running){breathPlayer.lastTick=now;return}
    breathPlayer.elapsed+=(now-breathPlayer.lastTick)/1000;
    breathPlayer.lastTick=now;
    if(breathPlayer.elapsed>=breathPlayer.total){finishBreath(true);return}
    updateBreath();
  },100);
  requestWakeLock();
}
function breathPhaseInfo(){
  const phases=breathPlayer.pattern.phases;
  const cycle=phases.reduce((s,p)=>s+p[1],0);
  let position=breathPlayer.elapsed%cycle;
  for(let i=0;i<phases.length;i++){
    const phase=phases[i];
    if(position<phase[1])return {label:phase[0],duration:phase[1],type:phase[2],position,index:i};
    position-=phase[1];
  }
  return {label:phases[0][0],duration:phases[0][1],type:phases[0][2],position:0,index:0};
}
function updateBreath(){
  if(!breathPlayer)return;
  const info=breathPhaseInfo();
  const key=info.index+"-"+Math.floor(breathPlayer.elapsed/(breathPlayer.pattern.phases.reduce((s,p)=>s+p[1],0)));
  if(key!==breathPlayer.lastPhaseKey){
    if(breathPlayer.lastPhaseKey)vibrate(25);
    breathPlayer.lastPhaseKey=key;
  }
  $("#breathCue").textContent=info.label;
  $("#breathCount").textContent=Math.max(1,Math.ceil(info.duration-info.position));
  $("#breathElapsed").textContent=formatTime(breathPlayer.elapsed);
  $("#breathTotal").textContent=formatTime(breathPlayer.total);
  $("#toggleBreath").textContent=breathPlayer.running?"Pauza":"Wznów";
  const orb=$("#breathOrb");
  orb.classList.remove("inhale","hold","exhale","rest");
  orb.classList.add(info.type);
}
function toggleBreath(){
  if(!breathPlayer)return;
  breathPlayer.running=!breathPlayer.running;
  breathPlayer.lastTick=Date.now();
  updateBreath();
}
function changeBreathMinutes(delta){
  if(!breathPlayer)return;
  breathPlayer.total=Math.max(60,Math.min(1800,breathPlayer.total+delta*60));
  if(breathPlayer.elapsed>=breathPlayer.total)breathPlayer.elapsed=Math.max(0,breathPlayer.total-1);
  updateBreath();
}
function finishBreath(completed=false){
  clearInterval(breathTick);
  if(completed){
    playGong(1);
    vibrate([50,50,50]);
    addHistory({id:"breath-"+breathPlayer.pattern.id,title:"Oddech — "+breathPlayer.pattern.title,minutes:Math.round(breathPlayer.total/60)});
  }
  breathPlayer=null;
  releaseWakeLock();
  if($("#breathDialog").open)$("#breathDialog").close();
}

function renderPrograms(){
  $("#programList").innerHTML=programs.map(program=>{
    const done=Math.min(programProgress[program.id]||0,program.days);
    const pct=Math.round((done/program.days)*100);
    const complete=done>=program.days;
    return "<article class='program-card'><div class='program-top'><div><div class='eyebrow'>"+program.days+" dni</div><h3>"+program.title+"</h3><p>"+program.desc+
      "</p></div><span class='status-pill'>"+done+"/"+program.days+"</span></div><div class='program-progress'><span style='width:"+pct+"%'></span></div>"+
      "<div class='program-footer'><small>"+(complete?"Program ukończony":"Następny dzień: "+(done+1))+"</small><button class='secondary-button small' data-program='"+program.id+"' type='button'>"+
      (complete?"Powtórz":"Start")+"</button></div></article>";
  }).join("");
  $$("[data-program]").forEach(button=>button.addEventListener("click",()=>startProgram(button.dataset.program)));
}
function startProgram(id){
  const program=programs.find(p=>p.id===id);
  if(!program)return;
  let done=programProgress[id]||0;
  if(done>=program.days)done=0;
  const sessionId=program.sequence[done%program.sequence.length];
  startSession(sessionId,{programId:id});
}

function startSleepMode(){
  $("#sleepDialog").showModal();
}
async function startSleepAudio(){
  clearSleepTimers();
  const minutes=Number($("#sleepMinutes").value);
  const sceneMap={
    rain:{rain:.48,storm:.26,wind:.04},
    ocean:{ocean:.68,wind:.05},
    fire:{fire:.58,wind:.05}
  };
  stopAllSounds();
  const mix=sceneMap[sleepState.scene]||sceneMap.rain;
  Object.entries(mix).forEach(([id,value])=>volumes[id]=value);
  for(const id of Object.keys(mix)){
    activeSounds.add(id);
    const sound=sounds.find(s=>s.id===id);
    try{await getAudio(sound).play()}catch(e){}
  }
  renderSounds();
  const originalMaster=masterVolume;
  const fadeStart=Math.max(0,(minutes-5)*60000);
  const fadeTimer=setTimeout(()=>{
    let steps=60;
    let current=0;
    const interval=setInterval(()=>{
      current++;
      masterVolume=Math.max(0,originalMaster*(1-current/steps));
      $("#masterVolume").value=masterVolume;
      syncAudioVolumes();
      if(current>=steps){
        clearInterval(interval);
        stopAllSounds();
        masterVolume=originalMaster;
        $("#masterVolume").value=masterVolume;
        syncAudioVolumes();
      }
    },5000);
    sleepState.timers.push(interval);
  },fadeStart);
  sleepState.timers.push(fadeTimer);
  $("#sleepDialog").close();
  showToast("Sleep mode: dźwięk wygaśnie za "+minutes+" min");
}
function clearSleepTimers(){
  sleepState.timers.forEach(id=>{clearTimeout(id);clearInterval(id)});
  sleepState.timers=[];
}

async function requestWakeLock(){
  try{if("wakeLock" in navigator)wakeLock=await navigator.wakeLock.request("screen")}catch(e){}
}
function releaseWakeLock(){
  try{wakeLock&&wakeLock.release()}catch(e){}
  wakeLock=null;
}

function exportData(){
  const data={version:2,exportedAt:new Date().toISOString(),storage:{}};
  Object.values(STORE).forEach(key=>{if(localStorage.getItem(key)!==null)data.storage[key]=localStorage.getItem(key)});
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download="still-backup-"+new Date().toISOString().slice(0,10)+".json";
  a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function importDataFile(file){
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const data=JSON.parse(reader.result);
      if(!data.storage||typeof data.storage!=="object")throw new Error("invalid");
      Object.entries(data.storage).forEach(([key,value])=>{
        if(Object.values(STORE).includes(key))localStorage.setItem(key,String(value));
      });
      showToast("Dane zaimportowane — odświeżam");
      setTimeout(()=>location.reload(),800);
    }catch(e){showToast("Nieprawidłowy plik kopii")}
  };
  reader.readAsText(file);
}

function navObserver(){
  const links=[...$$(".bottom-nav a"),...$$(".side-nav a")];
  const sectionIds=[...new Set(links.map(a=>a.getAttribute("href")).filter(Boolean))];
  const sections=sectionIds.map(id=>$(id)).filter(Boolean);
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
    }
  }),{rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(section=>observer.observe(section));
}

function setupEvents(){
  $("#minusMinute").addEventListener("click",()=>{timerMinutes=Math.max(1,timerMinutes-1);$("#timerMinutes").textContent=timerMinutes});
  $("#plusMinute").addEventListener("click",()=>{timerMinutes=Math.min(90,timerMinutes+1);$("#timerMinutes").textContent=timerMinutes});
  $("#startCustomTimer").addEventListener("click",()=>startSession(customSession(timerMinutes)));

  $("#sosButton").addEventListener("click",()=>startSession("sos-2",{preMood:1}));
  $("#sleepShortcut").addEventListener("click",startSleepMode);
  $("#startSleepMeditation").addEventListener("click",()=>{$("#sleepDialog").close();startSession("sleep-10")});
  $("#startSleepAudio").addEventListener("click",startSleepAudio);
  $("#closeSleep").addEventListener("click",()=>$("#sleepDialog").close());
  $$(".sleep-scene").forEach(button=>button.addEventListener("click",()=>{
    $$(".sleep-scene").forEach(x=>x.classList.remove("active"));
    button.classList.add("active");
    sleepState.scene=button.dataset.sleepScene;
  }));

  $$("#sessionFilters [data-filter]").forEach(button=>button.addEventListener("click",()=>{
    $$("#sessionFilters .filter-chip").forEach(x=>x.classList.remove("active"));
    button.classList.add("active");
    activeSessionFilter=button.dataset.filter;
    renderSessions();
  }));

  $("#tutorialButton").addEventListener("click",()=>$("#tutorialDialog").showModal());
  $("#desktopTutorialButton").addEventListener("click",()=>$("#tutorialDialog").showModal());
  $("#settingsButton").addEventListener("click",()=>{$("#settingsDialog").showModal();syncSettingsUI()});\n  $("#mobileSettingsButton").addEventListener("click",()=>{$("#settingsDialog").showModal();syncSettingsUI()});

  $("#gongEnabled").addEventListener("change",e=>{settings.gongEnabled=e.target.checked;saveSettings()});
  $("#gongType").addEventListener("change",e=>{settings.gongType=e.target.value;saveSettings()});
  $("#gongVolume").addEventListener("input",e=>{settings.gongVolume=Number(e.target.value);saveSettings()});
  $("#gongStart").addEventListener("change",e=>{settings.gongStart=e.target.checked;saveSettings()});
  $("#gongEnd").addEventListener("change",e=>{settings.gongEnd=e.target.checked;saveSettings()});
  $("#hapticsEnabled").addEventListener("change",e=>{settings.haptics=e.target.checked;saveSettings()});
  $("#testGong").addEventListener("click",()=>{ensureAudioContext();playGong(1)});

  $("#togglePlayer").addEventListener("click",()=>togglePlayer());
  $("#previousPhase").addEventListener("click",()=>jumpPhase(-1));
  $("#nextPhase").addEventListener("click",()=>jumpPhase(1));
  $("#finishSession").addEventListener("click",()=>finishSession(false,false));
  $("#closePlayer").addEventListener("click",()=>finishSession(false,false));
  $("#favoriteCurrent").addEventListener("click",toggleFavoriteCurrent);
  $("#playerDialog").addEventListener("cancel",e=>{e.preventDefault();finishSession(false,false)});
  $("#playerGongToggle").addEventListener("click",()=>{settings.gongEnabled=!settings.gongEnabled;saveSettings();showToast(settings.gongEnabled?"Gong włączony":"Gong wyłączony")});
  $("#playerSoundShortcut").addEventListener("click",()=>{finishSession(false,false);location.hash="sounds";showToast("Sesja zamknięta — ustaw dźwięk i uruchom ponownie")});

  $("#stopAllSounds").addEventListener("click",stopAllSounds);
  $("#savePreset").addEventListener("click",saveUserPreset);
  $("#loadPreset").addEventListener("click",loadUserPreset);
  $("#masterVolume").addEventListener("input",e=>{
    masterVolume=Number(e.target.value);
    localStorage.setItem(STORE.master,String(masterVolume));
    syncAudioVolumes();
  });
  $("#stopFrequency").addEventListener("click",stopFrequency);

  $("#closeBreath").addEventListener("click",()=>finishBreath(false));
  $("#toggleBreath").addEventListener("click",toggleBreath);
  $("#breathMinus").addEventListener("click",()=>changeBreathMinutes(-1));
  $("#breathPlus").addEventListener("click",()=>changeBreathMinutes(1));
  $("#breathDialog").addEventListener("cancel",e=>{e.preventDefault();finishBreath(false)});

  $("#clearHistory").addEventListener("click",()=>{
    localStorage.removeItem(STORE.history);
    renderProgress();
    showToast("Historia wyczyszczona");
  });
  $$("#postMoodChoices [data-score]").forEach(button=>button.addEventListener("click",()=>savePostMood(button.dataset.score)));

  $("#exportData").addEventListener("click",exportData);
  $("#importData").addEventListener("change",e=>importDataFile(e.target.files&&e.target.files[0]));

  window.addEventListener("beforeinstallprompt",event=>{
    event.preventDefault();
    deferredInstall=event;
    $("#installButton").classList.remove("hidden");
    $("#desktopInstallButton").classList.remove("hidden");
  });
  const install=async()=>{
    if(!deferredInstall)return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall=null;
    $("#installButton").classList.add("hidden");
    $("#desktopInstallButton").classList.add("hidden");
  };
  $("#installButton").addEventListener("click",install);
  $("#desktopInstallButton").addEventListener("click",install);

  document.addEventListener("visibilitychange",()=>{
    if(document.visibilityState==="visible"&&(player&&player.running||breathPlayer&&breathPlayer.running))requestWakeLock();
  });
}

function init(){
  setupHeader();
  renderSessions();
  renderBreaths();
  renderScenes();
  renderSounds();
  renderFrequencies();
  renderPrograms();
  renderProgress();
  syncSettingsUI();
  setupCheckin();
  setupEvents();
  navObserver();
  if(!localStorage.getItem(STORE.tutorial)){
    setTimeout(()=>$("#tutorialDialog").showModal(),550);
    localStorage.setItem(STORE.tutorial,"1");
  }
  if("serviceWorker" in navigator){
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
  }
}
init();