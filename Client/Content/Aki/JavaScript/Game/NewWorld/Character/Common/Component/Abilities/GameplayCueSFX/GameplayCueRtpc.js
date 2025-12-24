"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueRtpc = undefined;
const AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GameplayCueMagnitude_1 = require("./GameplayCueMagnitude");
class GameplayCueRtpc extends GameplayCueMagnitude_1.GameplayCueMagnitude {
  constructor() {
    super(...arguments);
    this.prm = false;
    this.Hte = undefined;
    this.qkf = undefined;
    this.Okf = false;
  }
  OnInit() {
    super.OnInit();
    this.qkf = this.CueConfig.Parameters[0];
    this.Okf = this.CueConfig.Parameters[1] === "1";
    var e = this.EntityHandle.Entity.GetComponent(0);
    this.prm = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() !== e.GetPlayerId();
    if (!this.prm) {
      this.Hte = this.EntityHandle.Entity.GetComponent(1);
    }
  }
  UseMagnitude() {
    return !this.prm && super.UseMagnitude();
  }
  OnDestroy() {
    if (this.Okf) {
      this.Gkf(0);
    }
    this.Hte = undefined;
    super.OnDestroy();
  }
  OnSetMagnitude(e) {
    this.Gkf(e);
  }
  Normalize() {
    return this.Value;
  }
  Gkf(e) {
    if (this.Hte) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[Rtpc] 角色变量同步给音频", ["RtpcKey", this.qkf], ["value", e], ["cueId", this.CueConfig.Id]);
      }
      AudioSystem_1.AudioSystem.SetRtpcValue(this.qkf, e, {
        Actor: this.Hte.Owner
      });
    }
  }
}
exports.GameplayCueRtpc = GameplayCueRtpc;
//# sourceMappingURL=GameplayCueRtpc.js.map