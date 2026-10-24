const $ = id => document.getElementById(id);
const homeEl = $('home'), chatEl = $('chat'), scrollEl = $('scroll');
let inChat = false, ava = null;

function toChat(){
  if (inChat) return;
  inChat = true;
  homeEl.style.display = 'none';
  $('wm').style.display = 'none';
  chatEl.style.display = 'block';
  $('composer').style.display = 'block';
  $('topMid').style.display = 'flex';
 document.body.classList.add('inchat'); }
function toHome(){
  inChat = false; ava = null;
  chatEl.innerHTML = '';
  chatEl.style.display = 'none';
  $('composer').style.display = 'none';
  $('topMid').style.display = 'none';
  homeEl.style.display = 'block';
  $('wm').style.display = 'block';
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  scrollEl.scrollTop = 0;
 document.body.classList.remove('inchat'); }
function scrollDown(){ setTimeout(() => { scrollEl.scrollTop = scrollEl.scrollHeight; }, 40); }
function addUser(text){
  const d = document.createElement('div');
  d.className = 'msg me'; d.textContent = text;
  chatEl.appendChild(d); scrollDown();
}
function addBot(html){
  const t = document.createElement('div'); t.className = 'typing'; t.innerHTML = '<i></i><i></i><i></i>';
  chatEl.appendChild(t); scrollDown();
  return new Promise(res => setTimeout(() => {
    t.remove();
    const d = document.createElement('div');
    d.className = 'msg bot'; d.innerHTML = '<div class="ans">' + html + '</div>';
    chatEl.appendChild(d); scrollDown(); res(d);
  }, 780));
}
function addRaw(html){
  const d = document.createElement('div');
  d.className = 'msg bot'; d.innerHTML = '<div class="ans">' + html + '</div>';
  chatEl.appendChild(d); scrollDown(); return d;
}
function chips(list, fn){
  const c = document.createElement('div'); c.className = 'chips';
  list.forEach(t => {
    const b = document.createElement('button'); b.className = 'chip'; b.textContent = t;
    b.onclick = () => { c.remove(); fn(t); };
    c.appendChild(b);
  });
  chatEl.appendChild(c); scrollDown();
}


