"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPrizeDrawingSubView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityButtonItem_1 = require("../UniversalComponents/Functional/ActivityButtonItem");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const PrizeDrawingQuestItem_1 = require("./Components/PrizeDrawingQuestItem");
class ActivityPrizeDrawingSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.j8d = undefined;
    this.vKt = undefined;
    this.ZTn = undefined;
    this.H8d = false;
    this.UKd = () => {
      this.OnRefreshView();
    };
    this.xJa = () => {
      if (this.ActivityBaseData) {
        ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(this.ActivityBaseData);
      }
    };
    this.$Ht = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        this.H8d = true;
        UiManager_1.UiManager.OpenView("PrizeDrawingMainView");
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[8, this.$Ht]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    var t = this.GetItem(2);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    i.push(this.LNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(3);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    i.push(this.DNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(7);
    this.j8d = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    i.push(this.j8d.CreateByActorAsync(t.GetOwner()));
    var t = this.GetItem(9);
    this.vKt = new ActivityButtonItem_1.ActivityButtonItem();
    i.push(this.vKt.CreateByActorAsync(t.GetOwner()));
    var t = this.GetItem(6);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    i.push(this.UNe.CreateThenShowByActorAsync(t.GetOwner()));
    this.ZTn = new PrizeDrawingQuestItem_1.PrizeDrawingQuestItem();
    i.push(this.ZTn.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    await Promise.all(i);
  }
  OnStart() {
    const i = this.ActivityBaseData;
    i.ReadRedDot();
    this.LNe.SetTitleByText(i.GetTitle());
    this.DNe.SetContentByTextId(i.LocalConfig.Desc);
    var t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(i.ConditionGroupId);
    if (t) {
      this.j8d.SetTextByTextId(t);
    }
    this.j8d.ButtonCallBack = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(i.Id);
    };
    this.vKt.SetExtraFunction(this.xJa);
    this.vKt.SetFunction(this.$Ht);
  }
  OnRefreshView() {
    this.kNe();
    this.XJd();
    this.FNe();
    this.Nqe();
    this.hLn();
  }
  OnTimer(i) {
    this.FNe();
  }
  async OnBeforeHideSelfAsync() {
    if (this.H8d) {
      this.H8d = false;
      await this.LevelSequencePlayer.PlaySequenceAsync("HideView", new CustomPromise_1.CustomPromise(), true);
    }
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPrizeDrawingQuestUpdated, this.UKd);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPrizeDrawingQuestUpdated, this.UKd);
  }
  Nqe() {
    var i = this.ActivityBaseData;
    var t = i.GetCurrentProgress();
    var i = i.GetTotalProgress();
    this.GetText(4)?.SetText(t + "/" + i);
    this.GetItem(5)?.SetUIActive(i <= t);
  }
  hLn() {
    var i;
    var t;
    if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
      this.ZTn?.GetRootItem().SetUIActive(true);
      if ((i = this.ActivityBaseData).IsQuestAllCompleted()) {
        this.ZTn?.RefreshFinishState(true);
      } else {
        this.ZTn?.RefreshFinishState(false);
        if (t = i.GetCurrentQuestId()) {
          this.ZTn?.RefreshByQuestId(t, i.GetQuestProgress(), i.GetQuestTotalProgress());
        }
      }
    } else {
      this.ZTn?.GetRootItem().SetUIActive(false);
    }
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  kNe() {
    var i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(i);
  }
  XJd() {
    if (this.ActivityBaseData?.IsUnLock()) {
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        if (this.ActivityBaseData?.IsAllFinished()) {
          this.$8d(3);
        } else {
          this.$8d(2);
        }
      } else {
        this.$8d(1);
      }
    } else {
      this.$8d(0);
    }
  }
  $8d(i) {
    this.GetItem(0)?.SetUIActive(i === 0);
    this.GetItem(1)?.SetUIActive(i !== 0);
    this.GetItem(11)?.SetUIActive(i === 2 || i === 3);
    this.GetItem(7)?.SetUIActive(i === 0);
    this.GetButton(8)?.RootUIComp.SetUIActive(i === 3);
    this.GetItem(9)?.SetUIActive(i === 1 || i === 2);
    switch (i) {
      case 1:
        this.vKt?.SetShowText("Ichiban_Kuji_GuideQuestTips");
        this.vKt?.SetRedDotVisible(this.ActivityBaseData.NeedFinishGuideQuest());
        break;
      case 0:
        break;
      case 2:
      case 3:
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewCurrency, [this.ActivityBaseData.GetCostCoinId()]);
        this.vKt?.SetShowText("Ichiban_Kuji_SkipMainViewTips");
        this.vKt?.SetRedDotVisible(this.ActivityBaseData.ShouldShowButtonRedDot());
    }
  }
}
exports.ActivityPrizeDrawingSubView = ActivityPrizeDrawingSubView;
//# sourceMappingURL=ActivityPrizeDrawingSubView.js.map