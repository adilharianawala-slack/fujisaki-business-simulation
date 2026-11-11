const BASE = {revenue:8671, materials:4704, labour:1609, otherOpex:1411, depreciation:225, amortisation:252, interest:243, cash:253, inventory:46, receivables:2138, ppe:2025, development:816, payables:1242, debt:1500, shareCapital:245, sharePremium:875, retained:1416};
const situations = [
[
 {title:"Raw-material price shock",desc:"A key supplier announces a sharp increase in the price of a critical input. Your gross margin is exposed and competitors are also reviewing their sourcing strategies.",choices:[
  ["Absorb the increase","Protect customer pricing and accept lower margins.",{revenue:0,cost:150,wc:0}],
  ["Pass on part of the increase","Increase selling prices selectively; some volume may be lost.",{revenue:-90,cost:65,wc:0}],
  ["Renegotiate and dual-source","Invest management time in alternative suppliers and negotiate terms.",{revenue:-25,cost:35,wc:15}],
  ["Redesign the product","Change specifications to reduce dependence on the input.",{revenue:-55,cost:-65,wc:10}]]},
 {title:"Competitor launches lower-priced product",desc:"A competitor enters the market with a product priced 12% below yours. Your commercial team expects pressure on volumes.",choices:[
  ["Match the competitor's price","Defend market share with an immediate price reduction.",{revenue:-160,cost:0,wc:0}],
  ["Differentiate on quality","Retain pricing and increase quality-focused marketing.",{revenue:40,cost:75,wc:0}],
  ["Target a niche segment","Focus on customers who value reliability and service.",{revenue:15,cost:25,wc:0}],
  ["Launch a value product","Develop a lower-cost product variant.",{revenue:70,cost:105,wc:35}]]}
],
[
 {title:"Retailer requests 60-day credit",desc:"A major retailer offers increased shelf space in return for extending payment terms from 30 to 60 days.",choices:[
  ["Accept the terms","Secure the distribution opportunity but fund a larger receivables balance.",{revenue:180,cost:0,wc:160}],
  ["Reject the request","Protect cash conversion and accept the risk of lower shelf space.",{revenue:-65,cost:0,wc:-10}],
  ["Offer a 45-day compromise","Share some of the working-capital burden.",{revenue:95,cost:0,wc:75}],
  ["Offer early-payment discount","Encourage faster payment through a modest discount.",{revenue:65,cost:20,wc:15}]]},
 {title:"Production line reliability",desc:"Unplanned downtime is increasing. The operations director proposes a maintenance programme or replacement equipment.",choices:[
  ["Defer maintenance","Preserve cash now, accepting higher disruption risk.",{revenue:-85,cost:15,wc:0}],
  ["Preventive maintenance","Pay for planned maintenance to improve reliability.",{revenue:35,cost:45,wc:0}],
  ["Replace critical equipment","Make a capital investment to improve capacity and reliability.",{revenue:100,cost:15,wc:0,capex:260}],
  ["Outsource overflow production","Avoid immediate capex but pay a higher unit cost.",{revenue:55,cost:95,wc:20}]]}
],
[
 {title:"R&D breakthrough",desc:"The product team has developed a promising improvement. Commercial success is uncertain, but early investment could create differentiation.",choices:[
  ["Accelerate full launch","Commit resources to capture first-mover advantage.",{revenue:220,cost:110,wc:45,capex:100}],
  ["Run a limited pilot","Test customer response before scaling.",{revenue:65,cost:45,wc:15,capex:35}],
  ["License the technology","Reduce execution risk in exchange for a royalty burden.",{revenue:80,cost:55,wc:0}],
  ["Pause the project","Protect near-term cash and focus on existing products.",{revenue:0,cost:-20,wc:0}]]},
 {title:"Bank reviews lending",desc:"Your relationship bank is reviewing the facility. It wants evidence of a credible plan to maintain debt-service capacity.",choices:[
  ["Repay debt using cash","Reduce leverage and interest exposure, but use liquidity.",{revenue:0,cost:-35,wc:0,debt:-250,cash:-250}],
  ["Refinance for longer term","Improve maturity profile; fees and pricing may rise.",{revenue:0,cost:25,wc:0,debt:100}],
  ["Raise equity","Strengthen the balance sheet but dilute existing shareholders.",{revenue:0,cost:0,wc:0,equity:300,cash:300}],
  ["Maintain current facility","Avoid transaction costs but retain refinancing risk.",{revenue:0,cost:0,wc:0}]]}
],
[
 {title:"Product quality incident",desc:"A quality issue affects a recent batch. A recall may protect the brand but will be costly; doing too little could damage trust.",choices:[
  ["Full recall and remediation","Act decisively to protect customers and reputation.",{revenue:-80,cost:190,wc:0}],
  ["Targeted recall","Limit the recall to affected batches and strengthen testing.",{revenue:-35,cost:100,wc:0}],
  ["Enhanced inspection only","Contain the issue while limiting immediate cost.",{revenue:-25,cost:55,wc:0}],
  ["No recall; monitor complaints","Protect near-term profit but accept significant reputational risk.",{revenue:-180,cost:10,wc:0}]]},
 {title:"Retailer promotional rebate",desc:"A national retailer offers a prominent promotional campaign in return for a volume rebate.",choices:[
  ["Accept the full rebate","Buy visibility and volume at the expense of margin.",{revenue:210,cost:170,wc:35}],
  ["Negotiate a smaller rebate","Share the promotional economics.",{revenue:130,cost:75,wc:20}],
  ["Decline the promotion","Protect margins and pursue other channels.",{revenue:-35,cost:-10,wc:0}],
  ["Offer a limited-time bundle","Use bundling to support volume and protect headline price.",{revenue:115,cost:65,wc:25}]]}
],
[
 {title:"Working-capital squeeze",desc:"Cash conversion is deteriorating as inventory and receivables rise. The finance director asks for a working-capital intervention.",choices:[
  ["Tighten customer credit","Reduce receivables, with possible pressure on sales.",{revenue:-65,cost:0,wc:-150}],
  ["Reduce inventory buffers","Release cash but increase stock-out risk.",{revenue:-45,cost:-15,wc:-100}],
  ["Negotiate supplier terms","Improve cash timing while preserving customer service.",{revenue:0,cost:15,wc:-90}],
  ["Arrange short-term borrowing","Protect operations but increase leverage and interest.",{revenue:0,cost:0,wc:0,debt:200,cash:200}]]},
 {title:"Shareholders debate dividend",desc:"Shareholders are seeking a distribution after several years of investment. The board must balance returns with funding flexibility.",choices:[
  ["Declare a substantial dividend","Return cash to shareholders and reduce retained earnings.",{revenue:0,cost:0,wc:0,dividend:180}],
  ["Pay a modest dividend","Provide a return while retaining investment capacity.",{revenue:0,cost:0,wc:0,dividend:75}],
  ["Retain all earnings","Prioritise balance-sheet strength and future investment.",{revenue:0,cost:0,wc:0}],
  ["Fund a share buyback","Return capital through a buyback, subject to available cash.",{revenue:0,cost:0,wc:0,dividend:120}]]}
],
[
 {title:"Second production shift",desc:"Demand forecasts suggest an opportunity to add a second shift. The decision requires staffing, training and additional working capital.",choices:[
  ["Launch immediately","Capture demand quickly with higher execution risk.",{revenue:320,cost:215,wc:80,capex:120}],
  ["Pilot one production line","Test productivity and demand before committing fully.",{revenue:150,cost:95,wc:35,capex:60}],
  ["Use overtime instead","Avoid structural change but incur higher labour costs.",{revenue:105,cost:90,wc:20}],
  ["Do not expand","Protect cash and capacity utilisation.",{revenue:0,cost:0,wc:0}]]},
 {title:"Strategic acquisition opportunity",desc:"A smaller competitor is available for acquisition. It offers customer relationships and capacity, but integration and valuation risks remain.",choices:[
  ["Acquire the business","Pay a premium to secure scale and strategic assets.",{revenue:260,cost:170,wc:55,capex:500,debt:300}],
  ["Submit a lower offer","Pursue the opportunity with valuation discipline.",{revenue:140,cost:105,wc:30,capex:300,debt:180}],
  ["Form a commercial partnership","Access some benefits without full ownership.",{revenue:90,cost:45,wc:10}],
  ["Walk away","Avoid integration risk and preserve capital.",{revenue:0,cost:0,wc:0}]]}
]
];
const defaults = {market:{}};
let state = loadState();
let activeView = "overview";
function loadState(){try{return JSON.parse(localStorage.getItem("fujisaki_v1"))||{team:"",decisions:{},market:{},submitted:{},history:[]}}catch(e){return {team:"",decisions:{},market:{},submitted:{},history:[]}}}
function save(){localStorage.setItem("fujisaki_v1",JSON.stringify(state));}
function money(n){return "W$"+Math.round(n).toLocaleString("en-US")+"k"}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
function selectedRound(){return Number(document.getElementById("round-select").value)}
function getDecision(y,s){return state.decisions[`${y}-${s}`]||null}
function getChoice(y,s){const d=getDecision(y,s);return d? situations[y][s].choices[d.choice]:null}
function getOutcome(y,s){return state.market[`${y}-${s}`]||"Base"}
function effectsForYear(y){let sum={revenue:0,cost:0,wc:0,capex:0,debt:0,cash:0,equity:0,dividend:0};for(let s=0;s<2;s++){const c=getChoice(y,s);if(c){Object.keys(c[2]).forEach(k=>sum[k]=(sum[k]||0)+c[2][k]);const m=getOutcome(y,s);const mult=m==="Adverse"?1.25:m==="Favourable"?.8:1;sum.cost+=c[2].cost*(mult-1);sum.revenue+=c[2].revenue*(m==="Adverse"?-.2:m==="Favourable"?.15:0);}}return sum}
function calculate(){let cash=BASE.cash, debt=BASE.debt, retained=BASE.retained, inventory=BASE.inventory, receivables=BASE.receivables, payables=BASE.payables, ppe=BASE.ppe, dev=BASE.development;let rows=[];
 for(let y=0;y<6;y++){let e=effectsForYear(y);let revenue=BASE.revenue+e.revenue;let materials=BASE.materials+e.cost*.72;let labour=BASE.labour+e.cost*.28;let gross=revenue-materials-labour;let opex=BASE.otherOpex;let depreciation=BASE.depreciation;let amort=BASE.amortisation;let op=gross-opex-depreciation-amort;let interest=BASE.interest+(debt-BASE.debt)*.085;let pbt=op-interest;let tax=Math.max(0,pbt*.0);let pat=pbt-tax;
   cash+=pat+depreciation+amort-e.wc-e.capex+e.cash-e.dividend+(e.debt||0);debt+=e.debt||0;retained+=pat-(e.dividend||0);inventory+=e.wc*.25;receivables+=e.wc*.5;payables+=e.wc*.25;ppe+=e.capex||0;ppe-=depreciation;dev-=amort;
   rows.push({revenue,materials,labour,gross,opex,depreciation,amort,op,interest,pbt,tax,pat,cash,debt,retained,inventory,receivables,payables,ppe,dev,equity:BASE.shareCapital+BASE.sharePremium+retained,netDebt:debt-cash,workingCapital:inventory+receivables-payables,decisionCount:[0,1].filter(s=>getDecision(y,s)).length});
 }return rows}
