import { map } from 'mathjs'
import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

const raw = (await getInput(7) )
  .split("\n")

let pos = raw[0].indexOf("S")

let beams = new Set([pos])

// location, num of beams
let beams2 = new Map<number,number>()
for(let i=0;i<raw[0].length;i++){
  beams2.set(i,0)
}
beams2.set(pos,1)

//count for part 1
let splits = 0 ;

//iterate over rows
for(let row of raw.slice(1)){
  let bs = [...beams.values()]
  beams.clear()

  let bs2 = beams2.entries()

  //find splitters
  let splitters = new Set();
  for(let i in row.split("")){
    if(row[i] == "^"){
      splitters.add(Number(i))
    }
  }

  //iterate over beams for part 1
  for(let b of bs){
    if(splitters.has(b)){
      beams.add(b-1)
      beams.add(b+1)
      splits++
    }else{
      beams.add(b) 
    }
  }

  //iterate over possible beams counts for part 2
  for(let [k,v] of bs2){
    if(splitters.has(k)){
      beams2.set(k-1,beams2.get(k-1)+v)
      beams2.set(k+1,beams2.get(k+1)+v)
      beams2.set(k,beams2.get(k)-v)
    }
  }

  // console.log(row,splitters.size, numberSum(Array.from(beams2.values())))
}

console.log("part 1:",splits)
console.log("part 2:",numberSum(Array.from(beams2.values())))
