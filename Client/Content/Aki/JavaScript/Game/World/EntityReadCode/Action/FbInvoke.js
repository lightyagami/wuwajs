"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInvoke = undefined;
const FbActionInfo_1 = require("./FbActionInfo");
class FbInvoke {
  constructor(t) {
    this.FbDataInternal = t;
    this.i_h = false;
    this.r_h = 0;
    this.puh = false;
    this.vuh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInvoke(t);
    }
  }
  get Who() {
    if (!this.i_h) {
      this.i_h = true;
      this.r_h = this.FbDataInternal.who();
    }
    return this.r_h;
  }
  get ActionInfo() {
    if (!this.puh) {
      this.puh = true;
      this.vuh = FbActionInfo_1.FbActionInfo.Create(this.FbDataInternal.actionInfo());
    }
    return this.vuh;
  }
}
exports.FbInvoke = FbInvoke;
//# sourceMappingURL=FbInvoke.js.map