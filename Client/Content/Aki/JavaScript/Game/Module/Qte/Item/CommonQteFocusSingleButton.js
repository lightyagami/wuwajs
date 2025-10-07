"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteFocusSingleButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CommonQteSingleClickContext_1 = require("../CommonQte/CommonQteSingleClickContext");
const CommonQteItemBase_1 = require("./CommonQteItemBase");
class CommonQteFocusSingleButton extends CommonQteItemBase_1.CommonQteItemBase {
  constructor() {
    super(...arguments);
    this.FQa = "";
    this.iIl = -1;
    this.NQa = false;
    this.fS1 = undefined;
    this.SPe = undefined;
    this.$Xu = undefined;
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
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([2, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch() && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(2))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    super.OnStart();
    this.$Xu = this.GetButton(1);
    this.$Xu?.OnPointDownCallBack.Bind(() => {
      this.OnPress();
    });
    if (this.Qtt) {
      this.Qtt?.Hide();
    } else {
      this.GetItem(2)?.SetUIActive(false);
    }
    this.SetUiActive(false);
    var t = this.GetItem(0);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(t);
    this.SetAttachRootItem(t);
    this.SPe.BindSequenceCloseEvent(this.$xt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    this.jQa();
    this.$Xu?.OnPointDownCallBack.Unbind();
    this.SPe?.Clear();
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
        if (!Info_1.Info.IsInTouch()) {
          this.Qtt?.RefreshByActionOrAxis({
            ActionOrAxisName: i
          });
          this.Qtt?.Show();
        }
      }
      this.IsQteInteractive = false;
      if (i = t.GetUiConfig()) {
        this.IsQteInteractive = i.InteractiveTiming === 0;
      }
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
  bOi(t) {
    if (this.fS1 && this.fS1.IsActive() && this.fS1.IsPending() && t === 0) {
      this.fS1.Response();
    }
  }
  HandleQteEnd() {
    if (!this.IsQteEnd) {
      this.IsQteEnd = true;
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
    var i;
    if (this.fS1 && (t = this.fS1.GetUiConfig()) && (i = t.UIConfig, this.RootItem?.SetAnchorAlign(i.AnchorHAlign, i.AnchorVAlign), this.RootItem?.SetAnchorOffset(i.AnchorOffset), this.IsAttaching && this.Reattach(this.fS1), i = this.GetButton(1)?.RootUIComp)) {
      i.SetAnchorAlign(t.ButtonAnchorHAlign, t.ButtonAnchorVAlign);
      i.SetAnchorOffset(t.ButtonOffset);
    }
  }
}
exports.CommonQteFocusSingleButton = CommonQteFocusSingleButton;
//# sourceMappingURL=CommonQteFocusSingleButton.js.map