function renderOverview(){const rows=calculate();let y=lastCompletedYear();let r=rows[y];document.getElementById("metric-revenue").textContent=money(r.revenue);document.getElementById("metric-op").textContent=money(r.op);document.getElementById("metric-cash").textContent=money(r.cash);document.getElementById("metric-debt").textContent=money(r.netDebt);document.getElementById("year-chip").textContent=`YEAR ${Math.min(y+1,6)} OF 6`;let count=Object.keys(state.decisions).length;document.getElementById("progress-label").textContent=`${count} / 12 decisions`;document.getElementById("year-track").innerHTML=Array.from({length:6},(_,i)=>`<div class="year-node ${i===y?'current':''} ${state.submitted[i]?'done':''}"><span class="node-dot"></span><b>YEAR ${i+1}</b><span>${state.submitted[i]?'Submitted':i===y?'In progress':'Upcoming'}</span></div>`).join("");let next=firstIncomplete();document.getElementById("next-title").textContent=next? situations[next[0]][next[1]].title:"All decisions submitted";document.getElementById("next-desc").textContent=next? situations[next[0]][next[1]].desc:"Your six-year simulation is complete. Review the financial statements and leaderboard.";document.getElementById("team-name").value=state.team||""}
function lastCompletedYear(){for(let y=5;y>=0;y--)if(state.submitted[y])return y;return 0}
function firstIncomplete(){for(let y=0;y<6;y++)for(let s=0;s<2;s++)if(!getDecision(y,s))return [y,s];return null}
function renderDecisions(){let y=selectedRound();document.getElementById("decision-cards").innerHTML=situations[y].map((item,s)=>{let d=getDecision(y,s);return `<article class="decision-card"><div class="decision-number">SITUATION 0${y*2+s+1} · YEAR ${y+1}</div><h3>${item.title}</h3><p>${item.desc}</p><div class="impact-tags"><span>Commercial strategy</span><span>Financial trade-offs</span><span>Risk assessment</span></div>${item.choices.map((c,i)=>`<label class="choice ${d&&d.choice===i?'selected':''}"><input type="radio" name="choice-${s}" value="${i}" ${d&&d.choice===i?'checked':''}/><span><b>${String.fromCharCode(65+i)}. ${c[0]}</b><small>${c[1]}</small></span></label>`).join("")}<textarea class="rationale" id="rationale-${s}" placeholder="Explain your team's rationale (optional)">${d?d.rationale||"":""}</textarea></article>`}).join("");
 document.querySelectorAll('input[name^="choice-"]').forEach(el=>el.addEventListener("change",()=>{let s=Number(el.name.split("-")[1]);let card=el.closest(".decision-card");card.querySelectorAll(".choice").forEach(c=>c.classList.remove("selected"));el.closest(".choice").classList.add("selected");let choice=Number(el.value);state.decisions[`${y}-${s}`]={choice,rationale:document.getElementById(`rationale-${s}`).value};save();updateRoundStatus()}));
 document.querySelectorAll(".rationale").forEach(el=>el.addEventListener("input",()=>{let s=Number(el.id.split("-")[1]);let d=getDecision(y,s);if(d){d.rationale=el.value;save()}}));
 updateRoundStatus()}