/* ---------- PROJECTS DATA + RENDERER ---------- */
const LI = "https://www.linkedin.com/in/mrahmadraza";
const PROJ = [
  {t:"Solace Dental Studio", cats:["ai"], tag:"AI Agent", img:"https://raw.githubusercontent.com/mr-ahmad161/ai-agent-demos/main/solace-dental-studio/demo.gif", d:"AI receptionist for a dental clinic in Chicago. She answers patients, offers real slots and books the appointment end to end. You can watch her work right here in this card.", gh:"https://github.com/mr-ahmad161/ai-agent-demos/tree/main/solace-dental-studio"},
  {t:"30 AI Agent Demos", cats:["ai"], tag:"Live Portfolio", g:"linear-gradient(160deg,#3A2A12,#14100A 55%,rgba(0,0,0,.85))", d:"A new working AI agent demo every single day, each with full code and a live GIF. One open portfolio, updated daily.", gh:"https://github.com/mr-ahmad161/ai-agent-demos"},
  {t:"CareerKitPro", cats:["ai","web"], tag:"AI Web App", g:"linear-gradient(160deg,#1D4ED8,#0B1B3D 55%,rgba(0,0,0,.85))", d:"AI resume builder. It writes ATS friendly resumes in minutes, takes Stripe payments and exports clean PDF and DOCX files.", gh:"https://github.com/mr-ahmad161/careerkitpro"},
  {t:"Calzo AI Calorie Counter", cats:["mobile","ai"], tag:"Mobile AI, App Store", g:"linear-gradient(160deg,#17402F,#0C1F18 55%,rgba(0,0,0,.85))", d:"Flutter app that reads a meal from one photo and gives calories and macros with progress tracking. Live on the App Store.", li:LI},
  {t:"Flare Match", cats:["mobile","ai"], tag:"Mobile App, Google Play", g:"linear-gradient(160deg,#B3232A,#3D0A0C 55%,rgba(0,0,0,.85))", d:"Dating app with AI driven matching, secure chat, subscriptions and boosts. Live on Google Play.", li:LI},
  {t:"Euraxia Visa Platform", cats:["web"], tag:"Full Stack SaaS", g:"linear-gradient(160deg,#8A5A12,#241A06 55%,rgba(0,0,0,.85))", d:"Complete platform for a European visa consultancy. Applications, documents, invoicing, support tickets and live chat in one system.", gh:"https://github.com/mr-ahmad161/Euraxia-Visa-Application"},
  {t:"Tessio Leisures", cats:["web"], tag:"E commerce", g:"linear-gradient(160deg,#3D1D52,#170B26 55%,rgba(0,0,0,.85))", d:"Online store for a London women's activewear brand. React and TypeScript, fast product pages, WhatsApp support and a fit guarantee flow.", li:LI},
  {t:"Ticket Draws", cats:["mobile"], tag:"Mobile App, Google Play", g:"linear-gradient(160deg,#7A3B06,#2A1503 55%,rgba(0,0,0,.85))", d:"The Free Lottery. Weekly sweepstakes draws, jackpot tiers, rewarded ads and real payouts. Live on Google Play.", li:LI},
  {t:"Daily Frame", cats:["mobile"], tag:"Mobile App, Google Play", g:"linear-gradient(160deg,#0F4C5C,#07242C 55%,rgba(0,0,0,.85))", d:"Privacy first chat and scheduling app. End to end encrypted messages and calls, calendar scheduling and group booking. Live on Google Play.", li:LI},
  {t:"Woo Me", cats:["mobile"], tag:"Mobile App, App Store", g:"linear-gradient(160deg,#8E2A4E,#380E20 55%,rgba(0,0,0,.85))", d:"Date night app for couples. Date planning, an idea library, real time chat and a web admin panel. Live on the App Store.", li:LI},
  {t:"Card Fraud Detection", cats:["data"], tag:"Data Science", g:"linear-gradient(160deg,#5C1A1A,#200A0A 55%,rgba(0,0,0,.85))", d:"Machine learning that flags fraudulent card transactions, so a business can stop bad payments before they cost money.", gh:"https://github.com/mr-ahmad161/Card-Fraud-detection"},
  {t:"MediCore AI", cats:["ai","mobile"], tag:"AI Hospital System", g:"linear-gradient(160deg,#0E5A6D,#07272F 55%,rgba(0,0,0,.85))", d:"Agentic AI hospital system. An AI scribe, a triage agent and pharmacy prediction working together for a full hospital.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7486665362185498624/", vid:true},
  {t:"CallDesk AI", cats:["ai"], tag:"Voice AI Agent", g:"linear-gradient(160deg,#4B2E83,#1D1038 55%,rgba(0,0,0,.85))", d:"A realtime voice agent that answers phone calls and books appointments for a dental clinic, talking like a real receptionist.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7484421436619804672/", vid:true},
  {t:"Talim AI", cats:["mobile","ai"], tag:"AI Learning App", g:"linear-gradient(160deg,#9A5A12,#33200A 55%,rgba(0,0,0,.85))", d:"Mobile first learning platform for South Asia with a bilingual Urdu and English AI tutor, adaptive paths and auto grading.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7487029637450203136/", vid:true},
  {t:"Paisa", cats:["mobile","ai"], tag:"AI Money App", g:"linear-gradient(160deg,#0C5C40,#06231A 55%,rgba(0,0,0,.85))", d:"AI expense tracker for iPhone. Log spending by chat, scan receipts and watch your budget live.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7488192417519779840/", vid:true},
  {t:"Noor Quran", cats:["mobile","ai"], tag:"AI Mobile App", g:"linear-gradient(160deg,#14532D,#081F10 55%,rgba(0,0,0,.85))", d:"AI powered Quran companion with a tafseer chatbot and a tajweed checker, built with React Native.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7484789625887322112/", vid:true},
  {t:"MedixAI", cats:["web","ai"], tag:"Clinic Platform", g:"linear-gradient(160deg,#175A8A,#0A2438 55%,rgba(0,0,0,.85))", d:"Clinic management platform that cut patient wait time by 22 percent. React, Node and PostgreSQL with AI inside.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7484429878868492288/", vid:true},
  {t:"ResumeRank AI", cats:["ai","web"], tag:"AI Hiring Tool", g:"linear-gradient(160deg,#3730A3,#141138 55%,rgba(0,0,0,.85))", d:"Ranks resumes against a job description in seconds. What took 6 hours by hand now takes about 5 seconds per role.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7484175629878300672/", vid:true},
  {t:"Real Estate Tour Agent", cats:["ai"], tag:"AI Agent", g:"linear-gradient(160deg,#7A5A2E,#2A1E0C 55%,rgba(0,0,0,.85))", d:"Send 5 photos of a property and this agent builds a full 3D virtual tour in about 2 seconds.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7483396393794187264/", vid:true},
  {t:"Curator", cats:["ai","web"], tag:"AI Shopping", g:"linear-gradient(160deg,#8E2A4E,#380E20 55%,rgba(0,0,0,.85))", d:"AI shopping experience for fashion retail. Customers describe what they want in plain words and the agent finds it.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7488848301539205120/", vid:true},
  {t:"PULSE", cats:["mobile"], tag:"Fitness App", g:"linear-gradient(160deg,#B3402A,#3D1409 55%,rgba(0,0,0,.85))", d:"Fitness tracking app built for a client, with clean activity tracking and a simple daily dashboard.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7482022062820286465/", vid:true},
  {t:"Vision Defect Inspection", cats:["data","ai"], tag:"Computer Vision", g:"linear-gradient(160deg,#2C4A63,#101E29 55%,rgba(0,0,0,.85))", d:"Computer vision for a US manufacturing client. It inspects parts for defects at 99.2 percent accuracy in 47 milliseconds.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7484170696663916544/", vid:true},
  {t:"n8n Lead Automation", cats:["ai"], tag:"Automation", g:"linear-gradient(160deg,#5B2A86,#1E0E33 55%,rgba(0,0,0,.85))", d:"An autonomous lead qualification and outreach workflow. It processed 14,382 leads and booked 612 meetings.", li:"https://www.linkedin.com/feed/update/urn:li:activity:7484166599130935296/", vid:true},
];


