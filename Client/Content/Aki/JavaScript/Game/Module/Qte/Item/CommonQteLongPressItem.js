"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteLongPressItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonQteLongPressContext_1 = require("../CommonQte/CommonQteLongPressContext");
const CommonQteItemBase_1 = require("./CommonQteItemBase");
class CommonQteLongPressItem extends CommonQteItemBase_1.CommonQteItemBase {
  constructor() {
    super(...arguments);
    this.FQa = "";
    this.iIl = -1;
    this.NQa = false;
    this.fS1 = undefined;
    this.SPe = undefined;
    this.dbe = 0;
    this.$Xu = undefined;
    this.Tyr = undefined;
    this.gQc = undefined;
    this.Qtt = undefined;
    this.$xt = t => {
      if (t === "Start") {
        if (!this.IsQteEnd) {
          this.SPe?.PlayLevelSequenceByName("Loop");
          if (!this.IsMobile) {
            this.Qtt?.Show();
          }
          this.IsQteStart = true;
          this.IsQteInteractive = true;
        }
      } else if (t === "Close") {
        this.Destroy();
      }
    };
    this.BOi = (t, i) => {
      if (this.IsValidInput()) {
        this.bOi(i);
        if (i === 0) {
          this.$Xu?.SetSelectionState(2);
        } else {
          this.$Xu?.SetSelectionState(0);
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
      }
    };
    this.jj_ = (t, i) => {
      if (Info_1.Info.IsInGamepad() && ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.IsSwitchInteractOpen && ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.State === 2 && this.FQa === InputMappingsDefine_1.actionMappings.幻象1) {
        this.BOi(t, i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UISliderComponent]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([5, UE.UIItem]);
      this.ComponentRegisterInfos.push([6, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch() && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(6))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    var t;
    super.OnStart();
    this.$Xu = this.GetButton(0);
    this.Tyr = this.GetTexture(1);
    this.gQc = this.GetSlider(4);
    this.gQc?.SetValue(1);
    this.gQc?.SetSelfInteractive(false);
    this.GetItem(3)?.SetUIActive(false);
    this.GetText(2)?.SetUIActive(false);
    this.$Xu?.OnPointDownCallBack.Bind(() => {
      this.OnPress();
    });
    this.$Xu?.OnPointUpCallBack.Bind(() => {
      this.OnRelease();
    });
    this.$Xu?.OnPointCancelCallBack.Bind(() => {
      this.OnRelease();
    });
    if (this.Qtt) {
      this.Qtt?.Hide();
    } else {
      this.GetItem(6)?.SetUIActive(false);
    }
    this.SetUiActive(false);
    if (Info_1.Info.IsInTouch()) {
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    } else {
      t = this.GetItem(5);
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(t);
      this.SetAttachRootItem(t);
    }
    this.SPe.BindSequenceCloseEvent(this.$xt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    this.jQa();
    this.$Xu?.OnPointDownCallBack.Unbind();
    this.$Xu?.OnPointUpCallBack.Unbind();
    this.$Xu?.OnPointCancelCallBack.Unbind();
    this.SPe?.Clear();
    this.fS1 = undefined;
    this.iIl = -1;
    this.FQa = "";
  }
  SetQteContext(t) {
    var i;
    var s;
    if (t instanceof CommonQteLongPressContext_1.CommonQteLongPressContext) {
      this.iIl = t.HandleId;
      if (i = (this.fS1 = t).GetAction()) {
        this.FQa = i;
        if (!Info_1.Info.IsInTouch()) {
          this.Qtt?.RefreshByActionOrAxis({
            ActionOrAxisName: i
          });
        }
      }
      this.IsQteInteractive = false;
      if (i = t.GetUiConfig()) {
        this.IsQteInteractive = i.InteractiveTiming === 0;
      }
      i = i?.UIConfig.TextId;
      s = this.GetText(2);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(s, i);
        s?.SetUIActive(true);
      }
      this.GetItem(3)?.SetUIActive(!t.IsPermanent);
      this.Bfc();
      this.SetQteActive(t);
    }
  }
  PlayQteStart() {
    if (this.IsQteActive && !this.IsQteEnd && !this.IsQtePause && this.fS1) {
      this.IsQtePlayStart = true;
      this.SetUiActive(true);
      this.SPe?.PlayLevelSequenceByName("Start");
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
    if (!this.IsAttaching) {
      if (this.fS1?.Source === 0) {
        t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20);
        this.SetActive(t);
      }
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
  OnPress() {
    if (this.IsValidInput()) {
      this.bOi(0);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
    }
  }
  OnRelease() {
    if (this.IsValidInput()) {
      this.bOi(1);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
    }
  }
  bOi(t) {
    if (this.fS1 && this.fS1.IsActive() && this.fS1.IsPending()) {
      if (t === 0) {
        this.fS1.Response();
      } else {
        this.fS1.ResponseEnd();
      }
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
      this.Qtt?.Hide();
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Close");
      this.jQa();
      this.ClearTickTimer();
    }
  }
  OnQtePause() {
    this.jQa();
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(this.fS1.HandleId);
    }
  }
  OnQteResume() {
    if (this.IsQtePlayStart) {
      this.HQa();
    }
    if (!this.IsQtePlayStart) {
      this.PlayQteStart();
    }
    if (this.fS1) {
      ControllerHolder_1.ControllerHolder.CommonQteController.ResumeQte(this.fS1.HandleId);
    }
  }
  OnTick(t) {
    if (this.RootItem?.IsValid()) {
      if (!!this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
        if (!this.fS1 || this.fS1.IsInvalid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
          }
          this.HandleQteEnd();
        } else {
          this.fS1.UpdateTime(t);
          if (!this.fS1.IsPermanent) {
            this.gQc?.SetValue(this.fS1?.GetRemainingTimeProgress() ?? 1);
          }
          if (this.fS1) {
            this.dbe = this.fS1.GetProgress();
          }
          this.Tyr?.SetFillAmount(this.dbe);
          if (ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode) {
            this.Bfc();
          }
        }
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("CommonQte", 67, "Item已销毁, 强制停止Qte");
      }
      this.HandleQteEnd();
    }
  }
  Bfc() {
    var t;
    if (this.fS1 && (t = this.fS1.GetUiConfig()) && (t = t.UIConfig, this.RootItem?.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign), this.RootItem?.SetAnchorOffset(t.AnchorOffset), this.IsAttaching)) {
      this.Reattach(this.fS1);
    }
  }
}
exports.CommonQteLongPressItem = CommonQteLongPressItem;
//# sourceMappingURL=CommonQteLongPressItem.js.map