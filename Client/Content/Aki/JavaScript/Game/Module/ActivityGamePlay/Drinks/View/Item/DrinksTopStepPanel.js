"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksTopStepPanel = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const DrinksTopStepItem_1 = require("./DrinksTopStepItem");
class DrinksTopStepPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CurStep = 0;
    this.StepItemList = [];
    this.StepItem1 = undefined;
    this.StepItem2 = undefined;
    this.StepItem3 = undefined;
    this.StepItem4 = undefined;
    this.StepItem5 = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.StepItem1 = new DrinksTopStepItem_1.DrinksTopStepItem(0);
    this.StepItemList.push(this.StepItem1);
    t.push(this.StepItem1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.StepItem2 = new DrinksTopStepItem_1.DrinksTopStepItem(1);
    this.StepItemList.push(this.StepItem2);
    t.push(this.StepItem2.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.StepItem3 = new DrinksTopStepItem_1.DrinksTopStepItem(2);
    this.StepItemList.push(this.StepItem3);
    t.push(this.StepItem3.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.StepItem4 = new DrinksTopStepItem_1.DrinksTopStepItem(3);
    this.StepItemList.push(this.StepItem4);
    t.push(this.StepItem4.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.StepItem5 = new DrinksTopStepItem_1.DrinksTopStepItem(4);
    this.StepItemList.push(this.StepItem5);
    t.push(this.StepItem5.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(t);
  }
  UpdateStep() {
    var t = ModelManager_1.ModelManager.DrinksModel.GetCurStep();
    this.RefreshTitle(t);
    for (const e of this.StepItemList) {
      e.UpdateCurState(t);
    }
  }
  UpdateStepItem() {
    for (const t of this.StepItemList) {
      t.UpdateStepItem();
    }
  }
  RefreshTitle(t) {
    t = ConfigManager_1.ConfigManager.DrinksConfig.GetStepConfig(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.StepTitle);
  }
}
exports.DrinksTopStepPanel = DrinksTopStepPanel;
//# sourceMappingURL=DrinksTopStepPanel.js.map