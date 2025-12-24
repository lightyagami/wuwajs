"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewRoleGuide = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RoleController_1 = require("../../../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent");
const ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
const ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRoleGuideRoleItem_1 = require("./ActivityRoleGuideRoleItem");
class ActivitySubViewRoleGuide extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.j2e = undefined;
    this.ANe = undefined;
    this.W2e = () => {
      return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    };
    this.K2e = () => {
      var i = this.ActivityBaseData.ShowQuestId;
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i) === 2) {
        UiManager_1.UiManager.OpenView("QuestView", i);
      } else {
        i = this.ActivityBaseData.RoleGuideConfig.ShowQuestGetWay;
        if (!StringUtils_1.StringUtils.IsEmpty(i) && !(i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i), StringUtils_1.StringUtils.IsEmpty(i))) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(i);
        }
      }
    };
    this.Q2e = () => {
      var i = this.ActivityBaseData.RoleQuestId;
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i) === 2) {
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
    this.X2e = () => {
      var i = [this.ActivityBaseData.RoleTrialId];
      RoleController_1.RoleController.OpenRoleMainView(1, 0, i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[8, this.K2e], [10, this.X2e]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(4);
    this.j2e = new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent();
    await this.j2e.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(9);
    var t = this.ActivityBaseData.GetRoleResourcePath();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      await new ActivityRoleGuideRoleItem_1.ActivityRoleGuideRoleItem().CreateThenShowByPathAsync(t, i);
    }
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig;
    this.LNe.SetActivityBaseData(this.ActivityBaseData);
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.LNe.SetSubTitleVisible(!StringUtils_1.StringUtils.IsEmpty(i?.DescTheme));
    if (i?.DescTheme) {
      this.LNe.SetSubTitleByTextId(i.DescTheme);
    }
    this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc));
    if (i?.Desc) {
      this.DNe.SetContentByTextId(i.Desc);
    }
    this.UNe.SetTitleByTextId("Activity_RoleGuideActivity_RewardDesc");
    this.UNe.InitGridLayout(this.W2e);
    this.ANe.FunctionButton.SetFunction(this.Q2e);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
    this.ANe.FunctionButton.SetText(i);
    this.j2e.Update(this.ActivityBaseData.RoleId);
    this.OnRefreshView();
  }
  OnRefreshView() {
    this.FNe();
    this.$2e();
    this.jqe();
    this._Oe();
  }
  FNe() {
    this.LNe.SetTimeTextVisible(false);
  }
  $2e() {
    var i;
    var t = this.ActivityBaseData?.ShowQuestId;
    if (t) {
      t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t) !== 3;
      i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.ActivityBaseData.RoleQuestId);
      t = t && i !== 3;
      this.GetItem(6).SetUIActive(t);
      if (t && (i = this.ActivityBaseData.RoleGuideConfig.ShowQuestTips, t = !StringUtils_1.StringUtils.IsEmpty(i), this.GetText(7).SetUIActive(t), t)) {
        this.GetText(7).ShowTextNew(i);
      }
    } else {
      this.GetItem(6).SetUIActive(false);
    }
  }
  jqe() {
    var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.ActivityBaseData.RoleQuestId) === 3;
    var t = [];
    for (const s of this.ActivityBaseData.GetPreviewReward()) {
      var e = {
        Item: s,
        HasClaimed: i
      };
      t.push(e);
    }
    this.UNe.RefreshItemLayout(t);
  }
  _Oe() {
    var i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(this.ActivityBaseData.RoleQuestId);
    var t = this.ActivityBaseData.IsUnLock();
    var i = i === 3;
    if (!t) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.SetPanelConditionVisible(!t);
    this.ANe.FunctionButton.SetActive(t && !i);
    this.GetItem(5)?.SetUIActive(t && i);
  }
}
exports.ActivitySubViewRoleGuide = ActivitySubViewRoleGuide;
//# sourceMappingURL=ActivitySubViewRoleGuide.js.map