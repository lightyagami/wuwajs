"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationFunctionPageButton = undefined;
const NavigationButton_1 = require("../NavigationButton");
class NavigationFunctionPageButton extends NavigationButton_1.NavigationButton {
  OnStart() {
    if (this.PanelHandle?.GetType() === "MainMenu") {
      this.PanelHandle.AddNavigationListener(this.Listener);
    }
  }
  OnCheckFindOpposite(t) {
    var i = this.Selectable?.GetRootComponent();
    return !!i?.GetRenderCanvas()?.IsUIVisible(i);
  }
}
exports.NavigationFunctionPageButton = NavigationFunctionPageButton;
//# sourceMappingURL=NavigationFunctionPageButton.js.map