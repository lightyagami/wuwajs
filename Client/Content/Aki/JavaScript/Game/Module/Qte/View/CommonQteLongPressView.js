"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteLongPressView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const CommonQteLongPressContext_1 = require("../CommonQte/CommonQteLongPressContext");
const CommonQteViewBase_1 = require("./CommonQteViewBase");
class CommonQteLongPressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$Xu = undefined;
    this.Tyr = undefined;
    this.DOt = undefined;
    this.Qtt = undefined;
    this.WXu = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UISprite]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([3, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch() && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(3))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    this.$Xu = this.GetButton(0);
    this.Tyr = this.GetTexture(1);
    this.DOt = this.GetSprite(2);
    this.Tyr?.SetFillAmount(0);
    this.$Xu?.OnPointDownCallBack.Bind(() => {
      this.WXu?.OnPress();
    });
    this.$Xu?.OnPointUpCallBack.Bind(() => {
      this.WXu?.OnRelease();
    });
    this.$Xu?.OnPointCancelCallBack.Bind(() => {
      this.WXu?.OnRelease();
    });
    this.Qtt?.Hide();
  }
  OnBeforeDestroy() {
    this.$Xu?.OnPointDownCallBack.Unbind();
    this.$Xu?.OnPointUpCallBack.Unbind();
    this.$Xu?.OnPointCancelCallBack.Unbind();
    this.WXu = undefined;
  }
  SetQteView(t) {
    this.WXu = t || undefined;
  }
  RefreshAction(t) {
    if (!Info_1.Info.IsInTouch()) {
      this.Qtt?.RefreshByActionOrAxis({
        ActionOrAxisName: t
      });
    }
  }
  RefreshIcon(t) {
    this.DOt?.SetSprite(t, false);
    this.DOt?.SetUIActive(true);
  }
  RefreshProgress(t) {
    this.Tyr?.SetFillAmount(t);
  }
  ShowKeyItem() {
    this.Qtt?.Show();
  }
  HideKeyItem() {
    this.Qtt?.Hide();
  }
}
class CommonQteLongPressView extends CommonQteViewBase_1.CommonQteViewBase {
  constructor() {
    super(...arguments);
    this.QXu = undefined;
    this.SPe = undefined;
    this.NQa = false;
    this.FQa = "";
    this.iIl = -1;
    this.fS1 = undefined;
    this.$xt = t => {
      if (t === "Start") {
        if (!this.IsQteEnd) {
          if (!this.IsMobile) {
            this.QXu?.ShowKeyItem();
          }
          this.IsQteStart = true;
          this.IsQteInteractive = true;
        }
      } else if (t === "Close") {
        UiManager_1.UiManager.CloseView("CommonQteLongPressView");
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
    super.OnRegisterComponent();
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.QXu = new CommonQteLongPressItem();
    var t = this.GetItem(0);
    if (t) {
      await this.QXu?.CreateByActorAsync(t.GetOwner());
      this.QXu.SetQteView(this);
    }
  }
  OnStart() {
    super.OnStart();
    this.QXu?.SetUiActive(false);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(0));
    this.SPe.BindSequenceCloseEvent(this.$xt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    if (!this.IsQteEnd && this.fS1?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.fS1.HandleId);
    }
    this.jQa();
    this.SPe?.Clear();
    this.fS1 = undefined;
    this.iIl = -1;
    this.FQa = "";
    this.QXu?.SetQteView(undefined);
  }
  SetQteContext(t) {
    var i;
    if (t instanceof CommonQteLongPressContext_1.CommonQteLongPressContext) {
      this.iIl = t.HandleId;
      if (i = (this.fS1 = t).GetAction()) {
        this.FQa = i;
        this.QXu?.RefreshAction(i);
      }
      this.IsQteInteractive = false;
      if (i = t.GetUiConfig()) {
        this.IsQteInteractive = i.InteractiveTiming === 0;
      }
      if (i = t.Resource?.Icon) {
        this.QXu?.RefreshIcon(i);
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
      this.QXu?.SetUiActive(true);
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
      this.QXu?.HideKeyItem();
      this.SPe?.StopCurrentSequence();
      this.SPe?.PlayLevelSequenceByName("Close");
      this.jQa();
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
    if (!!this.IsQteStart && !this.IsQteEnd && !this.IsQtePause) {
      if (!this.fS1 || this.fS1.IsInvalid()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.fS1?.State]);
        }
        this.HandleQteEnd();
      } else {
        this.fS1.UpdateTime(t);
        this.QXu?.RefreshProgress(this.fS1.GetProgress());
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
      this.QXu?.GetRootItem().SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign);
      this.QXu?.GetRootItem().SetAnchorOffset(t.AnchorOffset);
    }
  }
}
exports.CommonQteLongPressView = CommonQteLongPressView;
//# sourceMappingURL=CommonQteLongPressView.js.map