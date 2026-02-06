"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleControlTopPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TouchUiEditApplyHelper_1 = require("../../../../InputSettings/TouchUiEdit/TouchUiEditApplyHelper");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MovieModeUtil_1 = require("../../../MovieMode/MovieModeUtil");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const actionNameList = [InputMappingsDefine_1.actionMappings.载具音乐上一首, InputMappingsDefine_1.actionMappings.载具音乐播放暂停, InputMappingsDefine_1.actionMappings.载具音乐下一首];
class MotorcycleControlTopPanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Eah = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.SPe = undefined;
    this.otf = false;
    this.ltf = undefined;
    this._tf = 0;
    this.utf = 0;
    this.ctf = 0;
    this.dtf = 0;
    this.mtf = 0.1;
    this.ftf = 1000;
    this.gtf = 1000;
    this.Ctf = 0;
    this.i0f = undefined;
    this.dJs = [];
    this.K6f = 0;
    this.X6f = -1;
    this.eut = false;
    this.T0g = false;
    this.q$i = undefined;
    this.ptf = () => {
      this.Y6f();
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.OpenMusicPlayerView();
    };
    this.vtf = () => {
      this.Y6f();
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(false);
    };
    this.ytf = () => {
      this.Y6f();
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(true);
    };
    this.Stf = t => {
      this.Y6f();
      if (ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.CheckIsEnable()) {
        t = t === 1;
        if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() > 0) {
          if (!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause() != t) {
            if (t) {
              ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.ResumeMusic();
            } else {
              ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PauseMusic();
            }
          }
        } else {
          ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(true);
        }
        this.b0g(t);
      } else {
        this.btf();
      }
    };
    this.Mtf = (t, e) => {
      this.Ycf();
    };
    this.dCf = t => {
      this.btf();
      this.yQf();
    };
    this.CUm = () => {
      this.Etf();
      this.btf();
    };
    this.lqt = () => {
      this.Dqf();
    };
    this.RZe = t => {
      this.Dqf();
    };
    this.bMe = (t, e) => {
      if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving && ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.CheckIsEnable() && e === 0) {
        if (t === InputMappingsDefine_1.actionMappings.载具音乐上一首) {
          this.vtf();
        } else if (t === InputMappingsDefine_1.actionMappings.载具音乐下一首) {
          this.ytf();
        } else if (t === InputMappingsDefine_1.actionMappings.载具音乐播放暂停) {
          if ((e = this.GetExtendToggle(4)).GetToggleState() === 1) {
            e.SetToggleState(0, true);
          } else {
            e.SetToggleState(1, true);
          }
        }
      }
    };
    this.r0f = (t, e) => {
      if (this.i0f) {
        MovieModeUtil_1.MovieModeUtil.ApplyAspectOffsetToUi(this.i0f, t, e);
      }
    };
    this.z6f = t => {
      this.J6f(t);
    };
    this.Mug = t => {
      if (t === 2) {
        this.RCd();
      }
    };
  }
  async Init(t, e) {
    this.InitChildType(37);
    await this.CreateByResourceIdAsync(e, t);
    this.Initialize();
    await this.InitializeAsync();
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      this.ShowBattleVisibleChildView();
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIExtendToggle], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UINiagara]];
    this.eut = Info_1.Info.IsInTouch();
    if (!this.eut) {
      this.ComponentRegisterInfos.push([11, UE.UIItem]);
      this.ComponentRegisterInfos.push([12, UE.UIItem]);
      this.ComponentRegisterInfos.push([13, UE.UIItem]);
    }
    this.BtnBindInfo = [[0, this.ptf], [3, this.vtf], [5, this.ytf]];
  }
  async OnBeforeStartAsync() {
    var t;
    if (!this.eut) {
      (t = []).push(this.DNf(this.GetItem(11)));
      t.push(this.DNf(this.GetItem(12)));
      t.push(this.DNf(this.GetItem(13)));
      await Promise.all(t);
    }
  }
  async DNf(t) {
    var e = new InputMultiKeyItem_1.InputMultiKeyItem(true);
    this.dJs.push(e);
    await e.CreateThenShowByActorAsync(t.GetOwner());
  }
  OnStart() {
    this.n0f();
    this.Eah.InitTweenAnim(8, this.GetItem(8));
    this.Eah.InitTweenAnim(9, this.GetItem(9));
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.ltf = this.GetText(2);
    this._tf = this.GetItem(1).GetWidth();
    this.mtf = CommonParamById_1.configCommonParamById.GetFloatConfig("MusicTitleScrollSpeed");
    this.ftf = CommonParamById_1.configCommonParamById.GetFloatConfig("MusicTitleScrollBeginTime");
    this.gtf = CommonParamById_1.configCommonParamById.GetFloatConfig("MusicTitleScrollEndTime");
    this.Etf();
    this.btf();
    this.yQf();
    this.Ycf();
    this.Dqf();
    this.UNf();
    this.J6f(ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.HudColorState);
    if (this.eut) {
      this.RCd();
    }
    this.Ore();
  }
  OnShowBattleChildViewPanel() {
    this.otf = true;
  }
  OnHideBattleChildViewPanel() {}
  OnBeforeShow() {
    super.OnBeforeShow();
    ModelManager_1.ModelManager.BattleUiModel.UpdateBossStateArea(2, true);
  }
  OnAfterShow() {
    var t = ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode() ? "MovieIn" : "Start";
    this.SPe?.PlayLevelSequenceByName(t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorMusicPlayerShow);
    this.Y6f();
  }
  async OnBeforeHideAsync() {
    var t;
    ModelManager_1.ModelManager.BattleUiModel.UpdateBossStateArea(2, false);
    if (!(ModelManager_1.ModelManager.BattleUiModel.GetBattleUiAlpha() <= 0)) {
      t = ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode();
      this.q$i = new CustomPromise_1.CustomPromise();
      this.SPe?.PlaySequencePurely(t ? "MovieOut" : "Close", false, false, this.q$i);
      await this.q$i.Promise;
      this.q$i = undefined;
    }
  }
  OnAutoDestroy() {
    super.OnAutoDestroy();
    if (this.q$i) {
      this.q$i.SetResult(true);
      this.q$i = undefined;
    }
  }
  OnBeforeDestroy() {
    this.Eah.Clear();
    if (this.SPe) {
      this.SPe.Clear();
      this.SPe = undefined;
    }
    this.kre();
  }
  Ore() {
    this.GetExtendToggle(4).OnStateChange.Add(this.Stf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiBossStateAreaChanged, this.Mtf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorSwitchMusic, this.CUm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorMusicEnableStateChanged, this.dCf);
    if (this.eut) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTouchUiEditSave, this.Mug);
    } else {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.RZe);
      InputDistributeController_1.InputDistributeController.BindActions(actionNameList, this.bMe);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.r0f);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.z6f);
  }
  kre() {
    this.GetExtendToggle(4).OnStateChange.Remove(this.Stf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiBossStateAreaChanged, this.Mtf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorSwitchMusic, this.CUm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorMusicEnableStateChanged, this.dCf);
    if (this.eut) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTouchUiEditSave, this.Mug);
    } else {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.RZe);
      InputDistributeController_1.InputDistributeController.UnBindActions(actionNameList, this.bMe);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.r0f);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.z6f);
  }
  yQf() {
    this.SetVisible(2, ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable);
  }
  Dqf() {
    var t;
    if (Info_1.Info.IsInGamepad()) {
      t = ModelManager_1.ModelManager.SkillButtonUiModel.GetGamepadDataByType(1)?.GetIsPressCombineButton() ?? false;
      this.GetItem(6).SetUIActive(t);
    } else {
      this.GetItem(6).SetUIActive(false);
    }
  }
  Etf() {
    var t = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId();
    if (t > 0) {
      t = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(t).Title;
      this.GetText(2).ShowTextNew(t);
    } else {
      this.GetText(2).SetText("");
    }
    this.Ptf();
  }
  btf() {
    let t = false;
    if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() > 0) {
      t = !ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause() && ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable;
    }
    this.GetExtendToggle(4).SetToggleState(t ? 1 : 0);
    this.b0g(t);
    this.otf = false;
  }
  b0g(t) {
    if (this.T0g !== t) {
      this.T0g = t;
      this.GetUiNiagara(10).SetUIActive(t);
      if (t) {
        this.SPe?.PlaySequencePurely("Loop");
      } else {
        this.SPe?.StopSequenceByKey("Loop");
      }
    }
  }
  Ptf() {
    this.ctf = 1;
    this.ltf.SetAnchorOffsetX(0);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "MotorcycleSpeedUI ResetMusicTitleScroll");
    }
  }
  Ycf() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetBossStateAreaType() >= 2;
    this.SetVisible(1, t);
  }
  UNf() {
    if (!this.eut) {
      for (let t = 0; t < this.dJs.length; t++) {
        var e = this.dJs[t];
        var i = actionNameList[t];
        e.RefreshByActionOrAxis({
          ActionOrAxisName: i
        }, true);
      }
    }
  }
  Tick(t) {
    if (this.IsShowOrShowing) {
      if (this.otf) {
        this.btf();
      }
      switch (this.ctf) {
        case 1:
          this.dtf -= t;
          if (this.dtf <= 0) {
            this.dtf = this.gtf;
            this.utf = this.ltf.GetWidth();
            if (this.utf > this._tf) {
              this.ctf = 2;
              this.Ctf = 0;
            } else {
              this.ctf = 0;
            }
          }
          break;
        case 2:
          this.Ctf -= t * this.mtf;
          var e = this._tf - this.utf;
          if (this.Ctf <= e) {
            this.Ctf = e;
            this.ctf = 3;
          }
          this.ltf.SetAnchorOffsetX(this.Ctf);
          break;
        case 3:
          this.dtf -= t;
          if (this.dtf <= 0) {
            this.dtf = this.ftf;
            this.ctf = 1;
            this.ltf.SetAnchorOffsetX(0);
          }
      }
      this.Z6f(t);
    }
  }
  n0f() {
    var t = this.GetItem(7);
    if (t) {
      this.i0f = {
        UiItem: t,
        OriginalOffset: Vector2D_1.Vector2D.Create(t.GetAnchorOffsetX(), t.GetAnchorOffsetY()),
        OffsetWidthDirection: 0,
        OffsetHeightDirection: -1
      };
      this.r0f(ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode(), ControllerHolder_1.ControllerHolder.MovieModeController.GetAspectOffset());
    }
  }
  J6f(t) {
    if (t !== 2 && this.K6f !== t) {
      if ((this.K6f = t) === 1) {
        this.SPe?.StopSequenceByKey("TurnBlue");
        this.SPe?.PlaySequencePurely("TurnGreen");
      } else {
        this.SPe?.StopSequenceByKey("TurnGreen");
        this.SPe?.PlaySequencePurely("TurnBlue");
      }
    }
  }
  Z6f(t) {
    if (!(this.X6f < 0)) {
      this.X6f -= t;
      if (this.X6f <= 0) {
        this.X6f = -1;
        this.Eah.StopTweenAnim(9);
        this.Eah.PlayTweenAnim(8);
      }
    }
  }
  Y6f() {
    if (this.X6f === -1) {
      this.Eah.StopTweenAnim(8);
      this.Eah.PlayTweenAnim(9);
    }
    this.X6f = 5000;
  }
  RCd() {
    TouchUiEditApplyHelper_1.TouchUiEditApplyHelper.ApplyCommonTouchUiEditData(2, this, "UiItem_MotorcycleControlTopEdit");
  }
}
exports.MotorcycleControlTopPanel = MotorcycleControlTopPanel;
//# sourceMappingURL=MotorcycleControlTopPanel.js.map