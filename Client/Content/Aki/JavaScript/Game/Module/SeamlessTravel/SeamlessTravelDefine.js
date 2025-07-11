"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeamlessTravelFloorParams = exports.SeamlessTravelFinishParams = exports.KeepMovementStateFeatures = exports.SeamlessTravelContext = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const DEFAULT_EFFECT_COLLAPSE_TIME = 0.5;
class SeamlessTravelContext {
  constructor() {
    this.EffectPath = undefined;
    this.EffectExpandTime = 0;
    this.EffectCollapseTime = 0;
    this.LeastTime = 0;
    this.FloorParams = undefined;
    this.IsTeleportInPlace = false;
    this.TransitionWeatherDaPath = undefined;
    this.SceneEffectDaPath = undefined;
    this.KeepMovementStateFeatures = undefined;
    this.FinishParams = undefined;
  }
  ParseConfig(s) {
    this.EffectPath = s.D$s;
    this.EffectExpandTime = s.U$s;
    this.EffectCollapseTime = Math.max(s.P$s, DEFAULT_EFFECT_COLLAPSE_TIME);
    this.LeastTime = s.A$s;
    this.IsTeleportInPlace = s.ra1;
    this.TransitionWeatherDaPath = s.oa1;
    this.SceneEffectDaPath = s.SCu;
    if (s.PG1.length) {
      this.KeepMovementStateFeatures = new KeepMovementStateFeatures();
      for (const t of s.PG1) {
        if (t === Protocol_1.Aki.Protocol.xG1.Proto_Kite) {
          this.KeepMovementStateFeatures.KeepKite = true;
        }
      }
      this.KeepMovementStateFeatures.KeepSoar = true;
    }
    if (s.cta) {
      this.FloorParams = new SeamlessTravelFloorParams();
      this.FloorParams.ParseFloorParams(s.dta);
    }
    if (s.MCu) {
      this.FinishParams = new SeamlessTravelFinishParams();
      this.FinishParams.ParseFinishParams(s.MCu);
    }
  }
}
exports.SeamlessTravelContext = SeamlessTravelContext;
class KeepMovementStateFeatures {
  constructor() {
    this.KeepKite = false;
    this.KeepSoar = false;
  }
}
exports.KeepMovementStateFeatures = KeepMovementStateFeatures;
class SeamlessTravelFinishParams {
  constructor() {
    this.NotStopScreenEffect = false;
    this.ScreenEffectExtraState = -1;
  }
  ParseFinishParams(s) {
    this.NotStopScreenEffect = s.ECu;
    this.ScreenEffectExtraState = s.XEu;
  }
}
exports.SeamlessTravelFinishParams = SeamlessTravelFinishParams;
class SeamlessTravelFloorParams {
  constructor() {
    this.FloorMeshPath = undefined;
    this.FloorMaterialPath = undefined;
    this.FloorAppearTime = 0;
    this.FloorDisappearTime = 0;
    this.FloorScale = undefined;
  }
  ParseFloorParams(s) {
    if (s.mta !== "") {
      this.FloorMeshPath = s.mta;
    }
    if (s.Cta !== "") {
      this.FloorMaterialPath = s.Cta;
    }
    this.FloorAppearTime = s.vta;
    this.FloorDisappearTime = s.pta;
    this.FloorScale = Vector_1.Vector.Create(s.gta, s.fta, 1);
  }
}
exports.SeamlessTravelFloorParams = SeamlessTravelFloorParams;
//# sourceMappingURL=SeamlessTravelDefine.js.map