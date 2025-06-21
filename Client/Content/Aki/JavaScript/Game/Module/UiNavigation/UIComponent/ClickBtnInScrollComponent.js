"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ClickBtnInScrollComponent = void 0;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
  UiNavigationViewManager_1 = require("../New/UiNavigationViewManager"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnInScrollComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    this.c8i(e.BindButtonTag)
  }
  c8i(e) {
    e === HotKeyViewDefine_1.EXIT_TAG ? ControllerHolder_1.ControllerHolder.UiNavigationNewController.HotKeyCloseView() : (ControllerHolder_1.ControllerHolder.UiNavigationNewController.ClickButton(e), UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey())
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    StringUtils_1.StringUtils.IsEmpty(t) || ((e = e.GetActiveListenerByTag(t)) && e.IsInNormalScrollDisplayByGridActor() ? this.SetVisibleMode(2, e.IsListenerActive()) : this.SetVisibleMode(2, !1))
  }
}
exports.ClickBtnInScrollComponent = ClickBtnInScrollComponent;
//# sourceMappingURL=ClickBtnInScrollComponent.js.map