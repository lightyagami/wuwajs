"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixedAngleItem = undefined;
class FbFixedAngleItem {
  constructor(t) {
    this.FbDataInternal = t;
    this.c7h = false;
    this.u7h = 0;
    this.d7h = false;
    this.m7h = 0;
    this.C7h = false;
    this.g7h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFixedAngleItem(t);
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
  get RotateAngle() {
    if (!this.C7h) {
      this.C7h = true;
      this.g7h = this.FbDataInternal.rotateAngle();
    }
    return this.g7h;
  }
}
exports.FbFixedAngleItem = FbFixedAngleItem;
//# sourceMappingURL=FbFixedAngleItem.js.map