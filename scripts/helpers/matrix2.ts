import type vec2 from "./vec2";
import { v2 } from "./other";


export default class Matrix2<T> extends Array<Array<T>> {
  private height: number;
  private width: number;
  private mx:T[][];

  constructor(mx:T[][] ) {
    super(mx.length);

    this.height = mx.length;
    this.width = mx[0].length;
    this.mx = structuredClone(mx)
    
  }

  get([i,j]:vec2) {
    if(!this.inBounds(v2(i,j))) return 
    return this.mx[i][j]
  }

  set([i,j]:vec2, value: T) {
    if(!this.inBounds(v2(i,j))) return
    this.mx[i][j] = value
    return this.mx
  }

  inBounds([i,j]:vec2) {
    return i >= 0 && i < this.height && j >= 0 && j < this.width
  }

  print(){
    console.log(this.toString())
  }

  toString(): string {
    let acc = ""
    for(let row of this.mx){
      acc += row.join("")+"\n"
    }
    return acc
  }
}