"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitScroll = undefined;
class DigitScroll {
  constructor() {
    this.Current = 0;
    this.Target = 0;
    this.Speed = 0;
    this.Duration = 1000;
  }
  Init(t, s, i) {
    this.Current = t;
    this.Target = s;
    this.Duration = i;
  }
  Tick(t) {
    if (this.Speed !== 0 && (this.Current += this.Speed * t, this.Current >= this.Target == this.Speed > 0)) {
      this.Current = this.Target;
      this.Speed = 0;
    }
    return this.Current;
  }
  SetTarget(t) {
    if (this.Target === t) {
      return 0;
    } else {
      t = (this.Target = t) - this.Current;
      this.Speed = t / this.Duration;
      return t;
    }
  }
  Reset(t) {
    this.Current = t;
    this.Target = t;
    this.Speed = 0;
  }
  IsFinished() {
    return this.Speed === 0;
  }
}
exports.DigitScroll = DigitScroll;
//# sourceMappingURL=DigitScroll.js.map