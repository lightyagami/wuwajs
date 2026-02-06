"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhonographController = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class PhonographController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17551, PhonographController.OnPhantomMusicNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17551);
  }
  static OnLeaveLevel() {
    ModelManager_1.ModelManager.PhonographModel.GlobalMusicId = 0;
    this.StopMusic();
    return true;
  }
  static async UnlockMusicRequest(e) {
    var r = new Protocol_1.Aki.Protocol._p_();
    r.bMs = e;
    var e = await Net_1.Net.CallAsync(23680, r);
    if (!e) {
      return false;
    }
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      const o = await UiManager_1.UiManager.OpenViewAsync("PhonographNewMusicView", {
        UnlockMusicList: [],
        CloseCallback: this.OpenView
      });
      return o !== undefined;
    }
    ModelManager_1.ModelManager.PhonographModel.NewMusicIds = e.eL_;
    const o = await UiManager_1.UiManager.OpenViewAsync("PhonographNewMusicView", {
      UnlockMusicList: e.eL_,
      CloseCallback: this.OpenView
    });
    return o !== undefined;
  }
  static SendMusicSaveRequest(e) {
    var r = new Protocol_1.Aki.Protocol.v0g();
    r.M0g = e;
    Net_1.Net.Call(15820, r, e => {
      if (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 15820);
      }
    });
  }
  static SwitchMusicRequest(r, o) {
    var e = new Protocol_1.Aki.Protocol.mp_();
    e.SPl = r;
    Net_1.Net.Call(26546, e, e => {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhonographSwitchMusicSuccess");
        ModelManager_1.ModelManager.PhonographModel.RecordMusicId = r;
        o();
      }
    });
  }
  static async GetMusicInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.up_();
    var e = await Net_1.Net.CallAsync(20696, e);
    if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
      ModelManager_1.ModelManager.PhonographModel.UnlockMusicIds = e.tL_;
      return e;
    }
    ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20696);
  }
  static PlayMusic(r, e = false) {
    if (e) {
      return this.PlayGlobalMusic(r);
    }
    var e = ModelManager_1.ModelManager.PhonographModel?.EntityActor;
    if (e?.IsValid()) {
      AudioSystem_1.AudioSystem.StopAll(e);
    }
    var o = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(r);
    if (!o) {
      return 0;
    }
    if (!e?.IsValid()) {
      return 0;
    }
    this.StopMusic(false);
    const a = AudioSystem_1.AudioSystem.PostEvent(o.MusicEvent, e, {
      CallbackMask: 1048577,
      CallbackHandler: (e, r) => {
        if (e === 0 && a === ModelManager_1.ModelManager.PhonographModel.CurrentMusicHandleId) {
          this.Dvg();
        }
      }
    });
    ModelManager_1.ModelManager.PhonographModel.CurrentMusicHandleId = a;
    ModelManager_1.ModelManager.PhonographModel.GetMusicDuration(r).then(e => {
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime = e;
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0;
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = r;
    });
    return a;
  }
  static PlayGlobalMusic(r, e = false) {
    if (r === 0) {
      this.StopMusic(false);
      return 0;
    }
    if (r === ModelManager_1.ModelManager.PhonographModel.GlobalMusicId && !e) {
      return 0;
    }
    e = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(r);
    if (!e) {
      return 0;
    }
    this.StopMusic(false);
    AudioSystem_1.AudioSystem.SetRtpcValue("phonograph_switch_to_2d", 1);
    const o = AudioSystem_1.AudioSystem.PostEvent(e.MusicEvent, undefined, {
      CallbackMask: 1048577,
      CallbackHandler: (e, r) => {
        if (e === 0 && o === ModelManager_1.ModelManager.PhonographModel.CurrentMusicHandleId) {
          this.Dvg();
        }
      }
    });
    ModelManager_1.ModelManager.PhonographModel.CurrentMusicHandleId = o;
    ModelManager_1.ModelManager.PhonographModel.GetMusicDuration(r).then(e => {
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime = e;
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0;
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = r;
    });
    return o;
  }
  static Dvg() {
    if (ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId !== 0 && ModelManager_1.ModelManager.PhonographModel.IsGlobal) {
      this.PlayGlobalMusic(ModelManager_1.ModelManager.PhonographModel.GlobalMusicId, true);
    } else {
      this.StopMusic();
    }
  }
  static StopMusic(e = true) {
    AudioSystem_1.AudioSystem.SetRtpcValue("phonograph_switch_to_2d", 0);
    var r = ModelManager_1.ModelManager.PhonographModel?.EntityActor;
    if (r?.IsValid()) {
      AudioSystem_1.AudioSystem.StopAll(r);
    }
    if (ModelManager_1.ModelManager.PhonographModel.CurrentMusicHandleId) {
      AudioSystem_1.AudioSystem.ExecuteAction(ModelManager_1.ModelManager.PhonographModel.CurrentMusicHandleId, 0);
      ModelManager_1.ModelManager.PhonographModel.CurrentMusicHandleId = 0;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographPlayStop);
    ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId = 0;
    ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTime = 0;
    ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicTotalTime = 0;
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhonographSwitchMusic);
    }
  }
  static PlayMusicByEntityId(e) {
    var r;
    var o;
    var a = ModelManager_1.ModelManager.PhonographModel.GetPlayIdRecord(e);
    if (a !== 0) {
      AudioSystem_1.AudioSystem.ExecuteAction(a, 0);
    }
    var a = ModelManager_1.ModelManager.PhonographModel.GetRecordMusicId(e);
    if (a !== 0 && (a = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(a)) && (o = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e)) && (r = o.Entity?.CheckGetComponent(1))) {
      o = AudioSystem_1.AudioSystem.PostEvent(a.MusicEvent, r.Owner);
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
(exports.PhonographController = PhonographController).OnPhantomMusicNotify = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Audio", 58, "Server Notify Post Audio", ["musicId", e.M0g]);
  }
  ModelManager_1.ModelManager.PhonographModel.GlobalMusicId = e.M0g;
  PhonographController.PlayGlobalMusic(e.M0g, true);
};
PhonographController.OpenView = () => {
  UiManager_1.UiManager.OpenView("PhonographView");
}; //# sourceMappingURL=PhonographController.js.map