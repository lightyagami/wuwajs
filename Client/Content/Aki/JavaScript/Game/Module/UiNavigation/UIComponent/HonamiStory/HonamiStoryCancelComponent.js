"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryCancelComponent = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryCancelComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(o) {
    if (this.Logic && ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsNavigationMousePositionDragging()) {
      this.Logic.CancelOperationByGamepad();
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
    }
  }
  OnRefreshSelfHotKeyState(o) {
    if (o.HasGamepadControlMouse() && o.IsNavigationMousePositionDragging()) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStoryCancelComponent = HonamiStoryCancelComponent;
//# sourceMappingURL=HonamiStoryCancelComponent.js.map