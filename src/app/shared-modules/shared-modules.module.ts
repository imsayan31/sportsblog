import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LimitcharPipe } from "../limitchar.pipe";

@NgModule({
  declarations: [LimitcharPipe],
  imports: [CommonModule],
  exports: [LimitcharPipe],
})
export class SharedModulesModule {}
