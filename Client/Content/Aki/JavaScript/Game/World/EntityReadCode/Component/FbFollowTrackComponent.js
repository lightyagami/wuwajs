"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFollowTrackComponent = undefined;
const UnionFollowTrackEndOptionHelper_1 = require("./UnionFollowTrackEndOptionHelper");
class FbFollowTrackComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.M_h = false;
    this.E_h = 0;
    this.kuh = false;
    this.Guh = 0;
    this.Q6h = false;
    this.K6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFollowTrackComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = this.FbDataInternal.range();
    }
    return this.E_h;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get EndType() {
    var t;
    var i;
    if (!this.Q6h && (this.Q6h = true, t = this.FbDataInternal.endTypeType(), i = UnionFollowTrackEndOptionHelper_1.UnionFollowTrackEndOptionHelper.GetUnionFollowTrackEndOptionObject(t))) {
      this.K6h = UnionFollowTrackEndOptionHelper_1.UnionFollowTrackEndOptionHelper.ReadUnionFollowTrackEndOption(t, this.FbDataInternal.endType(i));
    }
    return this.K6h;
  }
}
exports.FbFollowTrackComponent = FbFollowTrackComponent;
//# sourceMappingURL=FbFollowTrackComponent.js.map