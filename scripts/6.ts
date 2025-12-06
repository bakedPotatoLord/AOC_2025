import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

const raw = (await getInput(6))

let spl = raw.split("\n")
  .map(l => l.split(" ").filter(s => s != ""))
let acc = 0
let p = spl[0].length
for (let i = 0; i < p; i++) {
  let op = spl.at(-1)[i]
  let nums = Array(spl.length - 1).fill(0).map((_, i2) => spl[i2][i])
  let s = nums.join(op)
  let n = eval(s)
  acc += n

}
console.log("p1", acc)

let split = (raw + " +")
  .split("\n")
  .map(l => l.split(""))

acc = 0

let lines = split.length
let i = 0
while (i < split[0].length) {
  let op = split.at(-1)[i]
  let a2 = []
  let i2 = 1
  while (split.at(-1)[i + i2] == ' ') i2++;
  //for  columns
  for (let j = 0; j < i2 - 1; j++) {
    let a = ""
    for (let k = 0; k < lines - 1; k++) {
      if (split[k][i + j] != " ") a += split[k][i + j]
    }
    a2.push(a)
  }
  acc += eval(a2.join(op))
  i += i2
}

console.log("p2", acc) 