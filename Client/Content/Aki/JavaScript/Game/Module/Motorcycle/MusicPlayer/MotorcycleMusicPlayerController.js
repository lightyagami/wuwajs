"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMusicPlayerController = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Time_1 = require("../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const DELAY_SEND_FAVORITE_UPDATE_REQUEST_TIME = 1000;
const CHECK_UNLOCK_MUSIC_TIME = 200;
class MotorcycleMusicPlayerController extends ControllerBase_1.ControllerBase {
  static async GetMusicInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.up_();
    var e = await Net_1.Net.CallAsync(26661, e);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26661);
    } else {
      this.wYm = e.cXm;
      ModelManager_1.ModelManager.PhonographModel.UnlockMusicIds = e.tL_;
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetFavoriteMusicList(e.cXm);
    }
  }
  static OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.Wvi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.loo);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetPlayerBasicInfo, this.Wvi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.loo);
    this.Qzm();
    this.h6f();
    return true;
  }
  static async kff() {
    var e;
    var t;
    var r;
    if (!(Time_1.Time.SystemNow - this.eWf < CHECK_UNLOCK_MUSIC_TIME)) {
      if ((e = ModelManager_1.ModelManager.PhonographModel.GetUnlockItemIds()).length !== 0 && (e = await this.UnlockMusicRequest(e), await this.GetMusicInfoRequest(), e) && e.length > 0) {
        r = (t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel).GetUnlockMusicByAlbum(t.GetCurPlayAlbum()).map(e => e.Id);
        t.SetPlayList(r);
        t.AddMusicListToNew(e);
        UiManager_1.UiManager.OpenView("MotorMusicNewMusicTips", e);
      }
    }
  }
  static Qzm() {
    if (this.Xzm) {
      TimerSystem_1.TimerSystem.Remove(this.Xzm);
      this.Xzm = undefined;
    }
  }
  static async UnlockMusicRequest(e) {
    var t = new Protocol_1.Aki.Protocol._p_();
    t.bMs = e;
    var e = await Net_1.Net.CallAsync(19309, t);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15522);
        return [];
      } else {
        ModelManager_1.ModelManager.PhonographModel.NewMusicIds = e.eL_;
        return e.eL_;
      }
    } else {
      return [];
    }
  }
  static CheckIsEnable(e = false) {
    return !!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable && !!this.dpf || (e && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips08"), false);
  }
  static OpenMusicPlayerView() {
    if (this.CheckIsEnable(true)) {
      UiManager_1.UiManager.OpenView("MotorcycleMusicPlayerView");
    }
  }
  static PlayDefaultMusic() {
    let e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleCurPlayAlbumId);
    let t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.MotorcycleCurPlayMusicId);
    var r = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
    if (e === undefined) {
      e = ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetDefaultAlbumId();
    }
    var i = r.GetUnlockMusicByAlbum(e).map(e => e.Id);
    if (t === undefined) {
      t = i[0];
    }
    r.SetPlayList(i);
    this.PlayAlbumMusic(e, t);
  }
  static PlayAlbumMusic(e, t) {
    if (this.CheckIsEnable(true)) {
      const i = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
      if (i.IsMusicNew(t)) {
        i.ClearMusicNew(t);
      }
      i.SetCurPlayMusic(e, t);
      var r = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(t);
      if (r) {
        this.StopMusic();
        const o = AudioSystem_1.AudioSystem.PostEvent(r.MusicEvent, Global_1.Global.CharacterCameraManager, {
          CallbackMask: 1048577,
          CallbackHandler: (e, t) => {
            if (e === 0 && o === this.fPm) {
              this.sZf();
            }
          }
        });
        ModelManager_1.ModelManager.PhonographModel.GetMusicDuration(t).then(e => {
          i.CurrentPlayMusicTotalTime = Math.trunc(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorSwitchMusic);
        });
        this.sye = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorSwitchMusic);
        this.fPm = o;
        AudioSystem_1.AudioSystem.SetState("system_motor_radio", "playing");
        r = new LogReportDefine_1.MotorcycleMusicPlayLogEvent();
        r.i_item_id = t;
        r.i_album_id = e;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
      }
    }
  }
  static StopMusic() {
    var e = this.fPm;
    this.fPm = -1;
    this.sye = false;
    if (e !== -1) {
      AudioSystem_1.AudioSystem.ExecuteAction(e, 0);
    }
    ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.CurrentPlayMusicTotalTime = 0;
    AudioSystem_1.AudioSystem.SetState("system_motor_radio", "none");
  }
  static GetCurrentPlayTimeFromAudio() {
    var e;
    if (this.fPm === -1 || (e = AudioSystem_1.AudioSystem.GetSourcePlayPosition(this.fPm)) === undefined) {
      return 0;
    } else {
      return Math.floor(e * CommonDefine_1.SECOND_PER_MILLIONSECOND);
    }
  }
  static Aof(e) {
    if (this.sye) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.fPm, 1, {
        TransitionDuration: e
      });
      this.sye = false;
      AudioSystem_1.AudioSystem.SetState("system_motor_radio", "none");
    }
  }
  static PauseMusic() {
    if (this.CheckIsEnable(true) && this.fPm !== -1) {
      this.Aof(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeOutTime());
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetIsPause(true);
    }
  }
  static ResumeMusic() {
    if (this.CheckIsEnable(true) && this.fPm !== -1) {
      this.qff(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeInTime());
    }
  }
  static qff(e) {
    if (!this.sye) {
      e = e ?? ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeInTime();
      AudioSystem_1.AudioSystem.ExecuteAction(this.fPm, 2, {
        TransitionDuration: e
      });
      this.sye = true;
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetIsPause(false);
      AudioSystem_1.AudioSystem.SetState("system_motor_radio", "playing");
    }
  }
  static QuickPlayMusic(t = true) {
    if (this.CheckIsEnable(true)) {
      const a = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
      var r = a.GetCurPlayAlbum();
      if (a.GetCurrentPlayList().length === 0) {
        this.PlayAlbumMusic(a.GetCurPlayAlbum(), a.GetCurPlayMusicId());
      } else {
        switch (a.GetPlayMode()) {
          case 0:
          case 2:
            var i = a.GetCurrentPlayList();
            var o = i.findIndex(e => e === a.GetCurPlayMusicId());
            if (o !== -1) {
              let e = 0;
              e = t ? (o + 1) % i.length : (o - 1 + i.length) % i.length;
              this.PlayAlbumMusic(r, i[e]);
            } else if (i.length > 0) {
              this.PlayAlbumMusic(r, i[0]);
            }
            break;
          case 1:
            if (t) {
              this.pPm(r);
            } else {
              if ((o = a.GetPrevMusicId()) === -1) {
                this.pPm(r);
              } else {
                this.PlayAlbumMusic(r, o);
              }
              a.ClearPrevMusicId();
            }
        }
      }
    }
  }
  static pPm(e) {
    const t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
    var r = Array.from(t.GetCurrentPlayList());
    if (r.length > 1 && (i = r.findIndex(e => e === t.GetCurPlayMusicId())) !== -1) {
      r.splice(i, 1);
    }
    var i = MathUtils_1.MathUtils.GetRandomItem(r);
    if (i) {
      this.PlayAlbumMusic(e, i);
    }
  }
  static sZf() {
    var e;
    if (this.sye) {
      if ((e = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel).GetPlayMode() !== 2) {
        this.QuickPlayMusic();
      } else {
        this.PlayAlbumMusic(e.GetCurPlayAlbum(), e.GetCurPlayMusicId());
      }
    } else {
      this.StopMusic();
    }
  }
  static SendFavoriteUpdateRequest() {
    const r = this.wYm;
    var e;
    var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList();
    if (t.length !== r.length || !t.every((e, t) => e === r[t])) {
      (e = Protocol_1.Aki.Protocol.lXm.create()).cXm = Array.from(t);
      this.wYm = e.cXm;
      Net_1.Net.Call(26662, e, e => {
        if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20837);
        }
      });
    }
  }
  static BZf(e, t) {
    var r = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
    if (!t || !!t()) {
      t = r.IsEnable;
      e();
      if (t !== r.IsEnable) {
        this.IRl();
      }
    }
  }
  static PushAreaDisableCount() {
    this.BZf(() => {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IncreaseDisableCount();
    });
  }
  static PopAreaDisableCount() {
    this.BZf(() => {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.DecreaseDisableCount();
    }, () => !ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable);
  }
  static SetFunctionEnable(e) {
    this.BZf(() => {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetFunctionEnable(e);
    });
  }
  static IRl() {
    var e = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
    var t = e.IsEnable;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorMusicEnableStateChanged, t);
    if (this.dpf) {
      if (!t && this.sye) {
        this.Aof(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetInterruptFadeOutTime());
      } else if (t && !e.GetIsPause()) {
        this.qff(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetRestartFadeInTime());
      }
    }
  }
  static RequestToggleMusicFavorite(e) {
    return !!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.ToggleMusicFavorite(e) && (this.l6f(), true);
  }
  static l6f() {
    if (this._6f) {
      TimerSystem_1.TimerSystem.Remove(this._6f);
      this._6f = undefined;
    }
    this._6f = TimerSystem_1.TimerSystem.Delay(() => {
      this.SendFavoriteUpdateRequest();
      this._6f = undefined;
    }, DELAY_SEND_FAVORITE_UPDATE_REQUEST_TIME);
  }
  static h6f() {
    if (this._6f) {
      TimerSystem_1.TimerSystem.Remove(this._6f);
      this._6f = undefined;
    }
  }
}
exports.MotorcycleMusicPlayerController = MotorcycleMusicPlayerController;
(_a = MotorcycleMusicPlayerController).fPm = -1;
MotorcycleMusicPlayerController.wYm = [];
MotorcycleMusicPlayerController.Xzm = undefined;
MotorcycleMusicPlayerController.sye = false;
MotorcycleMusicPlayerController.dpf = false;
MotorcycleMusicPlayerController._6f = undefined;
MotorcycleMusicPlayerController.eWf = 0;
MotorcycleMusicPlayerController.zzm = () => {
  if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() === -1 || _a.fPm === -1) {
    _a.PlayDefaultMusic();
  } else if (!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
    _a.ResumeMusic();
  }
  _a.Xzm = undefined;
};
MotorcycleMusicPlayerController.M6l = e => {
  if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098) && e.IsDriver && e.VehicleType === "Motorcycle" && (_a.dpf = true, _a.kff(), AudioSystem_1.AudioSystem.SetRtpcValue("phonograph_switch_to_2d", 1), _a.Qzm(), ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable)) {
    _a.Xzm = TimerSystem_1.TimerSystem.Delay(_a.zzm, ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetStartDelay());
  }
};
MotorcycleMusicPlayerController.E6l = e => {
  if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098) && e.IsDriver && e.VehicleType === "Motorcycle" && (_a.dpf = false, _a.eWf = Time_1.Time.SystemNow, _a.Qzm(), AudioSystem_1.AudioSystem.SetRtpcValue("phonograph_switch_to_2d", 0), ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable) && !ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
    _a.Aof(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeOutTime());
  }
};
MotorcycleMusicPlayerController.Wvi = () => {
  _a.GetMusicInfoRequest();
  ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.LoadLocalStorageData();
};
MotorcycleMusicPlayerController.loo = () => {
  _a.StopMusic();
}; //# sourceMappingURL=MotorcycleMusicPlayerController.js.map