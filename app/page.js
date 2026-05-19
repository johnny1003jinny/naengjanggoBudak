'use client';
import { useState, useEffect, useMemo } from "react";

const R = [
  ["e01","계란후라이","bh","5분","쉬움",["달걀"],["버터","대파"],["팬에 기름 두릅니다","달걀을 깨서 넣습니다","소금 뿌리고 원하는 익힘으로 굽습니다"],"약불에서 천천히 익히면 더 맛있어요"],
  ["e02","스크램블에그","bd","5분","쉬움",["달걀"],["우유","버터","치즈"],["달걀과 우유를 풀어줍니다","버터 녹인 팬에 약불로 저으며 익힙니다","반숙 상태에서 불 끕니다"],"불을 끄고 나서도 익으니 살짝 덜 익혔을 때 꺼내세요"],
  ["e03","달걀볶음밥","bh","10분","쉬움",["달걀","쌀"],["대파","간장","햄"],["찬밥을 준비합니다","팬에 기름 두르고 달걀 스크램블합니다","밥 넣고 간장·소금으로 볶습니다"],"찬밥을 써야 볶음밥이 잘 돼요"],
  ["e04","달걀찜","byd","15분","쉬움",["달걀"],["당근","대파"],["달걀 2개에 물 200ml 섞어 체에 거릅니다","소금 넣고 전자레인지 3분","또는 찜기 10분"],"체에 걸러야 부드러운 달걀찜이 돼요"],
  ["e05","계란국","by","8분","쉬움",["달걀"],["대파","참기름"],["물을 끓입니다","달걀을 풀어 천천히 붓습니다","소금·참기름으로 간하고 대파 넣습니다"],"젓가락으로 저으면서 부으면 예쁘게 풀려요"],
  ["e06","오믈렛","bd","10분","보통",["달걀"],["양파","당근","햄","치즈"],["채소와 햄을 잘게 썰어 볶습니다","달걀물 부어 가장자리가 익으면 속재료 넣습니다","반으로 접어 치즈를 올립니다"],"약불로 천천히 익혀야 부드러워요"],
  ["e07","간장계란밥","b","5분","쉬움",["달걀","쌀"],["버터","간장","김"],["따뜻한 밥에 버터를 올려 녹입니다","달걀프라이를 올립니다","간장과 구운 김 부순 것을 뿌려 비빕니다"],"버터가 녹으면서 밥과 섞이면 고소해요"],
  ["p01","삼겹살구이","h","15분","쉬움",["삼겹살"],["마늘","된장"],["삼겹살을 적당 두께로 썹니다","팬에 노릇하게 굽습니다","마늘도 함께 구워 먹습니다"],"중불로 천천히 구워야 육즙이 살아요"],
  ["p02","제육볶음","bh","20분","보통",["돼지고기"],["양파","대파","고추장"],["고추장·간장·설탕·마늘·참기름으로 양념장 만듭니다","돼지고기와 채소를 재웁니다","팬에 센 불로 빠르게 볶습니다"],"센 불에서 빠르게 볶아야 질겨지지 않아요"],
  ["p03","돼지고기된장찌개","b","25분","보통",["돼지고기","된장"],["감자","애호박","두부"],["돼지고기를 된장에 조물조물 무칩니다","물에 감자·양파 넣고 끓입니다","된장 풀고 고기 넣어 끓인 뒤 두부·호박 넣습니다"],"고기를 된장과 함께 볶으면 잡내가 없어요"],
  ["p04","부대찌개","h","25분","쉬움",["햄","소시지"],["김치","두부","라면","치즈"],["냄비에 김치·햄·소시지·두부를 얹습니다","고추장·된장으로 양념하고 물 붓습니다","끓으면 라면 사리와 치즈를 올립니다"],"치즈를 올리면 크리미한 맛이 나요"],
  ["b01","불고기","bh","20분","보통",["소고기"],["양파","버섯","간장"],["소고기를 간장·설탕·마늘·배·참기름으로 재웁니다","팬에 양파 먼저 볶다가 고기 넣습니다","센 불에서 빠르게 볶습니다"],"배즙을 넣으면 고기가 더 부드러워요"],
  ["b02","소고기무국","b","25분","보통",["소고기","무"],["대파","마늘","국간장"],["소고기를 참기름에 볶습니다","무 넣고 볶다가 물 붓습니다","국간장으로 간하고 대파 넣습니다"],"소고기는 먼저 볶아야 잡내가 없어요"],
  ["b03","소고기미역국","b","30분","보통",["소고기","미역"],["마늘","국간장","참기름"],["미역을 물에 불립니다","소고기를 참기름에 볶다가 미역 넣어 볶습니다","물 붓고 국간장으로 간합니다"],"충분히 볶아야 비린내가 없어요"],
  ["c01","닭볶음탕","bh","35분","보통",["닭고기"],["감자","당근","양파","고추장"],["닭을 끓는 물에 데쳐 잡내 제거합니다","감자·당근·양파를 큼직하게 썹니다","고추장·간장·설탕·마늘 양념을 넣고 끓입니다"],"국물이 졸아들 때 중불로 낮춰요"],
  ["c02","찜닭","bh","40분","보통",["닭고기","당면"],["감자","당근","양파"],["당면을 30분 불립니다","닭을 끓는 물에 데칩니다","간장·설탕·마늘 양념으로 냄비에 끓이고 당면을 마지막에 넣습니다"],"당면은 먹기 직전에 넣어야 불지 않아요"],
  ["c03","간장닭조림","bh","30분","보통",["닭고기"],["꽈리고추","양파","마늘"],["닭을 씻어 칼집 냅니다","간장4·설탕4·미림4·물100ml로 양념장 만듭니다","양파와 양념장 끓이다가 닭 넣고 자작하게 조립니다"],"칼집을 충분히 내야 양념이 속까지 배요"],
  ["s01","고등어조림","b","20분","보통",["고등어"],["무","대파","고추장"],["무를 냄비 바닥에 깝니다","간장·고추장·마늘·설탕으로 양념장 만듭니다","고등어 올리고 양념장 뿌려 조립니다"],"무를 먼저 깔아야 생선이 붙지 않아요"],
  ["s02","오징어볶음","b","15분","쉬움",["오징어"],["양파","대파","고추장"],["오징어를 손질해 먹기 좋게 썹니다","고추장·간장·설탕·마늘로 양념합니다","채소 볶다가 오징어 넣고 볶습니다"],"오래 볶으면 질겨지니 주의하세요"],
  ["s03","어묵볶음","b","10분","쉬움",["어묵"],["양파","당근","간장","설탕"],["어묵을 먹기 좋게 썹니다","팬에 기름 두르고 채소 볶습니다","어묵 넣고 간장·설탕으로 볶습니다"],"마지막에 참기름 두르면 더 맛있어요"],
  ["s04","참치찌개","b","15분","쉬움",["참치"],["두부","김치","양파","고추장"],["물에 된장·고추장 풀어 끓입니다","참치·두부·채소 넣습니다","간장으로 간합니다"],"참치는 기름 빼고 사용하세요"],
  ["v01","시금치나물","byd","10분","쉬움",["시금치"],["마늘","참기름","간장"],["시금치를 끓는 물에 살짝 데칩니다","찬물에 헹궈 물기를 꽉 짭니다","마늘·간장·참기름으로 무칩니다"],"너무 오래 데치면 영양소가 파괴돼요"],
  ["v02","콩나물국","bd","15분","쉬움",["콩나물"],["대파","마늘","국간장"],["냄비에 물과 콩나물을 넣습니다","뚜껑 닫고 끓입니다","소금·국간장으로 간하고 대파 넣습니다"],"중간에 뚜껑을 열면 비린내 나요"],
  ["v03","된장찌개","b","20분","보통",["된장"],["두부","감자","애호박","양파"],["멸치 육수를 냅니다","감자·양파 넣고 끓입니다","된장 풀어 넣고 두부·호박·대파 넣어 5분 끓입니다"],"간 보면서 된장을 조절하세요"],
  ["v04","순두부찌개","b","15분","쉬움",["순두부"],["달걀","대파","고춧가루"],["냄비에 기름 두르고 고춧가루 볶습니다","물 붓고 끓입니다","순두부 넣고 달걀을 풀어 넣습니다"],"달걀은 마지막에 넣어야 반숙으로 먹을 수 있어요"],
  ["v05","감자조림","b","20분","쉬움",["감자"],["간장","설탕","마늘"],["감자를 한입 크기로 썹니다","팬에 기름 두르고 볶습니다","간장·설탕·물 넣고 조립니다"],"물에 담갔다 쓰면 전분이 빠져요"],
  ["v06","두부조림","bd","15분","쉬움",["두부"],["간장","고춧가루","대파","마늘"],["두부를 도톰하게 썰어 소금 뿌려둡니다","기름에 앞뒤로 노릇하게 굽습니다","간장·고춧가루·마늘로 양념해 조립니다"],"물기 제거해야 기름이 안 튀어요"],
  ["v07","김치찌개","b","20분","쉬움",["김치"],["돼지고기","두부","대파"],["돼지고기를 볶다가 김치를 넣습니다","물을 붓고 끓입니다","두부·대파를 넣고 5분 끓입니다"],"잘 익은 김치를 써야 맛있어요"],
  ["v08","당근볶음","byd","10분","쉬움",["당근"],["마늘","소금","참기름"],["당근을 채썹니다","팬에 기름 두르고 마늘과 함께 볶습니다","소금으로 간하고 참기름 둘러 마무리합니다"],"센 불에서 빠르게 볶아야 색이 살아요"],
  ["v09","버섯볶음","bd","10분","쉬움",["버섯"],["마늘","간장","버터"],["버섯을 먹기 좋게 찢거나 썹니다","버터에 마늘 볶습니다","버섯 넣고 센 불에서 볶고 간장으로 간합니다"],"버섯은 물기가 많으니 센 불로 빠르게 볶아요"],
  ["v10","무국","bd","20분","쉬움",["무"],["대파","마늘","국간장"],["무를 나박썰기합니다","참기름 두르고 무를 볶습니다","물 붓고 끓여 국간장으로 간합니다"],"무를 먼저 볶으면 단맛이 살아요"],
  ["r01","흰죽","byd","25분","쉬움",["쌀"],["참기름","소금"],["쌀을 30분 불립니다","냄비에 쌀과 물(1:8) 넣고 끓입니다","약불에서 저으면서 20분 끓입니다"],"불린 쌀을 써야 빨리 끓어요"],
  ["r02","비빔밥","b","20분","쉬움",["쌀"],["시금치","당근","콩나물","달걀","고추장"],["나물들을 각각 무칩니다","달걀프라이를 만듭니다","밥 위에 나물과 달걀 올리고 고추장·참기름 넣어 비빕니다"],"참기름을 충분히 넣어야 잘 비벼져요"],
  ["r03","김치볶음밥","b","10분","쉬움",["김치","쌀"],["달걀","햄","참기름"],["팬에 기름 두르고 김치를 볶습니다","찬밥 넣고 함께 볶습니다","달걀프라이 올려 마무리합니다"],"김치 국물도 넣으면 맛이 진해요"],
  ["r04","라면","bh","5분","쉬움",["라면"],["달걀","대파","치즈"],["냄비에 물을 끓입니다","면과 스프를 넣습니다","달걀과 대파를 넣어 마무리합니다"],"면을 너무 오래 끓이면 불어요"],
  ["r05","떡볶이","bh","15분","쉬움",["떡","고추장"],["어묵","대파","달걀","설탕"],["멸치 육수를 냅니다","고추장·설탕·간장으로 양념장 만듭니다","육수에 양념 풀고 떡·어묵 넣어 졸입니다"],"멸치 육수가 포인트예요"],
  ["br01","토스트","b","5분","쉬움",["식빵"],["달걀","버터","치즈","햄"],["식빵을 팬에 굽습니다","달걀프라이와 햄을 올립니다","치즈를 넣어 샌드위치로 만듭니다"],"버터를 발라 구우면 더 고소해요"],
  ["br02","고구마간식","dy","10분","쉬움",["고구마"],[],["고구마를 깨끗이 씻습니다","전자레인지 5분 (중간에 뒤집기)","포크로 찔러봐서 쑥 들어가면 완성"],"에어프라이어 200도 15분도 OK"],
  ["tt01","[뚝딱] 계란볶이","bh","10분","쉬움",["달걀"],["고추장","간장","설탕"],["달걀을 완숙으로 삶아 껍질 벗깁니다","팬에 기름 두르고 달걀을 굴려가며 굽습니다","간장·설탕·고추장 양념장으로 코팅합니다"],"겉면을 바삭하게 구워야 양념이 잘 붙어요. 뚝딱!"],
  ["tt02","[뚝딱] 찜닭","bh","40분","보통",["닭고기","당면"],["감자","당근","양파"],["당면을 30분 불리고 닭을 데칩니다","간장·설탕·마늘 양념으로 냄비에 끓입니다","당면을 마지막에 넣고 2분 더 끓입니다"],"당면은 먹기 직전에 넣어야 불지 않아요. 뚝딱!"],
  ["tt03","[뚝딱] 국물제육볶음","bh","20분","쉬움",["돼지고기"],["양파","대파","고추장"],["고추장·간장·설탕·마늘로 양념합니다","팬에 양파 볶다가 고기 넣습니다","물을 자박하게 부어 끓입니다"],"물을 넣으면 국물이 생겨 밥에 비비기 좋아요. 뚝딱!"],
  ["tt04","[뚝딱] 고깃집볶음밥","h","10분","쉬움",["쌀","달걀"],["버터","간장","대파","김"],["버터를 팬에 녹입니다","달걀을 스크램블합니다","찬밥 넣고 간장으로 간하고 구운 김 섞습니다"],"버터를 넉넉히 써야 고깃집 볶음밥 맛이 나요. 뚝딱!"],
  ["tt05","[뚝딱] 된장삼겹살","h","20분","쉬움",["삼겹살","된장"],["마늘","양파","청양고추"],["팬에 된장 두르고 삼겹살을 굽습니다","마늘·양파를 넣고 함께 볶습니다","청양고추와 대파 넣어 마무리합니다"],"된장이 타지 않게 중불로 구워요. 뚝딱!"],
  ["tt06","[뚝딱] 해장라면","h","10분","쉬움",["라면"],["콩나물","달걀","대파","청양고추"],["냄비에 콩나물과 물 넣고 뚜껑 닫고 끓입니다","라면과 스프를 넣습니다","달걀·청양고추·대파로 마무리합니다"],"콩나물 끓일 때 뚜껑 열면 비린내 나요. 뚝딱!"],
  ["tt07","[뚝딱] 불닭덮밥","h","15분","쉬움",["닭고기","쌀"],["불닭소스","양파","달걀"],["닭을 불닭소스·간장·설탕으로 양념합니다","팬에 양파 볶다가 닭 넣고 볶습니다","밥 위에 올리고 달걀프라이를 얹습니다"],"소스가 탈 수 있으니 중불로 빠르게 볶아요. 뚝딱!"],
  ["tt08","[뚝딱] 분식집떡볶이","bh","20분","쉬움",["떡","고추장"],["어묵","대파","달걀"],["멸치 육수를 냅니다","고추장·설탕·간장으로 양념장 만듭니다","육수에 양념 풀고 떡·어묵 넣어 졸이고 달걀 넣습니다"],"멸치 육수가 포인트예요. 뚝딱!"],
];

