"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPlayCustomSequence = undefined;
class FbPlayCustomSequence {
  constructor(t) {
    this.FbDataInternal = t;
    this.Adh = false;
    this.xdh = 0;
    this.Rdh = false;
    this.wdh = undefined;
    this.Pdh = false;
    this.Udh = false;
  }
  static Create(t) {
    if (t) {
      return new FbPlayCustomSequence(t);
    }
  }
  get CustomSeqId() {
    if (!this.Adh) {
      this.Adh = true;
      this.xdh = this.FbDataInternal.customSeqId();
    }
    return this.xdh;
  }
  get WhoIds() {
    if (!this.Rdh) {
      this.Rdh = true;
      this.wdh = new Array();
      var s = this.FbDataInternal.whoIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.wdh.push(this.FbDataInternal.whoIds(t));
        }
      }
    }
    return this.wdh;
  }
  get ResetCamera() {
    if (!this.Pdh) {
      this.Pdh = true;
      this.Udh = this.FbDataInternal.resetCamera();
    }
    return this.Udh;
  }
}
exports.FbPlayCustomSequence = FbPlayCustomSequence;
//# sourceMappingURL=FbPlayCustomSequence.js.map