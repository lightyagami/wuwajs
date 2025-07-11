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
        if (o.GetEntityNoBlueprint()?.GetComponent(205)?.HasTag(1654452863)) {
          return false;
        }
        o = o.CharacterActorComponent?.GetReplaceEffect(t);
        t = o ?? t;
      }
    } else {
      t = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(t);
    }
    var r;
    var o = this.AudioEvent && (0, AudioSystem_1.parseAudioEventPath)(t);
    if (o) {
      let t = true;
      if (!(t = e.GetOwner()?.IsA(UE.TsBaseCharacter_C.StaticClass()) && (r = e.GetOwner().CharacterActorComponent?.Entity) ? ModelManager_1.ModelManager.GameAudioModel?.CheckAudioProbabilityInfo(r.Id, o, this.TagProbabilityInfo) ?? false : t)) {
        return true;
      }
      this.PostAudioEvent(o, e, i);
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    var i;
    var o;
    return (!this.KeepAlive || !(this.GetCurrentTriggerOffsetInThisNotifyTick() > this.NotifyDuration)) && !((i = (o = t.GetOwner()) && this.HandleMap.Get(o)) && (AudioSystem_1.AudioSystem.ExecuteAction(i, 0, {
      TransitionDuration: this.FadeDuration,
      TransitionFadeCurve: this.FadeCurve
    }), this.HandleMap.Remove(o), ControllerHolder_1.ControllerHolder.GameAudioController.RemoveEvent(o, i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 56, "[Game.AnimNotifyState] StopEvent", ["Handle", i], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(e)], ["Owner", t.GetOwner()?.GetName()]), o = this.TrailingAudioEvent && (0, AudioSystem_1.parseAudioEventPath)(this.TrailingAudioEvent)) && this.PostAudioEvent(o, t, e), 0);
  }
  PostAudioEvent(t, e, i) {
    var o;
    var r = e.GetOwner();
    if (r?.IsValid()) {
      if (GlobalData_1.GlobalData.GameInstance) {
        if (this.Follow) {
          if ((o = ControllerHolder_1.ControllerHolder.GameAudioController.PostEvent(r, t, this.SocketName)) && (this.HandleMap.Set(r, o), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Audio", 56, "[Game.AnimNotifyState] PostEvent", ["EventName", t], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)], ["Owner", e.GetOwner()?.GetName()]);
          }
        } else {
          o = e.D_GetSocketTransform(this.SocketName);
          o = AudioSystem_1.AudioSystem.PostEvent(t, o);
          this.HandleMap.Set(r, o);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 56, "[Game.AnimNotifyState] PostEvent", ["EventName", t], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)], ["Owner", e.GetOwner()?.GetName()]);
          }
        }
        return;
      } else if ((o = AudioSystem_1.AudioSystem.GetAkComponent(r, {
        SocketName: this.SocketName
      }))?.IsValid()) {
        i = AudioSystem_1.AudioSystem.PostEvent(t, o);
        this.HandleMap.Set(r, i);
        return;
      } else {
        return undefined;
      }
    }
  }
}
exports.default = TsAnimNotifyStateAudioEvent;
//# sourceMappingURL=TsAnimNotifyStateAudioEvent.js.map