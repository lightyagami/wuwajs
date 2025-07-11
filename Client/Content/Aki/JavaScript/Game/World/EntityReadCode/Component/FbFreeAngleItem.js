"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFreeAngleItem = undefined;
class FbFreeAngleItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.c7h = false;
    this.u7h = 0;
    this.d7h = false;
    this.m7h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFreeAngleItem(t);
    }
  }
  get InitAngle() {
    if (!this.c7h) {
      this.c7h = true;
      this.u7h = this.FbDataInternal.initAngle();
    }
    return this.u7h;
  }
  get TargetAngle() {
    if (!this.d7h) {
      this.d7h = true;
      this.m7h = this.FbDataInternal.targetAngle();
    }
    return this.m7h;
  }
}
exports.FbFreeAngleItem = FbFreeAngleItem;
//# sourceMappingURL=FbFreeAngleItem.js.map