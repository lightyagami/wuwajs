"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayRateStruct = exports.TransitStruct = undefined;
class TransitStruct {
  constructor(t = 0, s = undefined, i = undefined, o = undefined, h = false, r = undefined) {
    this.TransitType = 0;
    this.Duration = undefined;
    this.TransitFadeIn = undefined;
    this.TransitFadeOut = undefined;
    this.IsValid = undefined;
    this.Mask = undefined;
    this.TransitType = t;
    this.Duration = s;
    this.TransitFadeIn = i;
    this.TransitFadeOut = o;
    this.IsValid = h;
    this.Mask = r;
  }
}
exports.TransitStruct = TransitStruct;
class PlayRateStruct {
  constructor(t = 1, s = 0, i = 0, o = 0) {
    this.PlayRateAbs = t;
    this.EaseType = s;
    this.EaseDuration = i;
    this.EaseExponent = o;
  }
}
exports.PlayRateStruct = PlayRateStruct;
//# sourceMappingURL=RefCompDefine.js.map