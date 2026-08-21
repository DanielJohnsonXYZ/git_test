BASE_EVENTS.push(
{
 id:"election", icon:"🗳️", category:"Election", title:"CALL THE ELECTION",
 text:"Five years are up. Parliament must face the voters. Your record is about to become a seat count.",
 adviser:"Party Chair", avatar:"🗳", adviserText:"There are no more policy announcements that can save us. This is the exam.",
 final:true,
 choices:[
  {t:"Fight on the record",s:"Own your government",e:{power:2},h:"PM: JUDGE ME ON MY RECORD",d:"Election campaign begins with a defence of five years in office."},
  {t:"Promise a fresh start",s:"Distance yourself from mistakes",e:{approval:1,power:-1},h:"PM PROMISES NEW CHAPTER",d:"Government campaigns on change after five years in power."},
  {t:"Attack the opposition",s:"Make it a choice",e:{power:2,approval:-1},h:"ELECTION TURNS NEGATIVE",d:"Prime Minister launches fierce attack on opposition plans."}
 ]
}
);
