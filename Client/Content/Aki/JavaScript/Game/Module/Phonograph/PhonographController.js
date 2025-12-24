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
    var o = new Protocol_1.Aki.Protocol._p_();
    o.bMs = e;
    var e = await Net_1.Net.CallAsync(19309, o);
    if (!e) {
      return false;
    }
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      const r = await UiManager_1.UiManager.OpenViewAsync("PhonographNewMusicView", {
        UnlockMusicList: [],
        CloseCallback: this.OpenView
      });
      return r !== undefined;
    }
    ModelManager_1.ModelManager.PhonographModel.NewMusicIds = e.eL_;
    const r = await UiManager_1.UiManager.OpenViewAsync("PhonographNewMusicView", {
      UnlockMusicList: e.eL_,
      CloseCallback: this.OpenView
    });
    return r !== undefined;
  }
  static SwitchMusicRequest(o, r) {
    var e = new Protocol_1.Aki.Protocol.mp_();
    e.SPl = o;
    Net_1.Net.Call(17716, e, e => {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhonographSwitchMusicSuccess");
        ModelManager_1.ModelManager.PhonographModel.RecordMusicId = o;
        r();
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
  static PlayMusic(o, e = true) {
    var r = ModelManager_1.ModelManager.PhonographModel?.EntityActor;
    if (PhonographController.PlayMusicTimer && (TimerSystem_1.TimerSystem.Remove(PhonographController.PlayMusicTimer), PhonographController.PlayMusicTimer = undefined, r?.IsValid())) {
      AudioSystem_1.AudioSystem.StopAll(r);
    }
    var n = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(o);
    if (!n) {
      return 0;
    }
    if (!r?.IsValid()) {
      return 0;
    }
    this.StopMusic(false);
    n = AudioSystem_1.AudioSystem.PostEvent(n.MusicEvent, r);
    if (e) {
      ModelManager_1.ModelManager.PhonographModel.GetMusicDuration(o).then(e => {
        ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime = e;
        ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0;
        ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = o;
        if (PhonographController.PlayMusicTimer) {
          TimerSystem_1.TimerSystem.Remove(PhonographController.PlayMusicTimer);
          PhonographController.PlayMusicTimer = undefined;
        }
        PhonographController.PlayMusicTimer = TimerSystem_1.TimerSystem.Forever(() => {
          ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime += 1;
          if (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime >= ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime) {
            PhonographController.StopMusic();
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographPlayTick);
        }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
      });
    }
    return n;
  }
  static StopMusic(e = true) {
    var o = ModelManager_1.ModelManager.PhonographModel?.EntityActor;
    if (o?.IsValid()) {
      AudioSystem_1.AudioSystem.StopAll(o);
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
    var o;
    var r;
    var n = ModelManager_1.ModelManager.PhonographModel.GetPlayIdRecord(e);
    if (n !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(n, 0);
    }
    var n = ModelManager_1.ModelManager.PhonographModel.GetRecordMusicId(e);
    if (n !== 0 && (n = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(n)) && (r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e)) && (o = r.Entity?.CheckGetComponent(1))) {
      r = AudioSystem_1.AudioSystem.PostEvent(n.MusicEvent, o.Owner);
      ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(e, r);
    }
  }
  static StopMusicByEntityId(e) {
    var o = ModelManager_1.ModelManager.PhonographModel.GetPlayIdRecord(e);
    if (o !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(o, 0);
      ModelManager_1.ModelManager.PhonographModel.RemovePlayIdRecord(e);
    }
  }
}
(exports.PhonographController = PhonographController).PlayMusicTimer = undefined;
PhonographController.OpenView = () => {
  UiManager_1.UiManager.OpenView("PhonographView");
}; //# sourceMappingURL=PhonographController.js.map