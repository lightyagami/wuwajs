"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapDragRightComponent = exports.MapDragForwardComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const HotKeyComponent_1 = require("./HotKeyComponent");
class MapDragForwardComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    e.GetFocusListener();
    this.SetVisibleMode(2, true);
  }
  OnInputAxis(e, t) {
    if (t !== 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapDragMoveForward, t);
    }
  }
}
exports.MapDragForwardComponent = MapDragForwardComponent;
class MapDragRightComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    e.GetFocusListener();
    this.SetVisibleMode(2, true);
  }
  OnInputAxis(e, t) {
    if (t !== 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MapDragMoveRight, t);
    }
  }
}
exports.MapDragRightComponent = MapDragRightComponent;
//# sourceMappingURL=MapDragComponent.js.map