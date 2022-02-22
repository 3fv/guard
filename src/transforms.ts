import { isNumber } from "./guards/primitive"

export function toNumber(str:string|number):number {
  return isNumber(str) ? str : parseInt(str,10)
}
