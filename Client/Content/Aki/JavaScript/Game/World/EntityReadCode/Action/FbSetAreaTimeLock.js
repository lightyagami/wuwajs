"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbSetAreaTimeLock = void 0;
const FbFixedTime_1 = require("./FbFixedTime");
class FbSetAreaTimeLock {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.g5h = !1, this.f5h = void 0, this.ZCc = !1, this.e0c = void 0
  }
  static Create(t) {
    if (t) return new FbSetAreaTimeLock(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get AreaIds() {
    if (!this.g5h) {
      this.g5h = !0, this.f5h = new Array;
      var i = this.FbDataInternal.areaIdsLength();
      if (i)
        for (let t = 0; t < i; ++t) this.f5h.push(this.FbDataInternal.areaIds(t))
    }
    return this.f5h
  }
  get LockTime() {
    return this.ZCc || (this.ZCc = !0, this.e0c = FbFixedTime_1.FbFixedTime.Create(this.FbDataInternal.lockTime())), this.e0c
  }
}
exports.FbSetAreaTimeLock = FbSetAreaTimeLock;
//# sourceMappingURL=FbSetAreaTimeLock.js.map