function updateRoundStatus(){let y=selectedRound(),n=[0,1].filter(s=>getDecision(y,s)).length;document.getElementById("round-status").textContent=`${n} of 2 decisions selected for Year ${y+1}.`;document.getElementById("submit-round").textContent=state.submitted[y]?"Update year decisions →":"Submit year decisions →"}
function renderFinancials(){let y=Number(document.getElementById("financial-year").value),r=calculate()[y];const fmt=n=>Math.round(n).toLocaleString("en-US");document.getElementById("income-table").innerHTML=table([["Revenue",r.revenue],["Materials",-r.materials],["Direct labour",-r.labour],["Gross profit",r.gross,"total"],["Other operating expenses",-r.opex],["Depreciation",-r.depreciation],["Amortisation",-r.amort],["Operating profit",r.op,"total"],["Interest expense",-r.interest],["Profit before tax",r.pbt,"total"],["Tax", -r.tax],["Profit after tax",r.pat,"total"]],fmt);
 document.getElementById("balance-table").innerHTML=table([["Cash",r.cash],["Inventory",r.inventory],["Trade receivables",r.receivables],["Property, plant & equipment",r.ppe],["Development assets",r.dev],["Total assets",r.cash+r.inventory+r.receivables+r.ppe+r.dev,"total"],["Trade payables",-r.payables],["Debt",-r.debt],["Share capital",BASE.shareCapital],["Share premium",BASE.sharePremium],["Retained earnings",r.retained],["Net assets / equity",r.cash+r.inventory+r.receivables+r.ppe+r.dev-r.payables-r.debt,"total"]],fmt);
 document.getElementById("ratio-grid").innerHTML=[["Operating margin",`${(r.op/r.revenue*100).toFixed(1)}%`],["Net debt",money(r.netDebt)],["Working capital",money(r.workingCapital)],["Interest cover",`${(r.op/Math.max(r.interest,1)).toFixed(2)}x`]].map(x=>`<div class="ratio-box"><span>${x[0]}</span><b>${x[1]}</b></div>`).join("")}
