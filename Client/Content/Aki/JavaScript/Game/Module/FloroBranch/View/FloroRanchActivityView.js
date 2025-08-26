"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchActivityView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const RecommendQuestTipsSubPanel_1 = require("../../Activity/ActivityContent/DirectTrain/SubView/RecommendQuestTipsSubPanel");
const ActivitySubViewBase_1 = require("../../Activity/View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../Activity/View/SubView/ActivitySubViewGeneralInfo");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class FloroRanchActivityView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = undefined;
    this.cxl = undefined;
    this.fs1 = undefined;
    this.Zmu = undefined;
    this.TDe = undefined;
    this.tWt = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ConnectBan");
      } else if (this.ActivityBaseData.GetIsReadComic()) {
        UiManager_1.UiManager.OpenView("FloroRanchMainView", this.ActivityBaseData);
      } else {
        UiManager_1.UiManager.OpenView("FloroRanchComicView");
      }
    };
    this.efu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchLimitRewardView");
    };
    this.tfu = () => {
      UiManager_1.UiManager.OpenView("FloroRanchPermanentRewardView");
    };
    this.mxl = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(237);
      i.FunctionMap.set(2, () => {
        var i = this.ActivityBaseData.GetRecommendQuestLinkId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.CUu = i => {
      if (i && i.getAnimationName() === "star") {
        this.GetSpine(3)?.SetAnimation(0, "idle", true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.SpineSkeletonAnimationComponent], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    i.push(this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    var e = this.GetItem(4);
    this.cxl = new RecommendQuestTipsSubPanel_1.RecommendQuestTipsSubPanel();
    i.push(this.cxl.CreateThenShowByActorAsync(e.GetOwner()));
    this.cxl.BindClickBtnTipsCallBack(this.mxl);
    await Promise.all(i);
    this.CommonInfoPanel?.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel?.SetClickFunc(this.tWt);
    this.CommonInfoPanel?.HideRemainTime();
    this.fs1 = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.fs1.SetFunction(this.efu);
    this.GetItem(1)?.SetUIActive(this.ActivityBaseData.IsInLimitTime());
    this.Zmu = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.Zmu.SetFunction(this.tfu);
    this.GetSpine(3).AnimationComplete.Add(this.CUu);
  }
  OnBeforeShow() {
    this.sSt();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.sSt();
    }, 1000);
  }
  OnRefreshView() {
    this._Fe();
    this.CommonInfoPanel?.SetFunctionRedDotVisible(this.ActivityBaseData.CheckRedDot());
    this.Zmu?.SetRedDotVisible(this.ActivityBaseData.IsPermanentTaskHasRedDot());
    this.fs1?.SetRedDotVisible(this.ActivityBaseData.IsLimitTaskHasRedDot());
    var i = this.ActivityBaseData.GetPermanentRewardProgress();
    this.Zmu?.SetText(i);
    this.Cxl();
    this.GetSpine(3)?.SetAnimation(0, "star", false);
  }
  sSt() {
    if (!this.ActivityBaseData.IsInLimitTime() && this.TDe) {
      this.GetItem(1)?.SetUIActive(this.ActivityBaseData.IsInLimitTime());
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    var i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.ActivityBaseData.GetLimitTimeActivityEndTime(), "{0}");
    this.fs1?.SetText(i);
  }
  _Fe() {
    var i = this.CommonInfoPanel.GetFunctional();
    var e = {
      UnlockBtnTextId: "LongShanStage_Join01",
      UnlockBtnFunction: this.tWt
    };
    i.RefreshGeneralPerformance(e);
  }
  Cxl() {
    var i = !this.ActivityBaseData.IsRecommendQuestFinished();
    this.cxl.SetUiActive(i);
    if (i) {
      i = this.ActivityBaseData.GetFloroRanchParamConfig().RecommendQuestLabel;
      this.cxl.SetTipsTxtByTextId(i);
    }
  }
  OnBeforeHide() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnBeforeDestroy() {
    this.GetSpine(3)?.AnimationComplete.Remove(this.CUu);
  }
}
exports.FloroRanchActivityView = FloroRanchActivityView;
//# sourceMappingURL=FloroRanchActivityView.js.map