const RECIPE_DB = R.map(([id,name,types,time,diff,main,opt,steps,tip]) => ({
  id, name, time, diff, main, opt, steps, tip,
  type: [...types].map(t => ({b:"basic",d:"diet",h:"highcal",y:"baby"}[t])).filter(Boolean),
}));

const FOOD_EXPIRY = {
  "달걀":30,"계란":30,"우유":10,"두부":7,"돼지고기":3,"소고기":3,"닭고기":2,"닭가슴살":2,
  "삼겹살":3,"목살":3,"갈비":3,"대파":14,"양파":30,"마늘":30,"감자":60,"고구마":60,
  "당근":30,"배추":14,"무":14,"콩나물":5,"시금치":5,"버섯":7,"애호박":7,"오이":7,
  "토마토":7,"사과":30,"바나나":5,"된장":365,"고추장":365,"참기름":365,"식용유":365,
  "밀가루":180,"라면":180,"어묵":14,"햄":14,"치즈":14,"버터":60,"요거트":14,
  "미역":365,"고등어":2,"새우":3,"오징어":3,"낙지":2,"떡":5,"국수":365,
  "당면":365,"식빵":5,"참치":1095,"스팸":1095,"소시지":7,"김치":30,
};

const MEAL_TYPES = [
  {id:"basic",label:"기본식",color:"#4CAF50"},
  {id:"baby",label:"유아식",color:"#FF9800"},
  {id:"diet",label:"다이어트",color:"#2196F3"},
  {id:"highcal",label:"고열량",color:"#F44336"},
];

