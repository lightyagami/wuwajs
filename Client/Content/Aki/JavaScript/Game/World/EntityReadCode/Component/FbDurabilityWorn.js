"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDurabilityWorn = undefined;
class FbDurabilityWorn {
  constructor(t) {
    this.FbDataInternal = t;
    this.g3h = false;
    this.f3h = 0;
    this.p3h = false;
    this.v3h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDurabilityWorn(t);
    }
  }
  get SlightWear() {
    if (!this.g3h) {
      this.g3h = true;
      this.f3h = this.FbDataInternal.slightWear();
    }
    return this.f3h;
  }
  get SevereWear() {
    if (!this.p3h) {
      this.p3h = true;
      this.v3h = this.FbDataInternal.severeWear();
    }
    return this.v3h;
  }
}
exports.FbDurabilityWorn = FbDurabilityWorn;
//# sourceMappingURL=FbDurabilityWorn.js.map