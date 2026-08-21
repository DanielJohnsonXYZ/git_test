BASE_EVENTS.push(
{
 id:"nhs_strike", icon:"🏥", category:"Crisis", title:"NHS STRIKE",
 text:"Junior doctors have rejected the government's latest pay offer. Your Health Secretary wants an answer today.",
 adviser:"The Chancellor", avatar:"£", adviserText:"Every extra percentage point costs real money. There is no magic NHS pot.",
 choices:[
  {t:"Give them 8%",s:"Resolve the strike quickly",e:{approval:4,britain:5,economy:-2,treasury:-7},h:"PM CAVES TO DOCTORS",d:"Extra £2bn found for health staff pay rise.",delay:{after:4,text:"The NHS settlement eases disruption, but borrowing is now higher.",e:{britain:3,economy:-2}}},
  {t:"Offer 5% + reform",s:"Split the difference",e:{approval:1,britain:2,power:2,treasury:-4},h:"PM BETS ON NHS COMPROMISE",d:"Ministers tie pay deal to productivity reforms.",delay:{after:5,text:"The reform package begins improving hospital productivity.",e:{britain:5,economy:1}}},
  {t:"Refuse",s:"Hold the fiscal line",e:{approval:-4,britain:-5,power:1},h:"NO DEAL: STRIKES TO CONTINUE",d:"Prime Minister refuses to increase pay offer.",delay:{after:3,text:"Cancelled appointments pile up as the strike drags on.",e:{approval:-3,britain:-4}}}
 ]
},
{
 id:"planning", icon:"🏠", category:"Policy", title:"BUILD, BABY, BUILD?",
 text:"Housebuilding has stalled. Your Housing Secretary wants sweeping planning reform, but dozens of your own MPs fear a backlash in their constituencies.",
 adviser:"Chief Whip", avatar:"🏛", adviserText:"The policy is popular nationally. That does not mean your MPs want it in their back gardens.",
 vote:true, bill:"Planning Reform Bill",
 choices:[
  {t:"Full planning reform",s:"Take on the rebels",e:{approval:2,economy:4,power:-5,housing:8},h:"PM DECLARES WAR ON NIMBYS",d:"Government launches the biggest planning shake-up in decades.",voteBoost:-8,delay:{after:6,text:"Housebuilding finally starts to rise, easing rents in major cities.",e:{economy:3,britain:4,approval:2}}},
  {t:"Compromise with MPs",s:"Weaker reform, safer vote",e:{approval:1,economy:2,power:2,housing:4},h:"PLANNING DEAL SAVES PM REVOLT",d:"Rebels win concessions on local development.",voteBoost:9,delay:{after:6,text:"The compromise increases construction, but less than ministers hoped.",e:{economy:1,britain:2}}},
  {t:"Drop the bill",s:"Avoid a party war",e:{approval:-2,power:4,housing:-3},h:"PM ABANDONS HOUSEBUILDING FIGHT",d:"Government shelves controversial planning reforms.",delay:{after:5,text:"Rents keep climbing as housing supply remains tight.",e:{approval:-3,britain:-3}}}
 ]
},
{
 id:"tax_gap", icon:"💷", category:"Treasury", title:"£18BN FISCAL HOLE",
 text:"New forecasts show government borrowing is far above plan. The Chancellor says you need tax rises, spending cuts, or a looser fiscal rule.",
 adviser:"The Chancellor", avatar:"£", adviserText:"You can dislike arithmetic. Unfortunately, arithmetic is not polling.",
 choices:[
  {t:"Raise income tax",s:"Stable finances, angry voters",e:{approval:-5,economy:-1,power:1,treasury:8},h:"PM BREAKS TAX TABOO",d:"Income tax rise announced to repair public finances."},
  {t:"Cut departmental budgets",s:"Protect tax promise",e:{approval:-2,britain:-6,treasury:7,power:-2},h:"WHITEHALL FACES AUSTERITY ROUND",d:"Departments ordered to find billions in savings.",delay:{after:5,text:"Cuts begin showing up in stretched public services.",e:{britain:-4,approval:-2}}},
  {t:"Borrow more",s:"Delay the pain",e:{approval:2,economy:2,treasury:-5,power:-1},h:"PM RIPS UP FISCAL RULE",d:"Government chooses higher borrowing over immediate cuts.",delay:{after:4,text:"Higher borrowing costs squeeze your next Budget.",e:{economy:-3,treasury:-4}}}
 ]
},
{
 id:"rates", icon:"🏦", category:"Economy", title:"CUT INTEREST RATES?",
 text:"Mortgage holders are furious about high interest rates. A tabloid campaign demands that you order an immediate rate cut.",
 adviser:"Cabinet Secretary", avatar:"⚖", adviserText:"Prime Minister, the Bank of England sets Bank Rate independently. You cannot simply order a cut.",
 choices:[
  {t:"Respect the Bank",s:"Defend independence",e:{power:2,approval:-1,economy:1},h:"PM BACKS INDEPENDENT BANK",d:"Downing Street refuses to interfere with interest-rate decisions."},
  {t:"Publicly pressure it",s:"Popular but risky",e:{approval:2,power:-3,economy:-2},h:"PM TURNS FIRE ON BANK",d:"Government accused of undermining monetary independence."},
  {t:"Cut taxes instead",s:"Use fiscal policy",e:{approval:3,economy:2,treasury:-5},h:"PM ANNOUNCES MORTGAGE TAX RELIEF",d:"Treasury unveils temporary household support."}
 ]
},
{
 id:"prisons", icon:"🔒", category:"Crisis", title:"PRISONS ARE FULL",
 text:"The prison estate is at 99% capacity. Courts may soon be unable to send convicted offenders to prison.",
 adviser:"Justice Secretary", avatar:"⚖", adviserText:"There are no good headlines here. We either create space, release people earlier, or stop sending as many people in.",
 choices:[
  {t:"Emergency early release",s:"Fast, politically painful",e:{approval:-4,britain:1,power:-2},h:"PRISONERS FREED EARLY",d:"Emergency scheme begins to prevent system collapse."},
  {t:"Build temporary prisons",s:"Expensive capacity",e:{treasury:-5,britain:3,approval:1},h:"MODULAR JAILS ORDERED",d:"Government spends billions on emergency prison capacity."},
  {t:"Tougher sentencing anyway",s:"Popular today",e:{approval:3,power:1,britain:-4},h:"PM DOUBLES DOWN ON TOUGH JUSTICE",d:"Sentencing crackdown announced despite capacity warnings.",delay:{after:3,text:"Courts postpone sentences because prisons have nowhere to put people.",e:{approval:-5,britain:-5,power:-2}}}
 ]
}
);
