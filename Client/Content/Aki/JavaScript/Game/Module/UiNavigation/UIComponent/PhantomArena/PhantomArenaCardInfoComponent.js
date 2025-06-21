"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardInfoComponent = void 0;
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  HotKeyComponent_1 = require("../HotKeyComponent");
class PhantomArenaCardInfoComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress() {
    var e = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCurrentNavigationFocusListener();
    e && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GamepadTriggerCardInfo, e.RootUIComp)
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetFocusListener();
    e && this.IsLinkListener(e.GetOwner()) ? this.SetVisibleMode(2, !0) : this.SetVisibleMode(2, !1)
  }
}
exports.PhantomArenaCardInfoComponent = PhantomArenaCardInfoComponent;
//# sourceMappingURL=PhantomArenaCardInfoComponent.js.map