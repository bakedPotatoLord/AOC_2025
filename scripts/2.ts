import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

const raw = (await getInput(2))
  
  .split(",")
    .map(s=>s.split("-").map(s=>Number(s)))

let acc = 0
for(let seq of raw){
  for(let i = seq[0];i<=seq[1];i++){
    let s = String(i)
    if(s.length %2 == 0){
      if(s.substring(0,s.length/2) == s.substring(s.length/2)){
        acc+= i
      }
    }
  }
}
console.log("part 1:",acc) 


acc = 0
for(let seq of raw){
  for(let i = seq[0];i<=seq[1];i++){
    let s = String(i)
      let patterns = []
      for(let i = 1;i<=s.length/2;i++){
        patterns.push(s.substring(0,i))
      }
      patterns = patterns.filter(p=> s.length % p.length == 0)
      let rem = patterns.filter(n=>{ 
        for(let j = 0;j<s.length;j+=n.length){
          if(s.substring(j,j+n.length) != n){
            return false
          }
        }
        return true 
      })
      if(rem.length > 0){
        acc+= i
      }
  }
}

console.log("part 2:",acc)