const COVERS = {"CareerKitPro":"covers/careerkitpro.jpg?v=21","Euraxia Visa Platform":"covers/euraxia.jpg?v=21","Calzo AI Calorie Counter":"covers/calzo.jpg?v=21","Tessio Leisures":"covers/tessio.jpg?v=21","Ticket Draws":"covers/ticketdraws.jpg?v=21","Daily Frame":"covers/dailyframe.jpg?v=21","Woo Me":"covers/woome.jpg?v=21","Flare Match":"covers/flarematch.jpg?v=21","Card Fraud Detection":"covers/cardfraud.jpg?v=21","30 AI Agent Demos":"covers/demos.jpg?v=21","MediCore AI":"covers/medicore.jpg?v=21","CallDesk AI":"covers/calldesk.jpg?v=21","Talim AI":"covers/talim.jpg?v=21","Paisa":"covers/paisa.jpg?v=21","Noor Quran":"covers/noorquran.jpg?v=21","MedixAI":"covers/medix.jpg?v=21","ResumeRank AI":"covers/resumerank.jpg?v=21","Real Estate Tour Agent":"covers/realestate.jpg?v=21","Curator":"covers/curator.jpg?v=21","PULSE":"covers/pulse.jpg?v=21","Vision Defect Inspection":"covers/cvision.jpg?v=21","n8n Lead Automation":"covers/n8n.jpg?v=21","Solace Dental Studio":"covers/solace.jpg?v=21"};
const CATS = {all:"My Projects", ai:"AI and Agent Projects", mobile:"Mobile App Projects", web:"Web Projects", data:"Data Science Projects"};
function cardHTML(p){
  const src = COVERS[p.t] || p.img || "";
  const media = `<div class="pc-media" style="background:${p.g || "#EDF0F5"}">${src ? `<img src="${src}" alt="${p.t}">` : ``}</div>`;
  let btns = "";
  if (p.gh) btns += `<a class="pbtn" href="${p.gh}" target="_blank" rel="noopener">Code on GitHub</a>`;
  if (p.li) btns += `<a class="pbtn gold" href="${p.li}" target="_blank" rel="noopener">${p.vid ? "Watch on LinkedIn" : "See on LinkedIn"}</a>`;
  return `<div class="pcard">${media}<div class="pc-body"><span class="tag">${p.tag}</span><div class="tt">${p.t}</div><div class="ds">${p.d}</div><div class="pc-btns">${btns}</div></div></div>`;
}
function renderProjects(cat){
  const list = PROJ.filter(p => cat === "all" || p.cats.includes(cat));
  const chips = Object.keys(CATS).map(k => `<button class="fchip ${k===cat?"on":""}" onclick="filterProj('${k}', this)">${k==="all"?"All":CATS[k].replace(" Projects","")}</button>`).join("");
  return `<h3>${CATS[cat]}</h3>
    <p style="margin-bottom:10px">Pick a category, or swipe through the work. Every card takes you to the code on GitHub or the project on LinkedIn.</p>
    <div class="fchips">${chips}</div>
    <div class="carousel pcar">${list.map(cardHTML).join("")}</div>
    <div class="pc-nav"><button onclick="pcarScroll(this,-1)">&#8592;</button><button onclick="pcarScroll(this,1)">&#8594;</button></div>
    <p>Several of my apps are live on the <b>App Store</b> and <b>Google Play</b>, and every agent demo is working code you can open and read.</p>
    <p>Want one built for your business? <a href="#" onclick="ask('contact','How can I contact you?');return false;">Contact me</a>, or watch the <a href="#" onclick="ask('demo','Show me the live agent demo');return false;">live agent demo</a>.</p>`;
}
function filterProj(cat, btn){ const a = btn.closest('.ans'); if (a) a.innerHTML = renderProjects(cat); }
function showProj(cat, label){ toChat(); addUser(label); addBot(renderProjects(cat)); }

