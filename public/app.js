let S=null;
function normalize(){
 S.hotel=S.hotel||{name:'Hotel Relax',tagline:'Rest · Restore · Relax',phone:'',ai_info:''};
 S.wifi=S.wifi||{name:'HotelRelax_Guest',pass:'welcome123'};
 S.rules=S.rules||[];
 S.menu=S.menu||[];
 S.notices=S.notices||[];
 S.review=S.review||'';
 S.pw=S.pw||'8f2163fef73415da662abb10d21e76a7a2924192136de91d113b46bb2eb142d9';
 S.order=S.order||{on:true};
 if(!S.order.food)S.order.food={wa:S.order.wa||'',sms:S.order.sms||''};
 if(!S.order.desk)S.order.desk={wa:S.order.wa||'',sms:S.order.sms||''};
 delete S.order.wa;delete S.order.sms;
 S.toil=S.toil||[['Toothbrush & paste kit'],['Soap'],['Shampoo sachet'],['Extra towel'],['Extra pillow'],['Extra blanket'],['Comb'],['Shaving kit'],['Slippers']].map((x,i)=>({id:'t'+(i+1),n:x[0],p:'',a:true}))
}
const $=s=>document.querySelector(s),esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>Math.random().toString(36).slice(2,8);
const sha=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('');
let admin=false,login=false,tab='notices',mcat=0,ci=0,q='',vegOnly=false,delArm=-1;
try{admin=sessionStorage.getItem('rx_admin')==='1'}catch(e){}

const IC={
  wifi:'<path d="M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0"/><circle cx="12" cy="19" r="1"/>',
  menu:'<path d="M3 11h18a9 9 0 01-18 0zM9 7c0-1.5 1.5-1.5 1.5-3M14 7c0-1.5 1.5-1.5 1.5-3"/>',
  rules:'<path d="M6 4h12v16H6zM9 9h6M9 13h6M9 17h3"/>',
  star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  home:'<path d="M3 11l9-7 9 7M5 10v10h14V10"/>',
  bell:'<path d="M6 17h12l-1.5-2V10a4.5 4.5 0 00-9 0v5zM10 20h4"/>',
  bottle:'<path d="M10 3h4v3l2 3v11a1 1 0 01-1 1H9a1 1 0 01-1-1V9l2-3zM8 13h8"/>'
};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24">${IC[n]||''}</svg>`;

const url=u=>/^https?:\/\//i.test(u)?u:'';
function menuBlock(){
 const c=S.menu[mcat]||{items:[]},n=q.toLowerCase();
 const src=q?S.menu.flatMap(x=>x.items):c.items;
 const items=src.filter(it=>(!vegOnly||it.v)&&(!n||(it.n+' '+it.d).toLowerCase().includes(n))).map(it=>`<div class="it ${it.a?'':'off'}"><span class="vd ${it.v?'v':'n'}"></span><div class="im"><div class="nl"><b>${esc(it.n)}</b><i class="ld"></i><span class="pr">${it.a?'₹'+esc(it.p):'Sold out'}</span></div><small>${esc(it.d)}</small></div></div>`).join('')||'<p class="mu">No dishes match.</p>';
 return (q?'':`<div class="pills sticky">${S.menu.map((x,i)=>`<button class="pill ${i===mcat?'on':''}" data-act="cat" data-i="${i}">${esc(x.cat)}</button>`).join('')}</div>`)+items;
}

function tod(){
 const d=new Date(),h=d.getHours()+d.getMinutes()/60,t=Math.min(1,Math.max(0,(h-6)/13.5));let k;
 if(h<6||h>=19.5)k={n:true,s:['#0b1530','#1b2f5e'],w:['#123456','#0c2442','#081a32'],o:'#e8ecff',pc:'#0a1a22'};
 else if(h<10.5)k={n:false,s:['#f7a8b8','#ffe2b3'],w:['#4bb5c4','#2c8aa6','#1d6a8a'],o:'#fff1b8',pc:'#1d4a3e'};
 else if(h<16.5)k={n:false,s:['#5ec3f0','#c4efff'],w:['#35bfd8','#1fa0c6','#0e7fae'],o:'#fffbe0',pc:'#1d6a52'};
 else k={n:false,s:['#4a3f86','#ff9a6b'],w:['#9a5a8a','#5a3f7a','#33295c'],o:'#ffb347',pc:'#1a1830'};
 k.l=k.n?76:10+t*80;k.tp=k.n?14:60-Math.sin(t*Math.PI)*46;return k;
}
const palm=c=>`<i class="palm ${c}">${[-165,-130,-95,-60,-25,15,165].map(a=>`<b style="transform:rotate(${a}deg)"></b>`).join('')}</i>`;
const hi=()=>{const h=new Date().getHours();return h<5||h>=21?['Good night','Listen to the waves and drift off. Sleep well.']:h<12?['Good morning','Rise and shine. The sea is calm and the day is yours.']:h<17?['Good afternoon','Take it easy. Sun, sea and nothing to do.']:['Good evening','Golden hour. Grab a drink and watch the sky glow.']};
const TIPS=['Tap WiFi for the network and password.','Hungry? Try Surprise me on the menu.','House rules are just below.','Enjoyed your stay? A kind review makes our day.','Tap the sea again and watch the waves go.'];let ti=0;
function say(m){const b=$('#say');if(b)b.textContent=m}
function owl(){const e=$('#sea');if(e){e.classList.add('rock');setTimeout(()=>e.classList.remove('rock'),2200)}say(TIPS[ti++%TIPS.length]);boom($('#sea'))}
function boom(el){const r=(el||document.body).getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,c=['#ff7a59','#ffc857','#4fd1c5','#ffffff','#c9b6ff'];for(let i=0;i<20;i++){const d=document.createElement('i');d.className='cf';d.style.cssText=`left:${x}px;top:${y}px;background:${c[i%5]};--dx:${(Math.random()-.5)*280}px;--dy:${-60-Math.random()*150}px`;document.body.appendChild(d);setTimeout(()=>d.remove(),1400)}}
function pick(t){const all=S.menu.flatMap(c=>c.items).filter(i=>i.a&&(!vegOnly||i.v)),e=$('#pick');if(!all.length){e.innerHTML='<p class="mu">Nothing to suggest right now.</p>';return}const it=all[Math.floor(Math.random()*all.length)];e.innerHTML=`<div class="pickc"><small>Our suggestion</small><b>${esc(it.n)}</b><span>${it.p?'₹'+esc(it.p)+' · ':''}${esc(it.d)}</span></div>`;say('May we suggest the '+it.n+'?');boom(t)}

