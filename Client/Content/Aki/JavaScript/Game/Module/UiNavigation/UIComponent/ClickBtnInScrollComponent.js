"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickBtnInScrollComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationViewManager_1 = require("../New/UiNavigationViewManager");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnInScrollComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    this.c8i(e.BindButtonTag);
  }
  c8i(e) {
    if (e === HotKeyViewDefine_1.EXIT_TAG) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.HotKeyCloseView();
    } else {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.ClickButton(e);
      UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
    }
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if ((e = e.GetActiveListenerByTag(t)) && e.IsInNormalScrollDisplayByGridActor()) {
        this.SetVisibleMode(2, e.IsListenerActive());
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.ClickBtnInScrollComponent = ClickBtnInScrollComponent;
//# sourceMappingURL=ClickBtnInScrollComponent.js.map