"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMusicPlayerController = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
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
class MotorcycleMusicPlayerController extends ControllerBase_1.ControllerBase {
  static async GetMusicInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.up_();
    var e = await Net_1.Net.CallAsync(20696, e);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20696);
    } else {
      this.JJm = e.Lzm;
      ModelManager_1.ModelManager.PhonographModel.UnlockMusicIds = e.tL_;
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetFavoriteMusicList(e.Lzm);
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
    this.Pef();
    this.Ezf();
    this.XAg();
    return true;
  }
  static async mCf() {
    var e;
    var t;
    var r = ModelManager_1.ModelManager.PhonographModel.GetUnlockItemIds();
    if (r.length !== 0 && (r = await this.UnlockMusicRequest(r), await this.GetMusicInfoRequest(), r) && r.length > 0) {
      t = (e = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel).GetUnlockMusicByAlbum(e.GetCurPlayAlbum()).map(e => e.Id);
      e.SetPlayList(t);
      e.AddMusicListToNew(r);
      UiManager_1.UiManager.OpenView("MotorMusicNewMusicTips", r);
    }
  }
  static Pef() {
    if (this.Uef) {
      TimerSystem_1.TimerSystem.Remove(this.Uef);
      this.Uef = undefined;
    }
  }
  static async UnlockMusicRequest(e) {
    var t = new Protocol_1.Aki.Protocol._p_();
    t.bMs = e;
    var e = await Net_1.Net.CallAsync(23680, t);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25913);
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
    return !!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable && !!this.Yyf || (e && ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorMusicTips08"), false);
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
        const a = AudioSystem_1.AudioSystem.PostEvent(r.MusicEvent, Global_1.Global.CharacterCameraManager, {
          CallbackMask: 1048577,
          CallbackHandler: (e, t) => {
            if (e === 0 && a === this.xDm) {
              this.Dvg();
            }
          }
        });
        ModelManager_1.ModelManager.PhonographModel.GetMusicDuration(t).then(e => {
          i.CurrentPlayMusicTotalTime = Math.trunc(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorSwitchMusic);
        });
        this.sye = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorSwitchMusic);
        this.xDm = a;
        AudioSystem_1.AudioSystem.SetState("system_motor_radio", "playing");
        r = new LogReportDefine_1.MotorcycleMusicPlayLogEvent();
        r.i_item_id = t;
        r.i_album_id = e;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r);
      }
    }
  }
  static StopMusic() {
    var e = this.xDm;
    this.xDm = -1;
    this.sye = false;
    if (e !== -1) {
      AudioSystem_1.AudioSystem.ExecuteAction(e, 0);
    }
    ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.CurrentPlayMusicTotalTime = 0;
    AudioSystem_1.AudioSystem.SetState("system_motor_radio", "none");
  }
  static GetCurrentPlayTimeFromAudio() {
    var e;
    if (this.xDm === -1 || (e = AudioSystem_1.AudioSystem.GetSourcePlayPosition(this.xDm)) === undefined) {
      return 0;
    } else {
      return Math.floor(e * CommonDefine_1.SECOND_PER_MILLIONSECOND);
    }
  }
  static Jsf(e) {
    if (this.sye) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.xDm, 1, {
        TransitionDuration: e
      });
      this.sye = false;
      AudioSystem_1.AudioSystem.SetState("system_motor_radio", "none");
    }
  }
  static PauseMusic() {
    if (this.CheckIsEnable(true) && this.xDm !== -1) {
      this.Jsf(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeOutTime());
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetIsPause(true);
    }
  }
  static ResumeMusic() {
    if (this.CheckIsEnable(true) && this.xDm !== -1) {
      this.fCf(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeInTime());
    }
  }
  static fCf(e) {
    if (!this.sye) {
      e = e ?? ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeInTime();
      AudioSystem_1.AudioSystem.ExecuteAction(this.xDm, 2, {
        TransitionDuration: e
      });
      this.sye = true;
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetIsPause(false);
      AudioSystem_1.AudioSystem.SetState("system_motor_radio", "playing");
    }
  }
  static QuickPlayMusic(t = true) {
    if (this.CheckIsEnable(true)) {
      const o = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
      var r = o.GetCurPlayAlbum();
      if (o.GetCurrentPlayList().length === 0) {
        this.PlayAlbumMusic(o.GetCurPlayAlbum(), o.GetCurPlayMusicId());
      } else {
        switch (o.GetPlayMode()) {
          case 0:
          case 2:
            var i = o.GetCurrentPlayList();
            var a = i.findIndex(e => e === o.GetCurPlayMusicId());
            if (a !== -1) {
              let e = 0;
              e = t ? (a + 1) % i.length : (a - 1 + i.length) % i.length;
              this.PlayAlbumMusic(r, i[e]);
            } else if (i.length > 0) {
              this.PlayAlbumMusic(r, i[0]);
            }
            break;
          case 1:
            if (t) {
              this.qDm(r);
            } else {
              if ((a = o.GetPrevMusicId()) === -1) {
                this.qDm(r);
              } else {
                this.PlayAlbumMusic(r, a);
              }
              o.ClearPrevMusicId();
            }
        }
      }
    }
  }
  static qDm(e) {
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
  static Dvg() {
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
    const r = this.JJm;
    var e;
    var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetFavoriteMusicList();
    if (t.length !== r.length || !t.every((e, t) => e === r[t])) {
      (e = Protocol_1.Aki.Protocol.bzm.create()).Lzm = Array.from(t);
      this.JJm = e.Lzm;
      Net_1.Net.Call(29560, e, e => {
        if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18522);
        }
      });
    }
  }
  static FSg(e, t) {
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
    this.FSg(() => {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IncreaseDisableCount();
    });
  }
  static PopAreaDisableCount() {
    this.FSg(() => {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.DecreaseDisableCount();
    }, () => !ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable);
  }
  static SetFunctionEnable(e) {
    this.FSg(() => {
      ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.SetFunctionEnable(e);
    });
  }
  static IRl() {
    var e = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel;
    var t = e.IsEnable;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorMusicEnableStateChanged, t);
    if (this.Yyf) {
      if (!t && this.sye) {
        this.Jsf(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetInterruptFadeOutTime());
      } else if (t && !e.GetIsPause()) {
        this.fCf(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetRestartFadeInTime());
      }
    }
  }
  static RequestToggleMusicFavorite(e) {
    return !!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.ToggleMusicFavorite(e) && (this.Izf(), true);
  }
  static Izf() {
    if (this.Tzf) {
      TimerSystem_1.TimerSystem.Remove(this.Tzf);
      this.Tzf = undefined;
    }
    this.Tzf = TimerSystem_1.TimerSystem.Delay(() => {
      this.SendFavoriteUpdateRequest();
      this.Tzf = undefined;
    }, DELAY_SEND_FAVORITE_UPDATE_REQUEST_TIME);
  }
  static Ezf() {
    if (this.Tzf) {
      TimerSystem_1.TimerSystem.Remove(this.Tzf);
      this.Tzf = undefined;
    }
  }
  static XAg() {
    if (this.YAg) {
      TimerSystem_1.TimerSystem.Remove(this.YAg);
      this.YAg = undefined;
    }
  }
}
exports.MotorcycleMusicPlayerController = MotorcycleMusicPlayerController;
(_a = MotorcycleMusicPlayerController).xDm = -1;
MotorcycleMusicPlayerController.JJm = [];
MotorcycleMusicPlayerController.Uef = undefined;
MotorcycleMusicPlayerController.sye = false;
MotorcycleMusicPlayerController.Yyf = false;
MotorcycleMusicPlayerController.Tzf = undefined;
MotorcycleMusicPlayerController.YAg = undefined;
MotorcycleMusicPlayerController.Bef = () => {
  if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() === -1 || _a.xDm === -1) {
    _a.PlayDefaultMusic();
  } else if (!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
    _a.ResumeMusic();
  }
  _a.Uef = undefined;
};
MotorcycleMusicPlayerController.M6l = e => {
  if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098) && e.IsDriver && e.VehicleType === "Motorcycle" && e.IsRolePassenger(true)) {
    if (_a.YAg) {
      _a.XAg();
    } else {
      _a.Yyf = true;
      _a.mCf();
      AudioSystem_1.AudioSystem.SetRtpcValue("phonograph_switch_to_2d", 1);
      _a.Pef();
      if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable) {
        _a.Uef = TimerSystem_1.TimerSystem.Delay(_a.Bef, ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetStartDelay());
      }
    }
  }
};
MotorcycleMusicPlayerController.E6l = e => {
  if (ModelManager_1.ModelManager.FunctionModel?.IsOpen(10098) && e.IsDriver && e.VehicleType === "Motorcycle" && e.IsRolePassenger(true)) {
    _a.XAg();
    _a.YAg = TimerSystem_1.TimerSystem.Next(() => {
      _a.YAg = undefined;
      _a.Yyf = false;
      _a.Pef();
      AudioSystem_1.AudioSystem.SetRtpcValue("phonograph_switch_to_2d", 0);
      if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable && !ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause()) {
        _a.Jsf(ConfigManager_1.ConfigManager.MotorMusicPlayerConfig.GetFadeOutTime());
      }
    });
  }
};
MotorcycleMusicPlayerController.Wvi = () => {
  _a.GetMusicInfoRequest();
  ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.LoadLocalStorageData();
};
MotorcycleMusicPlayerController.loo = () => {
  _a.StopMusic();
}; //# sourceMappingURL=MotorcycleMusicPlayerController.js.map