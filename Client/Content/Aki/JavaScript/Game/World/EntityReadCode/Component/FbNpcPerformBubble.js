"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcPerformBubble = undefined;
const FbBubbleIndex_1 = require("../Action/FbBubbleIndex");
class FbNpcPerformBubble {
  constructor(t) {
    this.FbDataInternal = t;
    this.G4h = false;
    this.O4h = undefined;
    this.F4h = false;
    this.DTo = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNpcPerformBubble(t);
    }
  }
  get Bubble() {
    if (!this.G4h) {
      this.G4h = true;
      this.O4h = FbBubbleIndex_1.FbBubbleIndex.Create(this.FbDataInternal.bubble());
    }
    return this.O4h;
  }
  get Rate() {
    if (!this.F4h) {
      this.F4h = true;
      this.DTo = this.FbDataInternal.rate();
    }
    return this.DTo;
  }
}
exports.FbNpcPerformBubble = FbNpcPerformBubble;
//# sourceMappingURL=FbNpcPerformBubble.js.map