function guest(){
 const ph=String(S.hotel.phone).replace(/[^+\d]/g,''),rv=url(S.review),H=hi(),T=tod();
 const nt=S.notices.slice().reverse().map(n=>`<div class="card note rv"><b>From reception</b><p style="margin:6px 0 4px">${esc(n.t)}</p><small>${esc(n.time)}</small></div>`).join('');
 return `<div class="adm"><button data-act="login">Admin</button></div><div class="wrap">
 <header class="hero" id="hero"><div class="sea3" id="sea" data-act="owl" style="--s1:${T.s[0]};--s2:${T.s[1]};--w1:${T.w[0]};--w2:${T.w[1]};--w3:${T.w[2]};--o:${T.o};--pc:${T.pc}"><div class="dtilt" id="dtilt">
 <div class="ly sky">${T.n?'<i class="stars"></i>':''}<i class="sun3" style="left:${T.l}%;top:${T.tp}%"></i><i class="cl"></i><i class="cl c2"></i></div>
 <div class="ly water"><i class="glint" style="left:${T.l}%"></i><i class="wv a"></i><div class="boat"><i class="hull"></i><i class="sail sl1"></i><i class="sail sl2"></i></div></div>
 <div class="ly mid"><i class="wv b"></i></div><div class="ly near"><i class="wv c"></i>${palm('l')}${palm('r')}</div><div class="ly fg"><i class="sand"></i></div>
 <i class="bird"></i><i class="bird b2"></i></div></div>
 <p class="hint">Tap the sea</p><p class="eyebrow">${esc(H[0])}</p><h1>${esc(S.hotel.name)}</h1><p class="sub">${esc(S.hotel.tagline)}</p><p class="say" id="say">${esc(H[1])}</p></header>
 <div class="div"></div>
 ${nt}
 <nav class="qa rv"><button class="tile" data-act="food">${ic('bell')}Order Food</button><button class="tile" data-act="order">${ic('bottle')}Request</button><button class="tile" data-act="go" data-t="wifi">${ic('wifi')}WiFi</button><button class="tile" data-act="go" data-t="menu">${ic('menu')}Menu</button><button class="tile" data-act="go" data-t="rules">${ic('rules')}Rules</button>${rv?`<a class="tile" href="${esc(rv)}" target="_blank" rel="noopener">${ic('star')}Review</a>`:''}${ph?`<a class="tile" href="tel:${ph}">${ic('phone')}Call</a>`:''}</nav>
 <section class="card rv" id="wifi"><h2>WiFi</h2><div class="kv"><span class="mu">Network</span><b>${esc(S.wifi.name)}</b></div><div class="kv"><span class="mu">Password</span><b>${esc(S.wifi.pass)}</b></div><div class="bar" style="margin:12px 0 0"><button class="btn" data-act="copy" data-v="${esc(S.wifi.pass)}">Copy password</button><button class="btn g" data-act="copy" data-v="${esc(S.wifi.name)}">Copy name</button></div></section>
 <section class="card rv" id="menu"><h2>Menu</h2><div class="tools"><input id="q" type="search" placeholder="Search dishes…" value="${esc(q)}"><label class="sw"><input type="checkbox" id="vg" ${vegOnly?'checked':''}>Veg only</label></div><div class="bar" style="justify-content:flex-start;gap:10px"><button class="btn" data-act="food">Order food</button><button class="btn g" data-act="pick">Surprise me</button></div><div id="pick"></div><div id="mm">${menuBlock()}</div><button class="btn" style="width:100%;margin-top:16px" data-act="food">Order food to your room</button></section>
 <section class="card rv" id="rules"><h2>House rules</h2><ol>${S.rules.map(r=>`<li>${esc(r)}</li>`).join('')}</ol></section>
 ${rv?`<section class="card rv" id="review"><h2>Share your stay</h2><p style="margin-top:0">If you had a lovely time, a kind Google review would make our day.</p><a class="btn" href="${esc(rv)}" target="_blank" rel="noopener">Leave a review</a></section>`:''}
 <div class="div" style="margin-top:30px"></div><p class="foot">Thank you for staying with ${esc(S.hotel.name)}</p></div>
 <nav class="dock"><button data-act="go" data-t="top">${ic('home')}Home</button><button data-act="go" data-t="menu">${ic('menu')}Menu</button><button data-act="food">${ic('bell')}Order</button><button data-act="go" data-t="wifi">${ic('wifi')}WiFi</button><button data-act="go" data-t="rules">${ic('rules')}Rules</button></nav>
 ${foodPage()}${orderUI()}${chatUI()}${login?loginModal():''}`;
}

function inp(k,v,ph,cls){return `<input ${cls?`class="${cls}" `:''}data-k="${k}" value="${esc(v)}" placeholder="${ph}">`}
function adminView(){
 let b='';
 if(tab==='notices'){b=`<div class="card"><h2>Broadcast a notice</h2><textarea id="nt" rows="3" placeholder="Message for all guests, e.g. Pool is open till 9 PM."></textarea><button class="btn" data-act="addnotice">Broadcast now</button></div><div class="card"><h2>Live notices</h2>${S.notices.map((n,i)=>`<div class="row"><p style="margin:0 0 6px">${esc(n.t)}</p><small class="mu">${esc(n.time)}</small> <button class="btn d" data-act="delnotice" data-i="${i}">Remove</button></div>`).join('')||'<p class="mu">No notices.</p>'}</div>`}
 if(tab==='menu'){const c=S.menu[ci];b=`<div class="card"><div class="pills">${S.menu.map((x,i)=>`<button class="pill ${i===ci?'on':''}" data-act="acat" data-i="${i}">${esc(x.cat)}</button>`).join('')}<button class="pill" data-act="addcat">+ Category</button></div>${c?`${inp(`menu.${ci}.cat`,c.cat,'Category name')}${c.items.map((it,j)=>{const p=`menu.${ci}.items.${j}.`;return `<div class="row">${inp(p+'n',it.n,'Dish name')}${inp(p+'p',it.p,'Price ₹')}${inp(p+'d',it.d,'Description')}<label><input type="checkbox" data-k="${p}v" ${it.v?'checked':''}>Veg</label><label><input type="checkbox" data-k="${p}a" ${it.a?'checked':''}>Available</label> <button class="btn d" data-act="delitem" data-j="${j}">Delete</button></div>`}).join('')}<div class="bar"><button class="btn g" data-act="additem">+ Add item</button><button class="btn d" data-act="delcat">${delArm===ci?'Tap again to delete':'Delete category'}</button></div>`:'<p class="mu">Add a category to start.</p>'}</div>`}
 if(tab==='order'){const dn=(k,t)=>`<div class="card"><h2>${t}</h2><label>WhatsApp number (with country code)</label>${inp('order.'+k+'.wa',S.order[k].wa,'919876543210')}<label>SMS number (blank = same as WhatsApp)</label>${inp('order.'+k+'.sms',S.order[k].sms,'919876543210')}</div>`;b=`<div class="card"><h2>Ordering</h2><label class="sw"><input type="checkbox" data-k="order.on" ${S.order.on?'checked':''}>Accept orders</label>${[S.order.food,S.order.desk].some(d=>num(d.wa)||num(d.sms))?'':'<p class="st">No number is set yet. Guests can pick items but can only copy the order until you add a number below.</p>'}<p class="mu" style="font-size:.9rem">Food orders and toiletries/messages are sent separately, each to its own number. Guests press Send in their own WhatsApp or SMS app. Orders are not stored on this site.</p></div>${dn('food','Kitchen (food orders)')}${dn('desk','Front desk (toiletries and messages)')}<div class="card"><h2>Toiletries</h2>${S.toil.map((x,i)=>`<div class="row">${inp('toil.'+i+'.n',x.n,'Item name')}${inp('toil.'+i+'.p',x.p,'Price Rs (optional)')}<label><input type="checkbox" data-k="toil.${i}.a" ${x.a?'checked':''}>Available</label> <button class="btn d" data-act="deltoil" data-i="${i}">Delete</button></div>`).join('')}<button class="btn g" data-act="addtoil">+ Add item</button></div>`}
 if(tab==='info'){b=`<div class="card"><h2>Details</h2><label>Hotel name</label>${inp('hotel.name',S.hotel.name,'')}<label>Tagline</label>${inp('hotel.tagline',S.hotel.tagline,'')}<label>Reception phone</label>${inp('hotel.phone',S.hotel.phone,'+91…')}<label>WiFi name</label>${inp('wifi.name',S.wifi.name,'')}<label>WiFi password</label>${inp('wifi.pass',S.wifi.pass,'')}<label>Google review link</label>${inp('review',S.review,'https://…')}<label>Extra Hotel & Local Info for Concierge AI (beach, pool, spa, check-in, etc.)</label><textarea data-k="hotel.ai_info" rows="4" placeholder="e.g. Check-in is at 12 PM. Beach access is right in front. Infinity pool is open 7 AM - 9 PM. Spa bookings at reception.">${esc(S.hotel.ai_info||'')}</textarea></div><div class="card"><h2>House rules</h2>${S.rules.map((r,i)=>`<div class="row">${inp('rules.'+i,r,'Rule')}<button class="btn d" data-act="delrule" data-i="${i}">Delete</button></div>`).join('')}<button class="btn g" data-act="addrule">+ Add rule</button></div><div class="card"><h2>Admin password</h2><input id="opw" type="password" placeholder="Current password" autocomplete="current-password"><input id="npw" type="password" placeholder="New password (min 6 chars)" autocomplete="new-password"><button class="btn g" data-act="setpw">Change password</button></div>`}
 return `<div class="wrap"><div class="ahead"><div class="bar"><h2 style="margin:0">Admin</h2><div><button class="btn g" data-act="logout">Exit</button> <button class="btn" data-act="save">Save changes</button></div></div><div class="st" id="st"></div></div><div class="pills">${[['notices','Notices'],['menu','Menu'],['info','Info & rules'],['order','Ordering']].map(t=>`<button class="pill ${tab===t[0]?'on':''}" data-act="tab" data-t="${t[0]}">${t[1]}</button>`).join('')}</div>${b}</div>`;
}