function table(rows,fmt){return `<table class="financial-table">${rows.map(x=>`<tr class="${x[2]||''}"><td>${x[0]}</td><td>${fmt(x[1])}</td></tr>`).join("")}</table>`}
function renderLeaderboard(){let rows=calculate();let name=state.team||"Unnamed team";let count=Object.keys(state.decisions).length;document.getElementById("leaderboard-rows").innerHTML=`<div class="leader-row"><strong><span class="rank">1</span>${escapeHtml(name)}</strong><span>${money(rows[5].revenue)}</span><span>${money(rows[5].op)}</span><span>${money(rows[5].cash)}</span><span>${count}/12</span></div>`}
function renderInstructor(){let html="";situations.forEach((year,y)=>year.forEach((s,i)=>{let key=`${y}-${i}`,v=state.market[key]||"Base";html+=`<div class="control-row"><div><strong>Year ${y+1} · ${s.title}</strong><small>Situation ${y*2+i+1}</small></div><select data-market="${key}"><option ${v==="Adverse"?"selected":""}>Adverse</option><option ${v==="Base"?"selected":""}>Base</option><option ${v==="Favourable"?"selected":""}>Favourable</option></select><span class="muted small">Market outcome</span></div>`}));document.getElementById("market-controls").innerHTML=html}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function go(view){activeView=view;document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.getElementById(`view-${view}`).classList.add("active");document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===view));const titles={overview:"Company overview",decisions:"Decision room",financials:"Financial statements",leaderboard:"Leaderboard",instructor:"Instructor controls"};document.getElementById("page-title").textContent=titles[view];if(view==="overview")renderOverview();if(view==="decisions")renderDecisions();if(view==="financials")renderFinancials();if(view==="leaderboard")renderLeaderboard();if(view==="instructor")renderInstructor()}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>go(b.dataset.view)));document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.goto)));
document.getElementById("save-team").addEventListener("click",()=>{state.team=document.getElementById("team-name").value.trim()||"Unnamed team";save();showToast("Team name saved");renderOverview()});
document.getElementById("round-select").addEventListener("change",renderDecisions);document.getElementById("financial-year").addEventListener("change",renderFinancials);
document.getElementById("submit-round").addEventListener("click",()=>{let y=selectedRound();if(!getDecision(y,0)||!getDecision(y,1)){showToast("Select an option for both situations first.");return}state.submitted[y]=true;save();showToast(`Year ${y+1} decisions submitted`);updateRoundStatus();renderOverview()});
document.getElementById("save-market").addEventListener("click",()=>{document.querySelectorAll("[data-market]").forEach(el=>state.market[el.dataset.market]=el.value);save();showToast("Market settings saved")});
document.getElementById("recalculate").addEventListener("click",()=>{document.querySelectorAll("[data-market]").forEach(el=>state.market[el.dataset.market]=el.value);save();renderOverview();showToast("Financial results recalculated")});
document.getElementById("reset-btn").addEventListener("click",()=>{if(confirm("Reset all decisions, market settings and team name stored in this browser?")){localStorage.removeItem("fujisaki_v1");state=loadState();renderOverview();showToast("Game reset") }});
renderOverview();


