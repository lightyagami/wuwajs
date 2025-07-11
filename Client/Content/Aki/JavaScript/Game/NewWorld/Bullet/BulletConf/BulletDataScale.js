"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataScale = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataScale {
  constructor(t) {
    this.M9o = undefined;
    this.E9o = undefined;
    this.S9o = false;
    this.y9o = undefined;
    this.Pe = t;
  }
  get SizeScale() {
    this.M9o ||= Vector_1.Vector.Create(this.Pe.缩放倍率);
    return this.M9o;
  }
  get ScaleCurve() {
    if (!this.S9o) {
      this.S9o = true;
      this.E9o = this.Pe.缩放倍率曲线;
    }
    return this.E9o;
  }
  get ShapeSwitch() {
    if (this.y9o === undefined) {
      this.y9o = this.Pe.特定形状开关;
    }
    return this.y9o;
  }
  Preload() {
    this.SizeScale;
    this.ScaleCurve;
    return true;
  }
}
exports.BulletDataScale = BulletDataScale;
//# sourceMappingURL=BulletDataScale.js.map