function reveal(){const e=document.querySelectorAll('.rv');if(!('IntersectionObserver' in window))return e.forEach(x=>x.classList.add('in'));const o=new IntersectionObserver(r=>r.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');o.unobserve(x.target)}}),{threshold:.08});e.forEach(x=>o.observe(x))}
function toast(m){const d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(()=>d.remove(),1800)}
const mm=()=>{const e=$('#mm');if(e)e.innerHTML=menuBlock()};
document.addEventListener('input',e=>{if(e.target.id==='q'){q=e.target.value;mm()}if(e.target.id==='vg'){vegOnly=e.target.checked;mm()}});
function render(){$('#app').innerHTML=admin?adminView():guest();reveal();const p=$('#pw');if(p)p.focus()}
const st=m=>{const e=$('#st');if(e)e.textContent=m};

async function save(){
 st('Saving…');
 try{
   const cfgId = (window.APP_CONFIG && window.APP_CONFIG.CONFIG_ID) || 2;
   const {data,error}=await SB.from('site_config').upsert({id:cfgId,data:S,updated_at:new Date().toISOString()});
   if(error)throw error;
   st('Saved. Guests see changes when they open or refresh the page.');
 }catch(e){
   st('Could not save: '+((e&&e.message)||'unknown error'));
 }
}

function setPath(path,v){const k=path.split('.');let o=S;for(let i=0;i<k.length-1;i++)o=o[k[i]];o[k[k.length-1]]=v}
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.k;if(k)setPath(k,e.target.type==='checkbox'?e.target.checked:e.target.value)});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='pw')act('dologin',e.target)});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(t)act(t.dataset.act,t)});

