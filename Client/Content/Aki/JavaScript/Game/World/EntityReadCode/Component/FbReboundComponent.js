"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbReboundComponent = undefined;
const UnionReboundOptionHelper_1 = require("./UnionReboundOptionHelper");
class FbReboundComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.p0h = false;
    this.nXs = 0;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbReboundComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get BulletId() {
    if (!this.p0h) {
      this.p0h = true;
      this.nXs = Number(this.FbDataInternal.bulletId());
    }
    return this.nXs;
  }
  get Option() {
    var t;
    var e;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), e = UnionReboundOptionHelper_1.UnionReboundOptionHelper.GetUnionReboundOptionObject(t))) {
      this.Hye = UnionReboundOptionHelper_1.UnionReboundOptionHelper.ReadUnionReboundOption(t, this.FbDataInternal.option(e));
    }
    return this.Hye;
  }
}
exports.FbReboundComponent = FbReboundComponent;
//# sourceMappingURL=FbReboundComponent.js.map