"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalTabItem = undefined;
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const CommonTabItem_1 = require("./CommonTabItem");
class PersonalTabItem extends CommonTabItem_1.CommonTabItem {
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
}
exports.PersonalTabItem = PersonalTabItem;
//# sourceMappingURL=PersonalTabItem.js.map