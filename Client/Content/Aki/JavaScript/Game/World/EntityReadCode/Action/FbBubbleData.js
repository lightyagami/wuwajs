"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBubbleData = undefined;
const FbBubbleIndex_1 = require("./FbBubbleIndex");
class FbBubbleData {
  constructor(t) {
    this.FbDataInternal = t;
    this._Rh = false;
    this.cRh = undefined;
    this.vmh = false;
    this.ymh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBubbleData(t);
    }
  }
  get FlowIndex() {
    if (!this._Rh) {
      this._Rh = true;
      this.cRh = FbBubbleIndex_1.FbBubbleIndex.Create(this.FbDataInternal.flowIndex());
    }
    return this.cRh;
  }
  get WaitTime() {
    if (!this.vmh) {
      this.vmh = true;
      this.ymh = this.FbDataInternal.waitTime();
    }
    return this.ymh;
  }
}
exports.FbBubbleData = FbBubbleData;
//# sourceMappingURL=FbBubbleData.js.map