"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonConditionFilterItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonConditionFilterItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super();
    this.QualityInfo = e;
    this.ToggleFunction = undefined;
    this.Bke = t => {
      if (this.ToggleFunction) {
        this.ToggleFunction(this.QualityInfo.Id, this.QualityInfo.ConsumeFilterText);
      }
    };
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    this.GetText(1).ShowTextNew(this.QualityInfo.ConsumeFilterText);
  }
  SetToggleState(t, e = true) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
  SetToggleFunction(t) {
    this.ToggleFunction = t;
  }
  GetQualityInfo() {
    return this.QualityInfo;
  }
}
exports.CommonConditionFilterItem = CommonConditionFilterItem;
//# sourceMappingURL=CommonConditionFilterItem.js.map