const DEFAULT_STAPLES = [
  {id:"water",name:"물",amount:999,unit:"L"},
  {id:"rice",name:"쌀",amount:5,unit:"kg"},
  {id:"salt",name:"소금",amount:500,unit:"g"},
  {id:"sugar",name:"설탕",amount:500,unit:"g"},
  {id:"soysauce",name:"간장",amount:500,unit:"ml"},
];

const PRESET_STAPLES = [
  {id:"water",name:"물",unit:"L",amount:999},{id:"rice",name:"쌀",unit:"kg",amount:5},
  {id:"salt",name:"소금",unit:"g",amount:500},{id:"sugar",name:"설탕",unit:"g",amount:500},
  {id:"soysauce",name:"간장",unit:"ml",amount:500},{id:"soysauce2",name:"국간장",unit:"ml",amount:300},
  {id:"doenjang",name:"된장",unit:"g",amount:200},{id:"gochujang",name:"고추장",unit:"g",amount:200},
  {id:"sesameoil",name:"참기름",unit:"ml",amount:200},{id:"cookingoil",name:"식용유",unit:"ml",amount:500},
  {id:"vinegar",name:"식초",unit:"ml",amount:200},{id:"pepper",name:"후추",unit:"g",amount:50},
  {id:"garlic",name:"다진마늘",unit:"g",amount:100},{id:"flour",name:"밀가루",unit:"g",amount:500},
  {id:"chili",name:"고춧가루",unit:"g",amount:100},{id:"sesame",name:"깨",unit:"g",amount:50},
  {id:"mayo",name:"마요네즈",unit:"g",amount:200},{id:"mirin",name:"미림",unit:"ml",amount:200},
];

const UNITS = ["개","g","kg","ml","L","봉지","팩","컵","인분","조각"];
const SCREENS = {FRIDGE:"fridge",MEALS:"meals",RECIPE:"recipe",SHOPPING:"shopping",SETTINGS:"settings"};
const CAT_BG = {"육류":"#FFEBEE","해산물":"#E3F2FD","채소":"#E8F5E9","과일":"#FFF9C4","유제품":"#FFF3E0","가공":"#F3E5F5","곡류":"#FBE9E7","기타":"#ECEFF1"};
const CAT_FG = {"육류":"#C62828","해산물":"#1565C0","채소":"#2E7D32","과일":"#F57F17","유제품":"#E65100","가공":"#6A1B9A","곡류":"#BF360C","기타":"#455A64"};
const ING_CAT = {"돼지고기":"육류","소고기":"육류","닭고기":"육류","닭가슴살":"육류","삼겹살":"육류","갈비":"육류","달걀":"유제품","계란":"유제품","우유":"유제품","치즈":"유제품","버터":"유제품","고등어":"해산물","연어":"해산물","새우":"해산물","오징어":"해산물","낙지":"해산물","어묵":"가공","스팸":"가공","햄":"가공","참치":"가공","대파":"채소","양파":"채소","마늘":"채소","감자":"채소","고구마":"채소","당근":"채소","배추":"채소","무":"채소","콩나물":"채소","시금치":"채소","버섯":"채소","애호박":"채소","오이":"채소","토마토":"채소","두부":"채소","사과":"과일","바나나":"과일","쌀":"곡류","밀가루":"곡류","당면":"곡류","떡":"곡류","국수":"곡류","라면":"곡류","식빵":"곡류"};

const uid = () => Math.random().toString(36).slice(2);
const getDaysSince = ts => Math.floor((Date.now() - ts) / 86400000);
const cat = name => ING_CAT[name] || "기타";
const cbg = name => CAT_BG[cat(name)] || "#ECEFF1";
const cfg = name => CAT_FG[cat(name)] || "#455A64";

function loadLS(k, fb) {
  if (typeof window === "undefined") return fb;
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; }
}
function saveLS(k, v) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}

function pickOffline(ingredients, staples, mealType, simpleBreakfast) {
  const allNames = [...ingredients, ...staples].map(i => i.name);
  const score = r => {
    if (!r.type.includes(mealType)) return -1;
    let s = 0;
    for (const m of r.main) s += allNames.includes(m) ? 10 : -8;
    for (const o of r.opt) if (allNames.includes(o)) s += 2;
    return s;
  };
  const scored = RECIPE_DB.map(r => ({...r, score: score(r)})).filter(r => r.score >= -8).sort((a,b) => b.score - a.score);
  const bfIds = ["e01","e02","e04","e05","r01","br01","br02"];
  const bfPool = simpleBreakfast ? scored.filter(r => bfIds.includes(r.id)) : scored;
  const pick = (pool, excl) => pool.filter(r => !excl.includes(r.id))[0] || scored.filter(r => !excl.includes(r.id))[0];
  const bf = pick(bfPool.length ? bfPool : scored, []);
  const lu = pick(scored, [bf?.id]);
  const di = pick(scored, [bf?.id, lu?.id]);
  const fmt = r => r ? {...r, description:`${r.time} · ${r.diff}`, missingIngredients:r.main.filter(m=>!allNames.includes(m))} : null;
  return {breakfast:fmt(bf), lunch:fmt(lu), dinner:fmt(di)};
}

