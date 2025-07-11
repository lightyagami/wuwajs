"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixedAngleTurntable = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFixedAngleItem_1 = require("./FbFixedAngleItem");
class FbFixedAngleTurntable {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.B2h = false;
    this.q2h = 0;
    this.l7h = false;
    this._7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFixedAngleTurntable(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RotationSpeed() {
    if (!this.B2h) {
      this.B2h = true;
      this.q2h = this.FbDataInternal.rotationSpeed();
    }
    return this.q2h;
  }
  get ItemConfig() {
    if (!this.l7h) {
      this.l7h = true;
      this._7h = new Array();
      var e = this.FbDataInternal.itemConfigLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.itemConfig(t, new fb_component_1.FixedAngleItem());
          this._7h.push(FbFixedAngleItem_1.FbFixedAngleItem.Create(i));
        }
      }
    }
    return this._7h;
  }
}
exports.FbFixedAngleTurntable = FbFixedAngleTurntable;
//# sourceMappingURL=FbFixedAngleTurntable.js.map