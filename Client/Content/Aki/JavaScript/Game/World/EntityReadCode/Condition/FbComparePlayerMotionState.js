"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbComparePlayerMotionState = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbComparePlayerMotionState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Ozh = false;
    this.Fzh = undefined;
    this._ch = false;
    this.cch = undefined;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbComparePlayerMotionState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MotionState() {
    if (!this.Ozh) {
      this.Ozh = true;
      this.Fzh = this.FbDataInternal.motionState();
    }
    return this.Fzh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get OnlinePlayerConditionTargetOption() {
    var t;
    var i;
    if (!this.czh && (this.czh = true, t = this.FbDataInternal.onlinePlayerConditionTargetOptionType(), i = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(t))) {
      this.uzh = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(t, this.FbDataInternal.onlinePlayerConditionTargetOption(i));
    }
    return this.uzh;
  }
}
exports.FbComparePlayerMotionState = FbComparePlayerMotionState;
//# sourceMappingURL=FbComparePlayerMotionState.js.map