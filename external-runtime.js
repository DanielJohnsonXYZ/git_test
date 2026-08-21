// External shocks interrupt the normal domestic event sequence.
const basePickEvent = pickEvent;
pickEvent = function(){
  state.externalSeen = state.externalSeen || {};
  if(state.eventIndex >= 4 && !state.externalSeen.europe){
    state.externalSeen.europe = true;
    return EXTERNAL_EVENTS[0];
  }
  if(state.eventIndex >= 11 && !state.externalSeen.shipping){
    state.externalSeen.shipping = true;
    return EXTERNAL_EVENTS[1];
  }
  return basePickEvent();
};
