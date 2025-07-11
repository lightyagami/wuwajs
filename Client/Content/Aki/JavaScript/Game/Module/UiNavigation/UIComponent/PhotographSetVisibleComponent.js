"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotographSetVisibleComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const HotKeyComponent_1 = require("./HotKeyComponent");
class PhotographSetVisibleComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhotographSetVisible);
  }
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
}
exports.PhotographSetVisibleComponent = PhotographSetVisibleComponent;
//# sourceMappingURL=PhotographSetVisibleComponent.js.map