import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

const raw = (await getInput(8) )
  .split("\n")
  .map(l => l.split(",").map(Number))

function dist(a,b){
  return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])
}



//map from a junction hash to all connected junction hashes
let circuitMap = new Map<string, Set<string>>()

for(let i of raw){
  circuitMap.set(i.hash(),new Set())
}

for(let t=0;t<10;t++){
  let closest;
  let closestDist = Infinity
  for(let i = 0;i<raw.length;i++){
    for(let j = i+1;j<raw.length;j++){
      let a = raw[i]
      let b = raw[j]
      let d= dist(a,b)
      //if closest and not already connected
      if(d < closestDist && !circuitMap.get(a.hash()).has(b.hash())){
        closestDist = d
        closest = [a,b]
      }
    }
  }

  let s = circuitMap.get(closest[0].hash())

  
  



  console.log(closestDist,closest,s)
  
}

console.log(circuitMap)



console.log(raw)