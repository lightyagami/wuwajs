"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonTip2PrepareCountdown = undefined;
class FbCommonTip2PrepareCountdown {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.yyh = false;
    this.Syh = 0;
    this.Myh = false;
    this.Eyh = undefined;
    this.Iyh = false;
    this.Tyh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCommonTip2PrepareCountdown(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CountDownNum() {
    if (!this.yyh) {
      this.yyh = true;
      this.Syh = this.FbDataInternal.countDownNum();
    }
    return this.Syh;
  }
  get TidCountDownTxt() {
    if (!this.Myh) {
      this.Myh = true;
      this.Eyh = this.FbDataInternal.tidCountDownTxt();
    }
    return this.Eyh;
  }
  get IsBlockPlayer() {
    if (!this.Iyh) {
      this.Iyh = true;
      this.Tyh = this.FbDataInternal.isBlockPlayer();
    }
    return this.Tyh;
  }
}
exports.FbCommonTip2PrepareCountdown = FbCommonTip2PrepareCountdown;
//# sourceMappingURL=FbCommonTip2PrepareCountdown.js.map