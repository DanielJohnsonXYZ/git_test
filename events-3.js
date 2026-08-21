BASE_EVENTS.push(
{
 id:"defence", icon:"🛡️", category:"International", title:"NATO SUMMIT",
 text:"Allies want Britain to increase defence spending after a sharp deterioration in European security.",
 adviser:"Foreign Secretary", avatar:"🌍", adviserText:"Our allies will remember what we do. So will the Treasury.",
 choices:[
  {t:"Increase defence spending",s:"Reassure allies",e:{treasury:-6,power:3,economy:1},h:"BRITAIN BOOSTS DEFENCE BUDGET",d:"Prime Minister commits billions to military investment."},
  {t:"Hold spending flat",s:"Protect domestic budgets",e:{treasury:2,power:-2,approval:1},h:"PM RESISTS NATO PRESSURE",d:"Britain declines a major defence increase."},
  {t:"European defence pact",s:"Share capability",e:{treasury:-3,power:4,economy:1},h:"NEW EUROPEAN DEFENCE DEAL",d:"Britain proposes joint procurement and capabilities."}
 ]
},
{
 id:"local_elections", icon:"🗳️", category:"Politics", title:"LOCAL ELECTION SHOCK",
 text:"Your party loses control of several councils. Backbench MPs are suddenly worried about their own seats.",
 adviser:"Party Chair", avatar:"🗳", adviserText:"They don't all hate your agenda. They mostly hate the possibility of unemployment.",
 choices:[
  {t:"Stay the course",s:"Project confidence",e:{power:2,approval:-1},h:"PM: NO CHANGE OF COURSE",d:"Downing Street insists voters support the government's long-term plan."},
  {t:"Reshuffle the Cabinet",s:"Show change",e:{approval:2,power:-1},h:"PM WIELDS THE AXE",d:"Major reshuffle follows local election losses."},
  {t:"Move to popular policies",s:"Follow the polls",e:{approval:3,power:-3},h:"DOWNING STREET PIVOTS",d:"Government quietly shelves its most difficult reforms."}
 ]
},
{
 id:"flood", icon:"🌧️", category:"Emergency", title:"SEVERE FLOODING",
 text:"Days of rain cause major flooding across parts of England and Wales. Thousands of homes are affected.",
 adviser:"Environment Secretary", avatar:"🌧", adviserText:"You need emergency relief now, but the resilience problem is much bigger than this week's headlines.",
 choices:[
  {t:"Emergency relief + resilience",s:"Act now and invest",e:{treasury:-5,britain:5,approval:3},h:"PM PLEDGES FLOOD DEFENCES",d:"Emergency aid paired with long-term resilience programme."},
  {t:"Emergency relief only",s:"Handle immediate crisis",e:{treasury:-2,britain:2,approval:2},h:"FLOOD VICTIMS GET EMERGENCY AID",d:"Government focuses on short-term recovery."},
  {t:"Leave response to councils",s:"Keep Whitehall out",e:{treasury:1,britain:-4,approval:-3},h:"COUNCILS LEFT TO FIGHT FLOODS",d:"Ministers resist calls for a national package."}
 ]
},
{
 id:"ai_jobs", icon:"🤖", category:"Economy", title:"AI JOBS BOOM... OR BUST?",
 text:"A wave of AI investment promises productivity gains, but unions warn of large job losses in administration and customer service.",
 adviser:"Business Secretary", avatar:"🤖", adviserText:"The technology is arriving whether we like it or not. The policy question is who captures the upside.",
 choices:[
  {t:"AI investment + retraining",s:"Back adoption and skills",e:{treasury:-4,economy:5,britain:2},h:"PM BACKS AI REVOLUTION",d:"Government launches investment and retraining package.",delay:{after:6,text:"Business productivity rises as AI adoption spreads.",e:{economy:5,approval:1}}},
  {t:"Worker protection rules",s:"Slow disruption",e:{economy:-1,britain:3,approval:2},h:"NEW RULES FOR AI AT WORK",d:"Employers face stricter consultation requirements."},
  {t:"Let the market decide",s:"No new intervention",e:{economy:3,approval:-1,britain:-2},h:"PM TAKES HANDS-OFF AI APPROACH",d:"Government declines major new regulation or support."}
 ]
},
{
 id:"lords", icon:"👑", category:"Parliament", title:"THE LORDS SEND IT BACK",
 text:"The House of Lords heavily amends your flagship Public Safety Bill. Your MPs demand that you reject the changes.",
 adviser:"Leader of the House", avatar:"👑", adviserText:"The Lords can delay and amend. Ultimately the elected Commons has the stronger democratic mandate, but this can still eat parliamentary time.",
 vote:true,bill:"Public Safety Bill",
 choices:[
  {t:"Reject the amendments",s:"Fight the Lords",e:{power:2,approval:1},h:"COMMONS-LORDS SHOWDOWN",d:"Government sends the bill back unchanged.",voteBoost:-2},
  {t:"Accept most changes",s:"Compromise",e:{power:1,britain:2},h:"PM CUTS DEAL WITH LORDS",d:"Ministers accept safeguards to secure the legislation.",voteBoost:7},
  {t:"Abandon the bill",s:"Save parliamentary time",e:{power:-5,approval:-2},h:"FLAGSHIP BILL DROPPED",d:"Government gives up after months of parliamentary fighting."}
 ]
}
);
