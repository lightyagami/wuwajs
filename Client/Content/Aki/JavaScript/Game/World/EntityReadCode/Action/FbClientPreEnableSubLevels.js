"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbClientPreEnableSubLevels = undefined;
const UnionEnableSubLevelTransitionHelper_1 = require("./UnionEnableSubLevelTransitionHelper");
class FbClientPreEnableSubLevels {
  constructor(e) {
    this.FbDataInternal = e;
    this.R8_ = false;
    this.A8_ = undefined;
    this.x8_ = false;
    this.P8_ = undefined;
    this.L0h = false;
    this.khi = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbClientPreEnableSubLevels(e);
    }
  }
  get EnableLevels() {
    if (!this.R8_) {
      this.R8_ = true;
      this.A8_ = new Array();
      var i = this.FbDataInternal.enableLevelsLength();
      if (i) {
        for (let e = 0; e < i; ++e) {
          this.A8_.push(this.FbDataInternal.enableLevels(e));
        }
      }
    }
    return this.A8_;
  }
  get DisableLevels() {
    if (!this.x8_) {
      this.x8_ = true;
      this.P8_ = new Array();
      var i = this.FbDataInternal.disableLevelsLength();
      if (i) {
        for (let e = 0; e < i; ++e) {
          this.P8_.push(this.FbDataInternal.disableLevels(e));
        }
      }
    }
    return this.P8_;
  }
  get TransitionOption() {
    var e;
    var i;
    if (!this.L0h && (this.L0h = true, e = this.FbDataInternal.transitionOptionType(), i = UnionEnableSubLevelTransitionHelper_1.UnionEnableSubLevelTransitionHelper.GetUnionEnableSubLevelTransitionObject(e))) {
      this.khi = UnionEnableSubLevelTransitionHelper_1.UnionEnableSubLevelTransitionHelper.ReadUnionEnableSubLevelTransition(e, this.FbDataInternal.transitionOption(i));
    }
    return this.khi;
  }
}
exports.FbClientPreEnableSubLevels = FbClientPreEnableSubLevels;
//# sourceMappingURL=FbClientPreEnableSubLevels.js.map