// -----------------------------------------------------------------------------
// Supabase authentication and team-scoped decision synchronisation.
// Configure the two public values below before publishing this build.
// Never place a Supabase secret key in this file.
// -----------------------------------------------------------------------------
const FUJISAKI_SUPABASE_URL = "https://bvqbjtmppewzwsbrandk.supabase.co";
const FUJISAKI_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ad6jmfJ4S5EIJQYQFCC9Kw_-1fkfo5X";

let supabaseClient = null;
let signedInRole = null;
let activeTeamId = null;
let activeTeamName = null;
let activeUserId = null;
let dbSituationIds = new Map();
let syncQueue = Promise.resolve();
let currentStorageKey = "fujisaki_v1";

function authMessage(message, success = false) {
  const el = document.getElementById("auth-message");
  if (!el) return;
  el.textContent = message || "";
  el.classList.toggle("success", !!success);
}

function switchAuthMode(mode) {
  const student = mode === "student";
  document.getElementById("student-login-form").hidden = !student;
  document.getElementById("instructor-login-form").hidden = student;
  document.getElementById("show-student-login").classList.toggle("active", student);
  document.getElementById("show-instructor-login").classList.toggle("active", !student);
  authMessage("");
}

function showGame(role, label) {
  signedInRole = role;
  document.getElementById("auth-gate").style.display = "none";
  document.getElementById("session-label").textContent = label || "";
  document.getElementById("signout-btn").style.display = "inline-flex";
  document.querySelectorAll(".instructor-label, [data-view='instructor']").forEach(el => {
    el.style.display = role === "instructor" ? "" : "none";
  });

  const teamInput = document.getElementById("team-name");
  const saveTeam = document.getElementById("save-team");
  if (role === "student") {
    teamInput.value = activeTeamName || "Your team";
    teamInput.readOnly = true;
    saveTeam.disabled = true;
    saveTeam.style.display = "none";
    state.team = activeTeamName || "Your team";
  } else {
    teamInput.readOnly = false;
    saveTeam.disabled = false;
    saveTeam.style.display = "";
  }

  renderOverview();
  if (role === "student") {
    refreshRoundAvailability();
    renderDecisions();
    renderFinancials();
    renderLeaderboard();
  }
}

