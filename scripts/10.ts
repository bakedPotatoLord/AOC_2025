import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

const raw = (await getInput(10) )
  .split("\n").map(l=>l.split(/\] | \{/))
  .map(l=><[string,number[][],number[]]>[
    l[0].substring(1),
    l[1].split(" ")
      .map(s=>s.substring(1,s.length-1).split(",").map(Number)),
    l[2].substring(0,l[2].length-1).split(",").map(Number)]
  )


  let acc = 0

for(let i of raw){
  let [lights, btnwiring, jolt] = i

  let lts = lights.split("").map(c=>c=="#"? 1:0).join("")
  // console.log(lts,btnwiring)


  //modified dikstra's
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
        if(s== "1010"){
          // console.log("arr",arr)
        }
        arr[b] = !arr[b]
      }
      
      let ns =arr.map(Number).join("")
      set.add(ns)

    }

  }

  // console.log(graph)
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
      // console.log(c)
  
      // console.log("c",c)
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

console.log(acc)

acc= 0

for(let i of raw){
  let [lights, btn, jolt] = i

  //lowest number of presses to get somewhere
  let pMap = new Map<string,number>()


  let start = Array(jolt.length).fill(0)

  let q: [number[],number][] = [[start,0]]
  
  while(q.length){
    let [jolts,p] = q.shift()
    // console.log(q.length,jolts,p)
  
    let hash= jolts.join(",")
    if(pMap.has(hash)){
      //check if faster
      if(pMap.get(hash) >= p){
        pMap.set(hash,p)  
      }else{
        continue
      }
    }else{
      pMap.set(hash,p)
    }
    
    let done = true
    for(let i = 0;i<jolts.length;i++){
      if(jolts[i] < jolt[i]){
        done = false
        break
      }
    }
    if(done){
      acc+= p;
      console.log("done",jolts,p)
      break
    }

    for(let bs of btn){
      // console.log(bs)
      let carr = [...jolts]

      for(let b of bs){
        carr[b]++
      }

      if(!pMap.has(carr.join(","))){
        pMap.set(carr.join(","),p+1)
        // console.log(carr)
        q.push([carr,p+1])
      }
      
    }

  }

}

console.log(acc)

