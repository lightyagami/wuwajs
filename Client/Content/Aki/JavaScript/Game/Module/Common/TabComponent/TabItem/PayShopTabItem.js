"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopTabItem = undefined;
const UE = require("ue");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const CommonTabItem_1 = require("./CommonTabItem");
class PayShopTabItem extends CommonTabItem_1.CommonTabItem {
  constructor() {
    super(...arguments);
    this.eBl = undefined;
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([5, UE.UIText]);
  }
  GetNameTextComponent() {
    return this.GetText(5);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  Refresh(e, t, i) {
    super.Refresh(e, t, i);
    this.GetTabToggle().RootUIComp.SetUIActive(false);
    this.GetTabToggle().RootUIComp.SetUIActive(true);
  }
  BindRedDot(e, t = 0) {
    super.BindRedDot(e, t);
    this.eBl = t;
  }
  UnBindRedDot() {
    this.UnBindGivenUid(this.eBl);
  }
}
exports.PayShopTabItem = PayShopTabItem;
//# sourceMappingURL=PayShopTabItem.js.map