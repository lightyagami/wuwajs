"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridUpgradeArrowComponent = undefined;
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridUpgradeArrowComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_UpgradeArrow";
  }
  OnRefresh(e) {
    this.SetActive(e);
  }
}
exports.MediumItemGridUpgradeArrowComponent = MediumItemGridUpgradeArrowComponent;
//# sourceMappingURL=MediumItemGridUpgradeArrowComponent.js.map