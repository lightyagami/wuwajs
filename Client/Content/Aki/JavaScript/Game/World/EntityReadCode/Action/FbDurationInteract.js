"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDurationInteract = undefined;
class FbDurationInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbDurationInteract(t);
    }
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbDurationInteract = FbDurationInteract;
//# sourceMappingURL=FbDurationInteract.js.map