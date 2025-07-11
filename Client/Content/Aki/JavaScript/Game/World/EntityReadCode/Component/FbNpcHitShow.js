"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcHitShow = undefined;
const FbBubbleIndex_1 = require("../Action/FbBubbleIndex");
class FbNpcHitShow {
  constructor(t) {
    this.FbDataInternal = t;
    this.R4h = false;
    this.w4h = undefined;
    this.P4h = false;
    this.U4h = undefined;
    this.D4h = false;
    this.B4h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbNpcHitShow(t);
    }
  }
  get HitMontage() {
    if (!this.R4h) {
      this.R4h = true;
      this.w4h = this.FbDataInternal.hitMontage();
    }
    return this.w4h;
  }
  get HitBubble() {
    if (!this.P4h) {
      this.P4h = true;
      this.U4h = FbBubbleIndex_1.FbBubbleIndex.Create(this.FbDataInternal.hitBubble());
    }
    return this.U4h;
  }
  get BubbleRate() {
    if (!this.D4h) {
      this.D4h = true;
      this.B4h = this.FbDataInternal.bubbleRate();
    }
    return this.B4h;
  }
}
exports.FbNpcHitShow = FbNpcHitShow;
//# sourceMappingURL=FbNpcHitShow.js.map