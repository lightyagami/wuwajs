"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseBtnComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationViewManager_1 = require("../New/UiNavigationViewManager");
const HotKeyComponent_1 = require("./HotKeyComponent");
class CloseBtnComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Wem = false;
  }
  OnPress(e) {
    this.Wem = this.Tjd();
    if (!this.Wem) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.HotKeyCloseView();
    }
  }
  OnRelease(e) {
    if (this.Wem) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.HotKeyCloseView();
    }
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = e.GetActiveListenerByTag(t);
      this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
    }
  }
  Tjd() {
    return UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle().GetActiveListenerByTag(HotKeyViewDefine_1.HOME_TAG)?.IsListenerActive() ?? false;
  }
}
exports.CloseBtnComponent = CloseBtnComponent;
//# sourceMappingURL=CloseBtnComponent.js.map