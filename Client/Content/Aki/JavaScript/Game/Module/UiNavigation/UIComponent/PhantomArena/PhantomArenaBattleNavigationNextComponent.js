"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleNavigationNextComponent = undefined;
const UiManager_1 = require("../../../../Ui/UiManager");
const NavigationGroupComponent_1 = require("../NavigationGroupComponent");
class PhantomArenaBattleNavigationNextComponent extends NavigationGroupComponent_1.NavigationGroupNextComponent {
  constructor() {
    super(...arguments);
    this.Proxy = undefined;
  }
  OnInit() {
    super.OnInit();
    var e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleDetailsView");
    this.Proxy = e?.OpenParam;
  }
  JumpToNextGroupListener() {
    super.JumpToNextGroupListener();
    if (this.Proxy) {
      this.Proxy.SetIsInGamepadNavigation(true);
    }
  }
  OnRelease(e) {
    super.OnRelease(e);
    if (this.Proxy) {
      this.Proxy.SetIsInGamepadNavigation(true);
    }
  }
}
exports.PhantomArenaBattleNavigationNextComponent = PhantomArenaBattleNavigationNextComponent;
//# sourceMappingURL=PhantomArenaBattleNavigationNextComponent.js.map