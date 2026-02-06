"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueAudioEvent = undefined;
const AudioSystem_1 = require("../../../../../../../Core/Audio/AudioSystem");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueAudioEvent extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.Zge = 0;
  }
  OnCreate() {
    var e = this.EntityHandle.Entity?.GetComponent(54);
    if (e && this.CueConfig.Parameters.length !== 0) {
      this.Zge = AudioSystem_1.AudioSystem.PostEvent(this.CueConfig.Parameters[0], e.GetAkComponent());
    }
  }
  OnDestroy() {
    if (this.Zge !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.Zge, 0);
    }
  }
}
exports.GameplayCueAudioEvent = GameplayCueAudioEvent;
//# sourceMappingURL=GameplayCueAudioEvent.js.map