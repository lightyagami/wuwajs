"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleNavigationNextComponent = void 0;
const UiManager_1 = require("../../../../Ui/UiManager"),
  NavigationGroupComponent_1 = require("../NavigationGroupComponent");
class PhantomArenaBattleNavigationNextComponent extends NavigationGroupComponent_1.NavigationGroupNextComponent {
  constructor() {
    super(...arguments), this.Proxy = void 0
  }
  OnInit() {
    super.OnInit();
    var e = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleDetailsView");
    this.Proxy = e?.OpenParam
  }
  JumpToNextGroupListener() {
    super.JumpToNextGroupListener(), this.Proxy && this.Proxy.SetIsInGamepadNavigation(!0)
  }
  OnRelease(e) {
    super.OnRelease(e), this.Proxy && this.Proxy.SetIsInGamepadNavigation(!0)
  }
}
exports.PhantomArenaBattleNavigationNextComponent = PhantomArenaBattleNavigationNextComponent;
//# sourceMappingURL=PhantomArenaBattleNavigationNextComponent.js.map