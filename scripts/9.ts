import { Point2d, Polygon2d, Rect2d } from '@lgs-code/2d-geometry'
import { dispMatrix, getInput, numberSum, convertSign, v2, vectorEquals, vec2, abs, max, min, ceil, floor } from './helpers'
import { checkIfPolygonsIntersect, findIntersectionBetweenPolygons } from 'polygon-intersection'
import { e, trueDependencies } from 'mathjs'

const raw = (await getInput(9) )
  .split("\n")
  .map(l => v2(l.split(",")[0], l.split(",")[1]))

let mx  = -Infinity

for(let i = 0;i<raw.length;i++){
  for(let j = i+1;j<raw.length;j++){
    let a = raw[i].csub(raw[j])
    let area = ++a[0] * ++a[1]
    if(area > mx) mx = area
  }

}

// console.log(mx)

let points = raw.map(v => new Point2d(v[0], v[1]))

let poly = new Polygon2d(points)

// console.log(poly.area)


let acc = [raw[0]]

for(let i= 1;i<raw.length;i++){
  let last = raw.at(i-1)
  let cur = raw.at(i)
  let next = raw.at((i+1)%raw.length)

  let fromHorisontal = last[1] == cur[1]
  let toHorisontal = cur[1] == next[1]

  // console.log({last, cur, next, fromHorisontal, toHorisontal})

  // console.log(last,cur,next)

  if(fromHorisontal && !toHorisontal){
    //if from a horisontal, and turning to a vertical
    if(last[0] < cur[0]){
      //if going right
      // console.log("going right")
      
      if(cur[1] > next[1]){
        //if turning up
        acc.push(raw[i].cadd(v2(0,0)))
        // console.log("turning up")
      }else {
        //if turning down
        // console.log("turning down")
        acc.push(raw[i].cadd(v2(1,0)))
      }

    }else{
      //if going left
      // console.log("going left")

      if(cur[1] > next[1]){
        //if turning up
        acc.push(raw[i].cadd(v2(0,1)))
      }else {
        //if turning down
        acc.push(raw[i].cadd(v2(1,1)))
      }
      
    }
  }else if(!fromHorisontal && toHorisontal){
    //if from a vertical, and turning to a horisontal


    if(last[1] < cur[1]){
      // if going down
      // console.log("going down")

      if(cur[0] < next[0]){
        //if turning right
        acc.push(raw[i].cadd(v2(1,0)))
      }else{
        //if turning left
        acc.push(raw[i].cadd(v2(1,1)))
      }

    }else{
      //if going up
      // console.log("going up")

      if(cur[0] < next[0]){
        //if turning right
        acc.push(raw[i].cadd(v2(0,0)))
      }else{
        //if turning left
        acc.push(raw[i].cadd(v2(0,1)))
      }

    }
  }else{
    console.error("straight line")
  }
  // console.log()
}

//we gotta merge it with a copy of itself that has been translated down, right, and down-and-right

//this shape's verts are counterclockwise. I said so.


let shape = new Polygon2d(acc.map(v => new Point2d(v[0], v[1])))

// console.log("acc",acc)



// console.log("lines", lines)

mx  = -Infinity

for(let i = 0;i<raw.length;i++){
  for(let j = i+1;j<raw.length;j++){
    let a = raw[i].csub(raw[j])
    let area = (abs(a[0])+1) * (abs(a[1])+1)


    let [minx,maxx] = [raw[i][0],raw[j][0]].sort((a,b)=>a-b)
    let [miny,maxy] = [raw[i][1],raw[j][1]].sort((a,b)=>a-b)
    let dx = maxx - minx, dy = maxy - miny

    let eps = 0.0001

    let rect= new Rect2d(new Point2d(minx+eps, miny+eps), dx+1-2*eps, dy+1-2*eps);

    
    //must ensure the new rect does not cross any lines
    
    let contained = rect.vertices.every(v => shape.contains(v) ||
     shape.contains(new Point2d(v.x-1,v.y-1)) ||
      shape.contains(new Point2d(v.x-1,v.y)) ||
       shape.contains(new Point2d(v.x,v.y-1)))

    // if(!contained) continue

    let intersection = shape.getIntersectionPoints(rect)


    
    if(minx == 2 && miny == 3 && maxx == 9 && maxy == 5){
      console.log("*******")
      console.log("points",raw[i],raw[j])
      console.log("area",rect.area, rect.vertices)
      console.log("realArea",area)
      console.log("intersection",intersection)
      console.log("contained",contained)
      console.log()
    }
    
    if(area > mx  && contained && intersection.length == 0){
      mx = area
      
      console.log("points",raw[i],raw[j])
      console.log("area",rect.area)
      console.log("realArea",area)
      console.log("intersection",intersection)
      console.log("contained",contained)
      console.log()

    }
  }
  console.log(((i/raw.length) *100).toFixed(2) + "%")
}

//not 4594510710. this is too high


//not 4586258880 this is too high as well

// 36.69%
// 36.90%
// points [ 17238, 84461 ] [ 83327, 14943 ]
// area 4594510682.878201
// realArea 4594510710
// intersection []
// contained true

//this implies I am not being specific enough

console.log("max:", mx)


function linesIntersect(a:[vec2,vec2],b:[vec2,vec2]){
  let avert = a[0][0] == a[1][0]
  let bvert = b[0][0] == b[1][0]


  // console.log(a,b)

  //if both horisontal or vertical
  if((avert && bvert) || (!avert && !bvert)){
    return false
  }

  //if a is vertical, and b horisontal
  if(avert && !bvert){

    let [lowbx,highbx] = b.map(v => v[0]).sort((a,b) => a-b) 
    let ax = a[0][0]
    let [loway,highay] = a.map(v => v[1]).sort((a,b) => a-b)
    let by = b[0][1]


    //if low b.x is less than a.x, and high b.x is greater than a.x
    //and low b.y is less than a.y, and high b.y is greater than a.y
    if(lowbx < ax && highbx > ax && loway < by && highay > by){
      return true
    }
  }else{
    //if b is vertical, and a horisontal
    let [lowax,highax] = a.map(v => v[1]).sort((a,b) => a-b)
    let bx = b[0][0]
    let [lowby,highby] = b.map(v => v[1]).sort((a,b) => a-b)
    let ay = b[0][1]

    if(lowax < bx && highax > bx && lowby < ay && highby > ay ){
      return true
    }
  }


  return false
}