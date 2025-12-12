import type vec2 from "./vec2.ts";
import { v2 } from "./other.ts";


export default class Matrix2<T> extends Array<Array<T>> {
  readonly height: number;
  readonly width: number;
  readonly mx:T[][];

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

  rotate90(){
    for(let i = 0;i<this.height;i++){
      for(let j = i;j<this.width;j++){
        let temp = this.mx[i][j]
        this.mx[i][j] = this.mx[j][i]
        this.mx[j][i] = temp
      }
    }
    this.mx.reverse()
  }

  forIndices(f:(i:number,j:number)=>void){
    for(let i = 0;i<this.height;i++){
      for(let j = 0;j<this.width;j++){
        f(i,j)
      }
    }
  }
}