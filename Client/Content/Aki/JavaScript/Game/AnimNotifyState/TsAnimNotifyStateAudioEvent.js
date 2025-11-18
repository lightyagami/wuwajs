"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const EffectUtil_1 = require("../Utils/EffectUtil");
const DEFAULT_FADE_DURATION = 500;
class TsAnimNotifyStateAudioEvent extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.AudioEvent = undefined;
    this.SocketName = undefined;
    this.Follow = true;
    this.KeepAlive = false;
    this.FadeDuration = DEFAULT_FADE_DURATION;
    this.FadeCurve = 4;
    this.TrailingAudioEvent = undefined;
    this.TagProbabilityInfo = undefined;
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
  K2_NotifyBegin(e, i, o) {
    this.NotifyDuration = o;
    if (!this.AudioEvent) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 56, "[Game.AnimNotifyState] 无效的 AudioEvent", ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
      }
      return false;
    }
    let t = this.AudioEvent.ToAssetPathName();
    o = e.GetOuter();
    if (Info_1.Info.IsGameRunning()) {
      if (o instanceof TsBaseCharacter_1.default) {
        if (o.GetEntityNoBlueprint()?.GetComponent(209)?.HasTag(1654452863)) {
          return false;
        }
        o = o.CharacterActorComponent?.GetReplaceEffect(t);
        t = o ?? t;
      }
    } else {
      t = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(t);
    }
    var s;
    var o = this.AudioEvent && (0, AudioSystem_1.parseAudioEventPath)(t);
    if (o) {
      let t = true;
      if (!(t = e.GetOwner()?.IsA(UE.TsBaseCharacter_C.StaticClass()) && (s = e.GetOwner().CharacterActorComponent?.Entity) ? ModelManager_1.ModelManager.GameAudioModel?.CheckAudioProbabilityInfo(s.Id, o, this.TagProbabilityInfo) ?? false : t)) {
        return true;
      }
      this.PostAudioEvent(o, e, i);
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    if (this.KeepAlive && this.GetCurrentTriggerOffsetInThisNotifyTick() > this.NotifyDuration) {
      return false;
    }
    var i;
    var o = t.GetOwner();
    if (!o?.IsValid()) {
      return false;
    }
    if (GlobalData_1.GlobalData.GameInstance) {
      const s = this.HandleMap.Get(o);
      if (s && (AudioSystem_1.AudioSystem.ExecuteAction(s, 0, {
        TransitionDuration: this.FadeDuration,
        TransitionFadeCurve: this.FadeCurve
      }), this.HandleMap.Remove(o), ControllerHolder_1.ControllerHolder.GameAudioController.RemoveEvent(o, s), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 56, "[Game.AnimNotifyState] StopEvent", ["Handle", s], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(e)], ["Owner", t.GetOwner()?.GetName()]), i = this.TrailingAudioEvent && (0, AudioSystem_1.parseAudioEventPath)(this.TrailingAudioEvent))) {
        this.PostAudioEvent(i, t, e);
      }
    } else {
      const s = this.HandleMap.Get(o);
      if (s) {
        AudioSystem_1.AudioSystem.ExecuteAction(s, 0, {
          TransitionDuration: this.FadeDuration,
          TransitionFadeCurve: this.FadeCurve
        });
        this.HandleMap.Remove(o);
      }
    }
    return true;
  }
  PostAudioEvent(t, e, i) {
    var o;
    var s = e.GetOwner();
    if (s?.IsValid()) {
      if (GlobalData_1.GlobalData.GameInstance) {
        if (this.Follow) {
          if ((o = ControllerHolder_1.ControllerHolder.GameAudioController.PostEvent(s, t, this.SocketName)) && (this.HandleMap.Set(s, o), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Audio", 56, "[Game.AnimNotifyState] PostEvent", ["EventName", t], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)], ["Owner", e.GetOwner()?.GetName()]);
          }
        } else {
          o = e.D_GetSocketTransform(this.SocketName);
          if ((o = AudioSystem_1.AudioSystem.PostEvent(t, o)) && (this.HandleMap.Set(s, o), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Audio", 56, "[Game.AnimNotifyState] PostEvent", ["EventName", t], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)], ["Owner", e.GetOwner()?.GetName()]);
          }
        }
        return;
      } else if ((o = AudioSystem_1.AudioSystem.GetAkComponent(s, {
        SocketName: this.SocketName
      }))?.IsValid()) {
        if (i = AudioSystem_1.AudioSystem.PostEvent(t, o)) {
          this.HandleMap.Set(s, i);
        }
        return;
      } else {
        return undefined;
      }
    }
  }
}
exports.default = TsAnimNotifyStateAudioEvent;
//# sourceMappingURL=TsAnimNotifyStateAudioEvent.js.map