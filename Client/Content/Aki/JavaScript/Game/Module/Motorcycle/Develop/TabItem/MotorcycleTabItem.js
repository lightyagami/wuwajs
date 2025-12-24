"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTabItem = undefined;
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const UiTabCamera_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabCamera");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class MotorcycleTabItem extends CommonTabItem_1.CommonTabItem {
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabCamera_1.UiTabCamera).SetTabData(e.GetViewName());
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
}
exports.MotorcycleTabItem = MotorcycleTabItem;
//# sourceMappingURL=MotorcycleTabItem.js.map