"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixedDateTime = undefined;
class FbFixedDateTime {
  constructor(t) {
    this.FbDataInternal = t;
    this.ZDh = false;
    this.eBh = 0;
    this.tBh = false;
    this.iBh = 0;
    this.rBh = false;
    this.oBh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFixedDateTime(t);
    }
  }
  get Hours() {
    if (!this.ZDh) {
      this.ZDh = true;
      this.eBh = this.FbDataInternal.hours();
    }
    return this.eBh;
  }
  get Minutes() {
    if (!this.tBh) {
      this.tBh = true;
      this.iBh = this.FbDataInternal.minutes();
    }
    return this.iBh;
  }
  get Seconds() {
    if (!this.rBh) {
      this.rBh = true;
      this.oBh = this.FbDataInternal.seconds();
    }
    return this.oBh;
  }
}
exports.FbFixedDateTime = FbFixedDateTime;
//# sourceMappingURL=FbFixedDateTime.js.map