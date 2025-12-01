import { getInput, numberSum } from './helpers'
import { abs, floor } from './helpers/other'

const raw = (await getInput(1))
  .split("\n")
  .map(s => ((s.substring(0,1) == 'L')? -1 : 1) * parseInt(s.substring(1)))

let dial= 50

let acc = 0

for(let i of raw){
  if(i == 0) continue
  dial += i
  dial %= 100
  if(dial == 0) acc++
} 

console.log("part 1: ",acc)

dial = 50
acc = 0

for(let i of raw){

  if(i == 0) continue
  let rots = floor(abs(i) / 100 )
  acc+= rots

  let rem = abs(i) % 100
  let sign = (i > 0)? 1 : -1

  for(let j=0; j<rem; j++){
    dial += sign
    if(dial  == 100) dial = 0
    if (dial == -1) dial = 99 
    if(dial == 0){
      acc++ 
    } 
  } 
} 

console.log("part 2: ",acc)
