BASE_EVENTS.push(
{
 id:"by_election", icon:"📍", category:"Politics", title:"THE BY-ELECTION",
 text:"A resignation triggers a by-election in a marginal seat. Losing it would make your parliamentary majority look dangerously fragile.",
 adviser:"Party Chair", avatar:"📍", adviserText:"The constituency wants local answers, not a lecture about the national strategy.",
 choices:[
  {t:"Campaign personally",s:"High risk, high reward",e:{approval:1,power:3},h:"PM HITS BY-ELECTION TRAIL",d:"Prime Minister stakes personal authority on marginal contest."},
  {t:"Send senior ministers",s:"Limit your exposure",e:{power:1},h:"CABINET FLOODS MARGINAL SEAT",d:"Senior ministers descend on the constituency."},
  {t:"Stay away",s:"Focus on governing",e:{power:-2,approval:-1},h:"PM AVOIDS TROUBLED BY-ELECTION",d:"Opposition claims Downing Street has given up."}
 ]
},
{
 id:"growth_budget", icon:"📊", category:"Budget", title:"THE GROWTH BUDGET",
 text:"Growth has stalled. The Chancellor offers you a menu: infrastructure, business tax cuts, or immediate household giveaways.",
 adviser:"The Chancellor", avatar:"£", adviserText:"All three can be called 'pro-growth'. Only one gets the bulk of the money.",
 choices:[
  {t:"Infrastructure",s:"Slow, structural",e:{treasury:-6,economy:3,britain:2},h:"BUDGET BETS ON INFRASTRUCTURE",d:"Government prioritises transport, energy and housing.",delay:{after:5,text:"Investment begins lifting construction and private-sector confidence.",e:{economy:4,britain:2}}},
  {t:"Business tax cuts",s:"Investment incentive",e:{treasury:-5,economy:4,approval:-1},h:"CHANCELLOR CUTS BUSINESS TAX",d:"Treasury bets on private investment."},
  {t:"Household rebate",s:"Immediate popularity",e:{treasury:-5,approval:5,economy:1},h:"VOTERS GET £400 BUDGET REBATE",d:"Household giveaway dominates the Budget."}
 ]
},
{
 id:"pmqs", icon:"🎙️", category:"PMQs", title:"PRIME MINISTER'S QUESTIONS",
 text:"The Opposition Leader attacks your record: 'Waiting lists are up, rents are up, and the Prime Minister says everything is going to plan. Why should anyone believe them?'",
 adviser:"Communications Director", avatar:"🎙", adviserText:"Answer the question if you can. Attack them if you can't. Whatever you do, don't look rattled.",
 choices:[
  {t:"Answer directly",s:"Defend your record",e:{approval:2,power:2},h:"PM STANDS GROUND AT PMQS",d:"Downing Street pleased with a disciplined performance."},
  {t:"Attack the opposition",s:"Fire up your side",e:{power:3,approval:-1},h:"FIERY PMQS CLASH",d:"Commons erupts as leaders trade attacks."},
  {t:"Make a joke",s:"Could be brilliant",e:{approval:3,power:-1},h:"PMQS LINE GOES VIRAL",d:"Prime Minister lands the line of the session."}
 ]
},
{
 id:"data_breach", icon:"💻", category:"Security", title:"GOVERNMENT DATA BREACH",
 text:"A cyberattack compromises data held by a government contractor. The scale is not yet clear.",
 adviser:"Cabinet Secretary", avatar:"💻", adviserText:"You can disclose early with incomplete facts, or wait and risk looking like you hid it.",
 choices:[
  {t:"Disclose immediately",s:"Transparency first",e:{approval:1,power:1,britain:-1},h:"GOVERNMENT REVEALS CYBER BREACH",d:"Ministers publish early details and launch investigation."},
  {t:"Wait for full facts",s:"Reduce uncertainty",e:{power:-1},h:"WHITEHALL INVESTIGATES CYBERATTACK",d:"Government delays public statement pending technical assessment.",delay:{after:2,text:"Journalists learn of the breach before the official announcement.",e:{approval:-4,power:-2}}},
  {t:"Blame the contractor",s:"Distance government",e:{approval:-1,power:-1},h:"MINISTERS BLAME CONTRACTOR",d:"Questions grow over government procurement and oversight."}
 ]
},
{
 id:"final_budget", icon:"🧾", category:"Final year", title:"ONE LAST BUDGET",
 text:"The election is approaching. You can shore up the public finances, offer voters a pre-election tax cut, or fund struggling public services.",
 adviser:"The Chancellor", avatar:"£", adviserText:"This will be judged as economics and as electioneering. There is no separating the two now.",
 choices:[
  {t:"Repair the finances",s:"Responsible, less exciting",e:{treasury:7,economy:2,approval:-1},h:"CHANCELLOR BANKS ELECTION WAR CHEST",d:"Government prioritises fiscal headroom."},
  {t:"Cut taxes",s:"Go for popularity",e:{treasury:-6,approval:5,economy:2},h:"TAX CUT BEFORE ELECTION",d:"Opposition accuses PM of pre-election giveaway."},
  {t:"Fund public services",s:"Visible improvement",e:{treasury:-6,britain:5,approval:3},h:"BILLIONS FOR NHS AND SCHOOLS",d:"Final Budget targets frontline services."}
 ]
}
);
