"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryQuickEquipOnComponent = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryQuickEquipOnComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(o) {
    if (this.Logic) {
      if (ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsNavigationMousePositionDragging()) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
      }
      this.Logic.QuickEquipOn();
    }
  }
  OnRefreshSelfHotKeyState(o) {
    if (this.Logic && o.HasGamepadControlMouse() && !o.IsNavigationMousePositionDragging() && (o = this.Logic.GetCurItem()) && o.GetData()?.GetItemType() !== 2 && ((o = o.GetBackpackType()) === 1 || o === 0)) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStoryQuickEquipOnComponent = HonamiStoryQuickEquipOnComponent;
//# sourceMappingURL=HonamiStoryQuickEquipOnComponent.js.map