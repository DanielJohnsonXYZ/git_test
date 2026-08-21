const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,n));
const $=s=>document.querySelector(s);

const PROMISES=[
  ["nhs","🏥","Cut NHS waiting lists"],
  ["housing","🏠","Build more homes"],
  ["growth","📈","Grow the economy"],
  ["tax","💷","Keep taxes down"],
  ["crime","🚔","Cut crime"],
  ["climate","⚡","Secure clean energy"]
];

const BASE_EVENTS=[];
