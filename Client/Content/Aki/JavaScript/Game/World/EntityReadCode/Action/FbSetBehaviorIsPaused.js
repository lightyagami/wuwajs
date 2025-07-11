"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetBehaviorIsPaused = undefined;
class FbSetBehaviorIsPaused {
  constructor(s) {
    this.FbDataInternal = s;
    this.bmh = false;
    this.dJ = false;
  }
  static Create(s) {
    if (s) {
      return new FbSetBehaviorIsPaused(s);
    }
  }
  get IsPaused() {
    if (!this.bmh) {
      this.bmh = true;
      this.dJ = this.FbDataInternal.isPaused();
    }
    return this.dJ;
  }
}
exports.FbSetBehaviorIsPaused = FbSetBehaviorIsPaused;
//# sourceMappingURL=FbSetBehaviorIsPaused.js.map