/* ---------- ANSWERS ---------- */
const A = {
  me: () => `
    <div class="profile-card">
      <div class="av photo"></div>
      <div>
        <div class="nm">Ahmad Raza <span class="sig">Ahmad</span> <span class="live"><i></i>Available for work</span></div>
        <div class="prow"><b>Role</b> — Full Stack Developer, AI and Agentic AI</div>
        <div class="prow"><b>Based in</b> — Lahore, working with the USA, UK and worldwide</div>
        <div class="prow"><b>Experience</b> — 5+ years, 180+ projects on GitHub</div>
      </div>
    </div>
    <p>I build complete products from start to finish: <b>mobile apps</b>, <b>web apps</b>, <b>data science</b> solutions and <b>AI Agents</b> that reply to customers, take bookings and follow up on their own, day and night.</p>
    <p>Several of my apps are live on the App Store and Google Play. One developer for your app, your website, your data and your AI.</p>
    <p><button class="btn" onclick="ask('contact','How can I contact you?')">Contact me</button> <a class="btn wa" href="https://wa.me/923424018762" target="_blank" rel="noopener" style="text-decoration:none">WhatsApp me</a></p>`,
  projects: () => renderProjects('all'),
  skills: () => `
    <h3>Skills &amp; Expertise</h3>
    <h4>AI Agents and Agentic AI</h4>
    <div class="pills g-ai"><span class="pillb">AI Agents</span><span class="pillb">OpenAI</span><span class="pillb">Claude</span><span class="pillb">LangChain</span><span class="pillb">LangGraph</span><span class="pillb">CrewAI</span><span class="pillb">RAG</span><span class="pillb">Prompt Engineering</span><span class="pillb">n8n</span></div>
    <h4>Programming Languages</h4>
    <div class="pills g-lang"><span class="pillb">Python</span><span class="pillb">JavaScript</span><span class="pillb">Dart</span><span class="pillb">Java</span><span class="pillb">C#</span><span class="pillb">C++</span><span class="pillb">R</span></div>
    <h4>Web and Mobile</h4>
    <div class="pills g-web"><span class="pillb">React</span><span class="pillb">Node.js</span><span class="pillb">Flutter</span><span class="pillb">HTML5</span><span class="pillb">CSS3</span><span class="pillb">Firebase</span></div>
    <h4>Data Science and ML</h4>
    <div class="pills g-data"><span class="pillb">TensorFlow</span><span class="pillb">Scikit-Learn</span><span class="pillb">Pandas</span><span class="pillb">NumPy</span><span class="pillb">Power BI</span><span class="pillb">Tableau</span></div>
    <h4>Tools I Build With</h4>
    <div class="pills g-tools"><span class="pillb light">Cursor</span><span class="pillb light">Lovable</span><span class="pillb light">GitHub</span><span class="pillb light">VS Code</span><span class="pillb light">Android Studio</span></div>
    <p style="margin-top:12px">In short: if it is an agent, an app, a website or a data problem, I can build it end to end.</p>`,
  contact: () => `
    <h3>Contact</h3>
    <div class="profile-card" style="margin-top:12px">
      <div class="av photo"></div>
      <div>
        <div class="nm">Ahmad Raza <span class="live"><i></i>Available for work</span></div>
        <div class="prow">The fastest way to reach me is WhatsApp. I reply fast.</div>
      </div>
    </div>
    <p><a class="btn wa" href="https://wa.me/923424018762" target="_blank" rel="noopener" style="text-decoration:none">WhatsApp Me</a> <a class="btn blue" href="mailto:mr.ahmad161.9l@gmail.com" style="text-decoration:none">Email Me</a></p>
    <div class="cgrid">
      <a class="crow" href="mailto:mr.ahmad161.9l@gmail.com" target="_blank" rel="noopener"><span class="ci" style="background:#2F80ED"><svg viewBox="0 0 24 24" fill="#fff"><path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5zm2 .4V19h16V5.4l-8 6.1-8-6.1z"/></svg></span><span><span class="cl">Email</span><br><span class="cv">mr.ahmad161.9l@gmail.com</span></span><span class="car">&#8250;</span></a>
      <a class="crow" href="https://wa.me/923424018762" target="_blank" rel="noopener"><span class="ci" style="background:#25D366"><svg viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg></span><span><span class="cl">WhatsApp</span><br><span class="cv">+92 342 4018762</span></span><span class="car">&#8250;</span></a>
      <a class="crow" href="https://www.linkedin.com/in/mrahmadraza" target="_blank" rel="noopener"><span class="ci" style="background:#0A66C2"><svg viewBox="0 0 24 24" fill="#fff"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.6-2 3 0 4.5 1.9 4.5 5.6V21h-4v-5.9c0-1.4-.5-2.4-1.9-2.4-1.5 0-2.3 1-2.3 2.4V21H9z"/></svg></span><span><span class="cl">LinkedIn</span><br><span class="cv">linkedin.com/in/mrahmadraza</span></span><span class="car">&#8250;</span></a>
      <a class="crow" href="https://github.com/mr-ahmad161" target="_blank" rel="noopener"><span class="ci" style="background:#111113"><svg viewBox="0 0 24 24" fill="#fff"><path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg></span><span><span class="cl">GitHub</span><br><span class="cv">github.com/mr-ahmad161</span></span><span class="car">&#8250;</span></a>
      <a class="crow" href="https://www.instagram.com/itx_a.mad" target="_blank" rel="noopener"><span class="ci" style="background:#E84393"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.3" fill="#fff" stroke="none"/></svg></span><span><span class="cl">Instagram</span><br><span class="cv">@itx_a.mad</span></span><span class="car">&#8250;</span></a>
    </div>
    <p><b>Open to new projects.</b> If your business needs an AI Agent, a mobile app, a web app or a data solution, send me a message and let us build it.</p>`,
  services: () => `
    <h3>What I Build</h3>
    <p><b>Agentic AI for businesses.</b> AI Agents that book appointments, support customers and capture leads on their own, answering in seconds and working 24/7.</p>
    <p><b>Mobile apps.</b> Android and cross platform apps, clean, fast and ready for real users.</p>
    <p><b>Web apps and websites.</b> Full stack web products, from the screen your customer sees to the system behind it.</p>
    <p><b>Data science.</b> Analysis, dashboards and machine learning models that turn raw data into clear decisions.</p>
    <p>See them in action in <a href="#" onclick="ask('projects','Show me your projects');return false;">Projects</a>, or watch the <a href="#" onclick="ask('demo','Show me the live agent demo');return false;">live agent demo</a>.</p>`,
  fallback: () => `
    <p>Good question. I can answer best about Ahmad's work. Try one of these:</p>`,
};

