"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSwitchPermission = undefined;
class FbSwitchPermission {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.qH_ = false;
    this.OH_ = false;
    this.GH_ = false;
    this.FH_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSwitchPermission(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsAllowClientSwitch() {
    if (!this.qH_) {
      this.qH_ = true;
      this.OH_ = this.FbDataInternal.isAllowClientSwitch();
    }
    return this.OH_;
  }
  get Levels() {
    if (!this.GH_) {
      this.GH_ = true;
      this.FH_ = new Array();
      var i = this.FbDataInternal.levelsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.FH_.push(this.FbDataInternal.levels(t));
        }
      }
    }
    return this.FH_;
  }
}
exports.FbSwitchPermission = FbSwitchPermission;
//# sourceMappingURL=FbSwitchPermission.js.map