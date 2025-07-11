"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowCenterText = undefined;
const FbTextStyle_1 = require("./FbTextStyle");
class FbShowCenterText {
  constructor(t) {
    this.FbDataInternal = t;
    this.CCh = false;
    this.gCh = 0;
    this.fCh = false;
    this.pCh = undefined;
    this.vCh = false;
    this.yCh = undefined;
    this.SCh = false;
    this.MCh = 0;
    this.ECh = false;
    this.ICh = undefined;
    this.TCh = false;
    this.bCh = undefined;
    this.LCh = false;
    this.ACh = false;
    this.xCh = false;
    this.RCh = false;
  }
  static Create(t) {
    if (t) {
      return new FbShowCenterText(t);
    }
  }
  get TextId() {
    if (!this.CCh) {
      this.CCh = true;
      this.gCh = this.FbDataInternal.textId();
    }
    return this.gCh;
  }
  get TidCenterText() {
    if (!this.fCh) {
      this.fCh = true;
      this.pCh = this.FbDataInternal.tidCenterText();
    }
    return this.pCh;
  }
  get PlotLineKey() {
    if (!this.vCh) {
      this.vCh = true;
      this.yCh = this.FbDataInternal.plotLineKey();
    }
    return this.yCh;
  }
  get TotalTime() {
    if (!this.SCh) {
      this.SCh = true;
      this.MCh = this.FbDataInternal.totalTime();
    }
    return this.MCh;
  }
  get TextStyle() {
    if (!this.ECh) {
      this.ECh = true;
      this.ICh = FbTextStyle_1.FbTextStyle.Create(this.FbDataInternal.textStyle());
    }
    return this.ICh;
  }
  get BgImageId() {
    if (!this.TCh) {
      this.TCh = true;
      this.bCh = this.FbDataInternal.bgImageId();
    }
    return this.bCh;
  }
  get IsMulLine() {
    if (!this.LCh) {
      this.LCh = true;
      this.ACh = this.FbDataInternal.isMulLine();
    }
    return this.ACh;
  }
  get IsManualNext() {
    if (!this.xCh) {
      this.xCh = true;
      this.RCh = this.FbDataInternal.isManualNext();
    }
    return this.RCh;
  }
}
exports.FbShowCenterText = FbShowCenterText;
//# sourceMappingURL=FbShowCenterText.js.map