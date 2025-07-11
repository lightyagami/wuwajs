"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActiveRange = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbActiveRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.yEh = false;
    this.SEh = undefined;
    this.MEh = false;
    this.EEh = 0;
    this.IEh = false;
    this.TEh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbActiveRange(t);
    }
  }
  get CheckPoint() {
    if (!this.yEh) {
      this.yEh = true;
      this.SEh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.checkPoint());
    }
    return this.SEh;
  }
  get CheckEnterRange() {
    if (!this.MEh) {
      this.MEh = true;
      this.EEh = this.FbDataInternal.checkEnterRange();
    }
    return this.EEh;
  }
  get CheckLeaveRange() {
    if (!this.IEh) {
      this.IEh = true;
      this.TEh = this.FbDataInternal.checkLeaveRange();
    }
    return this.TEh;
  }
}
exports.FbActiveRange = FbActiveRange;
//# sourceMappingURL=FbActiveRange.js.map