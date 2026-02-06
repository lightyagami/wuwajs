"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksTopStepItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const DrinksUtils_1 = require("../../DrinksUtils");
class DrinksTopStepItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Step = t;
    this.StepType = 1;
    this.IsEmpty = true;
    this.StepType = DrinksUtils_1.DrinksUtils.GetStepType(this.Step);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture]];
  }
  UpdateCurState(t) {
    t = t === this.Step || DrinksUtils_1.DrinksUtils.GetStepType(t) === 2 && this.StepType === 2 ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(t);
    this.UpdateStepItem();
  }
  UpdateStepItem() {
    var t;
    var i = ModelManager_1.ModelManager.DrinksModel.GetCurrentPlayData();
    if (this.StepType === 1) {
      if (i.DrinkBase[this.Step] === 0) {
        this.SetEmpty(true);
      } else {
        this.SetEmpty(false);
        t = ConfigManager_1.ConfigManager.DrinksConfig.GetDrinkBase(i.DrinkBase[this.Step]);
        this.SetTextureByPath(t.DrinkIcon, this.GetTexture(2));
      }
    } else if (this.StepType === 3) {
      if (i.Ornament === 0) {
        this.SetEmpty(true);
      } else {
        this.SetEmpty(false);
        t = ConfigManager_1.ConfigManager.DrinksConfig.GetOrnament(i.Ornament);
        this.SetTextureByPath(t.Icon, this.GetTexture(2));
      }
    } else if (!i.Batching || (t = this.Step - 2, i.Batching.length <= t) || i.Batching[t] === 0) {
      this.SetEmpty(true);
    } else {
      this.SetEmpty(false);
      i = ConfigManager_1.ConfigManager.DrinksConfig.GetBatching(i.Batching[t]);
      this.SetTextureByPath(i.Icon, this.GetTexture(2));
    }
  }
  SetEmpty(t) {
    this.IsEmpty = t;
    this.GetTexture(1)?.SetUIActive(t);
    this.GetTexture(2)?.SetUIActive(!t);
  }
}
exports.DrinksTopStepItem = DrinksTopStepItem;
//# sourceMappingURL=DrinksTopStepItem.js.map