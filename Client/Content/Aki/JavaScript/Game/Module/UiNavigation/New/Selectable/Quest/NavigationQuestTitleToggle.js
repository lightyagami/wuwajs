"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationQuestTitleToggle = undefined;
const NavigationToggle_1 = require("../NavigationToggle");
class NavigationQuestTitleToggle extends NavigationToggle_1.NavigationToggle {
  OnCanFocusInScrollOrLayout() {
    this.IsInteractive;
    return false;
  }
}
exports.NavigationQuestTitleToggle = NavigationQuestTitleToggle;
//# sourceMappingURL=NavigationQuestTitleToggle.js.map