async function act(a,t){
 const i=+t.dataset.i,j=+t.dataset.j;
 if(a==='cat'){mcat=i;mm()}
 else if(a==='owl'){owl()}
 else if(a==='order'){if(!S.order.on)return toast('Ordering is switched off right now. Please call reception.');ord.open=true;ord.view='browse';ord.sent='';ord.err='';if(ord.tab==='food')ord.tab='toil';const o=$('#osheet');if(o){o.classList.add('open');paintOrder()}}
 else if(a==='oclose'){ord.open=false;const o=$('#osheet');if(o)o.classList.remove('open')}
 else if(a==='otab'){ord.tab=t.dataset.t;ord.err='';paintOrder()}
 else if(a==='qq'){const k=t.dataset.k,n=Math.max(0,Math.min(9,qty(k)+(+t.dataset.d)));if(n)ord.cart[k]=n;else delete ord.cart[k];afterQty(k,t)}
 else if(a==='owa')sendOrder('wa',ord.tab);else if(a==='osms')sendOrder('sms',ord.tab);else if(a==='ocopy')sendOrder('copy',ord.tab)
 else if(a==='oback'){ord.sent='';paintOrder()}
 else if(a==='onew'){const k=ord.sentTab||ord.tab;if(k==='msg')ord.msg='';else Object.keys(ord.cart).forEach(x=>{if(x[0]==='t')delete ord.cart[x]});ord.note='';ord.sent='';ord.view='browse';paintOrder()}
 else if(a==='oview'){if(ord.tab==='toil'&&!cnt('toil'))return;if(ord.tab==='msg'&&!ord.msg.trim())return;ord.view='checkout';ord.err='';paintOrder();const d=$('#odyn');if(d)d.scrollTo(0,0)}
 else if(a==='obackbrowse'){ord.view='browse';paintOrder()}
 else if(a==='food'){if(!S.order.on)return toast('Ordering is switched off right now. Please call reception.');fp.open=true;fp.view='menu';ord.err='';const f=$('#fpage');if(f){f.classList.add('open');paintFood()}}
 else if(a==='fback'){if(fp.view!=='menu'){fp.view='menu';paintFood()}else{fp.open=false;const f=$('#fpage');if(f)f.classList.remove('open')}}
 else if(a==='fcat'){fp.cat=i;paintFood()}
 else if(a==='freview'){fp.view='checkout';ord.err='';paintFood();const f=$('#fpage');if(f)f.scrollTo(0,0)}
 else if(a==='fwa')sendOrder('wa','food');else if(a==='fsms')sendOrder('sms','food');else if(a==='fcopy')sendOrder('copy','food')
 else if(a==='fcheckback'){fp.view='checkout';paintFood()}
 else if(a==='fnew'){Object.keys(ord.cart).forEach(x=>{if(x[0]==='f')delete ord.cart[x]});ord.note='';fp.view='menu';paintFood()}
 else if(a==='addtoil'){S.toil.push({id:uid(),n:'',p:'',a:true});render()}
 else if(a==='deltoil'){S.toil.splice(i,1);render()}
 else if(a==='chat'){chatToggle()}
 else if(a==='send'){chatSend()}
 else if(a==='chip'){chatSend(t.dataset.q)}
 else if(a==='pick'){pick(t)}
 else if(a==='go'){const d=t.dataset.t;d==='top'?scrollTo({top:0,behavior:'smooth'}):document.getElementById(d).scrollIntoView({behavior:'smooth'})}
 else if(a==='copy'){try{await navigator.clipboard.writeText(t.dataset.v);toast('Copied ✓');say('Copied to clipboard! 📶');boom(t)}catch(e){t.textContent='Select & copy manually'}}
 else if(a==='login'){login=true;render()}
 else if(a==='closelogin'){login=false;render()}
 else if(a==='dologin'){
   const inputPw=($('#pw')||{}).value||'';
   const inputHash=await sha(inputPw);
   const currentHash=S.pw||'8f2163fef73415da662abb10d21e76a7a2924192136de91d113b46bb2eb142d9';
   if(inputHash===currentHash){
     admin=true;login=false;
     try{sessionStorage.setItem('rx_admin','1')}catch(e){}
     render();
   } else {
     $('#lst').textContent='Wrong password.';
   }
 }
 else if(a==='logout'){admin=false;try{sessionStorage.removeItem('rx_admin')}catch(e){}render()}
 else if(a==='tab'){tab=t.dataset.t;render()}
 else if(a==='acat'){ci=i;render()}
 else if(a==='addcat'){S.menu.push({cat:'New category',items:[]});ci=S.menu.length-1;render()}
 else if(a==='delcat'){if(delArm===ci){delArm=-1;S.menu.splice(ci,1);ci=0;mcat=0;fp.cat=0;render()}else{const c0=ci;delArm=ci;render();setTimeout(()=>{if(delArm===c0){delArm=-1;if(admin)render()}},4000)}}
 else if(a==='additem'){S.menu[ci].items.push({id:uid(),n:'',p:'',d:'',v:true,a:true});render()}
 else if(a==='delitem'){S.menu[ci].items.splice(j,1);render()}
 else if(a==='addrule'){S.rules.push('');render()}
 else if(a==='delrule'){S.rules.splice(i,1);render()}
 else if(a==='addnotice'){const v=$('#nt').value.trim();if(v){S.notices.push({id:uid(),t:v,time:new Date().toLocaleString()});save()}}
 else if(a==='delnotice'){S.notices.splice(i,1);save()}
 else if(a==='setpw'){
   const o=($('#opw')||{}).value||'',v=($('#npw')||{}).value||'';
   const currentHash=S.pw||'8f2163fef73415da662abb10d21e76a7a2924192136de91d113b46bb2eb142d9';
   if(await sha(o)!==currentHash)return st('Current password is wrong.');
   if(v.length<6)return st('Use at least 6 characters.');
   S.pw=await sha(v);
   $('#opw').value='';$('#npw').value='';
   await save();
   st('Password changed and saved.');
 }
 else if(a==='save')save();
}

let AI=true,chat=[],chatOpen=false,busy=false;
const GREET=()=>'Welcome to '+(S.hotel.name||'Hotel Relax')+'! 🌴 I am your Relax Concierge. Ask me about our menu, drinks, WiFi, house rules, or hotel amenities.';
const CHIPS=['WiFi password?','What are the non-veg options?','What is veg on the menu?','House rules?','Suggest a dish'];

function msgs(){
 return '<div class="bb a">'+esc(GREET())+'</div>'+chat.map(m=>{
   if(m.role==='assistant'&&!m.content){
     return '<div class="bb a typing"><span></span><span></span><span></span></div>';
   }
   return `<div class="bb ${m.role==='user'?'u':'a'}">${esc(m.content)}</div>`;
 }).join('');
}
function paint(){const m=$('#cm');if(m){m.innerHTML=msgs();m.scrollTop=m.scrollHeight}}
function chatUI(){if(!AI)return'';return `<button class="fab" data-act="chat" aria-label="Chat with Relax Concierge">💬 Relax Concierge</button><div class="cp ${chatOpen?'open':''}" id="cp"><div class="ch"><b>🌴 Relax Concierge</b><button data-act="chat" aria-label="Close chat">✕</button></div><div class="cm" id="cm">${msgs()}</div><div class="chips">${CHIPS.map(c=>`<button data-act="chip" data-q="${esc(c)}">${esc(c)}</button>`).join('')}</div><div class="crow"><input id="cin" placeholder="Ask about the hotel…" maxlength="400" autocomplete="off"><button class="btn" data-act="send">Send</button></div></div>`}
function chatToggle(){chatOpen=!chatOpen;const c=$('#cp');if(c)c.classList.toggle('open',chatOpen);if(chatOpen){const i=$('#cin');if(i)setTimeout(()=>i.focus(),300);paint()}}

