"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridSelectedFlagComponent = undefined;
const SmallItemGridVisibleComponent_1 = require("./SmallItemGridVisibleComponent");
class SmallItemGridSelectedFlagComponent extends SmallItemGridVisibleComponent_1.SmallItemGridVisibleComponent {
  GetResourceId() {
    return "UiItem_ItemBRoleSel";
  }
  OnRefresh(e) {
    super.OnRefresh(e);
    this.SetUiActive(e);
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.SmallItemGridSelectedFlagComponent = SmallItemGridSelectedFlagComponent;
//# sourceMappingURL=SmallItemGridSelectedFlagComponent.js.map