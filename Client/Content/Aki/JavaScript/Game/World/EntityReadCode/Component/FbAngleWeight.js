"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAngleWeight = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityAngleWeight_1 = require("./FbEntityAngleWeight");
class FbAngleWeight {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._2h = false;
    this.c2h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAngleWeight(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AngleWeight() {
    if (!this._2h) {
      this._2h = true;
      this.c2h = new Array();
      var e = this.FbDataInternal.angleWeightLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.angleWeight(t, new fb_component_1.EntityAngleWeight());
          this.c2h.push(FbEntityAngleWeight_1.FbEntityAngleWeight.Create(i));
        }
      }
    }
    return this.c2h;
  }
}
exports.FbAngleWeight = FbAngleWeight;
//# sourceMappingURL=FbAngleWeight.js.map