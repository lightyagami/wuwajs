"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueCharacterAudioEvent = undefined;
const AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueCharacterAudioEvent extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.Crm = false;
    this.prm = false;
  }
  OnCreate() {
    var e;
    if (this.CueConfig.Parameters[0] === "1") {
      e = this.EntityHandle.Entity.GetComponent(0);
      this.prm = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() !== e.GetPlayerId();
    } else {
      this.prm = false;
    }
    if (!this.prm) {
      if (this.EntityHandle.Entity?.Active) {
        this.XZi(1);
        this.Crm = true;
      } else {
        this.XZi(2);
      }
    }
  }
  OnEnable() {
    if (!this.prm && (!!this.Crm || !(this.Crm = true, this.XZi(7)))) {
      this.XZi(5);
    }
  }
  OnDisable() {
    if (!this.prm) {
      this.XZi(6);
    }
  }
  OnDestroy() {
    if (!this.prm) {
      if (this.EntityHandle.Entity?.Active) {
        this.XZi(3);
      } else {
        this.XZi(4);
      }
    }
  }
  XZi(e) {
    e = this.CueConfig.Parameters[e];
    return !!e && !!this.EntityHandle.Entity?.GetComponent(54) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 17, "GameplayCueCharacterAudioEvent PlayAudio", ["", e]), AudioSystem_1.AudioSystem.PostEvent(e), true);
  }
}
exports.GameplayCueCharacterAudioEvent = GameplayCueCharacterAudioEvent;
//# sourceMappingURL=GameplayCueCharacterAudioEvent.js.map