"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuideTipsView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const UiManager_1 = require("../../../Ui/UiManager");
const GuideDefine_1 = require("../GuideDefine");
const GuideBaseView_1 = require("./GuideBaseView");
const GuideCountDownItem_1 = require("./GuideCountDownItem");
const GuideDescribeNew_1 = require("./GuideDescribeNew");
const GuidePrefabDefine_1 = require("./GuidePrefabDefine");
class GuideTipsView extends GuideBaseView_1.GuideBaseView {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.iqt = undefined;
    this.gZt = true;
    this.m9s = undefined;
    this.fZt = e => {
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
      if (e && !UiManager_1.UiManager.IsViewShow("GmView") && this.avd() && this.GuideStepInfo.Config.TimeScale < 1 && (e = Global_1.Global.CharacterController)) {
        e.bShowMouseCursor = false;
        this.d9s();
      }
    };
    this.mZt = (e, i) => {
      if (!e || !(this.CombineInputMap.set(e, i), !this.IsAllCombineInputPass())) {
        this.UnbindInput(this.Lo.InputEnums, this.Lo.InputEnums);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Guide", 53, "tip监听按键完成引导", ["最后按键", e]);
        }
        this.DoCloseByFinished();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  OnGuideBaseViewAddEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
  }
  OnGuideBaseViewRemoveEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShowMouseCursor, this.fZt);
  }
  OnGuideBaseViewAfterHide() {
    this.UnbindInput(this.Lo.InputEnums, this.Lo.InputEnums);
    if (this.UiViewSequence.HasSequenceNameInPlaying("Start")) {
      this.UiViewSequence.StopPrevSequence(true, true);
    }
  }
  OnBeforeGuideBaseViewCreate() {
    this.Lo = this.GuideStepInfo.ViewData.ViewConf;
    this.BindInput(this.Lo.InputEnums, this.Lo.InputEnums, this.mZt);
  }
  OnGuideBaseViewStart() {
    var e = this.GetText(2);
    e.SetUIActive(false);
    e.SetUIActive(true);
    new GuideDescribeNew_1.GuideDescribeNew(e).SetUpText(this.Lo.Content, ...this.Lo.Button);
    (0, GuidePrefabDefine_1.setPrefabText)(e, e.GetText());
    var e = this.GetItem(7);
    var i = MathCommon_1.MathCommon.Clamp(this.Lo.UseMask / 100, 0, 1);
    e.SetAlpha(i);
    e.SetRaycastTarget(i > 0);
  }
  OnGuideViewAfterShow() {
    var e = this.GetItem(3);
    if (this.TotalDuration) {
      this.iqt = new GuideCountDownItem_1.GuideCountDownItem(this.TotalDuration);
      this.iqt.Init(e);
    } else {
      e.SetUIActive(false);
    }
    this.BindInput(this.Lo.InputEnums, this.Lo.InputEnums, this.mZt);
  }
  async OnBeforeHideAsync() {
    var e = this.GetItem(3);
    this.UiViewSequence.StopSequenceByKey("Start");
    e.SetUIActive(false);
    this.C9s();
    if (this.IsFinished && !this.TimeTicker) {
      this.GetItem(1).SetUIActive(true);
      this.GetItem(8).SetUIActive(true);
      await this.PlaySequenceAsync("TipsGuideFinished");
    }
  }
  OnGuideBaseViewTick(e) {
    var i = this.avd() && ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(26) && !this.HasConflictView();
    if (!this.IsBusy && i !== this.gZt) {
      this.gZt = i;
      this.SetActive(i);
    }
  }
  OnAfterPlayStartSequence() {
    if (this.Lo.UseLoopAnim) {
      this.UiViewSequence.PlaySequence("AutoLoop1");
    } else {
      this.UiViewSequence.StopSequenceByKey("AutoLoop1");
    }
  }
  d9s() {
    var e = Global_1.Global.CharacterController;
    if (!this.m9s && !UE.KuroInputFunctionLibrary.HasInputModeReply(this.m9s)) {
      this.m9s = UE.KuroInputFunctionLibrary.SetGameOnlyInputMode(e, "GuideTipsView设置输入模式");
    }
  }
  C9s() {
    var e;
    if (this.m9s) {
      e = Global_1.Global.CharacterController;
      UE.KuroInputFunctionLibrary.ReplyInputMode(e, this.m9s);
      this.m9s = undefined;
    }
  }
  OnDurationChange(e) {
    if (this.iqt) {
      this.iqt.OnDurationChange(e);
    }
  }
  avd() {
    for (const e of GuideDefine_1.guideTipsAllowedViews) {
      if (UiManager_1.UiManager.IsViewShow(e)) {
        return true;
      }
    }
    return false;
  }
}
exports.GuideTipsView = GuideTipsView;
//# sourceMappingURL=GuideTipsView.js.map