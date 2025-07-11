"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcStandbyShowFinitely = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbNpcStandbyShowFinitelyInfo_1 = require("./FbNpcStandbyShowFinitelyInfo");
class FbNpcStandbyShowFinitely {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.iLh = false;
    this.rLh = undefined;
    this.N4h = false;
    this.V4h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcStandbyShowFinitely(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PlayMode() {
    if (!this.iLh) {
      this.iLh = true;
      this.rLh = this.FbDataInternal.playMode();
    }
    return this.rLh;
  }
  get Montages() {
    if (!this.N4h) {
      this.N4h = true;
      this.V4h = new Array();
      var i = this.FbDataInternal.montagesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.montages(t, new fb_component_1.NpcStandbyShowFinitelyInfo());
          this.V4h.push(FbNpcStandbyShowFinitelyInfo_1.FbNpcStandbyShowFinitelyInfo.Create(e));
        }
      }
    }
    return this.V4h;
  }
}
exports.FbNpcStandbyShowFinitely = FbNpcStandbyShowFinitely;
//# sourceMappingURL=FbNpcStandbyShowFinitely.js.map