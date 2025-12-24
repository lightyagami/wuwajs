"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewGeneralInfo = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ActivityDescriptionTypeA_1 = require("../../ActivityContent/UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../ActivityContent/UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../ActivityContent/UniversalComponents/Title/ActivityTitleTypeA");
const ActivitySubViewBase_1 = require("./ActivitySubViewBase");
class ActivitySubViewGeneralInfo extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.k5e = undefined;
    this.w$1 = false;
    this.DFe = () => {
      this.k5e?.(this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var t = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var i = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var e = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(t.GetOwner()), this.DNe.CreateThenShowByActorAsync(i.GetOwner()), this.UNe.CreateThenShowByActorAsync(e.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())]);
  }
  OnStart() {
    var t;
    var i;
    var e = this.ActivityBaseData.LocalConfig;
    if (e) {
      t = e.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(t);
      this.LNe.SetActivityBaseData(this.ActivityBaseData);
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      this.LNe.SetSubTitleVisible(i);
      if (i && (i = e.DescThemeIcon, this.LNe.SetSubTitleByTextId(t), i)) {
        this.LNe?.SetSubTitleIconByPath(i);
      }
      t = e.Desc;
      this.DNe.SetContentByTextId(t);
      i = this.ActivityBaseData.GetPreviewReward();
      this.UNe.SetTitleByTextId("CollectActivity_reward");
      this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
      this.UNe.RefreshItemLayout(i);
      this.ANe.FunctionButton.SetFunction(this.DFe);
      this.ANe.FunctionButton.SetLocalTextNew("CollectActivity_reward");
      this.OnRefreshView();
    }
  }
  OnRefreshView() {
    this.RefreshFunction();
    this.RefreshTimerText();
  }
  OnTimer(t) {
    this.RefreshTimerText();
  }
  RefreshFunction() {
    var t = this.ActivityBaseData.IsUnLock();
    this.ANe?.FunctionButton?.SetUiActive(t);
    this.ANe?.SetPanelConditionVisible(!t);
    if (!t) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
  RefreshTimerText() {
    var t;
    var i;
    if (this.w$1) {
      this.LNe.SetTimeTextVisible(false);
    } else {
      [t, i] = this.GetTimeVisibleAndRemainTime();
      this.LNe.SetTimeTextVisible(t);
      if (t) {
        this.LNe.SetTimeTextByText(i);
      }
    }
  }
  HideRemainTime() {
    this.w$1 = true;
    this.LNe.SetTimeTextVisible(false);
  }
  SetBtnText(t, ...i) {
    this.ANe?.FunctionButton?.SetLocalTextNew(t, i);
  }
  SetClickFunc(t) {
    this.k5e = t;
  }
  SetFunctionRedDotVisible(t) {
    this.ANe?.SetFunctionRedDotVisible(t);
  }
  SetRewardButtonFunction(t) {
    this.ANe?.SetRewardButtonFunction(t);
  }
  SetPanelTipVisible(t) {
    this.ANe?.SetPanelTipVisible(t);
  }
  SetSubTitleTextById(t) {
    this.LNe.SetSubTitleVisible(true);
    this.LNe.SetSubTitleByTextId(t);
  }
  GetFunctional() {
    return this.ANe;
  }
}
exports.ActivitySubViewGeneralInfo = ActivitySubViewGeneralInfo;
//# sourceMappingURL=ActivitySubViewGeneralInfo.js.map