/* ---------- AVA DEMO (inside the chat) ---------- */
function avaBot(html){ return addBot(html); }
async function startDemo(){
  ava = {step:'service'};
  await avaBot(`<p>Meet <b>Ava</b>, an AI receptionist I built for a dental clinic in Chicago. She works right here in this chat. Go ahead, talk to her like a patient.</p><p>Hello, welcome to Solace Dental Studio. I am Ava. How can I help you today?</p>`);
  chips(['Book an appointment','Opening hours','Prices'], demoPick);
}
async function demoPick(t){
  addUser(t);
  if (t === 'Opening hours'){ await avaBot(`<p>We are open Monday to Saturday, 9 AM to 7 PM. Would you like to book a visit?</p>`); chips(['Book an appointment'], demoPick); return; }
  if (t === 'Prices'){ await avaBot(`<p>Cleaning is $89, whitening is $199 and a full checkup is $59. Shall I book you in?</p>`); chips(['Book an appointment'], demoPick); return; }
  ava.step = 'day';
  await avaBot(`<p>Great. Which treatment do you need?</p>`);
  chips(['Dental Cleaning','Teeth Whitening','Full Checkup'], async s => {
    addUser(s); ava.service = s; ava.step = 'time';
    await avaBot(`<p>Perfect choice. Which day suits you?</p>`);
    chips(['Today','Tomorrow','Saturday'], async d => {
      addUser(d); ava.day = d; ava.step = 'name';
      await avaBot(`<p>And what time works best?</p>`);
      chips(['10:30 AM','12:00 PM','4:30 PM'], async tm => {
        addUser(tm); ava.time = tm;
        await avaBot(`<p>Almost done. What is your name? Type it below.</p>`);
      });
    });
  });
}
async function demoName(name){
  ava.step = 'done';
  const d = document.createElement('div');
  d.className = 'confirm';
  d.innerHTML = '✓ <b>Booking confirmed</b><br>' + ava.service + '<br>' + ava.day + ' at ' + ava.time + '<br>Patient: ' + name + '<br>Ava will send a friendly reminder before your visit.';
  chatEl.appendChild(d); scrollDown();
  await avaBot(`<p>All set, ${name}. That is what my agent does for a business, every day, on its own. <b>Imagine one on your website.</b></p>`);
  chips(['See projects','Contact Ahmad'], t => {
    if (t === 'See projects') ask('projects','Show me your projects');
    else ask('contact','How can I contact you?');
  });
  ava = null;
}