export default function App() {
  const [screen, setScreen]           = useState(SCREENS.FRIDGE);
  const [ingredients, setIngredients] = useState([]);
  const [staples, setStaples]         = useState(DEFAULT_STAPLES);
  const [mealType, setMealType]       = useState("basic");
  const [simpleBreakfast, setSB]      = useState(true);
  const [meals, setMeals]             = useState(null);
  const [loadingMeals, setLoading]    = useState(false);
  const [mealError, setMealError]     = useState(null);
  const [useAI, setUseAI]             = useState(true);
  const [selRecipe, setSelRecipe]     = useState(null);
  const [shopping, setShopping]       = useState([]);
  const [confirmConsumed, setCC]      = useState(null);
  const [cookingDone, setCookDone]    = useState(false);
  const [showAdd, setShowAdd]         = useState(false);
  const [noti, setNoti]               = useState([]);
  const [notiIdx, setNotiIdx]         = useState(0);
  const [hydrated, setHydrated]       = useState(false);

  useEffect(() => {
    setIngredients(loadLS("nb6_ing", []));
    setStaples(loadLS("nb6_sta", DEFAULT_STAPLES));
    setShopping(loadLS("nb6_shop", []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) saveLS("nb6_ing", ingredients); }, [ingredients, hydrated]);
  useEffect(() => { if (hydrated) saveLS("nb6_sta", staples); }, [staples, hydrated]);
  useEffect(() => { if (hydrated) saveLS("nb6_shop", shopping); }, [shopping, hydrated]);

  useEffect(() => {
    const n = [];
    ingredients.forEach(ing => {
      if (!ing.expiryDays) return;
      const rem = ing.expiryDays - getDaysSince(ing.addedDate);
      if (rem <= 0) n.push(`🚨 ${ing.name} 소비기한 초과`);
      else if (rem <= 3) n.push(`⚠️ ${ing.name} D-${rem}일`);
      else if (getDaysSince(ing.addedDate) > 14 && ing.expiryDays > 30) n.push(`📅 ${ing.name} 소비기한 확인`);
    });
    setNoti(n); setNotiIdx(0);
  }, [ingredients]);

  useEffect(() => {
    if (noti.length < 2) return;
    const t = setInterval(() => setNotiIdx(i => (i+1) % noti.length), 3500);
    return () => clearInterval(t);
  }, [noti]);

  const generateMeals = async () => {
    setLoading(true); setMeals(null); setMealError(null);
    let result;
    if (useAI) {
      try {
        const res = await fetch("/api/recipe", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ingredients, staples, mealType, simpleBreakfast}),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "서버 오류");
        if (!data.breakfast || !data.lunch || !data.dinner) throw new Error("응답 형식 오류");
        result = {
          breakfast: {...data.breakfast, id:"ai_bf", main:data.breakfast.main||[]},
          lunch:     {...data.lunch,     id:"ai_lu", main:data.lunch.main||[]},
          dinner:    {...data.dinner,    id:"ai_di", main:data.dinner.main||[]},
        };
      } catch(e) {
        setMealError(`AI 실패: ${e.message} — 내장 레시피로 추천합니다`);
        result = pickOffline(ingredients, staples, mealType, simpleBreakfast);
      }
    } else {
      result = pickOffline(ingredients, staples, mealType, simpleBreakfast);
    }
    setMeals(result);
    const missing = [
      ...(result.breakfast?.missingIngredients||[]),
      ...(result.lunch?.missingIngredients||[]),
      ...(result.dinner?.missingIngredients||[]),
    ].filter((v,i,a) => v && a.indexOf(v)===i);
    if (missing.length) setShopping(prev => {
      const set = new Set(prev.map(x=>x.name));
      return [...prev, ...missing.filter(m=>!set.has(m)).map(m=>({id:uid(),name:m,checked:false}))];
    });
    setLoading(false);
  };

  const openRecipe = m => { setSelRecipe(RECIPE_DB.find(r=>r.id===m.id)||m); setScreen(SCREENS.RECIPE); };

  const handleCooking = () => {
    if (!selRecipe) return;
    const used = [...(selRecipe.main||[]),...(selRecipe.opt||[])];
    const gone = [];
    setIngredients(prev => prev.map(ing => {
      if (!used.includes(ing.name)) return ing;
      const next = Math.max(0, ing.amount-1);
      if (next===0) gone.push({...ing});
      return {...ing, amount:next};
    }));
    if (gone.length) setCC(gone);
    else { setCookDone(true); setTimeout(()=>setCookDone(false),2500); }
  };

  const doRemove = () => {
    setIngredients(prev=>prev.filter(i=>!confirmConsumed.find(r=>r.id===i.id)));
    setCC(null); setCookDone(true); setTimeout(()=>setCookDone(false),2500);
  };

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={S.hRow}>
          <div style={S.logo}>
            <div style={S.logoBox}>냉</div>
            <div>
              <div style={S.logoTitle}>냉장고를부탁앱</div>
              <div style={S.logoSub}>🤖 Claude AI 레시피 검색</div>
            </div>
          </div>
          {noti.length>0 && <div style={S.badge}>⚠️{noti.length}</div>}
        </div>
        {noti.length>0 && <div style={S.notiBar}>{noti[notiIdx]}</div>}
      </header>

      <nav style={S.nav}>
        {[[SCREENS.FRIDGE,"냉장고"],[SCREENS.MEALS,"식단"],[SCREENS.RECIPE,"레시피"],[SCREENS.SHOPPING,"장보기"],[SCREENS.SETTINGS,"설정"]].map(([id,lb])=>(
          <button key={id} style={{...S.navBtn,...(screen===id?S.navOn:{})}} onClick={()=>setScreen(id)}>{lb}</button>
        ))}
      </nav>

      <main style={S.main}>
        {screen===SCREENS.FRIDGE   && <FridgeScreen   ingredients={ingredients} setIngredients={setIngredients} staples={staples} showAdd={showAdd} setShowAdd={setShowAdd} setShopping={setShopping}/>}
        {screen===SCREENS.MEALS    && <MealsScreen    meals={meals} loading={loadingMeals} error={mealError} mealType={mealType} setMealType={setMealType} simpleBreakfast={simpleBreakfast} setSB={setSB} onGenerate={generateMeals} onSelect={openRecipe} ingredients={ingredients} staples={staples} useAI={useAI} setUseAI={setUseAI}/>}
        {screen===SCREENS.RECIPE   && <RecipeScreen   recipe={selRecipe} onCooking={handleCooking} cookingDone={cookingDone}/>}
        {screen===SCREENS.SHOPPING && <ShoppingScreen list={shopping} setList={setShopping} ingredients={ingredients} setIngredients={setIngredients}/>}
        {screen===SCREENS.SETTINGS && <SettingsScreen staples={staples} setStaples={setStaples}/>}
      </main>

      {confirmConsumed && (
        <Modal onClose={()=>setCC(null)}>
          <div style={S.mTitle}>모두 소비하셨습니까?</div>
          <div style={S.mDesc}><strong>{confirmConsumed.map(i=>i.name).join(", ")}</strong> 재료가 모두 소진되었습니다.</div>
          <div style={S.mBtns}><button style={S.btnSec} onClick={()=>setCC(null)}>아니요</button><button style={S.btnPri} onClick={doRemove}>네, 제거합니다</button></div>
        </Modal>
      )}
    </div>
  );
}

