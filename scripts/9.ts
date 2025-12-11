import { Point2d, Polygon2d, Rect2d } from '@lgs-code/2d-geometry'
import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'

const raw = (await getInput(9))
  .split("\n")
  .map(l => v2(l.split(",")[0], l.split(",")[1]))

let p1 = -Infinity

for (let i = 0; i < raw.length; i++) {
  for (let j = i + 1; j < raw.length; j++) {
    let a = raw[i].csub(raw[j])
    let area = ++a[0] * ++a[1]
    if (area > p1) p1 = area
  }
}

//make real polygon
let acc = []
for (let i = 0; i < raw.length; i++) {
  let last = raw.at(i - 1)
  let cur = raw.at(i)
  let next = raw.at((i + 1) % raw.length)

  let fromHorisontal = last[1] == cur[1]
  let toHorisontal = cur[1] == next[1]

  if (fromHorisontal && !toHorisontal) {
    //if from a horisontal, and turning to a vertical
    if (last[0] < cur[0]) {
      //if going right
      if (cur[1] > next[1]) {
        //if turning up
        acc.push(raw[i].cadd(v2(0, 0)))
      } else {
        //if turning down
        acc.push(raw[i].cadd(v2(1, 0)))
      }
    } else {
      //if going left
      if (cur[1] > next[1]) {
        //if turning up
        acc.push(raw[i].cadd(v2(0, 1)))
      } else {
        //if turning down
        acc.push(raw[i].cadd(v2(1, 1)))
      }
    }
  } else if (!fromHorisontal && toHorisontal) {
    //if from a vertical, and turning to a horisontal
    if (last[1] < cur[1]) {
      // if going down
      if (cur[0] < next[0]) {
        //if turning right
        acc.push(raw[i].cadd(v2(1, 0)))
      } else {
        //if turning left
        acc.push(raw[i].cadd(v2(1, 1)))
      }
    } else {
      //if going up
      if (cur[0] < next[0]) {
        //if turning right
        acc.push(raw[i].cadd(v2(0, 0)))
      } else {
        //if turning left
        acc.push(raw[i].cadd(v2(0, 1)))
      }
    }
  } else {
    console.error("straight line")
  }
}


let shape = new Polygon2d(acc.map(v => new Point2d(v[0], v[1])))

//helpers for rendering the shapes in desmos
// console.log("acc",'polygon(['+acc.map(v => `(${v[0]},${-v[1]})`)+ '])')
// console.log("orig",'polygon(['+raw.map(v => `(${v[0]},${-v[1]})`)+ '])')

let shapeEdges = shape.edges.map(e => <[vec2, vec2]>[v2(e.p1.x, e.p1.y), v2(e.p2.x, e.p2.y)])
let mx = -Infinity

for (let i = 0; i < acc.length; i++) {
  for (let j = i + 1; j < acc.length; j++) {
    let [minx, maxx] = [acc[i][0], acc[j][0]].sort((a, b) => a - b)
    let [miny, maxy] = [acc[i][1], acc[j][1]].sort((a, b) => a - b)
    maxx++
    maxy++
    let dx = maxx - minx, dy = maxy - miny
    let area = dx * dy
    let eps = 0.0001
    let rect = new Rect2d(new Point2d(minx + eps, miny + eps), dx - (2 * eps), dy - (2 * eps));
    let rectEdges = rect.edges.map(e => <[vec2, vec2]>[v2(e.p1.x, e.p1.y), v2(e.p2.x, e.p2.y)])

    let intersection = false
    edgeCollision: {
      for (let re of rectEdges) {
        for (let se of shapeEdges) {
          if (linesIntersect(re, se)) {
            intersection = true
            // console.log("intersection",re,se)
            break edgeCollision
          }
        }
      }
    }

    if(intersection) continue

    if (area > mx && !intersection) {
      mx = area
    }
  }
  console.clear()
  console.log(((i / raw.length) * 100).toFixed(2) + "%")
}

console.clear()
console.log("part 1:", p1)
console.log("part 2:", mx)


function linesIntersect(a: [vec2, vec2], b: [vec2, vec2]) {
  let avert = a[0][0] == a[1][0]
  let bvert = b[0][0] == b[1][0]

  //if both horisontal or vertical
  if ((avert && bvert) || (!avert && !bvert)) {
    return false
  }

  //if a is vertical, and b horisontal
  if (avert && !bvert) {

    let [lowbx, highbx] = b.map(v => v[0]).sort((a, b) => a - b)
    let ax = a[0][0]
    let [loway, highay] = a.map(v => v[1]).sort((a, b) => a - b)
    let by = b[0][1]

    //if low b.x is less than a.x, and high b.x is greater than a.x
    //and low b.y is less than a.y, and high b.y is greater than a.y
    if (lowbx <= ax && highbx >= ax && loway <= by && highay >= by) {
      return true
    }
  } else {
    //if b is vertical, and a horisontal
    let [lowax, highax] = a.map(v => v[0]).sort((a, b) => a - b)
    let bx = b[0][0]
    let [lowby, highby] = b.map(v => v[1]).sort((a, b) => a - b)
    let ay = a[0][1]

    if (lowax <= bx && highax >= bx && lowby <= ay && highby >= ay) {
      return true
    }
  }
  return false
}
