"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTalkOptionPreOption = undefined;
class FbTalkOptionPreOption {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$gh = false;
    this.Xgh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTalkOptionPreOption(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PreOptions() {
    if (!this.$gh) {
      this.$gh = true;
      this.Xgh = new Array();
      var i = this.FbDataInternal.preOptionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Xgh.push(this.FbDataInternal.preOptions(t));
        }
      }
    }
    return this.Xgh;
  }
}
exports.FbTalkOptionPreOption = FbTalkOptionPreOption;
//# sourceMappingURL=FbTalkOptionPreOption.js.map