function FridgeScreen({ingredients,setIngredients,staples,showAdd,setShowAdd,setShopping}){
  const[search,setSearch]=useState("");const[addTab,setAddTab]=useState("direct");
  const[name,setName]=useState("");const[amount,setAmount]=useState("1");const[unit,setUnit]=useState("개");const[editId,setEditId]=useState(null);
  const filtered=useMemo(()=>ingredients.filter(i=>!search||i.name.includes(search)),[ingredients,search]);
  const addDirect=()=>{if(!name.trim())return;if(ingredients.find(i=>i.name===name.trim())){setShowAdd(false);return;}setIngredients(prev=>[...prev,{id:uid(),name:name.trim(),amount:parseFloat(amount)||1,unit,expiryDays:FOOD_EXPIRY[name.trim()]||14,addedDate:Date.now()}]);setName("");setAmount("1");setShowAdd(false);};
  const addFS=()=>{if(!search.trim()||ingredients.find(i=>i.name===search.trim()))return;setIngredients(prev=>[...prev,{id:uid(),name:search.trim(),amount:1,unit:"개",expiryDays:FOOD_EXPIRY[search.trim()]||14,addedDate:Date.now()}]);setSearch("");};
  const remove=id=>setIngredients(prev=>prev.filter(i=>i.id!==id));
  const adjAmt=(id,d)=>setIngredients(prev=>prev.map(i=>i.id===id?{...i,amount:Math.max(0,+(i.amount+d).toFixed(0))}:i));
  const setAmt=(id,v)=>setIngredients(prev=>prev.map(i=>i.id===id?{...i,amount:parseFloat(v)||0}:i));
  const setUF=(id,u)=>setIngredients(prev=>prev.map(i=>i.id===id?{...i,unit:u}:i));
  const expB=ing=>{if(!ing.expiryDays)return null;const r=ing.expiryDays-getDaysSince(ing.addedDate);if(r<=0)return{bg:"#FF4444",txt:"만료"};if(r<=3)return{bg:"#FF9800",txt:`D-${r}`};if(r<=7)return{bg:"#FFC107",txt:`D-${r}`};return null;};
  const SG=["달걀","양파","대파","감자","당근","두부","시금치","콩나물","애호박","버섯","닭고기","돼지고기","소고기","우유","치즈","고구마","오이","토마토","무","배추","새우","어묵","스팸","참치","김치"];
  return(
    <div>
      <SH title="내 냉장고" subtitle={`${ingredients.length}가지 보관 중`}/>
      <div style={S.row}>
        <input style={S.inp} placeholder="재료 검색 후 바로 추가..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addFS()}/>
        {search.trim()&&!ingredients.find(i=>i.name===search.trim())?<button style={S.addBtn} onClick={addFS}>+ 추가</button>:<button style={S.addBtn} onClick={()=>{setShowAdd(true);setAddTab("direct");}}>+ 추가</button>}
      </div>
      {ingredients.length===0&&<Emp text="냉장고가 비어있어요" sub="검색창에 재료명 입력 후 추가하세요"/>}
      <div style={S.grid}>
        {filtered.map(ing=>{const exp=expB(ing);const isE=editId===ing.id;return(
          <div key={ing.id} style={{...S.ingCard,background:cbg(ing.name)}}>
            {exp&&<div style={{...S.expBadge,background:exp.bg}}>{exp.txt}</div>}
            <div style={{...S.ingName,color:cfg(ing.name)}}>{ing.name}</div>
            {isE?(<div style={{marginBottom:5}}><input style={S.amtInp} type="number" value={ing.amount} onChange={e=>setAmt(ing.id,e.target.value)}/><select style={S.unitSm} value={ing.unit} onChange={e=>setUF(ing.id,e.target.value)}>{UNITS.map(u=><option key={u}>{u}</option>)}</select></div>)
            :(<div style={S.ingAmt} onClick={()=>setEditId(ing.id)}>{ing.amount}{ing.unit} ✏️</div>)}
            <div style={S.ingCtrl}>
              {isE?<button style={{...S.smBtn,color:"#1b3a5c",fontWeight:700,padding:"4px 10px"}} onClick={()=>setEditId(null)}>완료</button>
              :<><button style={S.smBtn} onClick={()=>adjAmt(ing.id,-1)}>−</button><button style={S.smBtn} onClick={()=>adjAmt(ing.id,+1)}>+</button><button style={{...S.smBtn,color:"#F44336"}} onClick={()=>remove(ing.id)}>🗑</button></>}
            </div>
          </div>
        );})}
      </div>
      {showAdd&&(<Modal onClose={()=>setShowAdd(false)}>
        <div style={S.tabRow}><button style={{...S.tab,...(addTab==="direct"?S.tabOn:{})}} onClick={()=>setAddTab("direct")}>직접 추가</button><button style={{...S.tab,...(addTab==="suggest"?S.tabOn:{})}} onClick={()=>setAddTab("suggest")}>추천 재료</button></div>
        {addTab==="direct"&&(<><div style={S.mTitle}>재료 추가</div><input style={S.mInput} placeholder="재료 이름" value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addDirect()}/><div style={S.amtRow}><input style={{...S.mInput,flex:1,marginBottom:0}} placeholder="수량" type="number" value={amount} onChange={e=>setAmount(e.target.value)}/><select style={S.unitLg} value={unit} onChange={e=>setUnit(e.target.value)}>{UNITS.map(u=><option key={u}>{u}</option>)}</select></div>{name&&FOOD_EXPIRY[name.trim()]&&<div style={S.expHint}>📅 소비기한 약 {FOOD_EXPIRY[name.trim()]}일</div>}<button style={{...S.btnPri,width:"100%",marginTop:14}} onClick={addDirect}>추가하기</button></>)}
        {addTab==="suggest"&&(<><div style={S.mTitle}>자주 쓰는 식재료</div><div style={{fontSize:12,color:"#888",marginBottom:12}}>탭하면 냉장고에 바로 추가돼요</div><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{SG.filter(n=>!ingredients.find(i=>i.name===n)).map(n=>(<button key={n} style={{padding:"8px 14px",borderRadius:20,border:"1.5px solid #DDE",background:"#F8F8F8",fontSize:13,fontWeight:600,color:"#333",cursor:"pointer"}} onClick={()=>setIngredients(prev=>[...prev,{id:uid(),name:n,amount:1,unit:"개",expiryDays:FOOD_EXPIRY[n]||14,addedDate:Date.now()}])}>{n}</button>))}</div></>)}
      </Modal>)}
    </div>
  );
}

