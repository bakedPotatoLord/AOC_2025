import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers/index.ts'

import solver from '@uandi/javascript-lp-solver'

const raw = (await getInput(10) )
  .split("\n").map(l=>l.split(/\] | \{/))
  .map(l=>[
    l[0].substring(1),
    l[1].split(" ")
      .map(s=>s.substring(1,s.length-1).split(",").map(Number)),
    l[2].substring(0,l[2].length-1).split(",").map(Number)] as [string,number[][],number[]]
  )
  let acc = 0

for(let i of raw){
  let [lights, btnwiring, jolt] = i

  let lts = lights.split("").map(c=>c=="#"? 1:0).join("")
  // console.log(lts,btnwiring)

  // basic bfs
  // each node is a combination of lights 2^~10 combos max

  //i make a graph of the combos, and the buttons that connect them

  let graph = new Map<string,Set<string>>()

  let combos = 2**lights.length
  for(let i = 0;i<combos;i++){
    let s = i.toString(2).padStart(lights.length,"0")
    // console.log(s)

    let set = new Set<string>()
    graph.set(s,set)

    //iterate over buttons
    for(let bs of btnwiring){
      let arr = s.split("").map(n=>n == "1")
      for(let b of bs ){
        //toggle state based on buttons
        arr[b] = !arr[b]
      }
      
      let ns =arr.map(Number).join("")
      set.add(ns)
    }
  }

  //map is complete

  let visited = new Set<string>()
  let start = Array(lts.length).fill(0).join("")
  let end = lts
  let q: [string,number][] = [[start,0]]

  bfs:{
    while(q.length){
      // console.log(q.length)
      let [c,dist] = q.shift()
      if(visited.has(c)) continue
      visited.add(c)
      for(let n of graph.get(c)){
        // console.log("n",n,end)
        if(n == end){
          acc+= dist+1
          // console.log("dist",dist)
          break bfs
        }
        q.push([n,dist+1])
      }
    }
  }
}

console.log("part 1:",acc)

acc= 0
for(let i of raw){
  let [lights, btn, jolt] = i

  //x is a press count
  //j is a button

  //t is a target
  //

  //optimize: sum of all press counts: sum(x[j])
  //optype: min

  //constraints: 

  //for each target register:
  // value must equal sum of presses of all buttons that connect to it

  let model = {
    optimize: "presses",
    opType: "min",
    constraints: Object.fromEntries(
      jolt.map((t,i)=>[
        `r${i}`,
        {
          equal: t
        }
      ])
    ),
    "variables": 
    Object.fromEntries(
      btn.map((b,i)=>[
        `b${i}`,
        {
          presses: 1,
          ...Object.fromEntries(b.map((v,j)=>[`r${v}`,1]))
        }
      ])
    ),
    ints: Object.fromEntries(
      btn.map((b,i)=>[
        `b${i}`,
        1
      ])
    ),
  };

  let {result} = solver.Solve(model);
  acc+= result
}

console.log("part 2:",acc)
