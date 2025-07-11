"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressMainLineActivityInfoPanel = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const ActivityDescriptionTypeB_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressMainLineActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
    this.Pda = undefined;
    this.xda = undefined;
    this.bda = undefined;
    this.Bda = undefined;
    this.Nda = () => {
      const t = ModelManager_1.ModelManager.ActivityRegressModel.IsMainLineTaskFinish(this.Lo);
      this.bda.GetLayoutItemList().forEach(i => {
        i.SetReceivedVisible(t);
      });
    };
    this.Fda = () => {
      let i = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishTask(this.Lo);
      if (i !== undefined) {
        ActivityRegressHelper_1.ActivityRegressHelper.ReportRecallLog1024(1, i);
      } else {
        i = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId();
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Role_Precondition");
      }
      UiManager_1.UiManager.OpenView("QuestView", i);
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
    this.bda = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.Bda = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(undefined);
    await Promise.all([this.Pda.CreateThenShowByActorAsync(i.GetOwner()), this.xda.CreateThenShowByActorAsync(t.GetOwner()), this.bda.CreateThenShowByActorAsync(e.GetOwner()), this.Bda.CreateThenShowByActorAsync(s.GetOwner())]);
  }
  OnStart() {
    this.Bda.FunctionButton.SetFunction(this.Fda);
    var i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CollectActivity_Button_ahead");
    this.Bda.FunctionButton.SetText(i);
    this.bda.InitGridLayout(this.bda.InitCommonGridItem);
    this.Pda.SetTimeTextVisible(false);
  }
  RefreshByData(i) {
    this.Lo = i;
    this.mGe();
    this.Pqe();
    this.jqe();
    this.Vda();
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
  jqe() {
    var i = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressBaseRewardPreviewItemList(this.Lo);
    this.bda.RefreshItemLayout(i, this.Nda);
  }
  Vda() {
    var i = ModelManager_1.ModelManager.ActivityRegressModel.IsMainLineTaskFinish(this.Lo);
    this.Bda.FunctionButton.SetUiActive(!i);
    this.Bda.PanelActivate.SetUiActive(i);
    if (i) {
      this.Bda.PanelActivate.SetTextByTextId("RecallActivity_Finish");
    } else {
      this.Bda.FunctionButton.SetLocalTextNew("RecallActivity_Go");
    }
  }
}
exports.ActivityRegressMainLineActivityInfoPanel = ActivityRegressMainLineActivityInfoPanel;
//# sourceMappingURL=ActivityRegressMainLineActivityInfoPanel.js.map