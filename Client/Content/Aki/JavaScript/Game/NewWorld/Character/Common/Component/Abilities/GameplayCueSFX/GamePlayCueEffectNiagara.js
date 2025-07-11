"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayCueEffectNiagara = undefined;
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const EffectParameterNiagara_1 = require("../../../../../../Effect/EffectParameter/EffectParameterNiagara");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const GameplayCueEffect_1 = require("./GameplayCueEffect");
const PARAM_NAME = "VisualCount";
class GamePlayCueEffectNiagara extends GameplayCueEffect_1.GameplayCueEffect {
  OnSetMagnitude(e) {
    var a = new EffectParameterNiagara_1.EffectParameterNiagara();
    a.UserParameterFloat = [[FNameUtil_1.FNameUtil.GetDynamicFName(PARAM_NAME), this.ToRange(e)]];
    EffectSystem_1.EffectSystem.SetEffectParameterNiagara(this.EffectViewHandle, a);
  }
}
exports.GamePlayCueEffectNiagara = GamePlayCueEffectNiagara;
//# sourceMappingURL=GamePlayCueEffectNiagara.js.map