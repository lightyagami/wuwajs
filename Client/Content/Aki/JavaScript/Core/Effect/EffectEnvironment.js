"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectEnvironment = undefined;
const cpp_1 = require("cpp");
const Info_1 = require("../Common/Info");
class EffectEnvironment {
  static get GlobalTimeScale() {
    return this.Lgl;
  }
  static set GlobalTimeScale(t) {
    if (this.Lgl !== t && (this.Lgl = t, this.OpenTickOptimize && cpp_1.FKuroEffectSystemInterface.UpdateGlobalTimeScale(t), this.OpenCppOptimize)) {
      cpp_1.FEffectSystem.SetGlobalTimeScale(t);
    }
  }
  static get DisableOtherEffect() {
    return this.qdc;
  }
  static set DisableOtherEffect(t) {
    if (this.qdc !== t && (this.qdc = t, this.OpenCppOptimize)) {
      cpp_1.FEffectSystem.OnDisableOtherEffectChange(t);
    }
  }
  static get EffectQualityBiasRemote() {
    return this.Gdc;
  }
  static set EffectQualityBiasRemote(t) {
    if (this.Gdc !== t && (this.Gdc = t, this.OpenCppOptimize)) {
      cpp_1.FEffectSystem.OnEffectQualityBiasRemoteChange(t);
    }
  }
  static get OpenTickOptimize() {
    return !Info_1.Info.IsInEditorTick() && this.f0l;
  }
  static Initialize() {
    this.UseLog = Info_1.Info.IsBuildDevelopmentOrDebug;
  }
  static Tick(t, e) {
    this.GameTimeInSeconds += t * 0.001;
  }
}
(exports.EffectEnvironment = EffectEnvironment).GameTimeInSeconds = 0;
EffectEnvironment.Lgl = 1;
EffectEnvironment.UseLog = true;
EffectEnvironment.qdc = false;
EffectEnvironment.UsePool = true;
EffectEnvironment.Gdc = -1;
EffectEnvironment.CloseEffectSubStat = true;
EffectEnvironment.OpenVisibilityOptimize = true;
EffectEnvironment.OpenDistanceOptimize = true;
EffectEnvironment.OpenCppOptimize = true;
EffectEnvironment.f0l = true; //# sourceMappingURL=EffectEnvironment.js.map