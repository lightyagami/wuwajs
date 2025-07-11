"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDecodeViewV2 = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const FailedFinishPanel_1 = require("./FailedFinishPanel");
const PausePanel_1 = require("./PausePanel");
const SignalMovePanel_1 = require("./SignalMovePanel");
const SuccessFinishPanel_1 = require("./SuccessFinishPanel");
const COUNTDOWN_SEQUENCENAME = "Counter";
const NIAGARA_ORANGE_COLOR = "FF400FFF";
const COUNTDOWN_AUDIO_EVENTNAME = "SignalDecodeGame_count_down";
const COUNTDOWNEND_AUDIO_EVENTNAME = "SignalDecodeGame_count_down_End";
const BG_NOISE_AUDIO_EVENTNAME = "SignalDecodeGame_play_base_noise";
const BG_NOISE_STOP_AUDIO_EVENTNAME = "SignalDecodeGame_stop_base_noise";
const BG_BGM_AUDIO_EVENTNAME = "SignalDecodeGame_music_play_BGM";
const BG_BGM_AUDIO_PAUSE_EVENTNAME = "SignalDecodeGame_music_pause_BGM";
const BG_BGM_AUDIO_RESUME_EVENTNAME = "SignalDecodeGame_music_resume_BGM";
const BG_BGM_STOP_AUDIO_EVENTNAME = "SignalDecodeGame_music_stop_BGM";
const PLAYER_CATCHDOWN_AUDIO_EVENTNAME = "SignalDecodeGame_play_press_loop";
const PLAYER_CATCHUP_AUDIO_EVENTNAME = "SignalDecodeGame_stop_press_loop";
const PLAYER_CATCHSUCCESS_AUDIO_EVENTNAME = "SignalDecodeGame_release_correct";
const PLAYER_CATCHFAILED_AUDIO_EVENTNAME = "SignalDecodeGame_release_error";
const PLAYER_CATCHFAILED2_AUDIO_EVENTNAME = "SignalDecodeGame_music_play_presserror";
class SignalDecodeViewV2 extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.wMo = undefined;
    this.BMo = undefined;
    this.bMo = undefined;
    this.qMo = undefined;
    this.GMo = undefined;
    this.NMo = undefined;
    this.OMo = undefined;
    this.kMo = undefined;
    this.FMo = new AudioController_1.PlayResult();
    this.VMo = new AudioController_1.PlayResult();
    this.HMo = new AudioController_1.PlayResult();
    this.jMo = new AudioController_1.PlayResult();
    this.WMo = new AudioController_1.PlayResult();
    this.KMo = new AudioController_1.PlayResult();
    this.QMo = new AudioController_1.PlayResult();
    this.XMo = new AudioController_1.PlayResult();
    this.LevelSequencePlayer = undefined;
    this.Dai = 0;
    this.$Mo = false;
    this.YMo = false;
    this.JMo = () => {
      var e = this.GetUiNiagara(12);
      e.SetNiagaraSystem(this.NMo);
      e.SetNiagaraUIActive(true, false);
      e.ActivateSystem(true);
    };
    this.zMo = () => {
      this.ZMo();
      var e = this.GetUiNiagara(12);
      e.SetNiagaraSystem(this.NMo);
      e.SetNiagaraUIActive(false, false);
      e.DeactivateSystem();
      var e = this.GetUiNiagara(11);
      e.SetNiagaraSystem(this.GMo);
      e.SetNiagaraUIActive(true, false);
      e.ActivateSystem(true);
      this.XZi(PLAYER_CATCHSUCCESS_AUDIO_EVENTNAME, this.QMo);
    };
    this.eEo = () => {
      this.tEo();
      this.$Mo = true;
      var e = this.GetUiNiagara(12);
      e.SetNiagaraSystem(this.kMo);
      e.SetNiagaraUIActive(false, false);
      e.DeactivateSystem();
      var e = this.GetUiNiagara(11);
      e.SetNiagaraSystem(this.OMo);
      e.SetNiagaraUIActive(true, false);
      e.ActivateSystem(true);
      TimerSystem_1.TimerSystem.Delay(() => {
        this.$Mo = false;
        this.ZMo();
      }, 1000);
      let i = PLAYER_CATCHFAILED_AUDIO_EVENTNAME;
      if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
        i = PLAYER_CATCHFAILED2_AUDIO_EVENTNAME;
      }
      this.XZi(i, this.XMo);
    };
    this.iEo = () => {
      this.BMo.Hide();
      this.oEo(2);
    };
    this.rEo = () => {
      this.BMo.Hide();
      this.wMo.StartAgain();
      this.oEo(2, true);
    };
    this.yct = e => {
      if (e === COUNTDOWN_SEQUENCENAME) {
        this.oEo(2, true);
      }
    };
    this.Tct = (e, i) => {
      var t;
      if (e === COUNTDOWN_SEQUENCENAME) {
        e = this.GetText(2);
        if (i === "开始") {
          t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("Start");
          e.SetText(t);
          this.XZi(COUNTDOWNEND_AUDIO_EVENTNAME, this.VMo);
        } else {
          e.SetText(i);
          this.XZi(COUNTDOWN_AUDIO_EVENTNAME, this.FMo);
        }
      }
    };
    this.nEo = () => {
      this.wMo.OnCatchBtnDown();
      var e = this.GetUiNiagara(13);
      e?.SetNiagaraUIActive(true, false);
      e?.ActivateSystem(true);
      this.sEo();
      this.XZi(PLAYER_CATCHDOWN_AUDIO_EVENTNAME, this.WMo);
    };
    this.aEo = () => {
      this.wMo.OnCatchBtnUp();
      this.ZMo();
      this.XZi(PLAYER_CATCHUP_AUDIO_EVENTNAME, this.KMo);
    };
    this.hEo = () => {
      this.oEo(3);
    };
    this.dpt = () => {};
    this.ZMo = () => {
      this.lEo("SP_SignalPointerNor");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UISprite], [8, UE.UIText], [9, UE.UITexture], [10, UE.UISprite], [11, UE.UINiagara], [12, UE.UINiagara], [13, UE.UINiagara], [14, UE.UIText], [15, UE.UIText], [16, UE.UINiagara], [17, UE.UINiagara]];
    this.BtnBindInfo = [[3, this.hEo], [4, this.dpt]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(1).SetUIActive(false);
    this.GetItem(0).SetUIActive(true);
    this.GetText(8).SetText("0%");
    var e = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType;
    const i = e === 2 ? "054522" : "6b5a25";
    this.GetTexture(9)?.SetColor(UE.Color.FromHex(i));
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
    this.GetText(2)?.GetOwner()?.OnSequencePlayEvent.Bind(this.Tct);
    this.GetUiNiagara(12)?.SetNiagaraUIActive(false, false);
    this.GetUiNiagara(11)?.SetNiagaraUIActive(false, false);
    if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
      const i = UE.Color.FromHex(NIAGARA_ORANGE_COLOR);
      var t = new UE.LinearColor(i);
      this.GetUiNiagara(16)?.SetNiagaraUIActive(true, false);
      this.GetUiNiagara(16)?.SetNiagaraVarLinearColor("Color", t);
      this.GetUiNiagara(17)?.SetNiagaraUIActive(true, false);
      this.GetUiNiagara(17)?.SetNiagaraVarLinearColor("Color", t);
      this.GetUiNiagara(16)?.SetUIActive(false);
      this.GetUiNiagara(17)?.SetUIActive(false);
    }
    this.BMo = new PausePanel_1.PausePanel();
    this.bMo = new SuccessFinishPanel_1.SuccessFinishPanel();
    this.qMo = new FailedFinishPanel_1.FailedFinishPanel();
    this.wMo = new SignalMovePanel_1.SignalMovePanel();
    await Promise.all([this.BMo.CreateByResourceIdAsync("UiView_ComPause", this.RootItem), this.BMo.HideAsync(), this.bMo.CreateByResourceIdAsync("UiView_SignalSuccess", this.RootItem), this.bMo.HideAsync(), this.qMo.CreateByResourceIdAsync("UiView_SignalFail", this.RootItem), this.qMo.HideAsync(), this.wMo.Init(this.GetItem(5), e)]);
    t = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 2;
    let s = t ? "NS_Fx_LGUI_Send_G_Loop" : "NS_Fx_LGUI_Send_Y_Loop";
    if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
      s = "NS_Fx_LGUI_Send_O_Loop";
    }
    this.NMo = await this._Eo(s);
    let _ = t ? "NS_Fx_LGUI_Send_G_Burst" : "NS_Fx_LGUI_Send_Y_Burst";
    if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
      _ = "NS_Fx_LGUI_Send_O_Burst";
    }
    this.GMo = await this._Eo(_);
    this.kMo = await this._Eo("NS_Fx_LGUI_Send_R_Loop");
    this.OMo = await this._Eo("NS_Fx_LGUI_Send_R_Burst");
    e = t ? "SignalSendProcess" : "SignalReceiveProcess";
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(14), e);
    let o = t ? "SignalSendTips" : "SignalReceiveTips";
    if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
      o = "SignalMusicTips";
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(15), o);
  }
  async _Eo(e) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    if (e && e.length !== 0) {
      const i = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, e => {
        if (e && this.RootItem) {
          i.SetResult(e);
        } else {
          i.SetResult(undefined);
        }
      });
      return await i.Promise;
    }
  }
  OnBeforeShow() {
    var e = this.GetButton(6);
    e.OnPointDownCallBack.Bind(this.nEo);
    e.OnPointUpCallBack.Bind(this.aEo);
  }
  OnAfterShow() {
    this.oEo(1);
  }
  OnBeforeDestroy() {
    this.JMa();
    this.NMo = undefined;
    this.GMo = undefined;
    this.kMo = undefined;
    this.OMo = undefined;
  }
  JMa() {
    AudioController_1.AudioController.StopEvent(this.FMo);
    AudioController_1.AudioController.StopEvent(this.VMo);
    AudioController_1.AudioController.StopEvent(this.HMo);
    AudioController_1.AudioController.StopEvent(this.HMo);
    AudioController_1.AudioController.StopEvent(this.jMo);
    AudioController_1.AudioController.StopEvent(this.WMo);
    AudioController_1.AudioController.StopEvent(this.QMo);
    AudioController_1.AudioController.StopEvent(this.XMo);
  }
  zMa() {
    this.GetUiNiagara(13)?.SetNiagaraUIActive(false, false);
    this.GetUiNiagara(12)?.SetNiagaraUIActive(false, false);
    this.GetUiNiagara(11)?.SetNiagaraUIActive(false, false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalCatchStart, this.JMo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalCatchSuccess, this.zMo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalCatchFailed, this.eEo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalCatchContinue, this.iEo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignalCatchStartAgain, this.rEo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalCatchStart, this.JMo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalCatchSuccess, this.zMo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalCatchFailed, this.eEo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalCatchContinue, this.iEo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignalCatchStartAgain, this.rEo);
  }
  OnTick(e) {
    if (this.Dai === 2) {
      this.uEo(e);
    }
  }
  uEo(e) {
    this.wMo.UpdateMove(e);
    this.cEo();
  }
  cEo() {
    var e = this.wMo.GetCompleteness();
    var e = Math.floor(e * 100);
    this.GetText(8).SetText(e + "%");
    var i = this.wMo.GetProgress();
    this.GetSprite(10).SetFillAmount(i);
    if (i >= 1) {
      this.mEo(e);
    }
  }
  mEo(i) {
    if (!this.YMo) {
      this.YMo = true;
      TimerSystem_1.TimerSystem.Delay(() => {
        var e = i >= ModelManager_1.ModelManager.SignalDecodeModel.TargetCompletion ? 4 : 5;
        this.oEo(e);
        this.YMo = false;
      }, 1000);
    }
  }
  oEo(e, i) {
    if (this.Dai !== e) {
      switch (e) {
        case 1:
          this.GetItem(1).SetUIActive(false);
          this.GetItem(0).SetUIActive(true);
          this.GetText(2)?.SetText("3");
          this.LevelSequencePlayer?.PlayLevelSequenceByName(COUNTDOWN_SEQUENCENAME);
          break;
        case 2:
          {
            this.zMa();
            this.GetItem(0).SetUIActive(false);
            this.GetItem(1).SetUIActive(true);
            if (i) {
              this.dEo();
            }
            let e = BG_NOISE_AUDIO_EVENTNAME;
            if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3 && (e = i ? BG_BGM_AUDIO_EVENTNAME : BG_BGM_AUDIO_RESUME_EVENTNAME, Log_1.Log.CheckError())) {
              Log_1.Log.Error("Audio", 18, "BGM事件", ["eventName", e]);
            }
            this.XZi(e, this.HMo);
            break;
          }
        case 3:
          {
            this.JMa();
            this.GetItem(1).SetUIActive(false);
            this.BMo.Show();
            let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
            if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
              e = BG_BGM_AUDIO_PAUSE_EVENTNAME;
            }
            this.XZi(e, this.jMo);
            break;
          }
        case 4:
          {
            this.JMa();
            this.GetItem(1).SetUIActive(false);
            this.bMo.Open();
            let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
            if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
              e = BG_BGM_STOP_AUDIO_EVENTNAME;
            }
            this.XZi(e, this.jMo);
            break;
          }
        case 5:
          {
            this.JMa();
            this.GetItem(1).SetUIActive(false);
            this.qMo.Open();
            let e = BG_NOISE_STOP_AUDIO_EVENTNAME;
            if (ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 3) {
              e = BG_BGM_STOP_AUDIO_EVENTNAME;
            }
            this.XZi(e, this.jMo);
            break;
          }
      }
      this.Dai = e;
    }
  }
  dEo() {
    this.wMo.InitMoveNode();
  }
  XZi(e, i) {
    var t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    if (t && t.Path !== "") {
      AudioController_1.AudioController.PostEventByUi(t.Path, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 18, "获取Audio配表信息错误！请检查Audio的配置是否存在！", ["name", e]);
    }
  }
  sEo() {
    var e = ModelManager_1.ModelManager.SignalDecodeModel.CurrentGameplayType === 2;
    this.lEo(e ? "SP_SignalPointerGreen" : "SP_SignalPointerYellow");
  }
  tEo() {
    this.lEo("SP_SignalPointerRed");
  }
  lEo(e) {
    var i;
    if (!this.$Mo) {
      i = this.GetSprite(7);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetSpriteByPath(e, i, false);
    }
  }
}
exports.SignalDecodeViewV2 = SignalDecodeViewV2;
//# sourceMappingURL=SignalDecodeViewV2.js.map