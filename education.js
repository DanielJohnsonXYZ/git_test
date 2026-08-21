const BRIEFINGS = {
  nhs_strike: {
    explainer: "The NHS is publicly funded, but the government does not simply set every employee's pay by decree. Pay settlements interact with departmental budgets, inflation, recruitment and other public-sector workers who may demand similar treatment.",
    control: "You can fund a higher settlement and set the negotiating mandate. You cannot make doctors accept it, and extra spending must come from taxes, borrowing or another budget.",
    stakeholders: [
      ["Doctors", "Higher pay, better staffing and working conditions", "👩‍⚕️"],
      ["Treasury", "Keep spending and borrowing under control", "💷"],
      ["Patients", "End disruption and reduce waiting lists", "🧑‍🧑‍🧒"],
      ["Your MPs", "Avoid an unpopular strike without looking weak", "🏛️"]
    ]
  },
  planning: {
    explainer: "National government can change planning law, but most individual planning decisions are made locally. New homes also depend on land, infrastructure, builders, finance and local political consent.",
    control: "You can rewrite national planning rules and fund infrastructure. Councils still implement much of the system, and MPs may rebel if development is unpopular in their seats.",
    stakeholders: [["Renters", "More homes and lower housing costs", "🔑"],["Homeowners", "Protect local character and property values", "🏡"],["Builders", "Faster permissions and viable projects", "🏗️"],["Backbench MPs", "Avoid local backlash", "🏛️"]]
  },
  tax_gap: {
    explainer: "A fiscal hole means expected government revenue no longer covers planned spending under the rules the government has chosen. There is no painless fix: taxes, spending, borrowing or the fiscal rules themselves have to move.",
    control: "The government controls most major taxes and departmental spending, but financial markets influence the cost of borrowing and economic growth changes the numbers again.",
    stakeholders: [["Taxpayers", "Keep more of their income", "👛"],["Public services", "Protect budgets", "🏥"],["Investors", "Credible and sustainable finances", "📈"],["Your party", "Keep manifesto promises", "🎗️"]]
  },
  rates: {
    explainer: "The Bank of England's Monetary Policy Committee sets Bank Rate independently. That separation is designed to stop governments manipulating interest rates for short-term political advantage.",
    control: "You cannot order an interest-rate cut. You can change taxes, spending, regulation and supply-side policy, all of which can indirectly affect inflation and growth.",
    stakeholders: [["Mortgage holders", "Lower monthly payments", "🏠"],["Bank of England", "Bring inflation to target", "🏦"],["Savers", "Reasonable returns on savings", "💰"],["Treasury", "Avoid policies that push inflation back up", "💷"]]
  },
  prisons: {
    explainer: "Prisons are the end of a chain involving police, prosecutors, courts, sentencing law, probation and prison capacity. Tougher sentences can increase demand for prison places years after the policy is announced.",
    control: "Government can fund prisons and change sentencing law, but judges decide individual sentences within the law and construction takes time.",
    stakeholders: [["Public", "Safety and punishment", "👥"],["Judges", "A workable justice system", "⚖️"],["Prison service", "Safe capacity and staffing", "🔒"],["Treasury", "Control a very expensive system", "💷"]]
  },
  energy: {
    explainer: "Britain buys and sells energy in international markets. Government can cushion prices or change the energy mix, but it cannot command the global gas price.",
    control: "You can subsidise households, tax producers, approve infrastructure and alter regulation. Long-term energy projects take years to affect supply.",
    stakeholders: [["Households", "Affordable bills", "🏠"],["Energy firms", "Stable investment rules", "⚡"],["Treasury", "Limit subsidy costs", "💷"],["Climate groups", "Move away from fossil fuels", "🌱"]]
  },
  migration: {
    explainer: "Immigration and asylum policy combines border control, international law, courts, Home Office administration, local government and the labour market. Announcing a rule is not the same as implementing it.",
    control: "Government can change immigration rules and administrative resources, but courts can review legality and councils handle many local consequences.",
    stakeholders: [["Home Office", "A system it can actually administer", "🛂"],["Councils", "Funding for local pressure", "🏘️"],["Employers", "Access to workers", "🏢"],["Voters", "Control, fairness and competence", "🗳️"]]
  },
  lords: {
    explainer: "Most bills must pass both the Commons and the Lords. The Lords can amend and delay legislation, although the elected Commons ultimately has greater democratic authority and special rules can limit the Lords' power.",
    control: "Your majority helps in the Commons. In the Lords you may need negotiation, repeated votes or to spend valuable parliamentary time.",
    stakeholders: [["Commons MPs", "Deliver the manifesto", "🏛️"],["House of Lords", "Scrutinise and revise", "👑"],["Campaign groups", "Change specific clauses", "📣"],["Whips", "Get the votes through", "📋"]]
  },
  default: {
    explainer: "Government decisions sit inside a system of institutions, budgets, laws and people with competing incentives. The visible choice is usually only the start of the process.",
    control: "As Prime Minister you set direction and coordinate government, but Parliament, ministers, courts, public bodies, markets and voters can all constrain what happens next.",
    stakeholders: [["Public", "Results without excessive cost", "👥"],["Treasury", "Affordable policy", "💷"],["Your party", "Stay electable and united", "🏛️"],["Delivery system", "A policy that can actually be implemented", "⚙️"]]
  }
};

const WORLD_NEWS = [
  "WORLD • Fighting intensifies in Eastern Europe as allies debate further military support",
  "ECONOMY • Global oil prices rise sharply after disruption to shipping routes",
  "EUROPE • European leaders meet to discuss defence spending and energy security",
  "MARKETS • Investors cut global growth forecasts after weak manufacturing data",
  "CLIMATE • Record temperatures renew pressure for faster adaptation spending",
  "TECH • New AI systems accelerate debate over jobs, copyright and regulation",
  "SECURITY • Major cyberattack hits infrastructure provider serving several European countries",
  "TRADE • Global shipping costs jump after disruption on a key trade route"
];

function getBriefing(event){
  return BRIEFINGS[event.id] || BRIEFINGS.default;
}
