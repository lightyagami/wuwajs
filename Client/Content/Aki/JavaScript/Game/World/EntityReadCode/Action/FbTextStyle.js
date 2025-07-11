"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTextStyle = undefined;
const UnionCenterTextShowAnimHelper_1 = require("./UnionCenterTextShowAnimHelper");
class FbTextStyle {
  constructor(t) {
    this.FbDataInternal = t;
    this.wCh = false;
    this.PCh = undefined;
    this.UCh = false;
    this.DCh = undefined;
    this.BCh = false;
    this.qCh = undefined;
    this.kCh = false;
    this.GCh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTextStyle(t);
    }
  }
  get ShowAnim() {
    var t;
    var e;
    if (!this.wCh && (this.wCh = true, t = this.FbDataInternal.showAnimType(), e = UnionCenterTextShowAnimHelper_1.UnionCenterTextShowAnimHelper.GetUnionCenterTextShowAnimObject(t))) {
      this.PCh = UnionCenterTextShowAnimHelper_1.UnionCenterTextShowAnimHelper.ReadUnionCenterTextShowAnim(t, this.FbDataInternal.showAnim(e));
    }
    return this.PCh;
  }
  get FontSize() {
    if (!this.UCh) {
      this.UCh = true;
      this.DCh = this.FbDataInternal.fontSize();
    }
    return this.DCh;
  }
  get TextAlign() {
    if (!this.BCh) {
      this.BCh = true;
      this.qCh = this.FbDataInternal.textAlign();
    }
    return this.qCh;
  }
  get TextHorizontal() {
    if (!this.kCh) {
      this.kCh = true;
      this.GCh = this.FbDataInternal.textHorizontal();
    }
    return this.GCh;
  }
}
exports.FbTextStyle = FbTextStyle;
//# sourceMappingURL=FbTextStyle.js.map