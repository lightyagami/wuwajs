"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrePhysicsSequenceConfig = exports.PlayRateStruct = exports.TransitStruct = undefined;
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
class TransitStruct {
  constructor(t = 0, s = undefined, i = undefined, e = undefined, o = false, r = undefined) {
    this.TransitType = 0;
    this.Duration = undefined;
    this.TransitFadeIn = undefined;
    this.TransitFadeOut = undefined;
    this.IsValid = undefined;
    this.Mask = undefined;
    this.TransitType = t;
    this.Duration = s;
    this.TransitFadeIn = i;
    this.TransitFadeOut = e;
    this.IsValid = o;
    this.Mask = r;
  }
}
exports.TransitStruct = TransitStruct;
class PlayRateStruct {
  constructor(t = 1, s = 0, i = 0, e = 0) {
    this.PlayRateAbs = t;
    this.EaseType = s;
    this.EaseDuration = i;
    this.EaseExponent = e;
  }
}
exports.PlayRateStruct = PlayRateStruct;
class PrePhysicsSequenceConfig {
  static Check(t) {
    var s;
    return !!t && (this.gU || ((s = CommonParamById_1.configCommonParamById.GetStringArrayConfig("UpdateAnimRefLevelSequencePaths")) && s.forEach(t => {
      this.sYo.add(t);
    }), this.gU = true), this.sYo.has(t));
  }
}
(exports.PrePhysicsSequenceConfig = PrePhysicsSequenceConfig).sYo = new Set();
PrePhysicsSequenceConfig.gU = false; //# sourceMappingURL=RefCompDefine.js.map