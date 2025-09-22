"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectModelAudioSpec = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EffectAudioContext_1 = require("../EffectContext/EffectAudioContext");
const EffectAudioController_1 = require("./EffectAudioController");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelAudioSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments);
    this.ege = undefined;
    this.N2c = 0;
  }
  OnInit() {
    this.ege = this.Handle?.GetSureEffectActor();
    return true;
  }
  OnPlay() {
    var t;
    if (this.EffectModel?.AudioEvent?.IsValid()) {
      if (this.EffectModel) {
        t = this.Handle?.GetContext();
        if (this.N2c !== 0) {
          this.V2c("OnPlay");
        }
        if (t instanceof EffectAudioContext_1.EffectAudioContext) {
          this.N2c = EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(this.EffectModel, this.ege, t.HitEffectType, t.FromPrimaryRole ? 0 : 2, () => {
            this.N2c = 0;
          });
        } else {
          this.N2c = EffectAudioController_1.EffectAudioController.AddPlayEffectAudio(this.EffectModel, this.ege, t?.HitEffectType, undefined, () => {
            this.N2c = 0;
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 42, "[Game.EffectAudio] 无效的 EffectModel");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 56, "[Game.Effect] 无效的 AudioEvent", ["EffectModel", this.EffectModel?.GetName()], ["EffectActor", this.ege?.GetName()]);
    }
  }
  OnClear() {
    this.V2c("OnClear");
    return true;
  }
  OnStop() {
    this.V2c("OnStop");
  }
  V2c(t) {
    if (this.N2c !== 0) {
      EffectAudioController_1.EffectAudioController.OnStopEffectAudio(this.N2c, t, false);
      this.N2c = 0;
    }
  }
}
exports.EffectModelAudioSpec = EffectModelAudioSpec;
//# sourceMappingURL=EffectModelAudioSpec.js.map