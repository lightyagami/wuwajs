"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRandomNpcRule = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFixedDateTime_1 = require("./FbFixedDateTime");
const FbProbabilityRefreshGroup_1 = require("./FbProbabilityRefreshGroup");
class FbRandomNpcRule {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.aBh = false;
    this.hBh = undefined;
    this.lBh = false;
    this._Bh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRandomNpcRule(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DateTimeList() {
    if (!this.aBh) {
      this.aBh = true;
      this.hBh = new Array();
      var e = this.FbDataInternal.dateTimeListLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.dateTimeList(t, new fb_component_1.FixedDateTime());
          this.hBh.push(FbFixedDateTime_1.FbFixedDateTime.Create(i));
        }
      }
    }
    return this.hBh;
  }
  get ProbabilityRefreshGroup() {
    if (!this.lBh) {
      this.lBh = true;
      this._Bh = FbProbabilityRefreshGroup_1.FbProbabilityRefreshGroup.Create(this.FbDataInternal.probabilityRefreshGroup());
    }
    return this._Bh;
  }
}
exports.FbRandomNpcRule = FbRandomNpcRule;
//# sourceMappingURL=FbRandomNpcRule.js.map