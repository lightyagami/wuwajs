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
    this.pJm = false;
    this.EJm = undefined;
    this.IJm = 0;
    this.TJm = 0;
    this.bJm = 0;
    this.RJm = 0;
    this.wJm = 0.1;
    this.LJm = 1000;
    this.PJm = 1000;
    this.AJm = 0;
    this.qmf = undefined;
    this.dJs = [];
    this.xGf = 0;
    this.BGf = -1;
    this.eut = false;
    this.q$i = undefined;
    this.DJm = () => {
      this.kGf();
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.OpenMusicPlayerView();
    };
    this.UJm = () => {
      this.kGf();
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(false);
    };
    this.xJm = () => {
      this.kGf();
      ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(true);
    };
    this.BJm = e => {
      this.kGf();
      if (ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.CheckIsEnable()) {
        e = e === 1;
        if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() > 0) {
          if (!ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause() != e) {
            if (e) {
              ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.ResumeMusic();
            } else {
              ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.PauseMusic();
            }
          }
        } else {
          ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.QuickPlayMusic(true);
        }
      } else {
        this.FJm();
      }
    };
    this.kJm = (e, t) => {
      this.J_f();
    };
    this.Bff = e => {
      this.FJm();
      this.$5f();
    };
    this.JPm = () => {
      this.qJm();
      this.FJm();
    };
    this.lqt = () => {
      this.ZAf();
    };
    this.RZe = e => {
      this.ZAf();
    };
    this.bMe = (e, t) => {
      if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving && ControllerHolder_1.ControllerHolder.MotorcycleMusicPlayerController.CheckIsEnable() && t === 0) {
        if (e === InputMappingsDefine_1.actionMappings.载具音乐上一首) {
          this.UJm();
        } else if (e === InputMappingsDefine_1.actionMappings.载具音乐下一首) {
          this.xJm();
        } else if (e === InputMappingsDefine_1.actionMappings.载具音乐播放暂停) {
          if ((t = this.GetExtendToggle(4)).GetToggleState() === 1) {
            t.SetToggleState(0, true);
          } else {
            t.SetToggleState(1, true);
          }
        }
      }
    };
    this.Omf = (e, t) => {
      if (this.qmf) {
        MovieModeUtil_1.MovieModeUtil.ApplyAspectOffsetToUi(this.qmf, e, t);
      }
    };
    this.qGf = e => {
      this.OGf(e);
    };
    this.FXf = () => {
      this.RCd();
    };
  }
  async Init(e, t) {
    this.InitChildType(37);
    await this.CreateByResourceIdAsync(t, e);
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
    this.BtnBindInfo = [[0, this.DJm], [3, this.UJm], [5, this.xJm]];
  }
  async OnBeforeStartAsync() {
    var e;
    if (!this.eut) {
      (e = []).push(this.VBf(this.GetItem(11)));
      e.push(this.VBf(this.GetItem(12)));
      e.push(this.VBf(this.GetItem(13)));
      await Promise.all(e);
    }
  }
  async VBf(e) {
    var t = new InputMultiKeyItem_1.InputMultiKeyItem(true);
    this.dJs.push(t);
    await t.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnStart() {
    this.Fmf();
    this.Eah.InitTweenAnim(8, this.GetItem(8));
    this.Eah.InitTweenAnim(9, this.GetItem(9));
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.EJm = this.GetText(2);
    this.IJm = this.GetItem(1).GetWidth();
    this.wJm = CommonParamById_1.configCommonParamById.GetFloatConfig("MusicTitleScrollSpeed");
    this.LJm = CommonParamById_1.configCommonParamById.GetFloatConfig("MusicTitleScrollSpeed");
    this.PJm = CommonParamById_1.configCommonParamById.GetFloatConfig("MusicTitleScrollEndTime");
    this.GetUiNiagara(10).SetUIActive(false);
    this.qJm();
    this.FJm();
    this.$5f();
    this.J_f();
    this.ZAf();
    this.OGf(ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.HudColorState);
    if (this.eut) {
      this.RCd();
    }
    this.Ore();
  }
  OnShowBattleChildViewPanel() {
    this.pJm = true;
  }
  OnHideBattleChildViewPanel() {}
  OnBeforeShow() {
    super.OnBeforeShow();
    ModelManager_1.ModelManager.BattleUiModel.UpdateBossStateArea(2, true);
  }
  OnAfterShow() {
    var e = ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode() ? "MovieIn" : "Start";
    this.SPe?.PlayLevelSequenceByName(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorMusicPlayerShow);
    this.kGf();
  }
  async OnBeforeHideAsync() {
    var e;
    ModelManager_1.ModelManager.BattleUiModel.UpdateBossStateArea(2, false);
    if (!(ModelManager_1.ModelManager.BattleUiModel.GetBattleUiAlpha() <= 0)) {
      e = ModelManager_1.ModelManager.AutoPilotModel?.GetIsInMovieMode();
      this.q$i = new CustomPromise_1.CustomPromise();
      this.SPe?.PlaySequencePurely(e ? "MovieOut" : "Close", false, false, this.q$i);
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
    this.GetExtendToggle(4).OnStateChange.Add(this.BJm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiBossStateAreaChanged, this.kJm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorSwitchMusic, this.JPm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMotorMusicEnableStateChanged, this.Bff);
    if (this.eut) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTouchUiEditSave, this.FXf);
    } else {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.RZe);
      InputDistributeController_1.InputDistributeController.BindActions(actionNameList, this.bMe);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.Omf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.qGf);
  }
  kre() {
    this.GetExtendToggle(4).OnStateChange.Remove(this.BJm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiBossStateAreaChanged, this.kJm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorSwitchMusic, this.JPm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMotorMusicEnableStateChanged, this.Bff);
    if (this.eut) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTouchUiEditSave, this.FXf);
    } else {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiPressMotorcycleCombineButtonChanged, this.RZe);
      InputDistributeController_1.InputDistributeController.UnBindActions(actionNameList, this.bMe);
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MovieModeAspectOffsetApply, this.Omf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleHudColorStateChanged, this.qGf);
  }
  $5f() {
    this.SetVisible(2, ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable);
  }
  ZAf() {
    var e;
    if (Info_1.Info.IsInGamepad()) {
      e = ModelManager_1.ModelManager.SkillButtonUiModel.GetGamepadDataByType(1)?.GetIsPressCombineButton() ?? false;
      this.GetItem(6).SetUIActive(e);
    } else {
      Info_1.Info.IsInKeyBoard();
      this.GetItem(6).SetUIActive(false);
    }
    this.HBf();
  }
  qJm() {
    var e = ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId();
    if (e > 0) {
      e = ConfigManager_1.ConfigManager.PhonographConfig.GetMusicById(e).Title;
      this.GetText(2).ShowTextNew(e);
    } else {
      this.GetText(2).SetText("");
    }
    this.jJm();
  }
  FJm() {
    let e = false;
    if (ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetCurPlayMusicId() > 0) {
      e = !ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.GetIsPause() && ModelManager_1.ModelManager.MotorcycleMusicPlayerModel.IsEnable;
    }
    this.GetExtendToggle(4).SetToggleState(e ? 1 : 0);
    this.pJm = false;
  }
  jJm() {
    this.bJm = 1;
    this.EJm.SetAnchorOffsetX(0);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "MotorcycleSpeedUI ResetMusicTitleScroll");
    }
  }
  J_f() {
    var e = ModelManager_1.ModelManager.BattleUiModel.GetBossStateAreaType() >= 2;
    this.SetVisible(1, e);
  }
  HBf() {
    if (!this.eut) {
      var t = Info_1.Info.IsInGamepad();
      for (let e = 0; e < this.dJs.length; e++) {
        var i = this.dJs[e];
        var s = actionNameList[e];
        i.RefreshByActionOrAxis({
          ActionOrAxisName: s
        }, t);
      }
    }
  }
  Tick(e) {
    if (this.IsShowOrShowing) {
      if (this.pJm) {
        this.FJm();
      }
      switch (this.bJm) {
        case 1:
          this.RJm -= e;
          if (this.RJm <= 0) {
            this.RJm = this.PJm;
            this.TJm = this.EJm.GetWidth();
            if (this.TJm > this.IJm) {
              this.bJm = 2;
              this.AJm = 0;
            } else {
              this.bJm = 0;
            }
          }
          break;
        case 2:
          this.AJm -= e * this.wJm;
          var t = this.IJm - this.TJm;
          if (this.AJm <= t) {
            this.AJm = t;
            this.bJm = 3;
          }
          this.EJm.SetAnchorOffsetX(this.AJm);
          break;
        case 3:
          this.RJm -= e;
          if (this.RJm <= 0) {
            this.RJm = this.LJm;
            this.bJm = 1;
            this.EJm.SetAnchorOffsetX(0);
          }
      }
      this.GGf(e);
    }
  }
  Fmf() {
    var e = this.GetItem(7);
    if (e) {
      this.qmf = {
        UiItem: e,
        OriginalOffset: Vector2D_1.Vector2D.Create(e.GetAnchorOffsetX(), e.GetAnchorOffsetY()),
        OffsetWidthDirection: 0,
        OffsetHeightDirection: -1
      };
      this.Omf(ModelManager_1.ModelManager.AutoPilotModel.GetIsInMovieMode(), ControllerHolder_1.ControllerHolder.MovieModeController.GetAspectOffset());
    }
  }
  OGf(e) {
    if (e !== 2 && this.xGf !== e) {
      if ((this.xGf = e) === 1) {
        this.SPe?.StopSequenceByKey("TurnBlue");
        this.SPe?.PlaySequencePurely("TurnGreen");
      } else {
        this.SPe?.StopSequenceByKey("TurnGreen");
        this.SPe?.PlaySequencePurely("TurnBlue");
      }
    }
  }
  GGf(e) {
    if (!(this.BGf < 0)) {
      this.BGf -= e;
      if (this.BGf <= 0) {
        this.BGf = -1;
        this.Eah.StopTweenAnim(9);
        this.Eah.PlayTweenAnim(8);
      }
    }
  }
  kGf() {
    if (this.BGf === -1) {
      this.Eah.StopTweenAnim(8);
      this.Eah.PlayTweenAnim(9);
    }
    this.BGf = 5000;
  }
  RCd() {
    TouchUiEditApplyHelper_1.TouchUiEditApplyHelper.ApplyCommonTouchUiEditData(2, this, "UiItem_MotorcycleControlTopEdit");
  }
}
exports.MotorcycleControlTopPanel = MotorcycleControlTopPanel;
//# sourceMappingURL=MotorcycleControlTopPanel.js.map