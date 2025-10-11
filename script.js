let currentMode = "encrypt";

const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");

encryptBtn.addEventListener("click", () => { currentMode="encrypt"; updateMode(); });
decryptBtn.addEventListener("click", () => { currentMode="decrypt"; updateMode(); });

function updateMode(){
  encryptBtn.classList.toggle("active", currentMode==="encrypt");
  decryptBtn.classList.toggle("active", currentMode==="decrypt");
}

function seededRandom(seed){
  let h=0; for(let i=0;i<seed.length;i++){ h=Math.imul(31,h)+seed.charCodeAt(i)|0; }
  return function(min,max){ h=Math.imul(48271,h)+0x7fffffff & 0x7fffffff; return min+ (h>>>0)%(max-min); }
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ ";

function encode(words,key){
  return words.map(word=>{
    if(word.length===1) return word;
    if(word.length===2) return word.split("").reverse().join("");
    let letters=word.split(""), first=letters.shift(); letters.push(first);
    const rng=seededRandom(key+(letters.length+6)); let gift_posi=[];
    while(gift_posi.length<6){ let p=rng(0,letters.length+6); if(!gift_posi.includes(p)) gift_posi.push(p); }
    gift_posi.sort((a,b)=>a-b);
    for(let p of gift_posi){ letters.splice(p,0,chars[rng(0,chars.length)]); }
    return letters.join("");
  });
}

function decode(words,key){
  return words.map(word=>{
    if(word.length===1) return word;
    if(word.length===2) return word.split("").reverse().join("");
    let charsArr=word.split("");
    const rng=seededRandom(key+word.length); let gift_posi=[];
    while(gift_posi.length<6){ let p=rng(0,charsArr.length); if(!gift_posi.includes(p)) gift_posi.push(p); }
    gift_posi.sort((a,b)=>a-b);
    for(let i=gift_posi.length-1;i>=0;i--){ charsArr.splice(gift_posi[i],1); }
    const last=charsArr.pop(); charsArr.unshift(last);
    return charsArr.join("");
  });
}

document.getElementById("processBtn").addEventListener("click",()=>{
  const text=document.getElementById("inputText").value.trim();
  const key=document.getElementById("hashKey").value.trim()||"Abhi";
  if(!text){ alert("Enter some text!"); return; }
  const words=text.split(/\s+/);
  const result=(currentMode==="encrypt"?encode(words,key):decode(words,key)).join(" ");
  document.getElementById("resultText").textContent=result;
  document.getElementById("resultContainer").classList.add("show");
});

const copyBtn = document.getElementById("copyBtn");
const resultText = document.getElementById("resultText");
const icon = copyBtn.querySelector("img");

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(resultText.textContent).then(() => {
    const originalSrc = icon.src;
    icon.src = "check.svg";
    setTimeout(()=> { icon.src = originalSrc; }, 1500);
  });
});

const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", darkModeToggle.checked);
});
