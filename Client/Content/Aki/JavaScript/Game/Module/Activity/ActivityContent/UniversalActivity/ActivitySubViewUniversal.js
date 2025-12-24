"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewUniversal = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityUniversalController_1 = require("./ActivityUniversalController");
class ActivitySubViewUniversal extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.DFe = () => {
      var i;
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        ActivityUniversalController_1.ActivityUniversalController.ActivityFunctionExecute(this.ActivityBaseData.Id);
      } else {
        i = this.ActivityBaseData.GetUnFinishPreGuideQuestId();
        UiManager_1.UiManager.OpenView("QuestView", i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
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
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnStart() {
    var i;
    var t = this.ActivityBaseData.LocalConfig;
    var e = this.ActivityBaseData.GetExtraConfig();
    if (t && e) {
      e = t.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(e);
      this.LNe.SetActivityBaseData(this.ActivityBaseData);
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      this.LNe.SetSubTitleVisible(i);
      if (i) {
        this.LNe.SetSubTitleByTextId(e);
      }
      i = t.Desc;
      this.DNe.SetContentByTextId(i);
      e = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(e);
      this.ANe.FunctionButton.SetFunction(this.DFe);
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
      this.ANe.FunctionButton.SetText(t);
      this.OnRefreshView();
    }
  }
  OnRefreshView() {
    this._Fe();
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  _Fe() {
    var i;
    var t;
    var e = this.ActivityBaseData.GetExtraConfig();
    if (e) {
      i = this.ActivityBaseData.IsUnLock();
      e = e.FunctionType === 0;
      t = this.ActivityBaseData.GetPreGuideQuestFinishState();
      this.ANe.SetPanelConditionVisible(!i);
      if (i) {
        this.ANe.FunctionButton?.SetUiActive(!e || !t);
      } else {
        this.ANe.FunctionButton?.SetUiActive(false);
      }
      if (!i) {
        this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
      }
    }
  }
}
exports.ActivitySubViewUniversal = ActivitySubViewUniversal;
//# sourceMappingURL=ActivitySubViewUniversal.js.map