function loadTeamLocalState(teamId) {
  currentStorageKey = `fujisaki_v1_team_${teamId}`;
  try {
    const saved = JSON.parse(localStorage.getItem(currentStorageKey));
    state = saved || { team: activeTeamName || "", decisions: {}, market: {}, submitted: {}, history: [] };
  } catch (_) {
    state = { team: activeTeamName || "", decisions: {}, market: {}, submitted: {}, history: [] };
  }
}

function saveTeamLocalState() {
  localStorage.setItem(currentStorageKey, JSON.stringify(state));
}

async function fetchSituationMap() {
  const { data, error } = await supabaseClient
    .from("situations")
    .select("id, year_number, situation_number, title")
    .order("year_number", { ascending: true })
    .order("situation_number", { ascending: true });

  if (error) throw error;

  dbSituationIds = new Map();
  const grouped = new Map();
  (data || []).forEach(row => {
    const y = Number(row.year_number) - 1;
    if (!grouped.has(y)) grouped.set(y, []);
    grouped.get(y).push(row);
  });

  for (let y = 0; y < 6; y++) {
    const rows = grouped.get(y) || [];
    rows.sort((a, b) => Number(a.situation_number) - Number(b.situation_number));
    rows.slice(0, 2).forEach((row, s) => {
      dbSituationIds.set(`${y}-${s}`, row.id);
    });
  }

  for (let y = 0; y < 6; y++) {
    if (!dbSituationIds.has(`${y}-0`) || !dbSituationIds.has(`${y}-1`)) {
      throw new Error(`Supabase is missing one or more situation records for Year ${y + 1}.`);
    }
  }
}

