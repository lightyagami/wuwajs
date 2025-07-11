"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewTurntableLock = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewTurntableLock extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityTurntableData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.DFe = () => {
      var i;
      if (!this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        this.ActivityTurntableData.SavePreQuestRedDot(i);
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnSetData() {
    this.ActivityTurntableData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(1);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(2);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(3);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(4);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    var t;
    var e = this.ActivityBaseData.LocalConfig;
    if (e && (t = e.DescTheme, i = !StringUtils_1.StringUtils.IsEmpty(t), this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle()), this.LNe.SetSubTitleVisible(i), i && this.LNe.SetSubTitleByTextId(t), i = e.Desc, this.DNe.SetContentByTextId(i), t = this.ActivityBaseData.GetPreviewReward(), this.UNe.SetTitleByTextId("CollectActivity_reward"), this.UNe.InitGridLayout(this.UNe.InitCommonGridItem), this.UNe.RefreshItemLayout(t), this.ANe.FunctionButton.SetFunction(this.DFe), this.ActivityTurntableData.IsUnLock())) {
      this.ActivityTurntableData.SaveUnlockRedDot();
    }
  }
  OnRefreshView() {
    this.FNe();
    this._Fe();
    this.BNe();
  }
  OnTimer(i) {
    this.FNe();
  }
  _Fe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.FunctionButton?.SetUiActive(i);
    this.ANe.SetPanelConditionVisible(!i);
    if (!i) {
      this.ANe.FunctionButton?.SetUiActive(false);
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  BNe() {
    var i = this.ActivityTurntableData.IsHasPreQuestRedDot();
    this.ANe.SetFunctionRedDotVisible(i);
  }
}
exports.ActivitySubViewTurntableLock = ActivitySubViewTurntableLock;
//# sourceMappingURL=ActivitySubViewTurntableLock.js.map