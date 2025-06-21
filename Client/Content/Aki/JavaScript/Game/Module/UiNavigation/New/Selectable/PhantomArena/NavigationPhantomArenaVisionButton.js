"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NavigationPhantomArenaVisionButton = void 0;
const UiManager_1 = require("../../../../../Ui/UiManager"),
  NavigationButton_1 = require("../NavigationButton");
class NavigationPhantomArenaVisionButton extends NavigationButton_1.NavigationButton {
  constructor() {
    super(...arguments), this.Proxy = void 0
  }
  OnInit() {
    super.OnInit();
    var t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleDetailsView");
    this.Proxy = t?.OpenParam
  }
  InteractClickPrevGroup() {
    this.Proxy && this.Proxy.SetIsInGamepadNavigation(!1)
  }
}
exports.NavigationPhantomArenaVisionButton = NavigationPhantomArenaVisionButton;
//# sourceMappingURL=NavigationPhantomArenaVisionButton.js.map