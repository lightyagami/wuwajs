"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteSingleClickView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const CombineKeyItem_1 = require("../../BattleUi/Views/KeyItem/CombineKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CommonQteSingleClickContext_1 = require("../CommonQte/CommonQteSingleClickContext");
const CommonQteViewBase_1 = require("./CommonQteViewBase");
const LOOP_ANIM_START_OFFSET = 1.167;
const LOOP_SEQUENCE = "Loop2";
class CommonQteSingleClickView extends CommonQteViewBase_1.CommonQteViewBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.xfc = undefined;
    this.OOi = undefined;
    this.d5l = undefined;
    this.DOt = undefined;
    this.NUi = undefined;
    this.Tyr = undefined;
    this.SPe = undefined;
    this.lMc = undefined;
    this.NTe = 0;
    this.NQa = false;
    this.FQa = "";
    this.iIl = -1;
    this.fS1 = undefined;
    this._Mc = false;
    this.$xt = t => {
      if (t === "Start") {
        if (!this.IsQteEnd) {
          this.SPe?.PlayLevelSequenceByName(LOOP_SEQUENCE);
          if (!this.IsQtePause && this.NTe > 0) {
            this.FOi(LOOP_SEQUENCE, 1 / this.NTe);
          } else {
            this.FOi(LOOP_SEQUENCE, 0);
          }
          if (!this.IsMobile) {
            this.xfc?.SetUIActive(true);
          }
          this.IsQteStart = true;
          this.IsQteInteractive = true;
        }
      } else if (t === "Success" || t === "Fail") {
        UiManager_1.UiManager.CloseView("CommonQteView");
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
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UITexture]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UITexture]];
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!this.IsMobile && (this.Qtt = new CombineKeyItem_1.CombineKeyItem(), t = this.GetItem(2))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    super.OnStart();
    if (this.IsMobile) {
      this.OOi = this.GetItem(0);
      this.d5l = this.GetButton(1);
      this.DOt = this.GetSprite(2);
      this.NUi = this.GetItem(3);
      this.Tyr = this.GetTexture(4);
    } else {
      this.OOi = this.GetItem(0);
      this.d5l = this.GetButton(4);
      this.DOt = this.GetSprite(3);
      this.xfc = this.GetItem(1);
      this.xfc?.SetUIActive(false);
      this.NUi = this.GetItem(5);
      this.Tyr = this.GetTexture(6);
    }
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
    if (t instanceof CommonQteSingleClickContext_1.CommonQteSingleClickContext) {
      this.iIl = t.HandleId;
      if (i = (this.fS1 = t).GetAction()) {
        this.FQa = i;
        this.Qtt?.RefreshAction(i);
        this.Qtt?.Show();
      }
      this.NTe = Math.max(0, t.Duration * TimeUtil_1.TimeUtil.Millisecond);
      this.IsQteInteractive = false;
      this._Mc = false;
      if (i = t.GetUiConfig()) {
        this.IsQteInteractive = i.InteractiveTiming === 0;
        this._Mc = i.IsShowBorder;
      }
      if (i = ModelManager_1.ModelManager.CommonQteModel?.GetQteIcon(t.QteId)) {
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
      this.SPe?.PlayLevelSequenceByName("Start");
      if (this._Mc) {
        this.NUi?.SetUIActive(true);
        this.lMc?.PlayLevelSequenceByName("Start");
      }
      this.HQa();
      ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(this.fS1);
    }
  }
  CommonQteEnd(t) {
    if (this.iIl === t) {
      this.HandleQteEnd();
    }
  }
  RefreshOnBattleUiVisibleChanged() {
    var t;
    if (this.fS1?.Source === 0) {
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
    if (this.fS1 && this.fS1.IsActive() && this.fS1.IsPending()) {
      this.fS1.Response();
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
      if (!this.IsMobile) {
        this.xfc?.SetUIActive(false);
      }
      this.SPe?.StopCurrentSequence();
      if (this.fS1?.IsSuccess()) {
        this.SPe?.PlayLevelSequenceByName("Success");
      } else {
        this.SPe?.PlayLevelSequenceByName("Fail");
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
  SY1() {
    var t;
    var i = this.OOi.GetOwner();
    if (this.NTe > 0) {
      t = (this.fS1?.GetRemainingTime() ?? 0) * TimeUtil_1.TimeUtil.Millisecond;
      i.GetSequencePlayerByKey(LOOP_SEQUENCE)?.SequencePlayer?.JumpToSeconds(LOOP_ANIM_START_OFFSET + 1 - t / this.NTe);
    }
  }
  OnQtePause() {
    this.jQa();
    if (this.IsQtePlayStart && !this.IsQteStart) {
      this.FOi("Start", 0);
    } else if (this.IsQteStart) {
      this.FOi(LOOP_SEQUENCE, 0);
    }
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(this.fS1.HandleId);
    }
  }
  OnQteResume() {
    if (this.IsQtePlayStart) {
      this.HQa();
    }
    if (this.IsQtePlayStart) {
      if (this.IsQteStart) {
        if (this.NTe > 0) {
          this.SY1();
          this.FOi(LOOP_SEQUENCE, 1 / this.NTe);
        } else {
          this.FOi(LOOP_SEQUENCE, 0);
        }
      } else {
        this.FOi("Start", 1);
      }
    } else {
      this.PlayQteStart();
    }
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.ResumeQte(this.fS1.HandleId);
    }
  }
  OnTick(i) {
    if (this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
      if (!this.fS1 || this.fS1.IsInvalid()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
        }
        this.HandleQteEnd();
      } else {
        this.fS1.UpdateTime(i);
        let t = 1;
        if (this.NTe > 0) {
          i = (this.fS1?.GetRemainingTime() ?? 0) * TimeUtil_1.TimeUtil.Millisecond;
          t = i / this.NTe;
        }
        this.Tyr?.SetFillAmount(t);
        if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode) {
          this.Bfc();
        }
      }
    }
  }
  Bfc() {
    var t;
    if (this.fS1 && (t = this.fS1.GetUiConfig()?.UIConfig)) {
      this.OOi.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign);
      this.OOi.SetAnchorOffset(t.AnchorOffset);
    }
  }
}
exports.CommonQteSingleClickView = CommonQteSingleClickView;
//# sourceMappingURL=CommonQteSingleClickView.js.map