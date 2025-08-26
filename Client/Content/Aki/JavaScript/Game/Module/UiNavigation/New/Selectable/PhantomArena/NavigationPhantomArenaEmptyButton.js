"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationPhantomArenaEmptyButton = undefined;
const UiManager_1 = require("../../../../../Ui/UiManager");
const NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaEmptyButton extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments);
    this.Proxy = undefined;
  }
  OnInit() {
    super.OnInit();
    var t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleDetailsView");
    this.Proxy = t?.OpenParam;
  }
  NotifyFocusListener() {
    if (this.Proxy) {
      this.Proxy.SetIsInGamepadNavigation(false);
    }
  }
}
exports.NavigationPhantomArenaEmptyButton = NavigationPhantomArenaEmptyButton;
//# sourceMappingURL=NavigationPhantomArenaEmptyButton.js.map