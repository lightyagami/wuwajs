"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaskComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class MaskComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    var o = this.RootItem.GetRootCanvas().GetOwner().RootComponent;
    UiNavigationNewController_1.UiNavigationNewController.SimulateClickItem(o);
  }
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
}
exports.MaskComponent = MaskComponent;
//# sourceMappingURL=MaskComponent.js.map