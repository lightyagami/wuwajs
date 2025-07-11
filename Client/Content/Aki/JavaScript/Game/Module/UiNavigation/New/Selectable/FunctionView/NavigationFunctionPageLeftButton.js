"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationFunctionPageLeftButton = undefined;
const NavigationButton_1 = require("../NavigationButton");
class NavigationFunctionPageLeftButton extends NavigationButton_1.NavigationButton {
  OnButtonClick() {
    if (this.PanelHandle?.GetType() === "MainMenu") {
      this.PanelHandle.FindPrevFocusListener();
    }
  }
}
exports.NavigationFunctionPageLeftButton = NavigationFunctionPageLeftButton;
//# sourceMappingURL=NavigationFunctionPageLeftButton.js.map