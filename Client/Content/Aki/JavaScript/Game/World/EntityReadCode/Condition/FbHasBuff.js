"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHasBuff = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbHasBuff {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.I5h = false;
    this.T5h = 0;
    this._ch = false;
    this.cch = undefined;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHasBuff(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BuffId() {
    if (!this.I5h) {
      this.I5h = true;
      this.T5h = Number(this.FbDataInternal.buffId());
    }
    return this.T5h;
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
exports.FbHasBuff = FbHasBuff;
//# sourceMappingURL=FbHasBuff.js.map