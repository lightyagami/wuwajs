"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewBlackCoast = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewBlackCoast extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.Gke = () => {
      UiManager_1.UiManager.OpenView("BlackCoastActivityMainView", this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UITexture]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    var t = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    i.push(this.LNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB();
    i.push(this.DNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    i.push(this.UNe.CreateThenShowByActorAsync(t.GetOwner()));
    var t = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    i.push(this.ANe.CreateThenShowByActorAsync(t.GetOwner()));
    await Promise.all(i);
  }
  OnStart() {
    var i = this.ActivityBaseData.LocalConfig;
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.LNe.SetSubTitleVisible(!StringUtils_1.StringUtils.IsEmpty(i?.DescTheme));
    if (i?.DescTheme) {
      this.LNe.SetSubTitleByTextId(i.DescTheme);
    }
    this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc));
    if (i?.Desc) {
      this.DNe.SetContentByTextId(i.Desc);
    }
    const t = this.GetTexture(6);
    t.SetUIActive(false);
    this.SetItemIcon(t, this.ActivityBaseData.GetProgressItemId, undefined, () => {
      t.SetUIActive(true);
    });
    i = this.ActivityBaseData.GetPreviewReward();
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(i);
    this.ANe.FunctionButton.SetFunction(this.Gke);
    this.OnRefreshView();
  }
  OnRefreshView() {
    this.d7s();
    this._Oe();
    this.BNe();
  }
  OnTimer(i) {
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  d7s() {
    this.GetText(4).SetText(this.ActivityBaseData.GetProgressItemCount().toString() + "/");
    this.GetText(5).SetText(this.ActivityBaseData.GetProgressItemTotal().toString());
  }
  _Oe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i);
    if (!i) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
    this.ANe.FunctionButton.SetActive(i);
  }
  BNe() {
    var i = this.ActivityBaseData.RewardRedDotState();
    this.ANe.SetFunctionRedDotVisible(i);
  }
}
exports.ActivitySubViewBlackCoast = ActivitySubViewBlackCoast;
//# sourceMappingURL=ActivitySubViewBlackCoast.js.map