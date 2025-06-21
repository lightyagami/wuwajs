"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CiacconaActivityInfoPanel = void 0;
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CiacconaGalDefine_1 = require("../../../CiacconaGal/CiacconaGalDefine"),
  ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA"),
  ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList"),
  ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class CiacconaActivityInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(), this.b4c = e, this.L4c = void 0, this.w4c = void 0, this.R4c = void 0, this.A4c = void 0, this.Qho = () => {
      var e = this.b4c.GetUnFinishPreGuideQuestId();
      switch (ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(this.b4c.Id).State) {
        case 0:
          e && UiManager_1.UiManager.OpenView("QuestView", e);
          break;
        case 1:
        case 2:
          ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenChapterEntryView(this.b4c.Id, 1)
      }
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    this.L4c = new ActivityTitleTypeA_1.ActivityTitleTypeA, this.w4c = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA, this.R4c = new ActivityRewardList_1.ActivityRewardList, this.A4c = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.b4c);
    var e = [];
    e.push(this.L4c.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())), e.push(this.w4c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())), e.push(this.R4c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())), e.push(this.A4c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), await Promise.all(e), this.R4c.InitGridLayout(this.R4c.InitCommonGridItem)
  }
  OnBeforeShow() {
    this.RefreshFunctionArea()
  }
  RefreshFunctionArea() {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetActivityDataById(this.b4c.Id),
      e = {
        UnlockBtnFunction: this.Qho,
        UnlockBtnTextId: e.State2Unlock ? CiacconaGalDefine_1.TEXT_CIACCONA_GOTO_ACTIVITY : CiacconaGalDefine_1.TEXT_CIACCONA_GOTO_QUEST
      },
      e = (this.A4c?.RefreshGeneralPerformance(e), ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward()),
      i = ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward(),
      t = ModelManager_1.ModelManager.CiacconaGalModel.HasAnySubEndingReward();
    this.A4c?.SetFunctionRedDotVisible(e || i || t)
  }
  SetTimer(e, i) {
    this.L4c?.SetTimeTextVisible(e), this.L4c?.SetTimeTextByText(i)
  }
  SetTitle(e) {
    this.L4c?.SetTitleByText(e)
  }
  SetSubTitle(e, i) {
    this.L4c?.SetSubTitleVisible(e), this.L4c?.SetSubTitleByText(i)
  }
  SetDesc(e, i) {
    this.w4c?.SetContentVisible(e), this.w4c?.SetContentByTextId(i)
  }
  SetReward(e, i) {
    this.R4c?.SetUiActive(e), this.R4c?.RefreshItemLayout(i)
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this.A4c?.FunctionButton?.GetRootItem()) ? [e, e] : void 0
  }
}
exports.CiacconaActivityInfoPanel = CiacconaActivityInfoPanel;
//# sourceMappingURL=CiacconaActivityInfoPanel.js.map