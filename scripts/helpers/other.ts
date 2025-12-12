import fs from 'node:fs/promises'

import vec2 from './vec2.ts'

export function numberSum(arr:number[]){
  return arr.reduce((a,b)=>a+b,0)
}

export async function getInput(day:number){
  if(day === 0) throw new Error("No input for day 0")
  return <string>(await import(`../../inputs/${day}.txt`,{with: { type: "text/plain" }})).default
}

export async function getInputFs(day:number){
  if(day === 0) throw new Error("No input for day 0")
  return (await fs.readFile(`./inputs/${day}.txt`,"utf-8"))
}

export function abs(n:number){
  return Math.abs(n)
}

export function max(...params: number[]) {
  return Math.max(...params)
}

export function min(...params: number[]) {
  return Math.min(...params)
}

export function floor(n:number){
  return Math.floor(n)
}

export function ceil(n:number){
  return Math.ceil(n)
}

String.prototype.charAt = function (index) {
  return this[index];
}



//my homebrewed vector class


export function vectorEquals(v1:vec2,v2:vec2):boolean{
  return v1[0] == v2[0] && v1[1] == v2[1]
}



export function dispMatrix(mx:any[][]){
  console.log(mx.map(r=>r.join("")).join("\n"))
}


//converts arrow (>,<,v,^) to vec2
export function convertSign(char: string) {
  if(char == ">") return <vec2>[0,1]
  else if(char == "<") return <vec2>[0,-1]
  else if(char == "v") return <vec2>[1,0]
  else if(char == "^") return <vec2>[-1,0]
}

export function v2(x:number|string,y:number|string){
  return new vec2(x,y)
}

declare global {
  interface Array<T> {
    hash(): string;
    fromHash(s: string): T[]
    contains(other:T[]): boolean
  }
}

Array.prototype.hash= function (){ return this.join(",") }

Array.prototype.fromHash = function (s: string) {
  return s.split(",").map(Number)
}

Array.prototype.contains = function(other){
  return other.every(v => this.includes(v));
}