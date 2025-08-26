"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteCustomOptionItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonQteSelectOptionContext_1 = require("../CommonQte/CommonQteSelectOptionContext");
class CommonQteCustomOptionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xy = -1;
    this.FQa = "";
    this.NQa = false;
    this.fS1 = undefined;
    this.SPe = undefined;
    this.QZu = undefined;
    this.sit = undefined;
    this.$Zu = undefined;
    this.WZu = undefined;
    this.Qtt = undefined;
    this.$xt = t => {
      if (t === "Start") {
        this.SPe?.PlayLevelSequenceByName("Loop");
        if (!Info_1.Info.IsInTouch()) {
          this.Qtt?.Show();
        }
      } else if (t === "Press" || t === "Close") {
        this.sit?.OnOptionItemPlayEnded(this);
      }
    };
    this.BOi = (t, i) => {
      if (this.sit?.IsValidInput()) {
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
  Init(t, i, e) {
    this.Xy = t;
    this.QZu = i;
    this.sit = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIItem], [3, UE.UISliderComponent]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([4, UE.UIItem]);
      this.ComponentRegisterInfos.push([5, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch() && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(5))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    super.OnStart();
    this.$Zu = this.GetButton(0);
    this.WZu = this.GetSlider(3);
    this.WZu?.SetValue(1);
    this.WZu?.SetSelfInteractive(false);
    this.GetItem(2)?.SetUIActive(false);
    this.GetText(1)?.SetUIActive(false);
    this.$Zu?.OnPointDownCallBack.Bind(() => {
      this.OnPress();
    });
    if (this.Qtt) {
      this.Qtt?.Hide();
    } else {
      this.GetItem(5)?.SetUIActive(false);
    }
    var t = Info_1.Info.IsInTouch() ? this.RootItem : this.GetItem(4);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(t);
    this.SPe.BindSequenceCloseEvent(this.$xt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.jQa();
    this.$Zu?.OnPointDownCallBack.Unbind();
    this.SPe?.Clear();
    this.fS1 = undefined;
    this.QZu = undefined;
    this.FQa = "";
    this.sit = undefined;
  }
  SetQteContext(t) {
    var i;
    var e;
    if (t instanceof CommonQteSelectOptionContext_1.CommonQteSelectOptionContext) {
      if (i = (this.fS1 = t).GetAction(this.Xy)) {
        this.FQa = i;
        if (!Info_1.Info.IsInTouch()) {
          this.Qtt?.RefreshByActionOrAxis({
            ActionOrAxisName: i
          });
        }
      }
      i = this.QZu?.TextId;
      e = this.GetText(1);
      if (i) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, i);
        e?.SetUIActive(true);
      }
      this.GetItem(2)?.SetUIActive(!t.IsPermanent);
      this.RefreshUiOffset();
    }
  }
  PlayQteStart() {
    this.SPe?.PlayLevelSequenceByName("Start");
    this.$xt("Start");
    this.HQa();
    this.SetUiActive(true);
  }
  PlayQteEnd() {
    this.Qtt?.Hide();
    this.SPe?.StopCurrentSequence();
    if (this.fS1?.IsSuccess() && this.fS1?.SelectOption === this.Xy) {
      this.SPe?.PlayLevelSequenceByName("Press");
    } else {
      this.SPe?.PlayLevelSequenceByName("Close");
    }
    this.jQa();
  }
  HQa() {
    if (!this.NQa && !(this.NQa = true, Info_1.Info.IsInTouch())) {
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
      if (!Info_1.Info.IsInTouch()) {
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
    if (this.sit?.IsValidInput()) {
      this.bOi(0);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效");
    }
  }
  bOi(t) {
    if (this.fS1 && this.fS1.IsActive() && this.fS1.IsPending() && t === 0) {
      this.fS1.SelectOption = this.Xy;
      this.fS1.Response();
    }
  }
  OnQtePause() {
    this.jQa();
  }
  OnQteResume() {
    this.HQa();
  }
  SetProgress(t) {
    this.WZu?.SetValue(t);
  }
  RefreshUiOffset() {
    var t = this.QZu;
    if (t) {
      this.RootItem?.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign);
      this.RootItem?.SetAnchorOffset(t.AnchorOffset);
    }
  }
}
exports.CommonQteCustomOptionItem = CommonQteCustomOptionItem;
//# sourceMappingURL=CommonQteCustomOptionItem.js.map