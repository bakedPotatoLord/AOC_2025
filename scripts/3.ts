import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

const raw = (await getInput(3))
  .split("\n")

let acc = 0

for (let line of raw) {
  let max = Number(line.substring(0, 2))
  for (let [i, v] of line.split("").entries()) {
    for (let j = i + 1; j < line.length; j++) {
      let v2 = line[j]
      let val = Number(v + v2)
      if (val > max) {
        max = val
      }
    }
  }
  acc += max
}
console.log("part 1: ", acc)

acc = 0
for (let line of raw) {
  let stack = []
  let removable = line.length - 12
  for (let v of line.split("")) {
    while (removable > 0 && stack.length != 0 && stack.at(-1) < Number(v)) {
      stack.pop()
      removable--
    }
    stack.push(Number(v))
  }
  let n = Number(stack.slice(0, 12).join(""))
  acc += n
}

console.log("part 2:", acc) 
