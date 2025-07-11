"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowTalkOutline = undefined;
class FbShowTalkOutline {
  constructor(t) {
    this.FbDataInternal = t;
    this.CCh = false;
    this.gCh = 0;
    this.lph = false;
    this._ph = undefined;
    this.vCh = false;
    this.yCh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbShowTalkOutline(t);
    }
  }
  get TextId() {
    if (!this.CCh) {
      this.CCh = true;
      this.gCh = this.FbDataInternal.textId();
    }
    return this.gCh;
  }
  get TidOutline() {
    if (!this.lph) {
      this.lph = true;
      this._ph = this.FbDataInternal.tidOutline();
    }
    return this._ph;
  }
  get PlotLineKey() {
    if (!this.vCh) {
      this.vCh = true;
      this.yCh = this.FbDataInternal.plotLineKey();
    }
    return this.yCh;
  }
}
exports.FbShowTalkOutline = FbShowTalkOutline;
//# sourceMappingURL=FbShowTalkOutline.js.map