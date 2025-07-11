"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const Log_1 = require("../../Core/Common/Log");
const ModelManager_1 = require("../Manager/ModelManager");
const SequenceUtils_1 = require("../Module/Plot/Sequence/SequenceUtils");
const DEFAULT_FADE_DURATION = 500;
class TsSeqAnimNotifyStateAudioEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.AudioEvent = undefined;
    this.SocketName = undefined;
    this.Follow = true;
    this.KeepAlive = false;
    this.FadeDuration = DEFAULT_FADE_DURATION;
    this.FadeCurve = 4;
    this.TrailingAudioEvent = undefined;
    this.NotifyDuration = 0;
    this.HandleMap = new UE.TMap();
  }
  Constructor() {
    this.NotifyDuration = 0;
  }
  GetNotifyName() {
    if (this.AudioEvent) {
      return "AudioEvent: " + (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent);
    } else {
      return "AudioEvent";
    }
  }
  K2_NotifyBegin(i, e, t) {
    if (!i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 45, "不存在的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    if (i.bHiddenInGame) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "隐藏的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    let o = false;
    var n = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(i.GetOwner());
    if (n !== 1 && n !== 3) {
      if ((n = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor()) && (o = n.GetAnimAudio(), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 45, "存在Seq", ["seq", n.GetName()], ["AnimAudio", o]);
      }
    } else {
      o = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ?? false;
    }
    return !!o && (this.NotifyDuration = t, this.AudioEvent ? ((n = this.AudioEvent && (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent)) && this.PostAudioEvent(n, i, e), true) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Audio", 45, "[Game.AnimNotifyState] 无效的 AudioEvent", ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(e)]), false));
  }
  K2_NotifyEnd(i, e) {
    if (!i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Audio", 45, "[Game.AnimNotify] 不存在的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    if (i.bHiddenInGame) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] 隐藏的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    let t = false;
    var o;
    var n = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(i.GetOwner());
    if (n !== 1 && n !== 3) {
      if ((n = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor()) && (t = n.GetAnimAudio(), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 45, "存在Seq", ["seq", n.GetName()], ["AnimAudio", t]);
      }
    } else {
      t = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ?? false;
    }
    return !!t && (!this.KeepAlive || !(this.GetCurrentTriggerOffsetInThisNotifyTick() > this.NotifyDuration)) && !((n = i.GetOwner()) ? n.bHidden ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] 隐藏的MeshComp Owner", ["AnimNotify", this.GetName()]), 1) : ((o = n && this.HandleMap.Get(n)) && (AudioSystem_1.AudioSystem.ExecuteAction(o, 0, {
      TransitionDuration: this.FadeDuration,
      TransitionFadeCurve: this.FadeCurve
    }), this.HandleMap.Remove(n), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 45, "[Game.AnimNotifyState] StopEvent", ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(e)], ["Owner", i.GetOwner()?.GetName()]), n = this.TrailingAudioEvent && (0, AudioSystem_1.parseAudioEventPath)(this.TrailingAudioEvent)) && this.PostAudioEvent(n, i, e), 0) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] 不存在的MeshComp Owner", ["AnimNotify", this.GetName()]), 1));
  }
  PostAudioEvent(i, e, t) {
    var o;
    var n = e.GetOwner();
    if (n?.IsValid()) {
      if (n.bHidden) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] 隐藏的MeshComp Owner", ["AnimNotify", this.GetName()]);
        }
      } else if (SequenceUtils_1.SequenceUtils.CheckIfUseAudioSeq(n)) {
        if (this.Follow) {
          if (AudioSystem_1.AudioSystem.GetAkComponent(e, {
            SocketName: this.SocketName
          })?.IsValid()) {
            o = AudioSystem_1.AudioSystem.PostEvent(i, e.GetOwner());
            this.HandleMap.Set(n, o);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 45, "[Game.AnimNotifyState] PostEvent", ["EventName", i], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(t)], ["Owner", e.GetOwner()?.GetName()]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Audio", 45, "[Game.AnimNotify] 无效的 akComponent", ["EventName", i], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(t)]);
          }
        } else {
          o = e.D_GetSocketTransform(this.SocketName);
          o = AudioSystem_1.AudioSystem.PostEvent(i, o);
          this.HandleMap.Set(n, o);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 45, "[Game.AnimNotifyState] PostEvent", ["EventName", i], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(t)], ["Owner", e.GetOwner()?.GetName()]);
          }
        }
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] 不存在的MeshComp Owner", ["AnimNotify", this.GetName()]);
    }
  }
}
exports.default = TsSeqAnimNotifyStateAudioEvent;
//# sourceMappingURL=TsSeqAnimNotifyStateAudioEvent.js.map