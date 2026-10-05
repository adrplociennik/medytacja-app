const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const STORE={history:"still.history.v1",tutorial:"still.tutorial.v1",volumes:"still.volumes.v1"};
const sessions=[
{id:"reset-3",title:"Szybki reset",method:"Mindful breathing",minutes:3,icon:"○",desc:"Krótki powrót do oddechu i ciała.",phases:[
{seconds:30,title:"Ustaw pozycję",instruction:"Usiądź stabilnie. Rozluźnij szczękę, barki i dłonie."},
{seconds:60,title:"Poczuj oddech",instruction:"Nie poprawiaj oddechu. Zauważ, gdzie czujesz go najwyraźniej."},
{seconds:60,title:"Wróć do kotwicy",instruction:"Kiedy pojawi się myśl, zauważ ją i łagodnie wróć do kolejnego oddechu."},
{seconds:30,title:"Zamknij praktykę",instruction:"Poczuj całe ciało i otoczenie. Zrób jeden spokojny, pełny wydech."}]},
{id:"cleanse-7",title:"Oczyszczająca",method:"Oddech + body scan",minutes:7,icon:"◇",desc:"Oddech, napięcie i świadome puszczanie.",phases:[
{seconds:60,title:"Zwolnij",instruction:"Wydłuż wydech bez forsowania. Daj ciału sygnał, że niczego nie musi teraz robić."},
{seconds:90,title:"Zauważ napięcie",instruction:"Przejdź uwagą przez twarz, szyję, barki i brzuch. Niczego nie zmieniaj na siłę."},
{seconds:150,title:"Skan ciała",instruction:"Powoli przesuwaj uwagę od głowy do stóp. Przy każdym wydechu pozwól jednej części ciała odpuścić."},
{seconds:90,title:"Nazwij i puść",instruction:"Jeśli coś wraca w myślach, nazwij to jednym słowem: plan, wspomnienie, napięcie. Potem wróć do ciała."},
{seconds:30,title:"Koniec",instruction:"Zauważ trzy dźwięki wokół siebie i otwórz oczy w swoim tempie."}]},
{id:"body-12",title:"Skan ciała",method:"Body scan",minutes:12,icon:"⌁",desc:"Systematyczne kierowanie uwagi przez ciało.",phases:[
{seconds:60,title:"Kontakt z podłożem",instruction:"Poczuj punkty podparcia. Pozwól ciężarowi ciała opaść."},
{seconds:120,title:"Oddech",instruction:"Zauważ ruch brzucha i klatki piersiowej bez sterowania."},
{seconds:420,title:"Pełny skan",instruction:"Idź powoli: twarz, szyja, barki, ramiona, dłonie, klatka, brzuch, miednica, nogi i stopy."},
{seconds:120,title:"Całe ciało",instruction:"Porzuć skanowanie punkt po punkcie. Poczuj całe ciało jako jedną przestrzeń doznań."}]},
{id:"kindness-10",title:"Życzliwość",method:"Loving-kindness",minutes:10,icon:"♡",desc:"Praktyka życzliwości wobec siebie i innych.",phases:[
{seconds:60,title:"Uspokój rytm",instruction:"Poczuj oddech i ciężar ciała. Nie próbuj wywoływać konkretnego nastroju."},
{seconds:150,title:"Dla siebie",instruction:"W myślach powtarzaj: niech będę bezpieczny, spokojny i życzliwy dla siebie."},
{seconds:240,title:"Dla innych",instruction:"Pomyśl o bliskiej osobie, później o kimś neutralnym. Skieruj do nich tę samą intencję życzliwości."},
{seconds:120,title:"Szerzej",instruction:"Rozszerz intencję na ludzi, których dziś spotkasz — bez potrzeby czucia czegokolwiek szczególnego."},
{seconds:30,title:"Powrót",instruction:"Wróć do oddechu i zakończ bez oceniania, czy praktyka była udana."}]},
{id:"open-15",title:"Otwarta obserwacja",method:"Open monitoring",minutes:15,icon:"◎",desc:"Mniej sterowania, więcej zauważania.",phases:[
{seconds:90,title:"Kotwica",instruction:"Przez chwilę zostań przy oddechu, żeby ustabilizować uwagę."},
{seconds:180,title:"Otwórz pole",instruction:"Pozwól uwadze obejmować dźwięki, ciało, oddech i myśli bez wybierania jednego obiektu."},
{seconds:480,title:"Obserwuj zmianę",instruction:"Zauważaj, jak wrażenia pojawiają się i znikają. Nie zatrzymuj żadnego z nich."},
{seconds:150,title:"Domknięcie",instruction:"Zawęź uwagę ponownie do oddechu i całego ciała."}]},
{id:"deep-20",title:"Głęboka medytacja",method:"Oddech + body scan + cisza",minutes:20,icon:"●",desc:"Dłuższa sesja z etapem cichej obserwacji.",phases:[
{seconds:90,title:"Wejście",instruction:"Ustaw ciało wygodnie i stabilnie. Zauważ naturalny rytm oddechu."},
{seconds:180,title:"Stabilizacja",instruction:"Zostań przy jednym miejscu oddechu: nos, klatka albo brzuch."},
{seconds:300,title:"Ciało",instruction:"Skanuj ciało spokojnie. Zauważ napięcie, temperaturę, pulsowanie i kontakt z podłożem."},
{seconds:480,title:"Cisza",instruction:"Pozostań z otwartą świadomością. Gdy odpłyniesz, wróć na kilka oddechów do kotwicy."},
{seconds:150,title:"Powrót",instruction:"Poszerz uwagę na całe ciało i pokój. Nie wstawaj natychmiast."}]},
{id:"long-30",title:"Długa praktyka",method:"Pełna sesja",minutes:30,icon:"◉",desc:"Pełny cykl: oddech, ciało, obserwacja i domknięcie.",phases:[
{seconds:120,title:"Osadzenie",instruction:"Znajdź stabilną pozycję i pozwól oddechowi zwolnić samodzielnie."},
{seconds:300,title:"Koncentracja",instruction:"Pracuj z oddechem jako kotwicą. Licz wydechy od 1 do 10, potem zacznij od nowa."},
{seconds:360,title:"Skan",instruction:"Przenieś uwagę przez całe ciało, bez poprawiania wrażeń."},
{seconds:720,title:"Otwarta świadomość",instruction:"Puść liczenie. Pozwól, by dźwięki, oddech, ciało i myśli pojawiały się w jednym polu uwagi."},
{seconds:300,title:"Integracja",instruction:"Wróć do ciała. Zauważ nastrój i energię bez oceniania. Zakończ powoli."}]}
];
const sounds=[
{id:"rain",name:"Deszcz",note:"prawdziwy deszcz",file:"audio/rain.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/0/0e/Rain_%281%29.ogg"},
{id:"ocean",name:"Ocean",note:"fale i strumień",file:"audio/ocean.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/6/64/Ocean_Waves_on_a_Tropical_Beach.ogg"},
{id:"forest",name:"Las",note:"ptaki Fontainebleau",file:"audio/forest.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/3/38/Birds_forest.ogg"},
{id:"fire",name:"Ogień",note:"palenisko",file:"audio/fire.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/d/d8/Dry_grass_burning_in_open_fireplace.ogg"},
{id:"wind",name:"Wiatr",note:"naturalny podmuch",file:"audio/wind.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/2/2d/Howling_wind.ogg"},
{id:"chimes",name:"Dzwonki",note:"metalowe wind chimes",file:"audio/chimes.ogg",remote:"https://upload.wikimedia.org/wikipedia/commons/2/28/Windchime.ogg"}
];
const frequencies=[
{id:"432",label:"432 Hz",sub:"czysty ton",hz:432},
{id:"528",label:"528 Hz",sub:"czysty ton",hz:528},
{id:"alpha",label:"Alpha 10 Hz",sub:"binaural · baza 200 Hz",base:200,beat:10},
{id:"theta",label:"Theta 6 Hz",sub:"binaural · baza 180 Hz",base:180,beat:6}
];
let timerMinutes=10,player=null,tick=null,wakeLock=null,deferredInstall=null,audioContext=null,activeFreq=null;
const audios=new Map(),activeSounds=new Set();
const volumes=JSON.parse(localStorage.getItem(STORE.volumes)||"{}");
function totalSeconds(session){return session.phases.reduce((a,p)=>a+p.seconds,0)}
function formatTime(sec){sec=Math.max(0,Math.ceil(sec));return String(Math.floor(sec/60)).padStart(2,"0")+":"+String(sec%60).padStart(2,"0")}
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),2200)}
function renderSessions(){const list=$("#sessionList");list.innerHTML=sessions.map(s=>`<button class="session-card" data-session="${s.id}"><span class="session-icon">${s.icon}</span><span class="session-copy"><strong>${s.title}</strong><small>${s.desc}</small></span><span class="session-meta"><strong>${s.minutes} min</strong><span>${s.method}</span></span></button>`).join("");$$("[data-session]").forEach(b=>b.addEventListener("click",()=>startSession(b.dataset.session)))}
function getAudio(sound){if(audios.has(sound.id))return audios.get(sound.id);const a=new Audio();a.loop=true;a.preload="none";a.volume=Number(volumes[sound.id]??0.45);let fallback=false;a.src=sound.file;a.addEventListener("error",()=>{if(fallback)return;fallback=true;a.src=sound.remote;if(activeSounds.has(sound.id))a.play().catch(()=>showToast("Dotknij ponownie, aby uruchomić audio"))});audios.set(sound.id,a);return a}
function renderSounds(){const root=$("#soundList");root.innerHTML=sounds.map(s=>`<div class="sound-card" data-sound-card="${s.id}"><div class="sound-card-top"><div><strong>${s.name}</strong><small>${s.note}</small></div><button class="sound-toggle" data-sound-toggle="${s.id}" aria-label="Włącz ${s.name}">▶</button></div><label class="volume-row"><span>głoś.</span><input data-volume="${s.id}" type="range" min="0" max="1" step="0.01" value="${volumes[s.id]??0.45}"></label></div>`).join("");
$$("[data-sound-toggle]").forEach(b=>b.addEventListener("click",()=>toggleSound(b.dataset.soundToggle)));
$$("[data-volume]").forEach(r=>r.addEventListener("input",()=>{const id=r.dataset.volume;volumes[id]=r.value;localStorage.setItem(STORE.volumes,JSON.stringify(volumes));const a=audios.get(id);if(a)a.volume=Number(r.value)}))}
async function toggleSound(id){const sound=sounds.find(s=>s.id===id),audio=getAudio(sound),card=$(`[data-sound-card="${id}"]`),btn=$(`[data-sound-toggle="${id}"]`);if(activeSounds.has(id)){activeSounds.delete(id);audio.pause();card.classList.remove("active");btn.textContent="▶"}else{activeSounds.add(id);card.classList.add("active");btn.textContent="Ⅱ";try{await audio.play()}catch(e){showToast("Audio uruchomi się po ponownym dotknięciu")}}}
function stopAllSounds(){activeSounds.forEach(id=>{const a=audios.get(id);if(a)a.pause()});activeSounds.clear();$$(".sound-card").forEach(c=>c.classList.remove("active"));$$("[data-sound-toggle]").forEach(b=>b.textContent="▶")}
function renderFrequencies(){const root=$("#frequencyList");root.innerHTML=frequencies.map(f=>`<button class="freq-card" data-freq="${f.id}"><strong>${f.label}</strong><small>${f.sub}</small></button>`).join("");$$("[data-freq]").forEach(b=>b.addEventListener("click",()=>toggleFrequency(b.dataset.freq)))}
function stopFrequency(){if(activeFreq){activeFreq.nodes.forEach(n=>{try{n.stop?.()}catch(e){}try{n.disconnect?.()}catch(e){}});activeFreq=null}$$(".freq-card").forEach(c=>c.classList.remove("active"))}
async function toggleFrequency(id){if(activeFreq?.id===id){stopFrequency();return}stopFrequency();const f=frequencies.find(x=>x.id===id);audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();await audioContext.resume();const master=audioContext.createGain();master.gain.value=.035;master.connect(audioContext.destination);const nodes=[master];if(f.hz){const o=audioContext.createOscillator();o.type="sine";o.frequency.value=f.hz;o.connect(master);o.start();nodes.push(o)}else{const merger=audioContext.createChannelMerger(2);merger.connect(master);nodes.push(merger);[f.base-f.beat/2,f.base+f.beat/2].forEach((hz,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain();o.type="sine";o.frequency.value=hz;g.gain.value=.7;o.connect(g);g.connect(merger,0,i);o.start();nodes.push(o,g)})}activeFreq={id,nodes};$("[data-freq='"+id+"']").classList.add("active")}
function customSession(minutes){const sec=minutes*60;if(sec<=60)return{id:"custom",title:"Własny timer",method:"Cicha praktyka",minutes,icon:"○",desc:"",phases:[{seconds:sec,title:"Zostań przy kotwicy",instruction:"Wybierz oddech, ciało albo dźwięk i wracaj do niego bez pośpiechu."}]};return{id:"custom",title:"Własny timer",method:"Cicha praktyka",minutes,icon:"○",desc:"",phases:[{seconds:30,title:"Wejście",instruction:"Ustaw ciało i znajdź naturalny oddech."},{seconds:sec-60,title:"Cisza",instruction:"Pozostań przy wybranej kotwicy. Rozproszenie zauważ i wróć bez oceniania."},{seconds:30,title:"Domknięcie",instruction:"Poczuj całe ciało i otoczenie. Zakończ powoli."}]}}
async function startSession(idOrSession){const session=typeof idOrSession==="string"?sessions.find(s=>s.id===idOrSession):idOrSession;if(!session)return;player={session,elapsed:0,running:true,startedAt:Date.now(),lastTick:Date.now()};$("#playerMethod").textContent=session.method;$("#playerTitle").textContent=session.title;$("#playerDialog").showModal();updatePlayer();clearInterval(tick);tick=setInterval(()=>{if(!player)return;const now=Date.now();if(!player.running){player.lastTick=now;return}player.elapsed+=(now-player.lastTick)/1000;player.lastTick=now;if(player.elapsed>=totalSeconds(player.session)){completeSession();return}updatePlayer()},250);requestWakeLock();if("mediaSession" in navigator){navigator.mediaSession.metadata=new MediaMetadata({title:session.title,artist:"Still",album:"Medytacja"});navigator.mediaSession.setActionHandler("play",()=>togglePlayer(true));navigator.mediaSession.setActionHandler("pause",()=>togglePlayer(false))}}
function currentPhaseInfo(){let acc=0;for(let i=0;i<player.session.phases.length;i++){const p=player.session.phases[i];if(player.elapsed<acc+p.seconds)return{phase:p,index:i,start:acc,end:acc+p.seconds};acc+=p.seconds}const i=player.session.phases.length-1;return{phase:player.session.phases[i],index:i,start:acc-player.session.phases[i].seconds,end:acc}}
function updatePlayer(){if(!player)return;const total=totalSeconds(player.session),left=total-player.elapsed,info=currentPhaseInfo();$("#playerTime").textContent=formatTime(left);$("#phaseIndex").textContent=`Etap ${info.index+1} z ${player.session.phases.length}`;$("#phaseTitle").textContent=info.phase.title;$("#phaseInstruction").textContent=info.phase.instruction;$("#togglePlayer").textContent=player.running?"Pauza":"Wznów";const circumference=2*Math.PI*78;$("#ringProgress").style.strokeDasharray=circumference;$("#ringProgress").style.strokeDashoffset=circumference*(player.elapsed/total)}
function togglePlayer(force){if(!player)return;player.running=typeof force==="boolean"?force:!player.running;player.lastTick=Date.now();updatePlayer()}
function jumpPhase(dir){if(!player)return;const info=currentPhaseInfo();if(dir>0){player.elapsed=Math.min(totalSeconds(player.session)-1,info.end)}else{player.elapsed=info.index>0?info.start-player.session.phases[info.index-1].seconds:0}player.lastTick=Date.now();updatePlayer()}
function finishSession(save=false){if(!player)return;clearInterval(tick);if(save)addHistory(player.session);player=null;releaseWakeLock();$("#playerDialog").close()}
function completeSession(){if(!player)return;showToast("Sesja ukończona");if(navigator.vibrate)navigator.vibrate([120,80,120]);finishSession(true)}
function addHistory(session){const history=getHistory();history.unshift({id:session.id,title:session.title,minutes:session.minutes||Math.round(totalSeconds(session)/60),date:new Date().toISOString()});localStorage.setItem(STORE.history,JSON.stringify(history.slice(0,100)));renderProgress()}
function getHistory(){try{return JSON.parse(localStorage.getItem(STORE.history)||"[]")}catch(e){return[]}}
function calcStreak(history){const days=[...new Set(history.map(h=>h.date.slice(0,10)))].sort().reverse();if(!days.length)return 0;const today=new Date();today.setHours(0,0,0,0);const latest=new Date(days[0]+"T00:00:00");const gap=Math.round((today-latest)/86400000);if(gap>1)return 0;let streak=1;for(let i=1;i<days.length;i++){const a=new Date(days[i-1]+"T00:00:00"),b=new Date(days[i]+"T00:00:00");if(Math.round((a-b)/86400000)===1)streak++;else break}return streak}
function renderProgress(){const history=getHistory();$("#statSessions").textContent=history.length;$("#statMinutes").textContent=history.reduce((a,h)=>a+(h.minutes||0),0);$("#statStreak").textContent=calcStreak(history);$("#historyList").innerHTML=history.length?history.slice(0,8).map(h=>`<div class="history-item"><div><strong>${h.title}</strong><span> · ${h.minutes} min</span></div><span>${new Date(h.date).toLocaleDateString("pl-PL",{day:"2-digit",month:"short"})}</span></div>`).join(""):'<div class="empty-state">Po ukończeniu pierwszej sesji zobaczysz ją tutaj.</div>'}
async function requestWakeLock(){try{if("wakeLock" in navigator)wakeLock=await navigator.wakeLock.request("screen")}catch(e){}}
function releaseWakeLock(){try{wakeLock?.release()}catch(e){}wakeLock=null}
function navObserver(){const links=$$(".bottom-nav a"),sections=links.map(a=>$(a.getAttribute("href")));const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});sections.filter(Boolean).forEach(s=>io.observe(s))}
$("#minusMinute").addEventListener("click",()=>{timerMinutes=Math.max(1,timerMinutes-1);$("#timerMinutes").textContent=timerMinutes});
$("#plusMinute").addEventListener("click",()=>{timerMinutes=Math.min(60,timerMinutes+1);$("#timerMinutes").textContent=timerMinutes});
$("#startCustomTimer").addEventListener("click",()=>startSession(customSession(timerMinutes)));
$("#tutorialButton").addEventListener("click",()=>$("#tutorialDialog").showModal());
$("#stopAllSounds").addEventListener("click",stopAllSounds);$("#stopFrequency").addEventListener("click",stopFrequency);
$("#togglePlayer").addEventListener("click",()=>togglePlayer());$("#previousPhase").addEventListener("click",()=>jumpPhase(-1));$("#nextPhase").addEventListener("click",()=>jumpPhase(1));
$("#finishSession").addEventListener("click",()=>finishSession(false));$("#closePlayer").addEventListener("click",()=>finishSession(false));$("#playerDialog").addEventListener("cancel",e=>{e.preventDefault();finishSession(false)});
$("#playerSoundShortcut").addEventListener("click",()=>{finishSession(false);location.hash="sounds"});
$("#clearHistory").addEventListener("click",()=>{localStorage.removeItem(STORE.history);renderProgress();showToast("Historia wyczyszczona")});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredInstall=e;$("#installButton").classList.remove("hidden")});
$("#installButton").addEventListener("click",async()=>{if(!deferredInstall)return;deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;$("#installButton").classList.add("hidden")});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&player?.running)requestWakeLock()});
renderSessions();renderSounds();renderFrequencies();renderProgress();navObserver();
if(!localStorage.getItem(STORE.tutorial)){setTimeout(()=>$("#tutorialDialog").showModal(),500);localStorage.setItem(STORE.tutorial,"1")}
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));