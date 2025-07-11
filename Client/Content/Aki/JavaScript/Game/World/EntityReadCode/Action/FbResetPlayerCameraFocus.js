"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetPlayerCameraFocus = undefined;
const UnionResetPlayerFocusTypeHelper_1 = require("./UnionResetPlayerFocusTypeHelper");
class FbResetPlayerCameraFocus {
  constructor(e) {
    this.FbDataInternal = e;
    this.CH_ = false;
    this.pH_ = undefined;
    this.mch = false;
    this.Cch = 0;
    this.B9_ = false;
    this.k9_ = false;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(e) {
    if (e) {
      return new FbResetPlayerCameraFocus(e);
    }
  }
  get ResetType() {
    var e;
    var t;
    if (!this.CH_ && (this.CH_ = true, e = this.FbDataInternal.resetTypeType(), t = UnionResetPlayerFocusTypeHelper_1.UnionResetPlayerFocusTypeHelper.GetUnionResetPlayerFocusTypeObject(e))) {
      this.pH_ = UnionResetPlayerFocusTypeHelper_1.UnionResetPlayerFocusTypeHelper.ReadUnionResetPlayerFocusType(e, this.FbDataInternal.resetType(t));
    }
    return this.pH_;
  }
  get FadeInTime() {
    if (!this.mch) {
      this.mch = true;
      this.Cch = this.FbDataInternal.fadeInTime();
    }
    return this.Cch;
  }
  get CannotInterrupt() {
    if (!this.B9_) {
      this.B9_ = true;
      this.k9_ = this.FbDataInternal.cannotInterrupt();
    }
    return this.k9_;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbResetPlayerCameraFocus = FbResetPlayerCameraFocus;
//# sourceMappingURL=FbResetPlayerCameraFocus.js.map