async function loadStudentContext(user) {
  activeUserId = user.id;
  const { data: membership, error: memberError } = await supabaseClient
    .from("team_members")
    .select("team_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (memberError) throw memberError;
  if (!membership) return false;

  activeTeamId = membership.team_id;

  const { data: team, error: teamError } = await supabaseClient
    .from("teams")
    .select("id, team_number, team_name")
    .eq("id", activeTeamId)
    .single();

  if (teamError) throw teamError;
  activeTeamName = team.team_name || `Team ${team.team_number}`;

  loadTeamLocalState(activeTeamId);
  await fetchSituationMap();

  const { data: decisions, error: decisionError } = await supabaseClient
    .from("decisions")
    .select("situation_id, year_number, selected_option, rationale, submitted_at")
    .eq("team_id", activeTeamId);

  if (decisionError) throw decisionError;

  // Server data is authoritative; do not reuse decisions from another browser/team.
  state.decisions = {};
  state.submitted = {};

  (decisions || []).forEach(row => {
    const y = Number(row.year_number) - 1;
    const situationIndex = dbSituationIds.get(`${y}-0`) === row.situation_id ? 0 :
      dbSituationIds.get(`${y}-1`) === row.situation_id ? 1 : -1;
    if (situationIndex < 0) return;
    const option = String(row.selected_option || "A").toUpperCase().charCodeAt(0) - 65;
    state.decisions[`${y}-${situationIndex}`] = {
      choice: Math.max(0, Math.min(3, option)),
      rationale: row.rationale || ""
    };
  });

  for (let y = 0; y < 6; y++) {
    const a = (decisions || []).find(r => r.situation_id === dbSituationIds.get(`${y}-0`));
    const b = (decisions || []).find(r => r.situation_id === dbSituationIds.get(`${y}-1`));
    if (a?.submitted_at && b?.submitted_at) state.submitted[y] = true;
  }

  saveTeamLocalState();
  await refreshRoundAvailability();
  return true;
}

async function refreshRoundAvailability() {
  const { data, error } = await supabaseClient
    .from("rounds")
    .select("year_number, round_status")
    .order("year_number", { ascending: true });

  if (error) throw error;

  const select = document.getElementById("round-select");
  if (select) {
    (data || []).forEach(round => {
      const option = select.querySelector(`option[value="${Number(round.year_number) - 1}"]`);
      if (option) {
        option.disabled = signedInRole === "student" && String(round.round_status).toLowerCase() !== "open";
      }
    });
    const firstOpen = (data || []).find(r => String(r.round_status).toLowerCase() === "open");
    if (firstOpen) select.value = String(Number(firstOpen.year_number) - 1);
  }
}

async function persistDecision(yearIndex, situationIndex) {
  if (signedInRole !== "student" || !activeTeamId || !activeUserId) return;
  const decision = getDecision(yearIndex, situationIndex);
  if (!decision) return;

  const situationId = dbSituationIds.get(`${yearIndex}-${situationIndex}`);
  if (!situationId) return;

  const payload = {
    team_id: activeTeamId,
    situation_id: situationId,
    year_number: yearIndex + 1,
    selected_option: String.fromCharCode(65 + decision.choice),
    rationale: decision.rationale || ""
  };
  if (state.submitted[yearIndex]) {
    payload.submitted_at = new Date().toISOString();
  }

  syncQueue = syncQueue.then(async () => {
    const { data: existing, error: findError } = await supabaseClient
      .from("decisions")
      .select("id")
      .eq("team_id", activeTeamId)
      .eq("situation_id", situationId)
      .maybeSingle();

    if (findError) throw findError;

    if (existing) {
      const { error } = await supabaseClient
        .from("decisions")
        .update({
          selected_option: payload.selected_option,
          rationale: payload.rationale,
          ...(payload.submitted_at ? { submitted_at: payload.submitted_at } : {}),
          updated_at: new Date().toISOString()
        })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabaseClient.from("decisions").insert(payload);
      if (error) throw error;
    }
  }).catch(error => {
    console.error("Decision synchronisation failed:", error);
    showToast(error.message || "Could not sync decision to the server");
  });

  return syncQueue;
}

async function syncAllDecisions() {
  if (signedInRole !== "student" || !activeTeamId) return;
  for (let y = 0; y < 6; y++) {
    for (let s = 0; s < 2; s++) {
      if (getDecision(y, s)) await persistDecision(y, s);
    }
  }
}

async function inspectExistingSession() {
  const { data: sessionData, error } = await supabaseClient.auth.getSession();
  if (error) throw error;
  const session = sessionData.session;
  if (!session) return;

  const { data: userData, error: userError } = await supabaseClient.auth.getUser();
  if (userError || !userData.user) {
    await supabaseClient.auth.signOut();
    return;
  }

  const user = userData.user;
  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("role, display_name")
    .eq("user_id", user.id)
    .maybeSingle();

  if (profileError) throw profileError;

  if (profile?.role === "instructor" && user.is_anonymous !== true) {
    activeUserId = user.id;
    showGame("instructor", profile.display_name || "Instructor");
    return;
  }

  if (user.is_anonymous === true) {
    const joined = await loadStudentContext(user);
    if (joined) showGame("student", activeTeamName);
    else switchAuthMode("student");
  }
}

async function startStudentLogin(code) {
  authMessage("Creating your secure student session…", true);

  const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
  if (sessionError) throw sessionError;

  let session = sessionData.session;
  if (session && !session.user.is_anonymous) {
    await supabaseClient.auth.signOut();
    session = null;
  }

  if (!session) {
    const { data, error } = await supabaseClient.auth.signInAnonymously();
    if (error) throw error;
    session = data.session;
  }

  if (!session) throw new Error("Supabase did not create a student session.");

  authMessage("Checking your team access code…", true);
  const { data: joined, error: joinError } = await supabaseClient.functions.invoke(
    "join-team",
    { body: { code } }
  );

  if (joinError) {
    const details = joinError.context?.json?.error || joinError.message;
    throw new Error(details || "Team code validation failed.");
  }
  if (!joined?.success) throw new Error(joined?.error || "Team code validation failed.");

  const user = session.user;
  const loaded = await loadStudentContext(user);
  if (!loaded) throw new Error("Your team membership was not created. Please contact the instructor.");

  showGame("student", `${joined.team_name} · Student`);
  showToast(`Welcome to ${joined.team_name}`);
}

async function startInstructorLogin(email, password) {
  authMessage("Signing in…", true);
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;

  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("role, display_name")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (profileError) throw profileError;

  if (!profile || profile.role !== "instructor") {
    await supabaseClient.auth.signOut();
    throw new Error("This account is not marked as an instructor yet. The instructor profile must be promoted in Supabase first.");
  }

  activeUserId = data.user.id;
  showGame("instructor", profile.display_name || "Instructor");
  showToast("Instructor signed in");
}


function showPasswordResetForm(showReset) {
  document.getElementById("instructor-login-form").hidden = !!showReset;
  document.getElementById("student-login-form").hidden = true;
  document.getElementById("password-reset-form").hidden = !showReset;
  document.getElementById("show-student-login").classList.remove("active");
  document.getElementById("show-instructor-login").classList.add("active");
  authMessage("");
}

async function sendInstructorPasswordReset() {
  const email = document.getElementById("instructor-email").value.trim();
  if (!email) {
    authMessage("Enter your instructor email first.");
    document.getElementById("instructor-email").focus();
    return;
  }

  authMessage("Sending password reset email…", true);
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
  authMessage("Password reset email sent. Open the newest email on this device, then choose your new password here.", true);
}

async function saveInstructorNewPassword(event) {
  event.preventDefault();
  const password = document.getElementById("new-instructor-password").value;
  const confirm = document.getElementById("confirm-instructor-password").value;

  if (password.length < 8) {
    authMessage("Choose a password with at least 8 characters.");
    return;
  }
  if (password !== confirm) {
    authMessage("The two passwords do not match.");
    return;
  }

  authMessage("Updating your password…", true);
  const { error } = await supabaseClient.auth.updateUser({ password });
  if (error) throw error;

  await supabaseClient.auth.signOut();
  document.getElementById("password-reset-form").reset();
  document.getElementById("instructor-login-form").reset();
  showPasswordResetForm(false);
  authMessage("Your password has been updated. Sign in using your new password.", true);
}

function installAuthHandlers() {
  document.getElementById("forgot-password-btn").addEventListener("click", async () => {
    try {
      await sendInstructorPasswordReset();
    } catch (error) {
      console.error(error);
      authMessage(error.message || "Could not send the password reset email.");
    }
  });

  document.getElementById("cancel-password-reset").addEventListener("click", () => {
    showPasswordResetForm(false);
  });

  document.getElementById("password-reset-form").addEventListener("submit", async event => {
    try {
      await saveInstructorNewPassword(event);
    } catch (error) {
      console.error(error);
      authMessage(error.message || "Could not update your password.");
    }
  });

  document.getElementById("show-student-login").addEventListener("click", () => switchAuthMode("student"));
  document.getElementById("show-instructor-login").addEventListener("click", () => switchAuthMode("instructor"));

  document.getElementById("student-login-form").addEventListener("submit", async event => {
    event.preventDefault();
    const code = document.getElementById("team-code").value.trim().toLowerCase();
    if (!/^[a-f0-9]{32}$/.test(code)) {
      authMessage("Enter the 32-character team access code supplied by your instructor.");
      return;
    }
    try {
      await startStudentLogin(code);
    } catch (error) {
      console.error(error);
      authMessage(error.message || "Unable to join the simulation.");
    }
  });

  document.getElementById("instructor-login-form").addEventListener("submit", async event => {
    event.preventDefault();
    try {
      await startInstructorLogin(
        document.getElementById("instructor-email").value.trim(),
        document.getElementById("instructor-password").value
      );
    } catch (error) {
      console.error(error);
      authMessage(error.message || "Instructor sign-in failed.");
    }
  });

  document.getElementById("signout-btn").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    location.reload();
  });
}

