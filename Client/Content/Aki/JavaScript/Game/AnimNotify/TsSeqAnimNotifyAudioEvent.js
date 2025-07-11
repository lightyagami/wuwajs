"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const Log_1 = require("../../Core/Common/Log");
const ModelManager_1 = require("../Manager/ModelManager");
const SequenceUtils_1 = require("../Module/Plot/Sequence/SequenceUtils");
class TsSeqAnimNotifyAudioEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.AudioEvent = undefined;
    this.SocketName = undefined;
    this.Follow = true;
  }
  Constructor() {}
  GetNotifyName() {
    if (this.AudioEvent) {
      return "AudioEvent: " + (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent);
    } else {
      return "AudioEvent";
    }
  }
  K2_Notify(e, i) {
    if (!e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "不存在的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    if (e.bHiddenInGame) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "隐藏的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    let o = false;
    var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e.GetOwner());
    if (t !== 1 && t !== 3) {
      if ((t = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor()) && (o = t.GetAnimAudio(), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 45, "存在Seq", ["seq", t.GetName()], ["AnimAudio", o]);
      }
    } else {
      o = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ?? false;
    }
    if (!o) {
      return false;
    }
    if (!this.AudioEvent) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 45, "[Game.AnimNotify] 无效的 AudioEvent", ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
      }
      return false;
    }
    t = (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Audio", 45, "[Game.AnimNotify] eventName为空", ["EventName", t], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
      }
      return false;
    }
    var n = e.GetOwner();
    if (!n) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] meshComponent!.GetOwner()为空, 不继续", ["meshComponent", e.GetName()]);
      }
      return false;
    }
    if (!SequenceUtils_1.SequenceUtils.CheckIfUseAudioSeq(n)) {
      return false;
    }
    if (this.Follow) {
      n = AudioSystem_1.AudioSystem.GetAkComponent(e, {
        SocketName: this.SocketName
      });
      if (!n?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Audio", 45, "[Game.AnimNotify] 无效的 akComponent", ["EventName", t], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
        }
        return false;
      }
      n = AudioSystem_1.AudioSystem.PostEvent(t, n);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] PostEvent", ["EventName", t], ["Handle", n], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
      }
    } else {
      n = e.D_GetSocketTransform(this.SocketName);
      e = AudioSystem_1.AudioSystem.PostEvent(t, n);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] PostEvent", ["EventName", t], ["Handle", e], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
      }
    }
    return true;
  }
}
exports.default = TsSeqAnimNotifyAudioEvent;
//# sourceMappingURL=TsSeqAnimNotifyAudioEvent.js.map