function smartReply(q){
 const text = q.toLowerCase().trim();
 const allCategories = S.menu || [];
 const allItems = allCategories.flatMap(c => (c.items || []).map(it => ({ ...it, category: c.cat })));
 const activeItems = allItems.filter(it => it.a);

 // 1. Direct Item & Keyword Search (exact name, partial name, dish keywords or description match)
 const queryClean = text.replace(/[^a-z0-9\s]/gi, ' ').trim();
 const queryTokens = queryClean.split(/\s+/).filter(t => t.length >= 2);

 const matchedDishes = allItems.filter(it => {
   const dName = (it.n || '').toLowerCase();
   const dDesc = (it.d || '').toLowerCase();

   if(text === dName || text.includes(dName) || (dName.length >= 3 && dName.includes(text))){
     return true;
   }

   const dTokens = dName.replace(/[^a-z0-9\s]/gi, ' ').split(/\s+/).filter(t => t.length >= 2);
   const hasWordMatch = queryTokens.some(qWord => dTokens.some(dWord => dWord === qWord || (dWord.length >= 4 && (dWord.includes(qWord) || qWord.includes(dWord)))));
   if(hasWordMatch) return true;

   if(queryTokens.length === 1 && queryTokens[0].length >= 3){
     const qWord = queryTokens[0];
     if(!['what','have','your','this','that','show','menu','want','give'].includes(qWord)){
       if(dDesc.includes(qWord)) return true;
     }
   }
   return false;
 });

 if(matchedDishes.length === 1){
   const it = matchedDishes[0];
   const status = it.a ? (it.p ? `priced at ₹${it.p}` : 'available') : 'currently sold out';
   const vegTag = it.v ? 'Pure Veg' : 'Non-Veg';
   const desc = it.d ? `\n_${it.d}_` : '';
   return `🍽️ *${it.n}* [${vegTag}] (${it.category}):\nIt is ${status}.${desc}${it.a ? '\n\n🛎️ Tap "Order Food" to order directly to your room!' : ''}`;
 }

 if(matchedDishes.length > 1){
   const list = matchedDishes.map(it => `• *${it.n}*${it.p ? ` (₹${it.p})` : ''} [${it.v ? 'Veg' : 'Non-Veg'}]${it.a ? '' : ' - Sold out'}`).join('\n');
   return `🍽️ Matching items found:\n${list}\n\n🛎️ Tap "Order Food" to order to your room!`;
 }

 // 2. Category matching
 const matchedCat = allCategories.find(c => {
   const cName = (c.cat || '').toLowerCase();
   return text.includes(cName) || 
          (cName.includes('drink') && (text.includes('drink') || text.includes('beverage') || text.includes('tea') || text.includes('chai') || text.includes('coffee') || text.includes('soda') || text.includes('sweet'))) ||
          (cName.includes('starter') && (text.includes('starter') || text.includes('snack') || text.includes('roll') || text.includes('tikka'))) ||
          (cName.includes('meal') && (text.includes('meal') || text.includes('thali') || text.includes('rice') || text.includes('lunch') || text.includes('dinner')));
 });

 if(matchedCat){
   const items = (matchedCat.items || []).filter(i => i.a);
   if(items.length){
     const list = items.map(d => `• ${d.n}${d.p ? ` (₹${d.p})` : ''}${d.d ? ` - ${d.d}` : ''}${d.v ? ' [Veg]' : ' [Non-Veg]'}`).join('\n');
     return `📋 ${matchedCat.cat} Menu:\n${list}\n\nTap "Order Food" to order directly to your room!`;
   }
   return `Our ${matchedCat.cat} section is currently being updated. Tap "Order Food" to view available dishes!`;
 }

 // 3. Non-veg queries
 const isNonVeg = text.includes('non-veg') || text.includes('non veg') || text.includes('nonveg') || 
                  text.includes('chicken') || text.includes('fish') || text.includes('mutton') || 
                  text.includes('egg') || text.includes('curry');

 if(isNonVeg){
   const nonVeg = activeItems.filter(i => !i.v);
   if(nonVeg.length){
     const names = nonVeg.map(d => `• ${d.n}${d.p ? ` (₹${d.p})` : ''}${d.d ? ` - ${d.d}` : ''} [${d.category}]`).join('\n');
     return `🍗 Non-Veg Dishes available:\n${names}\n\nTap "Order Food" to order to your room!`;
   }
   return `Currently there are no active non-veg items listed on the menu. Please check with reception!`;
 }

 // 4. Veg queries
 if(text.includes('veg') || text.includes('vegetarian')){
   const vegDishes = activeItems.filter(i => i.v);
   if(vegDishes.length){
     const names = vegDishes.map(d => `• ${d.n}${d.p ? ` (₹${d.p})` : ''}${d.d ? ` - ${d.d}` : ''} [${d.category}]`).slice(0, 8).join('\n');
     return `🥗 Pure Veg Options:\n${names}\n\nTap "Order Food" to view the full menu and order!`;
   }
   return `We offer delicious pure vegetarian dishes. Tap "Order Food" to view the menu!`;
 }

 // 5. WiFi
 if(text.includes('wifi') || text.includes('wi-fi') || text.includes('password') || text.includes('internet')){
   return `📶 WiFi Details:\nNetwork: ${S.wifi.name || 'HotelRelax_Guest'}\nPassword: ${S.wifi.pass || 'welcome123'}\n\n(Tap the WiFi tile on the home screen to copy it with one tap!)`;
 }

 // 6. Rules & Timings
 if(text.includes('rule') || text.includes('timing') || text.includes('time') || text.includes('check-out') || text.includes('checkout') || text.includes('checkin') || text.includes('check in')){
   const rules = (S.rules || []).filter(Boolean);
   if(rules.length){
     return `📜 House Rules & Timings:\n${rules.map((r, idx) => `${idx + 1}. ${r}`).join('\n')}`;
   }
   return `Please observe our quiet hours after 10 PM and check-out by 11 AM. Feel free to contact reception for assistance!`;
 }

 // 7. Notices
 if(text.includes('notice') || text.includes('announcement') || text.includes('update')){
   const notices = (S.notices || []).filter(n => n.t);
   if(notices.length){
     return `📢 Reception Notices:\n${notices.map(n => `• ${n.t} (${n.time || ''})`).join('\n')}`;
   }
   return `There are no urgent notices at the moment. Enjoy your relaxing stay!`;
 }

 // 8. Suggestion
 if(text.includes('suggest') || text.includes('recommend') || text.includes('special') || text.includes('dish') || text.includes('surprise') || text.includes('best')){
   if(activeItems.length){
     const pick = activeItems[Math.floor(Math.random() * activeItems.length)];
     return `🌴 How about trying our *${pick.n}* (${pick.category}) for ₹${pick.p || 'N/A'}? ${pick.d || 'A guest favorite!'}\n\nTap "Order Food" to order!`;
   }
 }

 // 9. Food Ordering
 if(text.includes('order') || text.includes('food') || text.includes('menu') || text.includes('kitchen')){
   return `🛎️ Ready to dine? Tap the "Order Food" button on your screen to browse our full menu, pick your favorite items, and send the order directly via WhatsApp!`;
 }

 // 10. Toiletries & Amenities
 if(text.includes('towel') || text.includes('soap') || text.includes('blanket') || text.includes('pillow') || text.includes('toiletr') || text.includes('shampoo') || text.includes('room service') || text.includes('amenit') || text.includes('kit') || text.includes('brush') || text.includes('paste')){
   const toil = (S.toil || []).filter(t => t.a && t.n).map(t => t.n).join(', ');
   return `🧴 Available room amenities:\n${toil || 'Fresh towels, toiletries, blankets, etc.'}\n\nTap the "Request" button on your screen to send a request directly to reception!`;
 }

 // 11. Reception / Contact
 if(text.includes('phone') || text.includes('call') || text.includes('contact') || text.includes('reception') || text.includes('desk') || text.includes('front desk')){
   return `📞 Reception Contact:\nPhone: ${S.hotel.phone || '+91 8956364864'}\nHotel: ${S.hotel.name} (${S.hotel.tagline || ''})\n\nFeel free to call or message us for any assistance!`;
 }

 // 12. Hotel Info & Custom Knowledge
 if(S.hotel.ai_info && S.hotel.ai_info.trim()){
   const info = S.hotel.ai_info.trim();
   const words = text.split(/[\s,?.!]+/).filter(w => w.length > 2);
   const infoLower = info.toLowerCase();
   const hasMatch = words.some(w => infoLower.includes(w));
   
   if(hasMatch || text.includes('hotel') || text.includes('about') || text.includes('facility') || text.includes('facilities') || text.includes('pool') || text.includes('swimming') || text.includes('beach') || text.includes('sea') || text.includes('tour') || text.includes('place') || text.includes('near') || text.includes('location')){
     return `ℹ️ About ${S.hotel.name}:\n${info}`;
   }
 }

 // 13. Greetings
 if(text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('namaste') || text.includes('good morning') || text.includes('good evening')){
   return `Welcome to ${S.hotel.name}! 🌴 I am your Relax Concierge.\n\nYou can ask me about our dining menu, drinks & sweets, WiFi details, house rules, or request room amenities.`;
 }

 // 14. Fallback summary
 const summary = [
   allCategories.length ? `• Food & Drinks (${allCategories.map(c => c.cat).join(', ')})` : '',
   S.wifi.name ? `• WiFi details` : '',
   (S.rules || []).length ? `• House rules & timings` : '',
   (S.toil || []).length ? `• Room amenities & requests` : '',
   S.hotel.phone ? `• Reception: ${S.hotel.phone}` : ''
 ].filter(Boolean).join('\n');

 return `I'm happy to help! You can ask me about:\n${summary}\n\nOr feel free to call our reception${S.hotel.phone ? ` at ${S.hotel.phone}` : ''} 🌴`;
}