function MealsScreen({meals,loading,error,mealType,setMealType,simpleBreakfast,setSB,onGenerate,onSelect,ingredients,staples,useAI,setUseAI}){
  const SLOTS=[{key:"breakfast",label:"아침",bg:"#FFFDE7"},{key:"lunch",label:"점심",bg:"#F1F8E9"},{key:"dinner",label:"저녁",bg:"#E8EAF6"}];
  const allNames=useMemo(()=>[...ingredients,...staples].map(i=>i.name),[ingredients,staples]);
  return(
    <div>
      <SH title="오늘의 식단" subtitle={useAI?"🤖 Claude AI가 실시간으로 레시피를 찾아요":`내장 레시피 ${RECIPE_DB.length}개 중 추천`}/>
      <div style={S.card}>
        <div style={S.cTitle}>식단 유형</div>
        <div style={S.typeGrid}>{MEAL_TYPES.map(t=>(<button key={t.id} style={{...S.typeBtn,...(mealType===t.id?{background:t.color,color:"#fff",border:`1.5px solid ${t.color}`}:{})}} onClick={()=>setMealType(t.id)}>{t.label}</button>))}</div>
        <div style={S.toggleRow}>
          <div><div style={{fontSize:13,fontWeight:700}}>아침 간편식으로</div><div style={{fontSize:11,color:"#aaa"}}>죽·달걀·토스트 등</div></div>
          <div style={{...S.toggle,background:simpleBreakfast?"#4CAF50":"#CCC"}} onClick={()=>setSB(p=>!p)}><div style={{...S.thumb,transform:simpleBreakfast?"translateX(20px)":"none"}}/></div>
        </div>
        <div style={{...S.toggleRow,marginTop:11,paddingTop:11}}>
          <div><div style={{fontSize:13,fontWeight:700}}>🤖 AI 레시피 검색</div><div style={{fontSize:11,color:"#aaa"}}>Claude가 실시간으로 레시피 추천</div></div>
          <div style={{...S.toggle,background:useAI?"#7C3AED":"#CCC"}} onClick={()=>setUseAI(p=>!p)}><div style={{...S.thumb,transform:useAI?"translateX(20px)":"none"}}/></div>
        </div>
      </div>
      <button style={{...S.btnPri,width:"100%",padding:15,fontSize:16,marginBottom:14,background:useAI?"#7C3AED":"#1b3a5c"}} onClick={onGenerate} disabled={loading}>
        {loading?(useAI?"🤖 AI가 레시피를 찾는 중...":"레시피를 찾는 중..."):(useAI?"🤖 AI로 오늘의 식단 추천받기":"✦ 오늘의 식단 추천받기")}
      </button>
      {loading&&<LoadingDots label={useAI?"Claude AI가 냉장고 재료를 분석하는 중...":"레시피를 매칭하는 중..."}/>}
      {error&&<div style={{background:"#FFF8F0",border:"1px solid #FFD599",borderRadius:10,padding:"10px 14px",color:"#B36200",fontSize:13,marginBottom:12}}>⚠️ {error}</div>}
      {meals&&SLOTS.map(sl=>{
        const m=meals[sl.key];if(!m)return null;
        const ok=(m.missingIngredients||[]).length===0;
        return(<div key={sl.key} style={{...S.mealCard,background:sl.bg}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <div style={{fontSize:10,fontWeight:800,color:"#888"}}>{sl.label}</div>
            <span style={{fontSize:11,background:ok?"#E8F5E9":"#FFF3E0",color:ok?"#2E7D32":"#E65100",borderRadius:10,padding:"2px 8px",fontWeight:700}}>{ok?"바로 가능 ✓":"재료 부족"}</span>
          </div>
          <div style={{fontSize:17,fontWeight:800,color:"#0d1b2a",marginBottom:3}}>{m.name}</div>
          <div style={{fontSize:12,color:"#888",marginBottom:8}}>{m.description||`⏱ ${m.time} · ${m.diff}`}</div>
          <div style={S.tagRow}>{(m.main||[]).map(x=><span key={x} style={{...S.tag,background:allNames.includes(x)?"#C8E6C9":"#FFCDD2",color:allNames.includes(x)?"#1B5E20":"#B71C1C"}}>{x}</span>)}</div>
          {(m.missingIngredients||[]).length>0&&<div style={S.missingBox}>🛒 추가 필요: {m.missingIngredients.join(", ")}</div>}
          <button style={S.recipeBtn} onClick={()=>onSelect(m)}>레시피 보기 →</button>
        </div>);
      })}
    </div>
  );
}

function RecipeScreen({recipe,onCooking,cookingDone}){
  const[search,setSearch]=useState("");
  const filtered=useMemo(()=>RECIPE_DB.filter(r=>!search||r.name.includes(search)||r.main.some(m=>m.includes(search))),[search]);
  if(!recipe)return(<div><SH title="레시피 검색" subtitle={`내장 레시피 ${RECIPE_DB.length}개`}/><div style={S.row}><input style={S.inp} placeholder="요리명 또는 재료로 검색..." value={search} onChange={e=>setSearch(e.target.value)}/></div>{search&&filtered.map(r=>(<div key={r.id} style={{...S.card,cursor:"pointer",marginBottom:10}}><div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{r.name}</div><div style={{fontSize:12,color:"#888",marginBottom:6}}>⏱ {r.time} · {r.diff}</div><div style={S.tagRow}>{r.main.map(m=><span key={m} style={{...S.tag,background:cbg(m),color:cfg(m)}}>{m}</span>)}</div></div>))}{!search&&<Emp text="식단 탭에서 요리를 선택하거나\n위에서 검색해보세요"/>}</div>);
  return(<div>
    <div style={S.hero}><div style={{fontSize:20,fontWeight:800,marginBottom:8}}>{recipe.name}</div><div style={{display:"flex",gap:13,fontSize:12,opacity:0.8}}><span>⏱ {recipe.time}</span><span>📊 {recipe.diff}</span></div></div>
    <div style={S.card}><div style={S.cTitle}>주재료</div><div style={S.tagRow}>{(recipe.main||[]).map(m=><span key={m} style={{...S.tag,background:cbg(m),color:cfg(m)}}>{m}</span>)}</div>{recipe.opt&&recipe.opt.length>0&&<><div style={{fontSize:12,color:"#888",marginTop:8,marginBottom:6}}>선택 재료</div><div style={S.tagRow}>{recipe.opt.map(o=><span key={o} style={{...S.tag,background:"#F5F5F5",color:"#666"}}>{o}</span>)}</div></>}</div>
    <div style={S.card}><div style={S.cTitle}>조리 순서</div>{(recipe.steps||[]).map((step,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:12,alignItems:"flex-start"}}><div style={{minWidth:25,height:25,background:"#1b3a5c",color:"#fff",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0}}>{i+1}</div><div style={{fontSize:13,color:"#333",lineHeight:1.55,paddingTop:4}}>{step}</div></div>))}</div>
    {recipe.tip&&<div style={S.tipBox}>💡 <b>팁:</b> {recipe.tip}</div>}
    {cookingDone&&<div style={S.cookDone}>✅ 재료가 소진되었습니다!</div>}
    <button style={{...S.btnPri,width:"100%",padding:15,fontSize:16,background:"#C62828",marginTop:4}} onClick={onCooking}>요리하기 (재료 소진)</button>
  </div>);
}

