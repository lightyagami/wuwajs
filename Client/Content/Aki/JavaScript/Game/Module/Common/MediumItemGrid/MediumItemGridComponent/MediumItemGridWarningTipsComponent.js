"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridWarningTipsComponent = undefined;
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridWarningTipsComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_WarningIcon";
  }
  OnRefresh(e) {
    this.SetActive(e);
  }
}
exports.MediumItemGridWarningTipsComponent = MediumItemGridWarningTipsComponent;
//# sourceMappingURL=MediumItemGridWarningTipsComponent.js.map