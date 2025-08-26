"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteContinuousClickView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonQteContinuousClickContext_1 = require("../CommonQte/CommonQteContinuousClickContext");
const CommonQteViewBase_1 = require("./CommonQteViewBase");
class CommonQteContinuousClickView extends CommonQteViewBase_1.CommonQteViewBase {
  constructor() {
    super(...arguments);
    this.OOi = undefined;
    this.d5l = undefined;
    this.DOt = undefined;
    this.NUi = undefined;
    this.wOi = undefined;
    this.aS1 = undefined;
    this.Sq1 = undefined;
    this.SPe = undefined;
    this.lMc = undefined;
    this.hS1 = false;
    this.NTe = 0;
    this.lS1 = false;
    this._S1 = 0;
    this.cS1 = 0;
    this.uS1 = -1;
    this.dS1 = false;
    this.mS1 = "";
    this.NQa = false;
    this.FQa = "";
    this.iIl = -1;
    this.fS1 = undefined;
    this._Mc = false;
    this.$xt = t => {
      if (t === "Start") {
        if (!this.IsQteEnd) {
          if (this.hS1) {
            this.SPe?.PlayLevelSequenceByName("Loop");
            if (!this.IsQtePause && this.NTe > 0) {
              this.FOi("Loop", 1 / this.NTe);
            } else {
              this.FOi("Loop", 0);
            }
          }
          if (this.lS1 && (this.SPe?.PlayLevelSequenceByName("Charge"), this.gS1("Charge", false), this.fS1)) {
            this.cS1 = this.fS1.CurrentEnergyPercent / 100;
            this._S1 = this.cS1;
            this.CS1("Charge", this._S1);
          }
          this.IsQteStart = true;
          this.IsQteInteractive = true;
        }
      } else if (t === "Success" || t === "Fail") {
        UiManager_1.UiManager.CloseView("CommonQteContinuousClickView");
      }
    };
    this.BOi = (t, i) => {
      if (this.IsValidInput()) {
        if (i === 0) {
          this.bOi();
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
      }
    };
    this.jj_ = (t, i) => {
      if (Info_1.Info.IsInGamepad() && ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.IsSwitchInteractOpen && ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.State === 2 && this.FQa === InputMappingsDefine_1.actionMappings.幻象1) {
        if (this.IsValidInput()) {
          if (i === 0) {
            this.bOi();
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
        }
      }
    };
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    if (this.IsMobile) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!this.IsMobile && (this.Sq1 = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(6))) {
      await this.Sq1?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    super.OnStart();
    this.IsMobile;
    this.OOi = this.GetItem(0);
    this.d5l = this.GetButton(1);
    this.DOt = this.GetSprite(2);
    this.NUi = this.GetItem(3);
    this.wOi = this.GetItem(4);
    this.aS1 = this.GetText(5);
    this.d5l?.OnPointDownCallBack.Bind(() => {
      this.qOi();
    });
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi);
    this.SPe.BindSequenceCloseEvent(this.$xt);
    this.lMc = new LevelSequencePlayer_1.LevelSequencePlayer(this.NUi);
    this.OOi?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    this.jQa();
    this.d5l?.OnPointDownCallBack.Unbind();
    this.SPe?.Clear();
    this.lMc?.Clear();
    this.fS1 = undefined;
    this.iIl = -1;
    this.FQa = "";
  }
  SetQteContext(t) {
    var i;
    if (t instanceof CommonQteContinuousClickContext_1.CommonQteContinuousClickContext) {
      this.iIl = t.HandleId;
      if (i = (this.fS1 = t).GetAction()) {
        this.FQa = i;
        if (!this.IsMobile) {
          i = {
            ActionOrAxisName: this.FQa
          };
          this.Sq1?.RefreshByActionOrAxis(i);
          this.Sq1?.Show();
        }
      }
      this.NTe = Math.max(0, t.Duration * TimeUtil_1.TimeUtil.Millisecond);
      this.hS1 = false;
      this.lS1 = true;
      this.IsQteInteractive = false;
      this._Mc = false;
      if (i = t.GetUiConfig()) {
        this.IsQteInteractive = i.InteractiveTiming === 0;
        this._Mc = i.IsShowBorder;
        this.dS1 = i.IsShowTip;
        this.mS1 = i.TipTextId;
        if (i.PerformInterpSpeedForEnergyPercent > 0) {
          this.uS1 = i.PerformInterpSpeedForEnergyPercent / 100 / TimeUtil_1.TimeUtil.InverseMillisecond;
        } else {
          this.uS1 = -1;
        }
      }
      if (i = t.Resource?.Icon) {
        this.DOt?.SetSprite(i, false);
        this.DOt?.SetUIActive(true);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "获取Qte图标失败", ["QteId", t.QteId]);
      }
      this.Bfc();
      this.SetQteActive(t);
    }
  }
  PlayQteStart() {
    if (this.IsQteActive && !this.IsQteEnd && !this.IsQtePause && this.fS1) {
      this.IsQtePlayStart = true;
      this.OOi?.SetUIActive(true);
      this.pS1("Start");
      if (this._Mc) {
        this.NUi?.SetUIActive(true);
        this.lMc?.PlayLevelSequenceByName("Start");
      }
      if (this.dS1) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.aS1, this.mS1);
        this.wOi?.SetUIActive(true);
      } else {
        this.wOi?.SetUIActive(false);
      }
      this.HQa();
      ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(this.fS1);
    }
  }
  pS1(t) {
    var i = this.SPe?.GetSequencePlayContext(t)?.PlayInfo?.LevelSequence.AssetPathName;
    if (i && !FNameUtil_1.FNameUtil.IsNothing(i) && i.toString().length) {
      this.SPe?.PlayLevelSequenceByName(t);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 39, "Qte缺少生命周期Sequence", ["SequenceName", t], ["QteId", this.fS1?.QteId]);
      }
      TimerSystem_1.TimerSystem.Next(() => {
        if (this.SPe) {
          this.$xt?.(t);
        }
      });
    }
  }
  CommonQteEnd(t) {
    if (this.iIl === t) {
      this.HandleQteEnd();
    }
  }
  RefreshOnBattleUiVisibleChanged() {
    var t;
    if (this.fS1?.Source !== 2 && this.fS1?.Source !== 3) {
      t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20);
      this.SetActive(t);
    }
  }
  HQa() {
    if (!this.NQa && !(this.NQa = true, this.IsMobile)) {
      InputDistributeController_1.InputDistributeController.BindActionIgnoreLimit(this.FQa, this.BOi);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用QTE绑定Action", ["Action", this.FQa]);
      }
      if (this.FQa === InputMappingsDefine_1.actionMappings.幻象1) {
        InputDistributeController_1.InputDistributeController.BindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.通用交互, this.jj_);
      }
    }
  }
  jQa() {
    if (this.NQa) {
      this.NQa = false;
      if (!this.IsMobile) {
        InputDistributeController_1.InputDistributeController.UnBindActionIgnoreLimit(this.FQa, this.BOi);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "通用QTE解绑Action", ["Action", this.FQa]);
        }
        if (this.FQa === InputMappingsDefine_1.actionMappings.幻象1) {
          InputDistributeController_1.InputDistributeController.UnBindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.通用交互, this.jj_);
        }
      }
    }
  }
  qOi() {
    if (this.IsValidInput()) {
      this.bOi();
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
    }
  }
  bOi() {
    if (this.dS1) {
      this.wOi?.SetUIActive(false);
    }
    if (this.fS1 && this.fS1.IsActive() && this.fS1.IsPending()) {
      if (this.lS1) {
        this._S1 = this.cS1;
        this.CS1("Charge", this._S1);
      }
      this.SPe?.PlayLevelSequenceByName("Press");
      this.fS1.Response();
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
      if (this.fS1 && this.lS1) {
        this.cS1 = this.fS1.CurrentEnergyPercent / 100;
        this._S1 = this.cS1;
        this.CS1("Charge", this._S1);
      }
      this.SPe?.StopCurrentSequence();
      if (this.fS1?.IsSuccess()) {
        this.pS1("Success");
      } else {
        this.pS1("Fail");
      }
      if (this._Mc) {
        this.lMc?.StopCurrentSequence();
        this.lMc?.PlayLevelSequenceByName("Close");
      }
      this.jQa();
    }
  }
  FOi(t, i) {
    this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer?.SetPlayRate(i);
  }
  gS1(t, i) {
    t = this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer;
    if (i) {
      t?.Play();
    } else {
      t?.Pause();
    }
  }
  CS1(t, i) {
    var s;
    var e;
    var t = this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer;
    if (t) {
      i = (e = (e = t.GetDuration().Time).FrameNumber.Value + e.SubFrame) * MathUtils_1.MathUtils.Clamp(i, 0, 1);
      if (!(e < 1) && !(e < i)) {
        e = t.GetStartTime().Time;
        s = t.GetEndTime().Time;
        e = e.FrameNumber.Value + e.SubFrame;
        s = s.FrameNumber.Value + s.SubFrame;
        s = (i = MathUtils_1.MathUtils.Clamp(e + i, e, s)) - (e = Math.floor(i));
        i = new UE.FrameTime(new UE.FrameNumber(e), s);
        e = new UE.MovieSceneSequencePlaybackParams(i, 0, "", 0, 0);
        t.SetPlaybackPosition(e);
      }
    }
  }
  OnQtePause() {
    this.jQa();
    if (this.hS1) {
      this.FOi("Loop", 0);
    }
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(this.fS1.HandleId);
    }
  }
  OnQteResume() {
    if (this.IsQtePlayStart) {
      this.HQa();
    }
    if (this.hS1) {
      if (this.NTe > 0) {
        this.FOi("Loop", 1 / this.NTe);
      } else {
        this.FOi("Loop", 0);
      }
    }
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.ResumeQte(this.fS1.HandleId);
    }
  }
  OnTick(t) {
    if (!!this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
      if (!this.fS1 || this.fS1.IsInvalid()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
        }
        this.HandleQteEnd();
      } else {
        this.fS1.UpdateTime(t);
        if (this.lS1) {
          this.cS1 = this.fS1.CurrentEnergyPercent / 100;
          if (this.uS1 > 0) {
            this._S1 = MathUtils_1.MathUtils.InterpConstantTo(this._S1, this.cS1, t, this.uS1);
          } else {
            this._S1 = this.cS1;
          }
          this.CS1("Charge", this._S1);
        }
        if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode) {
          this.Bfc();
        }
      }
    }
  }
  Bfc() {
    var t;
    if (this.fS1 && (t = this.fS1.GetUiConfig())) {
      t = t.UIConfig;
      this.OOi.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign);
      this.OOi.SetAnchorOffset(t.AnchorOffset);
    }
  }
}
exports.CommonQteContinuousClickView = CommonQteContinuousClickView;
//# sourceMappingURL=CommonQteContinuousClickView.js.map