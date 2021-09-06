import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "limitchar",
})
export class LimitcharPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (value && value.length > args) {
      return value.substring(0, args) + "...";
    }
    return value;
  }
}
