"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationVisionAssembleCompareToggle = undefined;
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationVisionAssembleCompareToggle extends NavigationToggle_1.NavigationToggle {
  OnToggleClick(e) {
    this.PanelHandle.IsInCompare = e === 1;
  }
}
exports.NavigationVisionAssembleCompareToggle = NavigationVisionAssembleCompareToggle;
//# sourceMappingURL=NavigationVisionAssembleCompareToggle.js.map