/* ---------- ROUTER ---------- */
const LABELS = { me:'Who are you?', projects:'Show me your projects', skills:'What are your skills?', demo:'Show me the live agent demo', contact:'How can I contact you?' };
async function ask(key, label){
  toChat();
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.q === key));
  addUser(label || LABELS[key]);
  if (key === 'demo'){ await startDemo(); return; }
  await addBot(A[key]());
  if (key === 'fallback') chips(['Who are you?','Show me your projects','What are your services?','Contact'], t => routeText(t));
}
function pcarScroll(btn, dir){ const a = btn.closest('.ans'); const c = a ? a.querySelector('.pcar') : null; if (c) c.scrollBy({left: dir * 290, behavior:'smooth'}); }
function routeText(v){
  const low = v.toLowerCase();
  if (ava && ava.step === 'name'){ addUser(v); demoName(v); return; }
  if (low.includes('demo') || low.includes('ava') || low.includes('book')){ ask('demo', v); return; }
  if (low.includes('agent')){ showProj('ai', v); return; }
  if (low.includes('mobile') || low.includes('flutter') || low.includes('android') || low.includes('ios')){ showProj('mobile', v); return; }
  if (low.includes('data') || low.includes('machine learning')){ showProj('data', v); return; }
  if (low.includes('website') || low.includes('web')){ showProj('web', v); return; }
  if (low.includes('project') || low.includes('work') || low.includes('portfolio')){ ask('projects', v); return; }
  if (low.includes('skill') || low.includes('tech') || low.includes('stack')){ ask('skills', v); return; }
  if (low.includes('service') || low.includes('build') || low.includes('offer') || low.includes('price') || low.includes('cost') || low.includes('charge')){ ask('services', v); return; }
  if (low.includes('contact') || low.includes('hire') || low.includes('email') || low.includes('reach')){ ask('contact', v); return; }
  if (low.includes('who') || low.includes('about') || low.includes('ahmad') || low.includes('hello') || low.includes('hi')){ ask('me', v); return; }
  toChat(); addUser(v); addBot(A.fallback()).then(() => chips(['Who are you?','Show me your projects','What are your services?','Contact'], t => routeText(t)));
}

