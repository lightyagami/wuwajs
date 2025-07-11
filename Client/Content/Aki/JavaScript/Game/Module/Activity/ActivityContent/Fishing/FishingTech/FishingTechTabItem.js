"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingTechTabItem = undefined;
const UE = require("ue");
const CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase");
const UiTabSequence_1 = require("../../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class FishingTechTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.GridIndex = 0;
    this.Cke = e => {
      if (e === 1) {
        this.SelectedCallBack?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
    this.BtnBindInfo = [[0, this.Cke]];
  }
  OnUpdateTabIcon(e) {}
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
}
exports.FishingTechTabItem = FishingTechTabItem;
//# sourceMappingURL=FishingTechTabItem.js.map