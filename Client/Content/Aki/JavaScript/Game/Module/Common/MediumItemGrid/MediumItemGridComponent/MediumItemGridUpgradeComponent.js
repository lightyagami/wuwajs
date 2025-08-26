"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridUpgradeComponent = undefined;
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridUpgradeComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_Upgrade";
  }
  OnRefresh(e) {
    this.SetActive(e);
  }
}
exports.MediumItemGridUpgradeComponent = MediumItemGridUpgradeComponent;
//# sourceMappingURL=MediumItemGridUpgradeComponent.js.map