"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaVisionButton = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaVisionButton extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments);
    this.Proxy = undefined;
  }
  OnInit() {
    super.OnInit();
    var t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleDetailsView");
    this.Proxy = t?.OpenParam;
  }
  InteractClickPrevGroup() {
    if (this.Proxy) {
      this.Proxy.SetIsInGamepadNavigation(false);
    }
  }
}
exports.NavigationPhantomArenaVisionButton = NavigationPhantomArenaVisionButton;
//# sourceMappingURL=NavigationPhantomArenaVisionButton.js.map