"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRecordTimeStampType = undefined;
class FbRecordTimeStampType {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.d4_ = false;
    this.m4_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRecordTimeStampType(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TimeStampType() {
    if (!this.d4_) {
      this.d4_ = true;
      this.m4_ = this.FbDataInternal.timeStampType();
    }
    return this.m4_;
  }
}
exports.FbRecordTimeStampType = FbRecordTimeStampType;
//# sourceMappingURL=FbRecordTimeStampType.js.map