async function chatSend(pre){
 if(busy||!AI)return;
 const i=$('#cin'),v=String(pre||(i&&i.value)||'').trim().slice(0,400);
 if(!v)return;
 if(i)i.value='';
 chat.push({role:'user',content:v},{role:'assistant',content:''});
 busy=true;
 paint();
 
 const startTime = Date.now();
 let replyText = '';

 let h=chat.slice(0,-1).filter(m=>m.content).slice(-10);
 while(h.length&&h[0].role!=='user')h.shift();

 try{
   const {data,error}=await SB.functions.invoke('ai-chat',{body:{messages:h}});
   if(error||!data||!data.reply)throw error||new Error('Edge function unavailable');
   replyText=data.reply;
 }catch(e){
   replyText=smartReply(v);
 }

 const elapsed = Date.now() - startTime;
 const delay = Math.max(0, 1000 - elapsed);
 setTimeout(()=>{
   chat[chat.length-1].content=replyText;
   busy=false;
   paint();
 }, delay);
}
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='cin')chatSend()});

let ord={open:false,view:'browse',tab:'toil',cart:{},msg:'',name:'',room:'',note:'',sent:'',sentTab:'',err:''};
let fp={open:false,cat:0,q:'',veg:false,view:'menu',sent:''};
try{const g=JSON.parse(localStorage.getItem('rx_guest')||'{}');ord.name=g.name||'';ord.room=g.room||''}catch(e){}
const num=s=>{let d=String(s||'').replace(/\D/g,'');if(d.length===10)d='91'+d;return d.length>=11?d:''};
const dest=t=>t==='food'?S.order.food:S.order.desk;
const canOrder=()=>!!(S.order.on&&[S.order.food,S.order.desk].some(d=>num(d.wa)||num(d.sms)));
const qty=k=>ord.cart[k]||0,rs=v=>{const n=parseFloat(v);return isNaN(n)?0:n};

function lines(){const f=[],t=[];S.menu.forEach(c=>c.items.forEach(i=>{const q=qty('f:'+i.id);if(q&&i.a)f.push({q,n:i.n,p:i.p,k:'f:'+i.id})}));S.toil.forEach(i=>{const q=qty('t:'+i.id);if(q&&i.a)t.push({q,n:i.n,p:i.p,k:'t:'+i.id})});return{f,t}}
const items=k=>{const l=lines();return k==='food'?l.f:k==='toil'?l.t:[]};
const cnt=k=>items(k).reduce((s,x)=>s+x.q,0),tot=k=>items(k).reduce((s,x)=>s+x.q*rs(x.p),0);
const sumText=k=>{if(k==='msg')return ord.msg.trim()?'Message ready':'Write your message';const c=cnt(k),t=tot(k);return c?`${c} item${c>1?'s':''}${t?` · Rs ${t}`:''}`:'Nothing added yet'};
const TL={food:'Goes to: Kitchen',toil:'Goes to: Reception (toiletries)',msg:'Goes to: Reception (message)'};

function buildMsg(bold,k){const B=x=>bold?'*'+x+'*':x,ln=x=>`- ${x.q} x ${x.n}${rs(x.p)?` (Rs ${rs(x.p)})`:''}`,ti={food:'New Food Order',toil:'New Toiletries Request',msg:'New Message'}[k],L=[B(S.hotel.name+' - '+ti),'Room: '+ord.room.trim(),'Name: '+ord.name.trim()];
 if(k==='msg')L.push('',B('MESSAGE'),ord.msg.trim());else L.push('',B(k==='food'?'FOOD':'TOILETRIES'),...items(k).map(ln));
 if(ord.note.trim())L.push('',B('NOTE'),ord.note.trim());const tt=tot(k);if(tt)L.push('','Total: Rs '+tt);L.push('',new Date().toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}));return L.join('\n')}

const stepper=(k,q)=>`<div class="qty"><button data-act="qq" data-k="${k}" data-d="-1" aria-label="Remove one">-</button><span>${q}</span><button class="p" data-act="qq" data-k="${k}" data-d="1" aria-label="Add one">+</button></div>`;
const fCtl=k=>qty(k)?stepper(k,qty(k)):`<button class="btn add" data-act="qq" data-k="${k}" data-d="1">Add</button>`;
const fCard=i=>{const k='f:'+i.id;return `<div class="fc ${i.a?'':'off'}"><span class="vd ${i.v?'v':'n'}"></span><div class="im"><b>${esc(i.n)}</b>${i.d?`<small>${esc(i.d)}</small>`:''}<span class="fprice">${i.p?'Rs '+esc(i.p):''}</span></div>${i.a?`<div class="fctl">${fCtl(k)}</div>`:'<span class="sold">Sold out</span>'}</div>`};

function fList(){const n=fp.q.toLowerCase(),src=fp.q?S.menu.flatMap(x=>x.items):(S.menu[fp.cat]||{items:[]}).items;
 const it=src.filter(i=>(!fp.veg||i.v)&&(!n||(i.n+' '+i.d).toLowerCase().includes(n))).map(fCard).join('')||'<p class="mu" style="padding:14px 0">No dishes match.</p>';
 return (fp.q?'':`<div class="pills sticky">${S.menu.map((x,i)=>`<button class="pill ${i===fp.cat?'on':''}" data-act="fcat" data-i="${i}">${esc(x.cat)}</button>`).join('')}</div>`)+it}

function fBar(){const c=cnt('food'),t=tot('food');return c?`<button class="btn" data-act="freview">View order · ${c} item${c>1?'s':''}${t?' · Rs '+t:''}</button>`:''}