function ShoppingScreen({list,setList,ingredients,setIngredients}){
  const[newItem,setNewItem]=useState("");
  const add=()=>{if(!newItem.trim())return;setList(prev=>[...prev,{id:uid(),name:newItem.trim(),checked:false}]);setNewItem("");};
  const toggle=id=>setList(prev=>prev.map(i=>i.id===id?{...i,checked:!i.checked}:i));
  const remove=id=>setList(prev=>prev.filter(i=>i.id!==id));
  const addToFridge=item=>{if(ingredients.find(i=>i.name===item.name))return;setIngredients(prev=>[...prev,{id:uid(),name:item.name,amount:1,unit:"개",expiryDays:FOOD_EXPIRY[item.name]||14,addedDate:Date.now()}]);toggle(item.id);};
  const undone=list.filter(i=>!i.checked),done=list.filter(i=>i.checked);
  return(<div>
    <SH title="장보기 목록" subtitle={`${undone.length}가지 구매 필요`}/>
    <div style={S.row}><input style={S.inp} placeholder="재료 추가..." value={newItem} onChange={e=>setNewItem(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()}/><button style={S.addBtn} onClick={add}>추가</button></div>
    {list.length===0&&<Emp text="목록이 비어있어요" sub="식단 추천 시 부족한 재료가 자동으로 추가돼요"/>}
    {undone.map(item=>(<div key={item.id} style={S.shopRow}><button style={S.chkBox} onClick={()=>toggle(item.id)}>☐</button><span style={{flex:1,fontSize:14}}>{item.name}</span><button style={S.fridgeBtn} onClick={()=>addToFridge(item)}>냉장고↑</button><button style={S.xBtn} onClick={()=>remove(item.id)}>✕</button></div>))}
    {done.length>0&&(<><div style={S.divider}>완료 ({done.length})<button style={S.clrBtn} onClick={()=>setList(prev=>prev.filter(i=>!i.checked))}>전체삭제</button></div>{done.map(item=>(<div key={item.id} style={{...S.shopRow,opacity:0.45}}><button style={{...S.chkBox,background:"#4CAF50",color:"#fff",border:"none"}} onClick={()=>toggle(item.id)}>✓</button><span style={{flex:1,fontSize:14,textDecoration:"line-through"}}>{item.name}</span><button style={S.xBtn} onClick={()=>remove(item.id)}>✕</button></div>))}</>)}
  </div>);
}

function SettingsScreen({staples,setStaples}){
  const[cName,setCName]=useState("");const[cAmt,setCAmt]=useState("200");const[cUnit,setCUnit]=useState("g");const[editId,setEditId]=useState(null);
  const toggleP=c=>{const has=staples.find(s=>s.id===c.id);setStaples(prev=>has?prev.filter(s=>s.id!==c.id):[...prev,{...c}]);};
  const addCustom=()=>{if(!cName.trim()||staples.find(s=>s.name===cName.trim()))return;setStaples(prev=>[...prev,{id:uid(),name:cName.trim(),amount:parseFloat(cAmt)||100,unit:cUnit}]);setCName("");setCAmt("200");};
  const removeS=id=>setStaples(prev=>prev.filter(s=>s.id!==id));
  const setAmtS=(id,v)=>setStaples(prev=>prev.map(s=>s.id===id?{...s,amount:parseFloat(v)||0}:s));
  const setUnitS=(id,u)=>setStaples(prev=>prev.map(s=>s.id===id?{...s,unit:u}:s));
  return(<div>
    <SH title="설정" subtitle="항상 있는 기본 양념·재료 관리"/>
    <div style={S.card}><div style={S.cTitle}>빠른 선택 (양념류)</div><div style={{fontSize:12,color:"#888",marginBottom:10}}>탭하면 항상있는 재료로 추가/제거</div><div style={S.stapleGrid}>{PRESET_STAPLES.map(c=>{const on=!!staples.find(s=>s.id===c.id);return(<button key={c.id} style={{...S.stapleBtn,...(on?S.stOn:{})}} onClick={()=>toggleP(c)}>{c.name}{on?" ✓":""}</button>);})}</div></div>
    <div style={S.card}><div style={S.cTitle}>직접 추가</div><input style={S.mInput} placeholder="재료 이름 (예: 케첩)" value={cName} onChange={e=>setCName(e.target.value)}/><div style={S.amtRow}><input style={{...S.mInput,flex:1,marginBottom:0}} placeholder="수량" type="number" value={cAmt} onChange={e=>setCAmt(e.target.value)}/><select style={S.unitLg} value={cUnit} onChange={e=>setCUnit(e.target.value)}>{UNITS.map(u=><option key={u}>{u}</option>)}</select></div><button style={{...S.btnPri,width:"100%",marginTop:10}} onClick={addCustom}>항상있는 재료로 추가</button></div>
    <div style={S.card}><div style={S.cTitle}>현재 항상있는 재료 ({staples.length}개)</div>{staples.length===0&&<div style={{color:"#bbb",fontSize:13}}>선택된 재료 없음</div>}{staples.map(s=>{const isE=editId===s.id;return(<div key={s.id} style={{display:"flex",alignItems:"center",paddingTop:9,paddingBottom:9,borderBottom:"1px solid #F5F5F5"}}><span style={{flex:1,fontSize:13,fontWeight:600}}>{s.name}</span>{isE?(<div style={{display:"flex",gap:5,alignItems:"center"}}><input style={{width:55,padding:"3px 5px",border:"1px solid #CCC",borderRadius:5,fontSize:12,textAlign:"center",boxSizing:"border-box"}} type="number" value={s.amount} onChange={e=>setAmtS(s.id,e.target.value)}/><select style={{padding:"3px",border:"1px solid #CCC",borderRadius:5,fontSize:11,background:"#fff"}} value={s.unit} onChange={e=>setUnitS(s.id,e.target.value)}>{UNITS.map(u=><option key={u}>{u}</option>)}</select><button style={{padding:"4px 8px",border:"none",borderRadius:5,background:"#1b3a5c",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700}} onClick={()=>setEditId(null)}>완료</button></div>):(<div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:12,color:"#888",cursor:"pointer"}} onClick={()=>setEditId(s.id)}>{s.amount}{s.unit} ✏️</span><button style={{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:16}} onClick={()=>removeS(s.id)}>✕</button></div>)}</div>);})}</div>
  </div>);
}

