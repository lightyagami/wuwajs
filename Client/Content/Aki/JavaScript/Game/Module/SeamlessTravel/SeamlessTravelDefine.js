"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SeamlessTravelFloorParams = exports.SeamlessTravelFinishParams = exports.KeepMovementStateFeatures = exports.SeamlessTravelContext = void 0;
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  DEFAULT_EFFECT_COLLAPSE_TIME = .5;
class SeamlessTravelContext {
  constructor() {
    this.EffectPath = void 0, this.EffectExpandTime = 0, this.EffectCollapseTime = 0, this.LeastTime = 0, this.FloorParams = void 0, this.IsTeleportInPlace = !1, this.TransitionWeatherDaPath = void 0, this.SceneEffectDaPath = void 0, this.KeepMovementStateFeatures = void 0, this.FinishParams = void 0
  }
  ParseConfig(s) {
    if (this.EffectPath = s.D$s, this.EffectExpandTime = s.U$s, this.EffectCollapseTime = Math.max(s.P$s, DEFAULT_EFFECT_COLLAPSE_TIME), this.LeastTime = s.A$s, this.IsTeleportInPlace = s.Es1, this.TransitionWeatherDaPath = s.Is1, this.SceneEffectDaPath = s.zlu, s.eG1.length) {
      this.KeepMovementStateFeatures = new KeepMovementStateFeatures;
      for (const t of s.eG1) t === Protocol_1.Aki.Protocol.tG1.Proto_Kite && (this.KeepMovementStateFeatures.KeepKite = !0)
    }
    s.cta && (this.FloorParams = new SeamlessTravelFloorParams, this.FloorParams.ParseFloorParams(s.dta)), s.Jlu && (this.FinishParams = new SeamlessTravelFinishParams, this.FinishParams.ParseFinishParams(s.Jlu))
  }
}
exports.SeamlessTravelContext = SeamlessTravelContext;
class KeepMovementStateFeatures {
  constructor() {
    this.KeepKite = !1
  }
}
exports.KeepMovementStateFeatures = KeepMovementStateFeatures;
class SeamlessTravelFinishParams {
  constructor() {
    this.NotStopScreenEffect = !1, this.ScreenEffectExtraState = -1
  }
  ParseFinishParams(s) {
    this.NotStopScreenEffect = s.Zlu, this.ScreenEffectExtraState = s.Guu
  }
}
exports.SeamlessTravelFinishParams = SeamlessTravelFinishParams;
class SeamlessTravelFloorParams {
  constructor() {
    this.FloorMeshPath = void 0, this.FloorMaterialPath = void 0, this.FloorAppearTime = 0, this.FloorDisappearTime = 0, this.FloorScale = void 0
  }
  ParseFloorParams(s) {
    "" !== s.mta && (this.FloorMeshPath = s.mta), "" !== s.Cta && (this.FloorMaterialPath = s.Cta), this.FloorAppearTime = s.vta, this.FloorDisappearTime = s.pta, this.FloorScale = Vector_1.Vector.Create(s.gta, s.fta, 1)
  }
}
exports.SeamlessTravelFloorParams = SeamlessTravelFloorParams;
//# sourceMappingURL=SeamlessTravelDefine.js.map