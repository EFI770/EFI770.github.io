(function(root){
const defaults={older:0.75,young:0.5,youngKidsMeal:0.1,fishAdults:1,fishOlder:1,fishYoung:1,chickenAdults:1,chickenOlder:1,chickenYoung:1,reserve:10,fishGrams:200,fishYield:80,chickenGrams:375,chickenParts:4,saladMl:150,saladKinds:6,containerL:1,salmonShare:50,mode:'courses',scope:'expected',kidsMealYoung:true,saladV:2,mainDefault:'chicken'};
const total=g=>g.adults+g.older+g.young;
function included(g,s){return g.status!=='no'&&(s.scope==='all'||g.status==='yes');}
function calculate(guests,s){
s={...defaults,...s};const rows=guests.filter(g=>included(g,s));const counts={adults:0,older:0,young:0};let salmon=0,tilapia=0,chicken=0,schnitzel=0,unassigned=0,kids=0;
const kidsMeal=s.kidsMealYoung===true;
for(const g of rows){for(const k of Object.keys(counts))counts[k]+=g[k];const yMeal=kidsMeal?0:g.young;const eq=g.adults*s.fishAdults+g.older*s.fishOlder+yMeal*s.fishYoung;const chickenPieces=g.adults*s.chickenAdults+g.older*s.chickenOlder+yMeal*s.chickenYoung;let f=g.fish==='none'?0:1;
if(g.fish==='salmon')salmon+=eq;if(g.fish==='tilapia')tilapia+=eq;if(g.fish==='auto'){salmon+=eq*s.salmonShare/100;tilapia+=eq*(1-s.salmonShare/100);unassigned+=g.adults+g.older+yMeal;}
const main=g.main|| (g.chicken?'auto':'none');const chosenMain=main==='auto'?s.mainDefault:main;
if(s.mode==='courses'||!f){if(chosenMain==='chicken')chicken+=chickenPieces;if(chosenMain==='schnitzel')schnitzel+=chickenPieces;}
if(kidsMeal)kids+=g.young;
}
const factor=1+s.reserve/100;salmon*=factor;tilapia*=factor;chicken*=factor;schnitzel*=factor;
const eq=counts.adults+counts.older*s.older+counts.young*(kidsMeal?s.youngKidsMeal:s.young);const saladL=eq*factor*s.saladMl/1000;
const rounded=n=>Math.max(0,Math.ceil(n-1e-9));const fish=n=>({beforeReserve:n/factor,requested:n,pieces:rounded(n)});const kidsRequested=kids*factor;
return{counts,kidsMeal:{enabled:kidsMeal,beforeReserve:kids,requested:kidsRequested,portions:rounded(kidsRequested)},total:Object.values(counts).reduce((a,b)=>a+b,0),equiv:eq,unassigned,salmon:fish(salmon),tilapia:fish(tilapia),chicken:{beforeReserve:chicken/factor,requested:chicken,portions:rounded(chicken)},schnitzel:{beforeReserve:schnitzel/factor,requested:schnitzel,portions:rounded(schnitzel)},salad:{liters:saladL,perKind:saladL/s.saladKinds,containers:Math.ceil(saladL/s.saladKinds/s.containerL-1e-9),orderedL:Math.ceil(saladL/s.saladKinds/s.containerL-1e-9)*s.containerL*s.saladKinds},invited:guests.reduce((a,g)=>a+total(g),0),declined:guests.filter(g=>g.status==='no').reduce((a,g)=>a+total(g),0),pending:guests.filter(g=>g.status==='pending').reduce((a,g)=>a+total(g),0)};
}
function valid(data){if(!data||data.version!==1||!Array.isArray(data.guests)||data.guests.length>10000||!data.settings)return false;
for(const g of data.guests){if(g.main!==undefined&&!['auto','chicken','schnitzel','none'].includes(g.main))return false;if(g.members!==undefined&&(typeof g.members!=='string'||g.members.length>50000))return false;if(typeof g.id!=='string'||typeof g.name!=='string'||g.name.length>100||!['yes','pending','no'].includes(g.status)||!['auto','salmon','tilapia','none'].includes(g.fish)||typeof g.chicken!=='boolean')return false;for(const k of ['adults','older','young'])if(!Number.isInteger(g[k])||g[k]<0||g[k]>10000)return false;}
const bounds={older:[0,2],young:[0,2],reserve:[0,100],fishGrams:[1,1000],fishYield:[1,100],chickenGrams:[1,2000],chickenParts:[1,20],saladMl:[1,2000],saladKinds:[1,30],containerL:[0.1,20],salmonShare:[0,100]};
for(const k of ['fishAdults','fishOlder','fishYoung','chickenAdults','chickenOlder','chickenYoung'])if(data.settings[k]!==undefined&&(!Number.isInteger(data.settings[k])||data.settings[k]<0||data.settings[k]>10))return false;
for(const [k,[lo,hi]] of Object.entries(bounds))if(typeof data.settings[k]!=='number'||!Number.isFinite(data.settings[k])||data.settings[k]<lo||data.settings[k]>hi)return false;
if(!Number.isInteger(data.settings.saladKinds)||!Number.isInteger(data.settings.chickenParts))return false;
if(data.settings.mainDefault!==undefined&&!['chicken','schnitzel'].includes(data.settings.mainDefault))return false;
if(data.settings.kidsMealYoung!==undefined&&typeof data.settings.kidsMealYoung!=='boolean')return false;
if(data.settings.youngKidsMeal!==undefined&&(typeof data.settings.youngKidsMeal!=='number'||!Number.isFinite(data.settings.youngKidsMeal)||data.settings.youngKidsMeal<0||data.settings.youngKidsMeal>2))return false;
if(data.settings.saladV!==undefined&&typeof data.settings.saladV!=='number')return false;
return ['courses','alternative'].includes(data.settings.mode)&&['expected','all'].includes(data.settings.scope)&&typeof data.title==='string'&&data.title.length<=100;
}
function parseList(text){
const lines=text.split(/\r?\n/).map(x=>x.trim().replace(/^(?:[•*–-]|\d+[.)])\s*/, '').trim()).filter(Boolean);if(lines.length>1000)throw Error('too-many');
const groups=[], map=new Map();
for(const line of lines){
 const clean=line.replace(/\s+/g,' ');const explicit=/^(?:משפחת|משפחה)\s+(.+?)(?=\s*[:|,;]|\s+\d|$)/.exec(clean);
 const label=explicit?('משפחת '+explicit[1].trim()):clean;const words=clean.split(' ');const plain=/^[\p{L}\s'"׳״-]+$/u.test(clean);const guess=!explicit&&plain&&words.length>=2&&words.length<=4;
 const key=explicit?'family:'+label:guess?'surname:'+words[words.length-1]:null;
 let group=key?map.get(key):null;
 if(!group){group={name:explicit?label:guess?'משפחת '+words[words.length-1]:label,members:[],adults:0,older:0,young:0,ambiguous:!explicit};groups.push(group);if(key)map.set(key,group);}
 group.members.push(line);
 const adult=/(\d+)\s*מבוגר(?:ים|ות)?/.exec(clean),older=/(\d+)\s*(?:ילד(?:ים)?\s*)?בוגר(?:ים|ות)?/.exec(clean),young=/(\d+)\s*(?:ילד(?:ים)?\s*)?צעיר(?:ים|ות)?/.exec(clean);
 if(adult)group.adults+=Number(adult[1]);if(older)group.older+=Number(older[1]);if(young)group.young+=Number(young[1]);
}
return groups;}
const normalize=data=>{const s={...defaults,...data.settings};if(!data.settings||data.settings.saladV!==2){if(s.saladMl===240)s.saladMl=defaults.saladMl;s.saladV=2;}return {...data,settings:s};};const api={defaults,calculate,valid,total,normalize,parseList};if(typeof module!=='undefined')module.exports=api;else root.Planner=api;
})(typeof window!=='undefined'?window:globalThis);
