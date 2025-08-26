"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterNpcAttackMachine = undefined;
class MonsterNpcAttackMachine {
  constructor() {
    this.TargetPercent = 0;
    this.CurrentPercent = 0;
    this.Duration = 0;
    this.State = 0;
  }
  UpdatePercent(t) {
    var s;
    if (this.CurrentPercent === this.TargetPercent) {
      this.State = 0;
    } else {
      if (this.Duration <= 0) {
        this.CurrentPercent = this.TargetPercent;
      } else {
        s = (this.TargetPercent - this.CurrentPercent) / this.Duration;
        this.CurrentPercent += s * t;
        this.Duration -= t;
      }
      this.State = 1;
    }
    return this.CurrentPercent;
  }
  SetTargetPercent(t, s) {
    this.TargetPercent = t;
    this.Duration = s;
  }
  HasUpdate() {
    return this.State === 1;
  }
}
exports.MonsterNpcAttackMachine = MonsterNpcAttackMachine;
//# sourceMappingURL=MonsterNpcAttackMachine.js.map