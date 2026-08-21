BASE_EVENTS.push(
{
 id:"energy", icon:"⚡", category:"Energy", title:"ENERGY SHOCK",
 text:"Gas prices surge after an international supply disruption. Household bills are forecast to jump by 35%.",
 adviser:"Energy Secretary", avatar:"⚡", adviserText:"We can subsidise bills, accelerate domestic energy, or let prices transmit through the economy.",
 choices:[
  {t:"Cap household bills",s:"Protect families",e:{approval:5,treasury:-7,economy:2},h:"PM FREEZES ENERGY BILLS",d:"Treasury funds emergency household price cap."},
  {t:"Fast-track clean energy",s:"Slower but structural",e:{approval:1,economy:1,treasury:-3,britain:2},h:"ENERGY CRISIS SPARKS BUILDOUT",d:"Government accelerates grids, wind and nuclear approvals.",delay:{after:7,text:"New energy projects begin cutting Britain's exposure to gas shocks.",e:{economy:4,britain:4,approval:2}}},
  {t:"Let prices rise",s:"Protect the Treasury",e:{approval:-5,economy:-4,treasury:3,britain:-2},h:"HOUSEHOLDS FACE ENERGY HIT",d:"Government refuses a broad bailout."}
 ]
},
{
 id:"minister_scandal", icon:"📱", category:"Scandal", title:"THE WHATSAPPS LEAK",
 text:"Messages from your Home Secretary appear to mock civil servants and suggest announcing a policy mainly because it would 'play brilliantly on breakfast TV'.",
 adviser:"Chief of Staff", avatar:"📱", adviserText:"The messages are real. The question is whether you want this to become their scandal or yours.",
 choices:[
  {t:"Sack the minister",s:"Draw a line under it",e:{approval:2,power:1},h:"HOME SECRETARY SACKED",d:"Prime Minister acts within hours of leaked messages."},
  {t:"Stand by them",s:"Reward loyalty",e:{approval:-4,power:-2},h:"PM REFUSES TO SACK MINISTER",d:"Downing Street dismisses leak as a distraction.",delay:{after:2,text:"More messages leak, extending the scandal for another week.",e:{approval:-3,power:-2}}},
  {t:"Order an inquiry",s:"Classic Westminster",e:{approval:-1,power:1},h:"INQUIRY INTO LEAKED MESSAGES",d:"Independent adviser asked to establish what everyone already knows."}
 ]
},
{
 id:"rail", icon:"🚆", category:"Infrastructure", title:"RAILWAY MELTDOWN",
 text:"Signal failures and staff shortages cause a week of severe disruption. Mayors demand a major infrastructure package.",
 adviser:"Transport Secretary", avatar:"🚆", adviserText:"The railway needs boring long-term investment. Unfortunately, voters are angry right now.",
 choices:[
  {t:"Fund a rail upgrade",s:"Expensive, long term",e:{treasury:-6,economy:2,britain:3},h:"£12BN RAIL PLAN UNVEILED",d:"Government bets on infrastructure investment.",delay:{after:6,text:"Journey reliability improves as the first rail upgrades come online.",e:{economy:3,britain:4,approval:2}}},
  {t:"Compensate passengers",s:"Cheaper quick relief",e:{treasury:-2,approval:3,britain:1},h:"COMMUTERS GET PAYOUTS",d:"Automatic compensation ordered after rail chaos."},
  {t:"Blame the operator",s:"Free, maybe effective",e:{approval:1,power:-1,britain:-2},h:"PM BLASTS RAIL BOSSES",d:"Downing Street demands answers but announces no new money."}
 ]
},
{
 id:"migration", icon:"🛂", category:"Home Affairs", title:"ASYLUM BACKLOG",
 text:"The asylum backlog reaches a new high. Hotels are costing the government millions each day and local councils are furious.",
 adviser:"Home Secretary", avatar:"🛂", adviserText:"Speed, deterrence and legal robustness are pulling in different directions.",
 choices:[
  {t:"Hire 2,000 caseworkers",s:"Process claims faster",e:{treasury:-3,britain:4,approval:1},h:"ASYLUM TASKFORCE EXPANDED",d:"Government hires thousands to clear old cases.",delay:{after:5,text:"The asylum backlog begins falling as case decisions accelerate.",e:{britain:3,approval:2,treasury:2}}},
  {t:"Introduce harsher rules",s:"Deterrence first",e:{approval:2,power:-2,britain:-1},h:"PM UNVEILS ASYLUM CRACKDOWN",d:"New restrictions trigger legal challenges.",delay:{after:3,text:"A court blocks part of the asylum package, forcing ministers back to Parliament.",e:{power:-4,approval:-1}}},
  {t:"Give councils more money",s:"Ease local pressure",e:{treasury:-4,britain:2,approval:1},h:"COUNCILS GET MIGRATION CASH",d:"Emergency funding announced for affected areas."}
 ]
},
{
 id:"schools", icon:"🎓", category:"Education", title:"TEACHER SHORTAGE",
 text:"Schools report severe shortages in maths, science and computing teachers. The Education Secretary wants a retention package.",
 adviser:"Education Secretary", avatar:"🎓", adviserText:"Recruitment campaigns are easy. Keeping experienced teachers is the hard part.",
 choices:[
  {t:"Raise teacher pay",s:"Expensive retention boost",e:{treasury:-5,britain:4,approval:2},h:"TEACHERS WIN PAY BOOST",d:"Government targets shortage subjects with higher salaries.",delay:{after:6,text:"Teacher vacancy rates begin to fall.",e:{britain:4,economy:1}}},
  {t:"Offer tax-free bonuses",s:"Target shortage subjects",e:{treasury:-3,britain:3,approval:1},h:"STEM TEACHERS OFFERED BONUSES",d:"New retention scheme targets hard-to-fill subjects."},
  {t:"Launch a recruitment campaign",s:"Cheap and visible",e:{treasury:-1,approval:1,britain:-1},h:"NEW DRIVE TO RECRUIT TEACHERS",d:"Ministers unveil national advertising campaign."}
 ]
}
);