function Modal({children,onClose}){return(<div style={S.overlay} onClick={onClose}><div style={S.modal} onClick={e=>e.stopPropagation()}><button style={S.closeBtn} onClick={onClose}>✕</button>{children}</div></div>);}
function SH({title,subtitle}){return(<div style={{padding:"16px 0 10px"}}><div style={{fontSize:19,fontWeight:800,color:"#0d1b2a"}}>{title}</div>{subtitle&&<div style={{fontSize:12,color:"#778",marginTop:3}}>{subtitle}</div>}</div>);}
function Emp({text,sub}){return(<div style={{textAlign:"center",color:"#BBB",padding:"36px 20px",lineHeight:2,fontSize:14,whiteSpace:"pre-line"}}>{text}{sub&&<><br/><small>{sub}</small></>}</div>);}
function LoadingDots({label}){return(<div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 0"}}><div style={{display:"flex",gap:7}}>{[0,1,2].map(i=><div key={i} style={{width:9,height:9,borderRadius:"50%",background:"#7C3AED",animation:"bounce 1s infinite",animationDelay:`${i*0.2}s`}}/>)}</div>{label&&<div style={{marginTop:12,color:"#888",fontSize:12,textAlign:"center"}}>{label}</div>}<style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-10px)}}`}</style></div>);}

const S={
  app:{fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif",background:"#F2F4F7",minHeight:"100vh",maxWidth:480,margin:"0 auto"},
  header:{background:"linear-gradient(160deg,#0d1b2a,#1b3a5c)",color:"#fff",padding:"15px 16px 0"},
  hRow:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:11},
  logo:{display:"flex",alignItems:"center",gap:11},
  logoBox:{width:38,height:38,borderRadius:9,background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:900,color:"#7EC8E3"},
  logoTitle:{fontSize:15,fontWeight:800},logoSub:{fontSize:10,opacity:0.8,marginTop:1},
  badge:{background:"#FF4444",color:"#fff",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700},
  notiBar:{borderTop:"1px solid rgba(255,220,0,0.2)",background:"rgba(255,220,0,0.07)",padding:"7px 0",fontSize:11,color:"#FFD700"},
  nav:{display:"flex",background:"#fff",borderBottom:"1.5px solid #E8EDF2",position:"sticky",top:0,zIndex:10},
  navBtn:{flex:1,padding:"11px 2px 9px",background:"none",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,color:"#AAB"},
  navOn:{color:"#1b3a5c",borderBottom:"2px solid #1b3a5c"},
  main:{padding:"0 13px 90px"},
  row:{display:"flex",gap:7,marginBottom:13},
  inp:{flex:1,padding:"10px 12px",border:"1.5px solid #DDE",borderRadius:10,fontSize:14,outline:"none",background:"#fff"},
  addBtn:{padding:"10px 13px",background:"#1b3a5c",color:"#fff",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer",fontSize:13,whiteSpace:"nowrap"},
  grid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8},
  ingCard:{borderRadius:12,padding:"10px 7px 9px",textAlign:"center",boxShadow:"0 1px 5px rgba(0,0,0,0.07)",position:"relative"},
  expBadge:{position:"absolute",top:5,right:5,color:"#fff",fontSize:9,padding:"2px 4px",borderRadius:5,fontWeight:800},
  ingName:{fontSize:12,fontWeight:700,marginBottom:4},
  ingAmt:{fontSize:11,color:"#666",marginBottom:5,cursor:"pointer"},
  amtInp:{width:"100%",padding:"3px 5px",border:"1px solid #CCC",borderRadius:5,fontSize:12,textAlign:"center",marginBottom:3,boxSizing:"border-box",display:"block"},
  unitSm:{padding:"3px",border:"1px solid #CCC",borderRadius:5,fontSize:11,background:"#fff",display:"block",width:"100%",marginBottom:2,boxSizing:"border-box"},
  ingCtrl:{display:"flex",justifyContent:"center",gap:3},
  smBtn:{padding:"3px 6px",border:"1px solid rgba(0,0,0,0.1)",borderRadius:5,background:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:11},
  btnPri:{padding:"11px 16px",background:"#1b3a5c",color:"#fff",border:"none",borderRadius:11,fontWeight:700,cursor:"pointer",fontSize:14},
  btnSec:{padding:"11px 16px",background:"#F0F2F5",color:"#333",border:"none",borderRadius:11,fontWeight:600,cursor:"pointer",fontSize:14},
  card:{background:"#fff",borderRadius:13,padding:15,marginBottom:12,boxShadow:"0 1px 5px rgba(0,0,0,0.06)"},
  cTitle:{fontWeight:800,color:"#0d1b2a",marginBottom:11,fontSize:14},
  typeGrid:{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:7,marginBottom:13},
  typeBtn:{padding:"11px 8px",border:"1.5px solid #DDE",borderRadius:9,background:"#F8F9FA",cursor:"pointer",fontSize:13,fontWeight:700},
  toggleRow:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:11,borderTop:"1px solid #F0F0F0"},
  toggle:{width:43,height:23,borderRadius:12,cursor:"pointer",position:"relative",transition:"background 0.3s",flexShrink:0},
  thumb:{position:"absolute",top:2,left:2,width:19,height:19,background:"#fff",borderRadius:10,transition:"transform 0.3s",boxShadow:"0 1px 4px rgba(0,0,0,0.25)"},
  mealCard:{borderRadius:14,padding:14,marginBottom:12,boxShadow:"0 1px 7px rgba(0,0,0,0.07)"},
  tagRow:{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8},
  tag:{background:"rgba(255,255,255,0.7)",border:"1px solid rgba(0,0,0,0.07)",borderRadius:20,padding:"2px 8px",fontSize:11},
  missingBox:{background:"rgba(255,152,0,0.08)",border:"1px solid rgba(255,152,0,0.2)",borderRadius:7,padding:"6px 9px",fontSize:11,color:"#B36200",marginBottom:8},
  recipeBtn:{width:"100%",padding:"9px",background:"rgba(27,58,92,0.07)",border:"1px solid rgba(27,58,92,0.12)",borderRadius:8,fontWeight:700,cursor:"pointer",fontSize:13,color:"#1b3a5c"},
  hero:{background:"linear-gradient(135deg,#0d1b2a,#1b3a5c)",color:"#fff",borderRadius:14,padding:"18px 15px",marginBottom:12},
  tipBox:{background:"#FFFDE7",border:"1px solid #FFF176",borderRadius:10,padding:"10px 12px",marginBottom:12,fontSize:12,color:"#5D4037"},
  cookDone:{background:"#E8F5E9",border:"1px solid #A5D6A7",borderRadius:10,padding:"10px",marginBottom:10,fontSize:13,fontWeight:700,color:"#2E7D32",textAlign:"center"},
  shopRow:{display:"flex",alignItems:"center",background:"#fff",borderRadius:10,padding:"11px 12px",marginBottom:7,boxShadow:"0 1px 4px rgba(0,0,0,0.05)",gap:8},
  chkBox:{width:24,height:24,border:"2px solid #CCC",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:"none",fontSize:13,color:"#888",flexShrink:0},
  fridgeBtn:{background:"#E8F0F8",border:"1px solid #B3CCE8",borderRadius:7,padding:"4px 7px",fontSize:11,color:"#1b3a5c",cursor:"pointer",fontWeight:600,whiteSpace:"nowrap"},
  xBtn:{background:"none",border:"none",color:"#CCC",cursor:"pointer",fontSize:16,padding:"0 2px"},
  divider:{display:"flex",alignItems:"center",justifyContent:"space-between",color:"#999",fontSize:11,margin:"12px 0 7px",fontWeight:700},
  clrBtn:{background:"none",border:"1px solid #DDD",borderRadius:6,padding:"2px 8px",fontSize:10,cursor:"pointer",color:"#999"},
  tabRow:{display:"flex",border:"1.5px solid #DDE",borderRadius:9,overflow:"hidden",marginBottom:13},
  tab:{flex:1,padding:"9px 6px",background:"#F8F9FA",border:"none",cursor:"pointer",fontSize:12,fontWeight:700,color:"#778"},
  tabOn:{background:"#1b3a5c",color:"#fff"},
  stapleGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6},
  stapleBtn:{padding:"9px 5px",border:"1.5px solid #DDE",borderRadius:10,background:"#F8F9FA",cursor:"pointer",fontSize:12,fontWeight:600,color:"#333"},
  stOn:{border:"1.5px solid #1b3a5c",background:"#E8F0F8",color:"#1b3a5c"},
  overlay:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"flex-end",justifyContent:"center"},
  modal:{background:"#fff",borderRadius:"17px 17px 0 0",padding:"18px 16px 44px",width:"100%",maxWidth:480,position:"relative",maxHeight:"85vh",overflowY:"auto"},
  closeBtn:{position:"absolute",top:12,right:12,background:"#F0F0F0",border:"none",borderRadius:"50%",width:27,height:27,cursor:"pointer",fontSize:13,color:"#666"},
  mTitle:{fontSize:15,fontWeight:800,marginBottom:12,color:"#0d1b2a"},
  mDesc:{color:"#666",marginBottom:17,lineHeight:1.6,fontSize:13},
  mBtns:{display:"flex",gap:9},
  mInput:{width:"100%",padding:"11px 12px",border:"1.5px solid #DDE",borderRadius:9,fontSize:14,marginBottom:10,outline:"none",boxSizing:"border-box"},
  amtRow:{display:"flex",gap:7,marginBottom:10},
  unitLg:{padding:"11px 8px",border:"1.5px solid #DDE",borderRadius:9,fontSize:14,background:"#fff"},
  expHint:{background:"#E3F2FD",borderRadius:7,padding:"6px 10px",fontSize:11,color:"#1565C0",marginBottom:10},
};