function formHtml(tab){const f=tab==='food',p=f?'f':'o',d=dest(tab),wa=num(d.wa),sm=num(d.sms)||wa;
 return `<div class="oform"><div class="two"><input id="${p}n" placeholder="Your name *" maxlength="60" value="${esc(ord.name)}" autocomplete="name"><input id="${p}r" placeholder="Room no. *" maxlength="10" value="${esc(ord.room)}"></div><input id="${p}x" placeholder="Extra note (optional)" maxlength="300" value="${esc(ord.note)}"><div class="odest">${TL[tab]}</div>${f?'':`<div class="osum" id="osum">${sumText(tab)}</div>`}<div class="oerr" id="${f?'ferr':'oerr'}">${esc(ord.err)}</div>${wa||sm?'':'<p class="mu" style="font-size:.9rem;margin:4px 0 8px">Reception has not set up the ordering number yet. Tap Copy order and show it at reception, or call.</p>'}<div class="osend">${wa?`<button class="btn" data-act="${p}wa">Send on WhatsApp</button>`:''}${sm?`<button class="btn g" data-act="${p}sms">Send as SMS</button>`:''}<button class="btn g" data-act="${p}copy">Copy order</button></div></div>`}

function fCheck(){
 if(fp.view==='sent')return `<div class="ocnf"><h2>Almost done!</h2><p>${fp.sent==='wa'?'WhatsApp':'Your messaging app'} has opened with your food order. <b>Press Send there to place it.</b> If nothing opened, go back and tap Copy order, then show it at reception.</p><div class="osend"><button class="btn g" data-act="fcheckback">Back</button><button class="btn" data-act="fnew">New order</button></div></div>`;
 const l=items('food'),t=tot('food');
 return `<h2 style="margin:14px 0 4px">Your order</h2>${l.map(x=>`<div class="oi"><div class="im"><b>${esc(x.n)}</b>${rs(x.p)?`<small>Rs ${rs(x.p)} each</small>`:''}</div>${stepper(x.k,x.q)}</div>`).join('')||'<p class="mu">Your order is empty. Go back and add dishes.</p>'}${t?`<div class="osum" style="margin:10px 0">Total: Rs ${t}</div>`:''}${l.length?formHtml('food'):''}`}

function foodPage(){const m=fp.view==='menu';return `<div class="fpage ${fp.open?'open':''}" id="fpage"><div class="fh"><button data-act="fback" aria-label="Back">←</button><b>Order Food</b></div><div id="ftools" class="ftools ${m?'':'hidden'}"><input id="fs" type="search" placeholder="Search dishes…" value="${esc(fp.q)}"><label class="sw"><input type="checkbox" id="fv" ${fp.veg?'checked':''}>Veg only</label></div><div id="flist">${m?fList():''}</div><div id="fcheck" class="fcheck">${m?'':fCheck()}</div><div class="fbar" id="fbar">${m?fBar():''}</div></div>`}

function paintFood(){const m=fp.view==='menu',l=$('#flist'),c=$('#fcheck'),b=$('#fbar'),t=$('#ftools');if(l)l.innerHTML=m?fList():'';if(c)c.innerHTML=m?'':fCheck();if(b)b.innerHTML=m?fBar():'';if(t)t.classList.toggle('hidden',!m)}

const oRow=(k,n,p)=>`<div class="oi"><div class="im"><b>${esc(n)}</b>${p?`<small>Rs ${esc(p)}</small>`:''}</div>${stepper(k,qty(k))}</div>`;

function odyn(){
 if(!S.order.on)return '<p class="mu" style="padding:20px 4px">Ordering is switched off right now. Please call reception.</p>';
 if(ord.sent){const w={toil:'toiletries request',msg:'message'}[ord.sentTab]||'request';return `<div class="ocnf"><h2>Almost done!</h2><p>${ord.sent==='wa'?'WhatsApp':'Your messaging app'} has opened with your ${w}. <b>Press Send there to place it.</b> If nothing opened, go back and tap Copy order, then send it to reception.</p><div class="osend"><button class="btn g" data-act="oback">Back</button><button class="btn" data-act="onew">New ${ord.sentTab==='msg'?'message':'request'}</button></div></div>`}
 if(ord.view==='checkout')return checkoutHtml();
 const tabs=[['toil','🧴 Toiletries'],['msg','💬 Message']].map(t=>{const n=t[0]==='toil'?cnt('toil'):0;return `<button class="pill ${ord.tab===t[0]?'on':''}" data-act="otab" data-t="${t[0]}">${t[1]}${n?` (${n})`:''}</button>`}).join('');
 const b=ord.tab==='toil'?(S.toil.filter(i=>i.a&&i.n).map(i=>oRow('t:'+i.id,i.n,i.p)).join('')||'<p class="mu">No items available right now.</p>'):`<label>Message to staff</label><textarea id="omsg" rows="5" maxlength="500" placeholder="e.g. Please send someone to check the AC, or arrange a wake-up call at 7 AM">${esc(ord.msg)}</textarea>`;
 return `<div class="otabs">${tabs}</div>${b}`}

function checkoutHtml(){const t=ord.tab;let b;
 if(t==='msg')b=`<h2 style="margin:10px 0 6px">Your message</h2><div class="pickc" style="white-space:pre-wrap;margin-top:0">${esc(ord.msg)}</div>`;
 else{const l=items('toil');b=`<h2 style="margin:10px 0 4px">Your cart</h2>`+(l.map(x=>`<div class="oi"><div class="im"><b>${esc(x.n)}</b>${rs(x.p)?`<small>Rs ${rs(x.p)} each</small>`:''}</div>${stepper(x.k,x.q)}</div>`).join('')||'<p class="mu">Your cart is empty. Go back and add items.</p>')}
 return b+formHtml(t)+`<div class="osend" style="margin:0 0 14px"><button class="btn g" data-act="obackbrowse">← Back</button></div>`}

function obar(){if(!S.order.on||ord.sent||ord.view==='checkout')return '';if(ord.tab==='toil'){const c=cnt('toil'),t=tot('toil');return `<div class="obar">${c?`<button class="btn" data-act="oview">View cart · ${c} item${c>1?'s':''}${t?' · Rs '+t:''}</button>`:'<span class="mu">Add items to see your cart</span>'}</div>`}return ord.msg.trim()?'<div class="obar"><button class="btn" data-act="oview">Continue</button></div>':''}

function orderUI(){return `<div class="osheet ${ord.open?'open':''}" id="osheet"><div class="oh"><b>Room help: toiletries and messages</b><button data-act="oclose" aria-label="Close">✕</button></div><div id="odyn">${odyn()}</div><div id="ofw">${obar()}</div></div>`}
function paintOrder(){const d=$('#odyn');if(d)d.innerHTML=odyn();const f=$('#ofw');if(f)f.innerHTML=obar()}

function afterQty(k,t){if(k[0]==='f'){if(fp.view==='checkout')return paintFood();const c=t.closest('.fctl');if(c)c.innerHTML=fCtl(k);const b=$('#fbar');if(b)b.innerHTML=fBar()}else{const sp=t.parentElement.querySelector('span');if(sp)sp.textContent=qty(k);const sm=$('#osum');if(sm)sm.textContent=sumText(ord.tab);const tb=document.querySelector('.otabs .pill.on');if(tb&&ord.tab==='toil'){const c=cnt('toil');tb.textContent='🧴 Toiletries'+(c?` (${c})`:'')}const o=$('#ofw');if(o)o.innerHTML=obar()}}

