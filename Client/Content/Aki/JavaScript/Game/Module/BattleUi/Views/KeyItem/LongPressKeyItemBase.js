"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongPressKeyItemBase = undefined;
const KeyItemBase_1 = require("./KeyItemBase");
class LongPressKeyItemBase extends KeyItemBase_1.KeyItemBase {
  constructor() {
    super(...arguments);
    this.xut = -0;
    this.rut = -0;
    this.wut = false;
  }
  RefreshActionLongPress(s, t = 0) {
    if (this.ActionName !== s) {
      this.xut = t;
      this.RefreshAction(s);
      this.But(t > 0);
      this.but(0);
    }
  }
  ForceShowLongPress() {
    this.xut = 0;
    this.But(true);
    this.but(100);
  }
  RefreshAxis(s) {
    if (this.AxisName !== s) {
      this.xut = 0;
      this.But(false);
      super.RefreshAxis(s);
    }
  }
  OnBeforeDestroy() {
    this.qut();
  }
  OnInputAction(s, t) {
    if (this.IsEnable && t === 0) {
      this.Gut();
    } else {
      this.qut();
    }
  }
  Tick(s) {
    if (this.wut && (!this.IsEnable || (this.rut += s, this.but(this.rut / this.xut), this.rut >= this.xut))) {
      this.qut();
    }
  }
  Gut() {
    this.rut = 0;
    this.but(0);
    this.wut = true;
  }
  qut() {
    this.rut = 0;
    this.but(0);
    this.wut = false;
  }
  But(s) {
    this.GetLongPressItem()?.SetUIActive(s);
  }
  but(s) {
    this.GetLongPressTexture()?.SetFillAmount(s);
  }
}
exports.LongPressKeyItemBase = LongPressKeyItemBase;
//# sourceMappingURL=LongPressKeyItemBase.js.map