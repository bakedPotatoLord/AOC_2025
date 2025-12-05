import { ExitStatus } from 'typescript'
import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

let [ranges,ids] = (await getInput(5))
  .split("\n\n").map(l=>l.split("\n"))

let ran = ranges.map(n=>n.split("-")).map(n=>[Number(n[0]),Number(n[1])])
let idsn = ids.map(Number)
let acc = 0

for(let i of idsn){
  for(let r of ran){
    if(i >= r[0] && i <= r[1]){
      // console.log(i,r)
      acc++
      break
    }
  } 
}

console.log("part1",acc)

ran.sort((a,b)=>a[0]-b[0])
let stk = [ran[0]]

for(let i=1 ;i<ran.length;i++){
  let r = ran[i]
  let s = stk.at(-1)
  
  //if past last
  if(s[1] < r[0]){
    stk.push(r)
  
  //if lower is inside last
  }else if(r[0] >= s[0] && r[0] <= s[1] && r[1] >= s[1]){
    s[1] = r[1]
  }
}


console.log("part2",stk.reduce((a,b)=>a+b[1]-b[0]+1,0) ) 