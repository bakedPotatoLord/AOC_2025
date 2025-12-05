import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'
import Matrix2 from './helpers/matrix2'

const raw = (await getInput(4))
  .split("\n")
  .map(l=>l.split(""))

let mx = new Matrix2(raw)

let acc = 0

let height = raw.length
let width = raw[0].length

let init = 0

for(let i = 0;i<raw.length;i++){
  for(let j = 0;j<raw[i].length;j++){
    if(mx.get(v2(i,j)) != "@") init++ 
  }
}


for(let i = 0;i<raw.length;i++){
  for(let j = 0;j<raw[i].length;j++){
    if(mx.get(v2(i,j)) != "@") continue
    let neighbors = v2(i,j).neighbors8

    let f = neighbors.filter(n=>n[0]>=0 && n[0]<height && n[1]>=0 && n[1]<width)
  
    // console.log(f)

    if(neighbors.filter(n=>mx.get(n) == "@").length < 4){
      acc++
      console.log(i,j)
    }
  }
}



mx.print()

console.log(acc)
 
while(true){
  acc = 0

  for(let i = 0;i<raw.length;i++){
    for(let j = 0;j<raw[i].length;j++){
      if(mx.get(v2(i,j)) != "@") continue
      let neighbors = v2(i,j).neighbors8
  
      let f = neighbors.filter(n=>n[0]>=0 && n[0]<height && n[1]>=0 && n[1]<width)
    
      // console.log(f)
  
      if(neighbors.filter(n=>mx.get(n) == "@").length < 4){
        acc++
        mx.set(v2(i,j),".")
        
      }
    }
  }
  console.log(acc)
  if(acc == 0 ) break
}

mx.print()

acc  = 0

for(let i = 0;i<raw.length;i++){
  for(let j = 0;j<raw[i].length;j++){
    if(mx.get(v2(i,j)) != "@") acc++
    
    
  }
}
console.log(acc-init)   
