"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckSubLevelState = undefined;
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition");
const FbCheckSubLevelStateConfig_1 = require("./FbCheckSubLevelStateConfig");
class FbCheckSubLevelState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.q8_ = false;
    this.O8_ = undefined;
    this.G8_ = false;
    this.F8_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckSubLevelState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ConditionCount() {
    if (!this.q8_) {
      this.q8_ = true;
      this.O8_ = this.FbDataInternal.conditionCount();
    }
    return this.O8_;
  }
  get CheckList() {
    if (!this.G8_) {
      this.G8_ = true;
      this.F8_ = new Array();
      var e = this.FbDataInternal.checkListLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.checkList(t, new fb_condition_1.CheckSubLevelStateConfig());
          this.F8_.push(FbCheckSubLevelStateConfig_1.FbCheckSubLevelStateConfig.Create(i));
        }
      }
    }
    return this.F8_;
  }
}
exports.FbCheckSubLevelState = FbCheckSubLevelState;
//# sourceMappingURL=FbCheckSubLevelState.js.map