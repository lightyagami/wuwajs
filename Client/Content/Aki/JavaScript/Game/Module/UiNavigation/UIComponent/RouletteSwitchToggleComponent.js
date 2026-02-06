"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteSwitchToggleComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const HotKeyComponent_1 = require("./HotKeyComponent");
class RouletteSwitchToggleComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
  OnPress() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RouletteSwitchToggleComponentEmit);
  }
}
exports.RouletteSwitchToggleComponent = RouletteSwitchToggleComponent;
//# sourceMappingURL=RouletteSwitchToggleComponent.js.map