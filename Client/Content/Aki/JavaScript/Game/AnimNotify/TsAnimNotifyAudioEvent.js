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
class TsAnimNotifyAudioEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.AudioEvent = undefined;
    this.SocketName = undefined;
    this.Follow = true;
    this.TagProbabilityInfo = undefined;
  }
  Constructor() {}
  GetNotifyName() {
    if (this.AudioEvent) {
      return "AudioEvent: " + (0, AudioSystem_1.parseAudioEventPath)(this.AudioEvent);
    } else {
      return "AudioEvent";
    }
  }
  K2_Notify(t, i) {
    if (!this.AudioEvent) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Audio", 56, "[Game.AnimNotify] 无效的 AudioEvent", ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
      }
      return false;
    }
    let e = this.AudioEvent.ToAssetPathName();
    var o;
    var r = t.GetOuter();
    if (Info_1.Info.IsGameRunning()) {
      if (r instanceof TsBaseCharacter_1.default) {
        r = r.CharacterActorComponent?.GetReplaceEffect(e);
        e = r ?? e;
      }
    } else {
      e = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(e);
    }
    var r = (0, AudioSystem_1.parseAudioEventPath)(e);
    if (r) {
      let e = true;
      if (!(e = t.GetOwner()?.IsA(UE.TsBaseCharacter_C.StaticClass()) && (o = t.GetOwner().CharacterActorComponent?.Entity) ? ModelManager_1.ModelManager.GameAudioModel?.CheckAudioProbabilityInfo(o.Id, r, this.TagProbabilityInfo) ?? false : e)) {
        return true;
      }
      this.PostAudioEvent(r, t, i);
    }
    return true;
  }
  PostAudioEvent(e, t, i) {
    var o;
    var r = t.GetOwner();
    if (r?.IsValid()) {
      if (r instanceof TsBaseCharacter_1.default) {
        if (r.GetEntityNoBlueprint()?.GetComponent(205)?.HasTag(1654452863)) {
          return;
        }
      }
      if (!GlobalData_1.GlobalData.GameInstance) {
        if ((o = AudioSystem_1.AudioSystem.GetAkComponent(r, {
          SocketName: this.SocketName
        }))?.IsValid()) {
          AudioSystem_1.AudioSystem.PostEvent(e, o);
          return;
        } else {
          return undefined;
        }
      }
      if (this.Follow) {
        if (ControllerHolder_1.ControllerHolder.GameAudioController.GetAkComponent(r, this.SocketName)?.IsValid() && (o = ControllerHolder_1.ControllerHolder.GameAudioController.PostEvent(r, e, this.SocketName), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Audio", 56, "[Game.AnimNotify] PostEvent", ["EventName", e], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
        }
      } else {
        r = t.D_GetSocketTransform(this.SocketName);
        o = AudioSystem_1.AudioSystem.PostEvent(e, r);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 56, "[Game.AnimNotify] PostEvent", ["EventName", e], ["Handle", o], ["AnimNotify", this.GetName()], ["AnimSequence", UE.KismetSystemLibrary.GetPathName(i)]);
        }
      }
    }
  }
}
exports.default = TsAnimNotifyAudioEvent;
//# sourceMappingURL=TsAnimNotifyAudioEvent.js.map