// Replace local-only save with team-namespaced local backup plus cloud sync.
const originalLocalSave = save;
save = function() {
  if (signedInRole === "student") {
    saveTeamLocalState();
    syncAllDecisions();
  } else {
    originalLocalSave();
  }
};

// Keep the selected team data namespaced, not shared with another team in the same browser.
document.getElementById("submit-round").addEventListener("click", () => {
  if (signedInRole === "student") {
    const y = selectedRound();
    if (getDecision(y, 0) && getDecision(y, 1)) {
      state.submitted[y] = true;
      saveTeamLocalState();
      syncAllDecisions();
    }
  }
});

(async function initialiseFujisakiSupabase() {
  const gate = document.getElementById("auth-gate");

  if (
    FUJISAKI_SUPABASE_URL.includes("PASTE_") ||
    FUJISAKI_SUPABASE_PUBLISHABLE_KEY.includes("PASTE_")
  ) {
    authMessage("Website setup required: add your Supabase Project URL and publishable key in app.js.");
    return;
  }

  if (!window.supabase?.createClient) {
    authMessage("Supabase library did not load. Refresh the page or check your internet connection.");
    return;
  }

  try {
    supabaseClient = window.supabase.createClient(
      FUJISAKI_SUPABASE_URL,
      FUJISAKI_SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );

    // Supabase redirects password-recovery links back to this page.
    // Show the password form when the recovery session is detected.
    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        showPasswordResetForm(true);
        authMessage("Recovery link verified. Enter and confirm your new password below.", true);
      }
    });

    installAuthHandlers();
    await inspectExistingSession();
  } catch (error) {
    console.error("Supabase initialisation error:", error);
    authMessage(error.message || "Could not connect to Supabase.");
  }
})();
