"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckCollectAnimalParts = undefined;
class FbCheckCollectAnimalParts {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.XJh = false;
    this.YJh = 0;
    this.wJh = false;
    this.PJh = undefined;
    this.zJh = false;
    this.JJh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckCollectAnimalParts(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetAnimal() {
    if (!this.XJh) {
      this.XJh = true;
      this.YJh = this.FbDataInternal.targetAnimal();
    }
    return this.YJh;
  }
  get CheckType() {
    if (!this.wJh) {
      this.wJh = true;
      this.PJh = this.FbDataInternal.checkType();
    }
    return this.PJh;
  }
  get Slots() {
    if (!this.zJh) {
      this.zJh = true;
      this.JJh = new Array();
      var s = this.FbDataInternal.slotsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.JJh.push(this.FbDataInternal.slots(t));
        }
      }
    }
    return this.JJh;
  }
}
exports.FbCheckCollectAnimalParts = FbCheckCollectAnimalParts;
//# sourceMappingURL=FbCheckCollectAnimalParts.js.map