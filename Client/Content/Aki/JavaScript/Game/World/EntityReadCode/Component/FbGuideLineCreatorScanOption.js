"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGuideLineCreatorScanOption = undefined;
class FbGuideLineCreatorScanOption {
  constructor(t) {
    this.FbDataInternal = t;
    this.F5h = false;
    this.N5h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbGuideLineCreatorScanOption(t);
    }
  }
  get ResponseRange() {
    if (!this.F5h) {
      this.F5h = true;
      this.N5h = this.FbDataInternal.responseRange();
    }
    return this.N5h;
  }
}
exports.FbGuideLineCreatorScanOption = FbGuideLineCreatorScanOption;
//# sourceMappingURL=FbGuideLineCreatorScanOption.js.map