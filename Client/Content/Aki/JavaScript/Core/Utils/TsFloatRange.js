"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsFloatRange = undefined;
class TsFloatRange {
  constructor(s, t, e) {
    this.Exclusive = s;
    this.Min = t;
    this.Max = e;
  }
  InRange(s) {
    if (this.Exclusive) {
      return s > this.Min && s < this.Max;
    } else {
      return s >= this.Min && s <= this.Max;
    }
  }
}
exports.TsFloatRange = TsFloatRange;
//# sourceMappingURL=TsFloatRange.js.map