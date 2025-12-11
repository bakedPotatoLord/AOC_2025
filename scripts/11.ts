import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

let map = new Map<string, Set<string>>()

const raw = (await getInput(11) )
  .split("\n").map(l=>l.split(": "))
  .forEach(([key,to])=>{
    map.set(key,new Set(to.split(" ")))
  })

let visited = new Set()

let acc = 0

let q = ["you"]

while(q.length){
  let curr = q.shift()
  if(curr == "out"){
    acc++
    continue
  }
  map.get(curr).forEach(v=>q.push(v))
}
console.log("part 1:",acc)

//a map of how many nodes point to this one
let countMap = new Map<string,number>()

//map of each value, and it's parents
let inverseMap = new Map<string,Set<string>>()
inverseMap.set("out",new Set())

for(let k of map.keys()){
  inverseMap.set(k,new Set())
}

for(let [par,chldrn] of map){
  for(let child of chldrn){
    inverseMap.get(child).add(par)
  }
}

for(let  [k,v] of inverseMap){
  countMap.set(k,v.size)
}

let memo = new Map<string,number>()
let val = [rec('fft','svr'),rec('dac','fft'),rec('out','dac')]
console.log("part 2:",val.reduce((a,b)=>a*b,1))

function rec(start:string,end:string){
  let hash = start+end
  if(memo.has(hash)){
    return memo.get(hash)
  }
  if(start == end){
    return 1
  }

  let val = numberSum(Array.from(inverseMap.get(start)).map(v=>rec(v,end)))
  memo.set(hash,val)
  return val
}