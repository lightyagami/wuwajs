"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityBundleChildInfo = undefined;
class FbEntityBundleChildInfo {
  constructor(t) {
    this.FbDataInternal = t;
    this.K9l = false;
    this.$9l = false;
    this.X9l = false;
    this.Y9l = 0;
    this.a_h = false;
    this.I9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEntityBundleChildInfo(t);
    }
  }
  get IsDisable() {
    if (!this.K9l) {
      this.K9l = true;
      this.$9l = this.FbDataInternal.isDisable();
    }
    return this.$9l;
  }
  get ChildId() {
    if (!this.X9l) {
      this.X9l = true;
      this.Y9l = this.FbDataInternal.childId();
    }
    return this.Y9l;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
}
exports.FbEntityBundleChildInfo = FbEntityBundleChildInfo;
//# sourceMappingURL=FbEntityBundleChildInfo.js.map