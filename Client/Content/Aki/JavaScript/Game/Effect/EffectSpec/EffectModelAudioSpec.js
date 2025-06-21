"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.EffectModelAudioSpec = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  EffectAudioContext_1 = require("../EffectContext/EffectAudioContext"),
  EffectAudioController_1 = require("./EffectAudioController"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelAudioSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments), this.ege = void 0, this.N2c = 0
  }
  OnInit() {
    return this.ege = this.Handle?.GetSureEffectActor(), !0
  }
  OnPlay() {
    var t;
    (this.EffectModel?.AudioEvent)?.IsValid() ? this.EffectModel ? (t = this.Handle?.GetContext(), 0 !== this.N2c && this.V2c("OnPlay"), t instanceof EffectAudioContext_1.EffectAudioContext ? this.N2c = EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(this.EffectModel, this.ege, t.HitEffectType, t.FromPrimaryRole ? 0 : 2) : this.N2c = EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(this.EffectModel, this.ege, t?.HitEffectType)) : Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 42, "[Game.EffectAudio] 无效的 EffectModel") : Log_1.Log.CheckError() && Log_1.Log.Error("Audio", 56, "[Game.Effect] 无效的 AudioEvent", ["EffectModel", this.EffectModel?.GetName()], ["EffectActor", this.ege?.GetName()])
  }
  OnClear() {
    return this.V2c("OnClear"), !0
  }
  OnStop() {
    this.V2c("OnStop")
  }
  V2c(t) {
    0 !== this.N2c && (EffectAudioController_1.EffectAudioController.OnStopEffectAudio(this.N2c, t), this.N2c = 0)
  }
}
exports.EffectModelAudioSpec = EffectModelAudioSpec;
//# sourceMappingURL=EffectModelAudioSpec.js.map