function validate(tab){if(ord.name.trim().length<2)return 'Please enter your name.';if(!ord.room.trim())return 'Please enter your room number.';if(tab==='msg'){if(!ord.msg.trim())return 'Please write your message.'}else if(!cnt(tab))return 'Add at least one item.';return ''}

function sendOrder(kind,tab){ord.err=validate(tab);const e=$(tab==='food'?'#ferr':'#oerr');if(e)e.textContent=ord.err;if(ord.err)return;
 try{localStorage.setItem('rx_guest',JSON.stringify({name:ord.name.trim(),room:ord.room.trim()}))}catch(x){}
 if(kind==='copy'){const m=buildMsg(false,tab);(navigator.clipboard?navigator.clipboard.writeText(m):Promise.reject()).then(()=>toast('Order copied')).catch(()=>toast('Copy not available'));return}
 const d=dest(tab),wa=num(d.wa),sm=num(d.sms)||wa,u=kind==='wa'?`https://wa.me/${wa}?text=${encodeURIComponent(buildMsg(true,tab))}`:`sms:+${sm}?&body=${encodeURIComponent(buildMsg(false,tab))}`;
 const a=document.createElement('a');a.href=u;if(kind==='wa'){a.target='_blank';a.rel='noopener'}document.body.appendChild(a);a.click();a.remove();
 if(tab==='food'){fp.view='sent';fp.sent=kind;paintFood()}else{ord.sent=kind;ord.sentTab=tab;paintOrder()}boom($(tab==='food'?'#fpage':'#osheet'))}

document.addEventListener('input',e=>{const i=e.target.id,v=e.target.value;if(i==='on'||i==='fn')ord.name=v;else if(i==='or'||i==='fr')ord.room=v;else if(i==='ox'||i==='fx')ord.note=v;else if(i==='omsg'){ord.msg=v;const f=$('#ofw');if(f)f.innerHTML=obar()}else if(i==='fs'){fp.q=v;const l=$('#flist');if(l)l.innerHTML=fList()}else if(i==='fv'){fp.veg=e.target.checked;const l=$('#flist');if(l)l.innerHTML=fList()}});

document.addEventListener('pointermove',e=>{const t=$('#dtilt'),h=$('#hero');if(!t||!h)return;const r=h.getBoundingClientRect(),cl=v=>Math.max(-.5,Math.min(.5,v));t.style.setProperty('--rx',(cl((e.clientX-r.left)/r.width-.5)*10).toFixed(1));t.style.setProperty('--ry',(-cl((e.clientY-r.top)/r.height-.5)*8).toFixed(1))});

const CFG=window.APP_CONFIG||{};
const SB=(window.supabase&&CFG.SUPABASE_URL&&CFG.SUPABASE_ANON_KEY&&!/PASTE_/.test(CFG.SUPABASE_ANON_KEY))?window.supabase.createClient(CFG.SUPABASE_URL,CFG.SUPABASE_ANON_KEY):null;

function loginModal(){
 return `<div class="modal"><div class="card"><h2>Admin login</h2><input id="pw" type="password" placeholder="Password" autocomplete="current-password"><div class="st" id="lst"></div><div class="bar"><button class="btn g" data-act="closelogin">Cancel</button><button class="btn" data-act="dologin">Unlock</button></div></div></div>`;
}

async function fetchConfig(){
 const cfgId = CFG.CONFIG_ID || 2;
 const {data,error}=await SB.from('site_config').select('data').eq('id',cfgId).single();
 if(error||!data){
   // Fallback initial data for Hotel Relax if not yet created in Supabase
   S={
     hotel:{name:'Hotel Relax',tagline:'Rest · Restore · Relax',phone:'+91 8956364864',ai_info:'Welcome to Hotel Relax! Beach access is located in front of the property. Infinity pool open from 7 AM to 9 PM.'},
     wifi:{name:'HotelRelax_Guest',pass:'welcome123'},
     review:'https://www.google.com/search?q=Hotel+Relax+reviews',
     rules:['Check-out time is 11:00 AM.','Quiet hours after 10:00 PM.','No smoking inside rooms.','A valid photo ID is required for every guest.'],
     menu:[
       {cat:'Starters',items:[{id:'a1',n:'Veg Spring Rolls',p:'160',d:'Crisp rolls with sweet chilli',v:true,a:true},{id:'a2',n:'Chicken Tikka',p:'280',d:'Char-grilled spiced chicken',v:false,a:true}]},
       {cat:'Meals',items:[{id:'b1',n:'Veg Thali',p:'190',d:'Roti, rice, dal, 2 sabzi, sweet',v:true,a:true},{id:'b2',n:'Chicken Curry Thali',p:'270',d:'Chicken curry, rice, roti',v:false,a:true},{id:'b3',n:'Paneer Butter Masala',p:'240',d:'Creamy tomato gravy',v:true,a:true},{id:'b4',n:'Egg Fried Rice',p:'170',d:'Fragrant wok-tossed rice',v:false,a:true}]},
       {cat:'Drinks & Sweets',items:[{id:'c1',n:'Masala Chai',p:'20',d:'',v:true,a:true},{id:'c2',n:'Herbal Green Tea',p:'40',d:'Light and calming',v:true,a:true},{id:'c3',n:'Fresh Lime Soda',p:'60',d:'Sweet or salted',v:true,a:true},{id:'c4',n:'Gulab Jamun',p:'80',d:'Two warm pieces',v:true,a:true}]}
     ],
     notices:[{id:'n1',t:'Welcome to Hotel Relax! Feel free to ask Relax Concierge or reception for anything.',time:'Sample notice'}],
     order:{on:true,food:{wa:'918956364864',sms:''},desk:{wa:'918956364864',sms:''}},
     toil:[{id:'t1',n:'Toothbrush & paste kit',p:'',a:true},{id:'t2',n:'Soap',p:'',a:true},{id:'t3',n:'Shampoo sachet',p:'',a:true},{id:'t4',n:'Extra towel',p:'',a:true},{id:'t5',n:'Extra pillow',p:'',a:true},{id:'t6',n:'Extra blanket',p:'',a:true},{id:'t7',n:'Comb',p:'',a:true},{id:'t8',n:'Shaving kit',p:'',a:true}],
     pw:'8f2163fef73415da662abb10d21e76a7a2924192136de91d113b46bb2eb142d9'
   };
   // Attempt to save to row 2
   try{ await SB.from('site_config').insert({id:cfgId,data:S}) }catch(e){}
 } else {
   S=data.data;
 }
 normalize();
 document.title=S.hotel.name||document.title;
}

async function refresh(){
 try{
   await fetchConfig();
   if(!ord.open&&!fp.open&&!chatOpen&&!login&&!admin)render();
 }catch(e){}
}

function fail(t,m){
 document.getElementById('app').innerHTML='<div class="wrap"><div class="card"><h2>'+esc(t)+'</h2><p>'+esc(m)+'</p></div></div>';
}

async function boot(){
 if(!SB)return fail('Setup needed','Add your Supabase URL and anon key in config.js');
 try{await fetchConfig()}catch(e){return fail('Could not load site',(e&&e.message)||'Unknown error')}
 AI=true;
 render();
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
}
boot();
