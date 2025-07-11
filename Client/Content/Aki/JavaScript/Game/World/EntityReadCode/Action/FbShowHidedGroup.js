"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowHidedGroup = undefined;
class FbShowHidedGroup {
  constructor(t) {
    this.FbDataInternal = t;
    this.sxh = false;
    this.axh = undefined;
    this.WAh = false;
    this.QAh = false;
  }
  static Create(t) {
    if (t) {
      return new FbShowHidedGroup(t);
    }
  }
  get GroupKey() {
    if (!this.sxh) {
      this.sxh = true;
      this.axh = this.FbDataInternal.groupKey();
    }
    return this.axh;
  }
  get DelayShow() {
    if (!this.WAh) {
      this.WAh = true;
      this.QAh = this.FbDataInternal.delayShow();
    }
    return this.QAh;
  }
}
exports.FbShowHidedGroup = FbShowHidedGroup;
//# sourceMappingURL=FbShowHidedGroup.js.map