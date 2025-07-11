"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFreeAngleTurntable = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFreeAngleItem_1 = require("./FbFreeAngleItem");
class FbFreeAngleTurntable {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.B2h = false;
    this.q2h = 0;
    this.l7h = false;
    this._7h = undefined;
    this.f7h = false;
    this.p7h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFreeAngleTurntable(t);
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
          var i = this.FbDataInternal.itemConfig(t, new fb_component_1.FreeAngleItem());
          this._7h.push(FbFreeAngleItem_1.FbFreeAngleItem.Create(i));
        }
      }
    }
    return this._7h;
  }
  get IntervalAngle() {
    if (!this.f7h) {
      this.f7h = true;
      this.p7h = this.FbDataInternal.intervalAngle();
    }
    return this.p7h;
  }
}
exports.FbFreeAngleTurntable = FbFreeAngleTurntable;
//# sourceMappingURL=FbFreeAngleTurntable.js.map