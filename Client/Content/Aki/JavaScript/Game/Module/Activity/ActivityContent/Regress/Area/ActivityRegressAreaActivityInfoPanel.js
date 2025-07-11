"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressAreaActivityInfoPanel = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const MapController_1 = require("../../../../Map/Controller/MapController");
const ActivityDescriptionTypeB_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressAreaActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Pda = undefined;
    this.xda = undefined;
    this.bda = undefined;
    this.Bda = undefined;
    this.qda = () => {
      ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1024(3);
      var i = this.Lo.ArgId[0];
      var t = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(i);
      MapController_1.MapController.OpenMapViewAndFocusMark(t.ObjectType, i, undefined, false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.Pda = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.xda = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB();
    var e = this.GetItem(2);
    e.SetUIActive(false);
    this.bda = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.Bda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
    await Promise.all([this.Pda.CreateThenShowByActorAsync(i.GetOwner()), this.xda.CreateThenShowByActorAsync(t.GetOwner()), this.bda.CreateByActorAsync(e.GetOwner()), this.Bda.CreateThenShowByActorAsync(s.GetOwner())]);
  }
  OnStart() {
    this.Bda.FunctionButton.SetFunction(this.qda);
    this.Bda.FunctionButton.SetLocalTextNew("RecallActivity_Go");
    this.bda.InitGridLayout(this.bda.InitCommonGridItem);
    this.Pda.SetTimeTextVisible(false);
  }
  RefreshByData(i) {
    this.Lo = i;
    this.mGe();
    this.Pqe();
    this.jqe();
  }
  mGe() {
    this.Pda.SetTitleByTextId(this.Lo.Title);
  }
  Pqe() {
    var i = this.Lo.SubTitle;
    var t = this.Lo.Description;
    var e = !StringUtils_1.StringUtils.IsEmpty(i);
    this.Pda.SetSubTitleVisible(e);
    if (e) {
      this.Pda.SetSubTitleByTextId(i);
    }
    this.xda.SetContentByTextId(t);
  }
  jqe() {}
}
exports.ActivityRegressAreaActivityInfoPanel = ActivityRegressAreaActivityInfoPanel;
//# sourceMappingURL=ActivityRegressAreaActivityInfoPanel.js.map