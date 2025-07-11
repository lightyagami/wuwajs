"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcBumpShow = undefined;
const FbNpcPerformBubble_1 = require("./FbNpcPerformBubble");
class FbNpcBumpShow {
  constructor(e) {
    this.FbDataInternal = e;
    this.q4h = false;
    this.k4h = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbNpcBumpShow(e);
    }
  }
  get BumpBubble() {
    if (!this.q4h) {
      this.q4h = true;
      this.k4h = FbNpcPerformBubble_1.FbNpcPerformBubble.Create(this.FbDataInternal.bumpBubble());
    }
    return this.k4h;
  }
}
exports.FbNpcBumpShow = FbNpcBumpShow;
//# sourceMappingURL=FbNpcBumpShow.js.map