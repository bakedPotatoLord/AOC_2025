import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

//I LOVE GRAPH THEORY ❤️

const raw = (await getInput(8))
  .split("\n")
  .map(l => l.split(",").map(Number))

function dist(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
}

//map from a junction hash to all connected junction hashes
let circuitMap = new Map<string, Set<string>>()
let connected = new Map<string, Set<string>>()

for (let i of raw) {
  circuitMap.set(i.hash(), new Set([i.hash()]))
  connected.set(i.hash(), new Set([i.hash()]))
}

let connectcount = 0
let p1;

while (true) {
  let closest;
  let closestDist = Infinity
  for (let i = 0; i < raw.length; i++) {
    for (let j = i + 1; j < raw.length; j++) {
      let a = raw[i]
      let b = raw[j]
      let d = dist(a, b)
      //if closest and not already connected
      if (d < closestDist && !connected.get(a.hash()).has(b.hash())) {
        closestDist = d
        closest = [a, b]
      }
    }
  }

  let c0 = closest[0].hash()
  let c1 = closest[1].hash()

  //stuff for p1
  connected.get(c0).add(c1)
  connected.get(c1).add(c0)
  connectcount++

  if (circuitMap.get(c0).has(c1)) continue

  let s0 = circuitMap.get(c0)
  let s1 = circuitMap.get(c1)

  for (let s of s1.values()) {
    //add other set values to s0
    s0.add(s)
    //set other sets to s0, so they both point to one set now
    circuitMap.set(s, s0)
  }

  s0 = circuitMap.get(c0)
  s1 = circuitMap.get(c1)
  let uniq = new Set(circuitMap.values())

  console.clear()
  console.log("unique sets", uniq.size,connectcount)

  //inc counter for p1, and check if it's at 1000
  if (connectcount == 1000) {
    p1 = Array.from(uniq)
      .map(s => s.size)
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a * b, 1)
  }
  else if ( uniq.size == 1 ) {
    console.clear()
    console.log( "part 1:", p1 )
    console.log( "part 2:", c0.split(",")[0] * c1.split(",")[0] )
    break
  }
}
