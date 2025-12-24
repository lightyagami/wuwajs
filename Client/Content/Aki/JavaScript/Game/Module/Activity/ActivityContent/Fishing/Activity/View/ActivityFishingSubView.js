"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFishingSubView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const ActivitySubViewBase_1 = require("../../../../View/SubView/ActivitySubViewBase");
const RecommendQuestTipsSubPanel_1 = require("../../../DirectTrain/SubView/RecommendQuestTipsSubPanel");
const ActivityDescriptionTypeA_1 = require("../../../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../../UniversalComponents/Title/ActivityTitleTypeA");
const FishingPermanentRewardButton_1 = require("../../FishingDock/FishingPermanentRewardButton");
const FishingRewardLimitTimeButton_1 = require("./Components/FishingRewardLimitTimeButton");
class ActivityFishingSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.Atl = undefined;
    this.hx_ = undefined;
    this.cxl = undefined;
    this.ActivityBaseData = undefined;
    this.mxl = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(237);
      i.FunctionMap.set(2, () => {
        var i = this.ActivityBaseData.GetRecommendQuestLinkId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.xJa = () => {
      if (!this.ActivityBaseData.SaveFirstCheckRedDotState(0)) {
        this.BNe();
      }
    };
    this.h6_ = i => {
      if (this.ActivityBaseData.Id === i && !(i = this.ActivityBaseData.GetUnFinishPreGuideQuestId(), ModelManager_1.ModelManager.QuestNewModel.IsTrackingQuest(i))) {
        ControllerHolder_1.ControllerHolder.QuestNewController.RequestTrackQuest(i, true, 2, 0);
      }
    };
    this.uZ_ = () => !ModelManager_1.ModelManager.GameModeModel.IsMulti || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("CantUseInMultiplayerMode"), false);
    this.DFe = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityContentView(this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    var t = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    i.push(this.LNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    i.push(this.DNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    i.push(this.UNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    i.push(this.ANe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(4);
    this.Atl = new FishingRewardLimitTimeButton_1.FishingRewardLimitTimeButton(this.ActivityBaseData);
    i.push(this.Atl.CreateByActorAsync(t.GetOwner()));
    var t = this.GetItem(5);
    this.hx_ = new FishingPermanentRewardButton_1.FishingPermanentRewardButton();
    i.push(this.hx_.CreateByActorAsync(t.GetOwner()));
    var t = this.GetItem(6);
    this.cxl = new RecommendQuestTipsSubPanel_1.RecommendQuestTipsSubPanel();
    i.push(this.cxl.CreateThenShowByActorAsync(t.GetOwner()));
    this.cxl.BindClickBtnTipsCallBack(this.mxl);
    await Promise.all(i);
  }
  OnStart() {
    var i;
    var t;
    var e = this.ActivityBaseData.LocalConfig;
    if (e) {
      t = e.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(t);
      this.LNe.SetActivityBaseData(this.ActivityBaseData);
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      this.LNe.SetSubTitleVisible(i);
      if (i) {
        this.LNe.SetSubTitleByTextId(t);
      }
      i = e.Desc;
      this.DNe.SetContentByTextId(i);
      t = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(t);
      this.ZGe();
      this.ANe.FunctionButton.SetExtraFunction(this.xJa);
      this.KV_();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityPreOpen, this.h6_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityPreOpen, this.h6_);
  }
  OnRefreshView() {
    this.FNe();
    this._Fe();
    this.BNe();
    this.Cxl();
    this.ZGe();
  }
  async OnBeforeHideSelfAsync() {
    this.Atl.SetActive(false);
  }
  OnTimer(i) {
    this.FNe();
  }
  KV_() {
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1;
    this.GetItem(7)?.SetUIActive(i);
    this.GetItem(8)?.SetUIActive(!i);
  }
  _Fe() {
    var i = {
      UnlockBtnTextId: "Fishing_Goto",
      UnlockBtnFunction: this.DFe,
      BeforePreOpenCheck: this.uZ_
    };
    this.ANe.RefreshGeneralPerformance(i);
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  ZGe() {
    this.Atl.RefreshActive();
    var i = this.ActivityBaseData.IsUnLock();
    if (i) {
      this.hx_.Refresh();
    }
    this.hx_.SetUiActive(i);
  }
  BNe() {
    var i = this.ActivityBaseData.GetButtonRedPointShowState();
    this.ANe.SetFunctionRedDotVisible(i);
  }
  RPl() {
    return !this.ActivityBaseData.IsRecommendQuestFinished();
  }
  Cxl() {
    var i = this.RPl();
    this.cxl.SetUiActive(i);
    if (i) {
      i = this.ActivityBaseData.GetActivityConfig().RecommendQuestLabel;
      this.cxl.SetTipsTxtByTextId(i);
    }
  }
}
exports.ActivityFishingSubView = ActivityFishingSubView;
//# sourceMappingURL=ActivityFishingSubView.js.map