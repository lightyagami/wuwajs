"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenRouletteSetViewComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const HotKeyComponent_1 = require("./HotKeyComponent");
class OpenRouletteSetViewComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
  OnPress() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenRouletteSetView);
  }
}
exports.OpenRouletteSetViewComponent = OpenRouletteSetViewComponent;
//# sourceMappingURL=OpenRouletteSetViewComponent.js.map