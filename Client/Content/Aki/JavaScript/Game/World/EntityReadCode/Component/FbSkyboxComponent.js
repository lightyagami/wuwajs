"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSkyboxComponent = undefined;
const UnionTriggerModeHelper_1 = require("./UnionTriggerModeHelper");
class FbSkyboxComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.$jh = false;
    this.Xjh = undefined;
    this.Yjh = false;
    this.zjh = undefined;
    this.Jjh = false;
    this.Zjh = 0;
    this.e5h = false;
    this.t5h = 0;
    this.NIh = false;
    this.cui = 0;
    this.i5h = false;
    this.r5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSkyboxComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get WeatherDataAsset() {
    if (!this.$jh) {
      this.$jh = true;
      this.Xjh = this.FbDataInternal.weatherDataAsset();
    }
    return this.Xjh;
  }
  get PPTODDataAsset() {
    if (!this.Yjh) {
      this.Yjh = true;
      this.zjh = this.FbDataInternal.pptodDataAsset();
    }
    return this.zjh;
  }
  get SkyboxSetting() {
    if (!this.Jjh) {
      this.Jjh = true;
      this.Zjh = this.FbDataInternal.skyboxSetting();
    }
    return this.Zjh;
  }
  get FadeTime() {
    if (!this.e5h) {
      this.e5h = true;
      this.t5h = this.FbDataInternal.fadeTime();
    }
    return this.t5h;
  }
  get Priority() {
    if (!this.NIh) {
      this.NIh = true;
      this.cui = this.FbDataInternal.priority();
    }
    return this.cui;
  }
  get TriggerMode() {
    var t;
    var i;
    if (!this.i5h && (this.i5h = true, t = this.FbDataInternal.triggerModeType(), i = UnionTriggerModeHelper_1.UnionTriggerModeHelper.GetUnionTriggerModeObject(t))) {
      this.r5h = UnionTriggerModeHelper_1.UnionTriggerModeHelper.ReadUnionTriggerMode(t, this.FbDataInternal.triggerMode(i));
    }
    return this.r5h;
  }
}
exports.FbSkyboxComponent = FbSkyboxComponent;
//# sourceMappingURL=FbSkyboxComponent.js.map