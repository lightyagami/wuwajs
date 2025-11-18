"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographController = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class PhonographController extends UiControllerBase_1.UiControllerBase {
  static async UnlockMusicRequest(e) {
    var r = new Protocol_1.Aki.Protocol._p_();
    r.bMs = e;
    var e = await Net_1.Net.CallAsync(19309, r);
    if (!e) {
      return false;
    }
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      const o = await UiManager_1.UiManager.OpenViewAsync("PhonographNewMusicView", []);
      return o !== undefined;
    }
    ModelManager_1.ModelManager.PhonographModel.NewMusicIds = e.eL_;
    const o = await UiManager_1.UiManager.OpenViewAsync("PhonographNewMusicView", e.eL_);
    return o !== undefined;
  }
  static SwitchMusicRequest(r, o) {
    var e = new Protocol_1.Aki.Protocol.mp_();
    e.SPl = r;
    Net_1.Net.Call(17716, e, e => {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhonographSwitchMusicSuccess");
        ModelManager_1.ModelManager.PhonographModel.RecordMusicId = r;
        o();
      }
    });
  }
  static async GetMusicInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.up_();
    var e = await Net_1.Net.CallAsync(26661, e);
    if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
      ModelManager_1.ModelManager.PhonographModel.UnlockMusicIds = e.tL_;
      return e;
    }
    ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26661);
  }
  static PlayMusic(e, r = true) {
    var o = ModelManager_1.ModelManager.PhonographModel?.EntityActor;
    if (PhonographController.PlayMusicTimer && (TimerSystem_1.TimerSystem.Remove(PhonographController.PlayMusicTimer), PhonographController.PlayMusicTimer = undefined, o?.IsValid())) {
      AudioSystem_1.AudioSystem.StopAll(o);
    }
    var n = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e);
    if (!n) {
      return 0;
    }
    if (!o?.IsValid()) {
      return 0;
    }
    this.StopMusic(false);
    o = AudioSystem_1.AudioSystem.PostEvent(n.MusicEvent, o);
    if (r) {
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime = n.Duration;
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0;
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = e;
      PhonographController.PlayMusicTimer = TimerSystem_1.TimerSystem.Forever(() => {
        ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime += 1;
        if (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime >= ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime) {
          PhonographController.StopMusic();
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographPlayTick);
      }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
    }
    return o;
  }
  static StopMusic(e = true) {
    var r = ModelManager_1.ModelManager.PhonographModel?.EntityActor;
    if (r?.IsValid()) {
      AudioSystem_1.AudioSystem.StopAll(r);
    }
    if (PhonographController.PlayMusicTimer) {
      TimerSystem_1.TimerSystem.Remove(PhonographController.PlayMusicTimer);
      PhonographController.PlayMusicTimer = undefined;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographPlayStop);
    ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = 0;
    ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0;
    ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime = 0;
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographSwitchMusic);
    }
  }
  static ClearTimer() {
    if (PhonographController.PlayMusicTimer) {
      TimerSystem_1.TimerSystem.Remove(PhonographController.PlayMusicTimer);
      PhonographController.PlayMusicTimer = undefined;
    }
  }
  static PlayMusicByEntityId(e) {
    var r;
    var o;
    var n = ModelManager_1.ModelManager.PhonographModel.GetPlayIdRecord(e);
    if (n !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(n, 0);
    }
    var n = ModelManager_1.ModelManager.PhonographModel.GetRecordMusicId(e);
    if (n !== 0 && (n = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(n)) && (o = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e)) && (r = o.Entity?.CheckGetComponent(1))) {
      o = AudioSystem_1.AudioSystem.PostEvent(n.MusicEvent, r.Owner);
      ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(e, o);
    }
  }
  static StopMusicByEntityId(e) {
    var r = ModelManager_1.ModelManager.PhonographModel.GetPlayIdRecord(e);
    if (r !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(r, 0);
      ModelManager_1.ModelManager.PhonographModel.RemovePlayIdRecord(e);
    }
  }
}
(exports.PhonographController = PhonographController).PlayMusicTimer = undefined;
//# sourceMappingURL=PhonographController.js.map