/* ---------- WIRING ---------- */
function wire(inputId, btnId){
  const inp = $(inputId), btn = $(btnId);
  inp.addEventListener('input', () => { btn.disabled = !inp.value.trim(); });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && inp.value.trim()){ const v = inp.value.trim(); inp.value=''; btn.disabled = true; routeText(v); } });
  btn.onclick = () => { const v = inp.value.trim(); if (!v) return; inp.value=''; btn.disabled = true; routeText(v); };
}
wire('askIn','askSend');
wire('chatIn','chatSend');
document.querySelectorAll('.qcard').forEach(c => c.onclick = () => ask(c.dataset.q));
document.querySelectorAll('.tab').forEach(t => t.onclick = () => ask(t.dataset.q));
$('homeBtn').onclick = toHome;
$('backBtn').onclick = toHome;

document.addEventListener('mousemove', e => {
  const el = e.target.closest ? e.target.closest('.qcard,.pcard,.crow') : null;
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, {passive:true});

setTimeout(function(){
  if (window.__fluidStarted) return;
  var cv = document.createElement('canvas');
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none';
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d');
  function size(){ cv.width = innerWidth * (devicePixelRatio||1); cv.height = innerHeight * (devicePixelRatio||1); }
  size(); addEventListener('resize', size);
  var palette = ['255,107,157','167,139,250','125,211,252','110,231,183','253,224,71','251,146,60'];
  function blob(x, y, r, color, a){
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(' + color + ',' + a + ')');
    g.addColorStop(1, 'rgba(' + color + ',0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
  function paint(x, y, color, big){
    var pr = devicePixelRatio||1;
    blob(x*pr, y*pr, (big ? 130 : 85) * pr, color, big ? 0.85 : 0.55);
  }
  function burst(x, y){
    var c = palette[Math.floor(Math.random()*palette.length)];
    for (var i=0;i<10;i++){
      var a = Math.random()*6.28, d = Math.random()*110;
      paint(x + Math.cos(a)*d, y + Math.sin(a)*d, c, true);
    }
  }
  var cur = null;
  addEventListener('mousemove', function(e){
    if (!cur) cur = palette[Math.floor(Math.random()*palette.length)];
    paint(e.clientX, e.clientY, cur, false);
  }, {passive:true});
  addEventListener('mousedown', function(e){ burst(e.clientX, e.clientY); }, {passive:true});
  addEventListener('touchstart', function(e){ var t=e.touches[0]; burst(t.clientX, t.clientY); }, {passive:true});
  addEventListener('touchmove', function(e){
    var t=e.touches[0];
    if (!cur) cur = palette[Math.floor(Math.random()*palette.length)];
    paint(t.clientX, t.clientY, cur, false);
  }, {passive:true});
  (function fade(){
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,0.045)';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(fade);
  })();
}, 900);