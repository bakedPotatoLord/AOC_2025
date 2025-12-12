import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor, matrix2 } from './helpers/index.ts'


let start = Date.now()

const raw = (await getInput(12) )
  .split("\n\n")


let trees= raw.pop().split("\n")
.map(l=>l.split(' '))
.map(l=>[
  l[0].substring(0,l[0].length -1)
    .split('x')
    .map(Number),
  l.slice(1)
    .map(Number)
])

let pres = raw.map(l=>l.split("\n").slice(1).map(l=>l.split("")))
  .map(m=>new matrix2(m))

let possible = 0

for(let t of trees){
  let [[wid,hei],presCount] = t;

  let hashMap = pres.map(p=>p.mx.flat().reduce((a,b)=>a+((b=='#')? 1:0),0))
  let totalHashes = hashMap.reduce((a,b,i)=>a+(b*presCount[i]),0)
  let totalSpace = wid*hei

  if(totalHashes <= totalSpace){
    possible++
    continue
  }
}

console.log("part 1",possible)
