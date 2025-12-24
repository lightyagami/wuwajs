"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorMusicSortDragCancelComponent = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HotKeyComponent_1 = require("./HotKeyComponent");
class MotorMusicSortDragCancelComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    if (ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsNavigationMousePositionDragging()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMotorMusicSortDragCancel);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
    }
  }
  OnRefreshSelfHotKeyState(e) {
    if (e.HasGamepadControlMouse() && e.IsNavigationMousePositionDragging()) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.MotorMusicSortDragCancelComponent = MotorMusicSortDragCancelComponent;
//# sourceMappingURL=MotorMusicSortCancelComponent.js.map