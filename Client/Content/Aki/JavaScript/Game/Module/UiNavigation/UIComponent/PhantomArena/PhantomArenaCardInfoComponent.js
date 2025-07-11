"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardInfoComponent = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const HotKeyComponent_1 = require("../HotKeyComponent");
class PhantomArenaCardInfoComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress() {
    var e = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener();
    if (e) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GamepadTriggerCardInfo, e.RootUIComp);
    }
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetFocusListener();
    if (e && this.IsLinkListener(e.GetOwner())) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.PhantomArenaCardInfoComponent = PhantomArenaCardInfoComponent;
//# sourceMappingURL=PhantomArenaCardInfoComponent.js.map