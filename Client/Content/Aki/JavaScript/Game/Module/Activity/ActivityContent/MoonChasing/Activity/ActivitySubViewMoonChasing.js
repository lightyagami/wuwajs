"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewMoonChasing = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalArea_1 = require("../../UniversalComponents/Functional/ActivityFunctionalArea");
const ActivityQuestTipsItem_1 = require("../../UniversalComponents/Functional/ActivityQuestTipsItem");
const ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewMoonChasing extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.nta = undefined;
    this.Sfa = undefined;
    this.s6e = undefined;
    this.wNe = i => {
      if (i === this.ActivityBaseData.Id) {
        this.BNe();
      }
    };
    this.sta = () => {
      UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetPreStageQuestId());
    };
    this.tDa = () => {
      var i;
      if (this.ActivityBaseData.PermanentTargetOn) {
        i = this.ActivityBaseData.ActivityFlowState === 0;
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenRewardView(i);
      }
    };
    this.iDa = () => {
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenHandbookView();
    };
    this.OpenRewardPopUp = () => {
      var i;
      if (this.ActivityBaseData.LimitTimeRewardOn && (i = this.ActivityBaseData.GetAllRewardData())) {
        UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", i);
      }
    };
    this.ONe = () => {
      var i;
      if (this.ActivityBaseData.ActivityFlowState !== 1) {
        if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
          i = {
            MarkId: ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(this.ActivityBaseData.Id).FocusMarkId,
            MarkType: 6
          };
          ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, i);
          return;
        } else if (this.ActivityBaseData.IsPreStageQuestFinished()) {
          UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetUnFinishPreGuideQuestId());
          return;
        } else {
          (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(190)).FunctionMap.set(2, () => {
            UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetUnFinishPreGuideQuestId());
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
          return;
        }
      }
      ControllerHolder_1.ControllerHolder.MoonChasingController.OpenMemoryEntranceView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(3);
    this.ANe = new ActivityFunctionalArea_1.ActivityFunctionalArea(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(7);
    this.nta = new ActivityQuestTipsItem_1.ActivityQuestTipsItem();
    await this.nta.CreateThenShowByActorAsync(i.GetOwner());
    this.Sfa = new ButtonItem_1.ButtonItem(this.GetItem(9));
    this.Sfa.SetFunction(this.iDa);
    this.s6e = new ButtonItem_1.ButtonItem(this.GetItem(8));
    this.s6e.SetFunction(this.tDa);
  }
  OnStart() {
    var i;
    var t;
    var e = this.ActivityBaseData.LocalConfig;
    if (e) {
      t = e.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(t);
      this.LNe.SetSubTitleVisible(i);
      if (i) {
        this.LNe.SetSubTitleByTextId(t);
      }
      this.LNe.SetActivityBaseData(this.ActivityBaseData);
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      i = e.Desc;
      this.DNe.SetContentByTextId(i);
      t = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetActive(t.length > 0);
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(t);
      this.GetItem(4).SetUIActive(false);
      this.ANe.FunctionButton.SetFunction(this.ONe);
      this.nta.SetActive(false);
      this.nta.SetRewardButtonFunction(this.sta);
    }
  }
  OnRefreshView() {
    this.VNe();
    this.ata();
    this.ZGe();
    this.BNe();
  }
  OnTimer(i) {
    this.FNe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t = this.GetGuideUiItem("0");
    if (t !== undefined) {
      return [t, t];
    }
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  ata() {
    var i = this.ActivityBaseData.IsPreStageQuestFinished();
    var t = this.ActivityBaseData.GetPreGuideQuestFinishState();
    this.nta.SetActive(!i && !t);
    if (!i) {
      t = ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(this.ActivityBaseData.Id);
      this.nta.SetContentByTextId(t.StageQuestTips);
    }
  }
  ZGe() {
    var i = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount();
    var t = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetAllBuildingData().length;
    this.Sfa.SetText(i.toString() + "/" + t.toString());
    var i = ModelManager_1.ModelManager.MoonChasingRewardModel.TargetTotalCount;
    var t = Math.min(i, ModelManager_1.ModelManager.MoonChasingRewardModel.TargetGetCount);
    this.s6e.SetText(t.toString() + "/" + i.toString());
  }
  VNe() {
    var i = this.ActivityBaseData.IsUnLock();
    var t = this.ActivityBaseData.GetPreGuideQuestFinishState();
    var e = this.ActivityBaseData.ActivityFlowState;
    this.ANe.SetPanelConditionVisible(!i);
    if (!i) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.SetRewardButtonVisible(false);
    this.GetItem(6).SetUIActive(false);
    this.s6e.SetActive(this.ActivityBaseData.PermanentTargetOn && i && t);
    this.Sfa.SetActive(i && t && e === 0);
    this.ANe.FunctionButton.SetUiActive(i);
    let s = "Moonfiesta_Skip";
    if (e === 1) {
      s = "Moonfiesta_Memory";
    } else if (!t) {
      s = "JumpToQuestText";
    }
    this.ANe.FunctionButton.SetShowText(s);
  }
  BNe() {
    this.ANe.FunctionButton.SetRedDotVisible(this.ActivityBaseData.IsHasMoonChasingRedDot());
    this.Sfa.BindRedDot("MoonChasingHandbook");
    this.s6e.BindRedDot("MoonChasingRewardAndShop");
  }
}
exports.ActivitySubViewMoonChasing = ActivitySubViewMoonChasing;
//# sourceMappingURL=ActivitySubViewMoonChasing.js.map