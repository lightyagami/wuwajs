"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuickEquipOffComponent = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryQuickEquipOffComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(o) {
    if (this.Logic) {
      if (ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsNavigationMousePositionDragging()) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
      }
      this.Logic.QuickEquipOff();
    }
  }
  OnRefreshSelfHotKeyState(o) {
    if (!this.Logic || !o.HasGamepadControlMouse() || o.IsNavigationMousePositionDragging() || !(o = this.Logic.GetCurItem()) || o.GetBackpackType() !== 3) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
}
exports.HonamiStoryQuickEquipOffComponent = HonamiStoryQuickEquipOffComponent;
//# sourceMappingURL=HonamiStoryQuickEquipOffComponent.js.map