"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonQteSelectOptionItem = undefined;
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
class CommonQteSelectOptionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xy = -1;
    this.FQa = "";
    this.NQa = false;
    this.fS1 = undefined;
    this.SPe = undefined;
    this.CQc = undefined;
    this.sit = undefined;
    this.yQc = undefined;
    this.Qtt = undefined;
    this.$xt = t => {
      if (t === "Start") {
        this.SPe?.PlayLevelSequenceByName("Loop");
        if (!Info_1.Info.IsInTouch()) {
          this.Qtt?.Show();
        }
      } else if (t === "Success" || t === "Fail") {
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
    this.CQc = i;
    this.sit = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([4, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch() && (this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem(), t = this.GetItem(4))) {
      await this.Qtt?.CreateByActorAsync(t.GetOwner());
    }
  }
  OnStart() {
    super.OnStart();
    this.yQc = this.GetExtendToggle(0);
    this.yQc?.OnPointDownCallBack.Bind(() => {
      this.OnPress();
    });
    if (this.Qtt) {
      this.Qtt?.Hide();
    } else {
      this.GetItem(4)?.SetUIActive(false);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.$xt);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy();
    this.jQa();
    this.yQc?.OnPointDownCallBack.Unbind();
    this.SPe?.Clear();
    this.fS1 = undefined;
    this.CQc = undefined;
    this.FQa = "";
    this.sit = undefined;
  }
  SetQteContext(t) {
    if (t instanceof CommonQteSelectOptionContext_1.CommonQteSelectOptionContext && ((t = (this.fS1 = t).GetAction(this.Xy)) && (this.FQa = t, Info_1.Info.IsInTouch() || this.Qtt?.RefreshByActionOrAxis({
      ActionOrAxisName: t
    })), this.CQc?.TextId)) {
      t = this.GetText(2);
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.CQc.TextId);
    }
  }
  PlayQteStart() {
    this.$xt("Start");
    this.HQa();
    this.SetUiActive(true);
  }
  PlayQteEnd() {
    this.Qtt?.Hide();
    this.SPe?.StopCurrentSequence();
    if (this.fS1?.IsSuccess() && this.fS1?.SelectOption === this.Xy) {
      this.$xt("Success");
    } else {
      this.$xt("Fail");
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
  RefreshUiOffset() {
    var t = this.CQc;
    if (t) {
      this.RootItem?.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign);
      this.RootItem?.SetAnchorOffset(t.AnchorOffset);
    }
  }
  SetAnchorOffsetX(t) {
    this.GetItem(3)?.SetAnchorOffsetX(t);
  }
}
exports.CommonQteSelectOptionItem = CommonQteSelectOptionItem;
//# sourceMappingURL=CommonQteSelectOptionItem.js.map