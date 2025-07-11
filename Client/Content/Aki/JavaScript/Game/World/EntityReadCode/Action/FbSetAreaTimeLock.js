"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetAreaTimeLock = undefined;
const FbFixedTime_1 = require("./FbFixedTime");
class FbSetAreaTimeLock {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.g5h = false;
    this.f5h = undefined;
    this.ZCc = false;
    this.e0c = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetAreaTimeLock(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AreaIds() {
    if (!this.g5h) {
      this.g5h = true;
      this.f5h = new Array();
      var i = this.FbDataInternal.areaIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.f5h.push(this.FbDataInternal.areaIds(t));
        }
      }
    }
    return this.f5h;
  }
  get LockTime() {
    if (!this.ZCc) {
      this.ZCc = true;
      this.e0c = FbFixedTime_1.FbFixedTime.Create(this.FbDataInternal.lockTime());
    }
    return this.e0c;
  }
}
exports.FbSetAreaTimeLock = FbSetAreaTimeLock;
//# sourceMappingURL=FbSetAreaTimeLock.js.map