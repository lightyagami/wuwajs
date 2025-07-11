"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationInventoryItemGridToggle = undefined;
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationInventoryItemGridToggle extends NavigationToggle_1.NavigationToggle {
  OnStart() {
    var t;
    if (this.PanelHandle?.GetType() === "Inventory") {
      t = this.PanelHandle;
      this.Selectable.bToggleOnSelect = !t.IsInDestroyMode;
    }
  }
}
exports.NavigationInventoryItemGridToggle = NavigationInventoryItemGridToggle;
//# sourceMappingURL=NavigationInventoryItemGridToggle.js.map