"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TickIntervalUtils = undefined;
const MathUtils_1 = require("./MathUtils");
class Config {
  constructor(t, i, e, s, n) {
    this.TickPerFrameThreshold = t;
    this.TickFramePeriod = i;
    this.TickPerFrameThresholdRadio = e;
    this.TickFramePeriodRatio = s;
    this.MaxInterval = n;
  }
  GetScore(t, i) {
    return Math.min(this.MaxInterval, Math.max(0, t - this.TickPerFrameThreshold) / this.TickFramePeriod + Math.max(0, i - this.TickPerFrameThresholdRadio) / this.TickFramePeriodRatio);
  }
}
const MAX_INTERVAL = 60;
const characterConfig = new Config(5000, 5000, MathUtils_1.MathUtils.DegToRad * 75, MathUtils_1.MathUtils.DegToRad * 10, MAX_INTERVAL);
const commonNpcConfig = new Config(5000, 5000, MathUtils_1.MathUtils.DegToRad * 75, MathUtils_1.MathUtils.DegToRad * 10, MAX_INTERVAL);
const simpleNpcConfig = new Config(5000, 3500, MathUtils_1.MathUtils.DegToRad * 75, MathUtils_1.MathUtils.DegToRad * 10, MAX_INTERVAL);
const sceneItemConfig = new Config(1500, 1000, MathUtils_1.MathUtils.DegToRad * 75, MathUtils_1.MathUtils.DegToRad * 10, MAX_INTERVAL);
class TickIntervalUtils {
  static Wz(t, i, e) {
    if (t < e.TickPerFrameThreshold && i < e.TickPerFrameThresholdRadio) {
      return 0;
    }
    let s = 1;
    if (t > e.TickPerFrameThreshold) {
      s = 1 + (t - e.TickPerFrameThreshold) / e.TickFramePeriod;
      s *= s;
    }
    let n = 1;
    if (i > e.TickPerFrameThresholdRadio) {
      n = 1 + (i - e.TickPerFrameThresholdRadio) / e.TickFramePeriodRatio;
      n *= n;
    }
    return Math.min(s * n, e.MaxInterval);
  }
  static GetCharacterTickInterval(t, i) {
    return this.Wz(t, i, characterConfig);
  }
  static GetCommonNpcTickInterval(t, i) {
    return this.Wz(t, i, commonNpcConfig);
  }
  static GetSimpleNpcTickInterval(t, i) {
    return this.Wz(t, i, simpleNpcConfig);
  }
  static GetSceneItemTickInterval(t, i) {
    return this.Wz(t, i, sceneItemConfig);
  }
}
exports.TickIntervalUtils = TickIntervalUtils;
//# sourceMappingURL=TickIntervalUtils.js.map